import { timingSafeEqual } from "node:crypto";

const CMS_STORAGE_VERSION = 3;
const DEFAULT_DATA_FILE_PATH = "data/cms-state.json";
const UPLOADS_DIR = "data/uploads";
const MAX_PAYLOAD_BYTES = 1_000_000;
const MAX_IMAGE_BYTES = 2_500_000;

const IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};
const CONTENT_TYPE_BY_EXT = Object.fromEntries(Object.entries(IMAGE_TYPES).map(([type, ext]) => [ext, type]));

function readConfig(env) {
  return {
    adminEmail: env.ESCOBAR_ADMIN_EMAIL,
    adminPassword: env.ESCOBAR_ADMIN_PASSWORD,
    owner: env.GITHUB_OWNER || "Dposleman",
    repo: env.GITHUB_REPO || "escobar-landing",
    branch: env.GITHUB_BRANCH || "main",
    token: env.GITHUB_TOKEN,
    filePath: env.CMS_DATA_FILE_PATH || DEFAULT_DATA_FILE_PATH,
  };
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
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

function isAuthorized(config, req) {
  if (!config.adminEmail || !config.adminPassword) return false;

  const email = req.headers["x-admin-email"] || req.body?.adminEmail || "";
  const password = req.headers["x-admin-password"] || req.body?.adminPassword || "";

  return (
    safeEqual(String(email).trim().toLowerCase(), config.adminEmail.trim().toLowerCase()) &&
    safeEqual(password, config.adminPassword)
  );
}

function createGithubClient(config) {
  const apiRoot = `https://api.github.com/repos/${config.owner}/${config.repo}/contents`;
  const baseHeaders = {
    Authorization: `Bearer ${config.token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "escobar-landing-cms",
  };

  async function readFile(path) {
    if (!config.token) {
      return { envelope: null, sha: null, mode: "disabled" };
    }

    const response = await fetch(`${apiRoot}/${path}?ref=${encodeURIComponent(config.branch)}`, {
      headers: baseHeaders,
    });

    if (response.status === 404) {
      return { envelope: null, sha: null, mode: "missing" };
    }

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`GitHub read failed: ${response.status} ${message}`);
    }

    const payload = await response.json();
    return {
      envelope: JSON.parse(decodeBase64(payload.content)),
      sha: payload.sha,
      mode: "remote",
    };
  }

  async function writeFile(path, contentBase64, message, sha) {
    if (!config.token) {
      throw new Error("Missing GITHUB_TOKEN");
    }

    const response = await fetch(`${apiRoot}/${path}`, {
      method: "PUT",
      headers: { ...baseHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: contentBase64,
        branch: config.branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`GitHub write failed: ${response.status} ${detail}`);
    }

    return response.json();
  }

  async function readRaw(path) {
    const response = await fetch(`${apiRoot}/${path}?ref=${encodeURIComponent(config.branch)}`, {
      headers: { ...baseHeaders, Accept: "application/vnd.github.raw+json" },
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`GitHub read failed: ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }

  return {
    readState: () => readFile(config.filePath),
    writeState: (envelope, sha) =>
      writeFile(
        config.filePath,
        encodeBase64(JSON.stringify(envelope, null, 2)),
        `chore(cms): update shared Escobar CMS state ${new Date().toISOString()}`,
        sha
      ),
    writeImage: (name, base64) => writeFile(`${UPLOADS_DIR}/${name}`, base64, `chore(cms): upload ${name}`),
    readImage: (name) => readRaw(`${UPLOADS_DIR}/${name}`),
  };
}

/** Builds the CMS request handler for a given set of environment variables. */
export function createCmsHandler(env) {
  const config = readConfig(env);
  const github = createGithubClient(config);

  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.setHeader("X-Content-Type-Options", "nosniff");

    if (!config.adminEmail || !config.adminPassword) {
      console.error("CMS admin credentials are not configured");
    }

    try {
      if (req.method === "GET") {
        const remote = await github.readState();
        const envelope = remote.envelope || null;

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
          state: isAuthorized(config, req) ? envelope.state : sanitizeState(envelope.state),
        });
      }

      if (req.method === "PUT") {
        if (!isAuthorized(config, req)) {
          return res.status(401).json({ ok: false, error: "Unauthorized" });
        }

        const state = req.body?.state;
        const payloadSize = Buffer.byteLength(JSON.stringify(req.body || {}), "utf8");

        if (payloadSize > MAX_PAYLOAD_BYTES) {
          return res.status(413).json({ ok: false, error: "Payload too large" });
        }

        if (!state || typeof state !== "object") {
          return res.status(400).json({ ok: false, error: "Missing state payload" });
        }

        const current = await github.readState();
        const envelope = createEnvelope(state);
        await github.writeState(envelope, current.sha);

        return res.status(200).json({
          ok: true,
          mode: "remote",
          updatedAt: envelope.updatedAt,
          state: sanitizeState(envelope.state),
        });
      }

      return res.status(405).json({ ok: false, error: "Method not allowed" });
    } catch (error) {
      console.error("CMS API error", error);
      return res.status(500).json({ ok: false, error: "CMS service unavailable" });
    }
  };
}

function slugify(value) {
  return String(value || "photo")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "photo";
}

/**
 * Photo uploads for the admin panel. Images are stored in the repository under data/uploads
 * and served back through GET /api/media?f=<name>, so they show up without a rebuild.
 *   POST { name, contentType, data (base64) }  -> { ok, url }   (admin only)
 *   GET  ?f=<file name>                          -> the image
 */
export function createMediaHandler(env) {
  const config = readConfig(env);
  const github = createGithubClient(config);

  return async function handler(req, res) {
    res.setHeader("X-Content-Type-Options", "nosniff");

    try {
      if (req.method === "GET") {
        const name = String(req.query?.f || "");
        const match = /^[a-z0-9][a-z0-9-]{0,80}\.(jpg|png|webp|gif|avif)$/.exec(name);
        if (!match) return res.status(400).json({ ok: false, error: "Bad file name" });

        const image = await github.readImage(name);
        if (!image) return res.status(404).json({ ok: false, error: "Not found" });

        res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
        res.setHeader("Content-Type", CONTENT_TYPE_BY_EXT[match[1]]);
        return res.status(200).send(image);
      }

      if (req.method === "POST") {
        res.setHeader("Cache-Control", "no-store");
        if (!isAuthorized(config, req)) {
          return res.status(401).json({ ok: false, error: "Unauthorized" });
        }

        const { name, contentType, data } = req.body || {};
        const ext = IMAGE_TYPES[contentType];
        if (!ext || typeof data !== "string" || !data) {
          return res.status(400).json({ ok: false, error: "Unsupported image" });
        }
        if (Buffer.byteLength(data, "base64") > MAX_IMAGE_BYTES) {
          return res.status(413).json({ ok: false, error: "Image too large" });
        }

        const fileName = `${Date.now().toString(36)}-${slugify(name)}.${ext}`;
        await github.writeImage(fileName, data);
        return res.status(200).json({ ok: true, url: `/api/media?f=${fileName}` });
      }

      return res.status(405).json({ ok: false, error: "Method not allowed" });
    } catch (error) {
      console.error("Media API error", error);
      return res.status(500).json({ ok: false, error: "Media service unavailable" });
    }
  };
}

// Vercel serverless entry point
export default function handler(req, res) {
  return createCmsHandler(process.env)(req, res);
}
