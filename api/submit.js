// Forwards website forms (song requests, band demos, newsletter) to a webhook.
// Nothing is stored in the repository: forms can contain email addresses.
// Set SUBMIT_WEBHOOK_URL in Vercel (a Discord/Slack webhook, Make, Zapier, Formspree...).

const TYPES = {
  request: { label: "Song request", fields: ["song", "name"], required: ["song"] },
  band: { label: "Band / gig enquiry", fields: ["band", "genre", "link", "email", "message"], required: ["band", "email"] },
  newsletter: { label: "Newsletter signup", fields: ["email"], required: ["email"], consent: true },
};

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" });

  const webhook = process.env.SUBMIT_WEBHOOK_URL;
  if (!webhook) return res.status(503).json({ ok: false, error: "not_configured" });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return res.status(429).json({ ok: false, error: "rate_limited" });

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const spec = TYPES[body.type];
  if (!spec) return res.status(400).json({ ok: false, error: "bad_type" });

  // Honeypot: bots fill the hidden field.
  if (body.website) return res.status(200).json({ ok: true });

  const values = {};
  for (const field of spec.fields) values[field] = clean(body[field], field === "message" ? 1200 : 200);
  for (const field of spec.required) {
    if (!values[field]) return res.status(400).json({ ok: false, error: "missing_field" });
  }
  if (values.email && !isEmail(values.email)) return res.status(400).json({ ok: false, error: "bad_email" });
  if (spec.consent && body.consent !== true) return res.status(400).json({ ok: false, error: "consent_required" });

  const lines = Object.entries(values)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`);
  const text = `[Escobar site] ${spec.label}\n${lines.join("\n")}`;

  const isDiscord = /discord(app)?\.com\/api\/webhooks\//.test(webhook);
  const payload = isDiscord
    ? { content: text.slice(0, 1900), allowed_mentions: { parse: [] } }
    : { text, type: body.type, ...values, receivedAt: new Date().toISOString() };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`webhook ${response.status}`);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("submit webhook failed", error);
    return res.status(502).json({ ok: false, error: "delivery_failed" });
  }
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}
