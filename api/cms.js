const CMS_STORAGE_VERSION = 3;
const DEFAULT_DATA_FILE_PATH = "data/cms-state.json";
const ADMIN_EMAIL = process.env.ESCOBAR_ADMIN_EMAIL || "dio.escobar.aarhus@gmail.com";
const ADMIN_PASSWORD = process.env.ESCOBAR_ADMIN_PASSWORD || "Rasmus123";
const GITHUB_OWNER = process.env.GITHUB_OWNER || "Dposleman";
const GITHUB_REPO = process.env.GITHUB_REPO || "escobar-landing";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CMS_DATA_FILE_PATH = process.env.CMS_DATA_FILE_PATH || DEFAULT_DATA_FILE_PATH;

function createGithubUrl(path) {
  return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
}

function createEnvelope(state) {
  return {
    version: CMS_STORAGE_VERSION,
    updatedAt: new Date().toISOString(),
    state,
  };
}

function decodeBase64(content) {
  return Buffer.from(String(content || "").replace(/\n/g, ""), "base64").toString("utf8");
}

function encodeBase64(content) {
  return Buffer.from(content, "utf8").toString("base64");
}

function sanitizeState(state) {
  if (!state || typeof state !== "object") {
    return null;
  }

  return {
    ...state,
    users: [],
    auth: {
      user: null,
      isAuthenticated: false,
      token: null,
      updatedAt: null,
    },
  };
}

async function readGithubFile() {
  if (!GITHUB_TOKEN) {
    return { envelope: null, sha: null, mode: "disabled" };
  }

  const response = await fetch(createGithubUrl(CMS_DATA_FILE_PATH), {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "escobar-landing-cms",
    },
  });

  if (response.status === 404) {
    return { envelope: null, sha: null, mode: "missing" };
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub read failed: ${response.status} ${message}`);
  }

  const payload = await response.json();
  const raw = decodeBase64(payload.content);
  const envelope = JSON.parse(raw);

  return {
    envelope,
    sha: payload.sha,
    mode: "remote",
  };
}

async function writeGithubFile(envelope, sha) {
  if (!GITHUB_TOKEN) {
    throw new Error("Missing GITHUB_TOKEN");
  }

  const response = await fetch(createGithubUrl(CMS_DATA_FILE_PATH), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "escobar-landing-cms",
    },
    body: JSON.stringify({
      message: `chore(cms): update shared Escobar CMS state ${new Date().toISOString()}`,
      content: encodeBase64(JSON.stringify(envelope, null, 2)),
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub write failed: ${response.status} ${message}`);
  }

  return response.json();
}

function isAuthorized(req) {
  const email = req.headers["x-admin-email"] || req.body?.adminEmail || "";
  const password = req.headers["x-admin-password"] || req.body?.adminPassword || "";

  return (
    String(email).trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    String(password) === ADMIN_PASSWORD
  );
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  try {
    if (req.method === "GET") {
      const remote = await readGithubFile();
      const envelope = remote.envelope || null;
      const includePrivate = isAuthorized(req);

      if (!envelope) {
        return res.status(200).json({
          ok: true,
          mode: remote.mode,
          version: CMS_STORAGE_VERSION,
          updatedAt: null,
          state: null,
        });
      }

      return res.status(200).json({
        ok: true,
        mode: remote.mode,
        version: envelope.version || CMS_STORAGE_VERSION,
        updatedAt: envelope.updatedAt || null,
        state: includePrivate ? envelope.state : sanitizeState(envelope.state),
      });
    }

    if (req.method === "PUT") {
      if (!isAuthorized(req)) {
        return res.status(401).json({ ok: false, error: "Unauthorized" });
      }

      const state = req.body?.state;

      if (!state || typeof state !== "object") {
        return res.status(400).json({ ok: false, error: "Missing state payload" });
      }

      const current = await readGithubFile();
      const envelope = createEnvelope(state);
      await writeGithubFile(envelope, current.sha);

      return res.status(200).json({
        ok: true,
        mode: "remote",
        updatedAt: envelope.updatedAt,
        state: sanitizeState(envelope.state),
      });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown CMS API error";
    return res.status(500).json({ ok: false, error: message });
  }
}
