const TM_URL = "https://app.ticketmaster.com/discovery/v2/events.json";
const CACHE_MS = 30 * 60 * 1000;
const GENRES = "metal,hard rock";
const cache = new Map();

/** Picks the poster that fits a wide card best: smallest 16:9 image that is still sharp. */
function pickImage(images) {
  const real = (Array.isArray(images) ? images : []).filter((img) => img && img.url && !img.fallback);
  if (!real.length) return "";
  const wide = real.filter((img) => img.ratio === "16_9");
  const pool = wide.length ? wide : real;
  const sharp = pool.filter((img) => (img.width || 0) >= 1000).sort((a, b) => a.width - b.width);
  const best = sharp[0] || pool.sort((a, b) => (b.width || 0) - (a.width || 0))[0];
  return /^https:\/\//.test(best.url) ? best.url : "";
}

function normalize(event) {
  const venue = event?._embedded?.venues?.[0];
  const start = event?.dates?.start || {};
  if (!event?.id || !event?.name || !start.localDate) return null;
  if (event?.dates?.status?.code === "cancelled") return null;
  const cls = event?.classifications?.[0];
  return {
    id: String(event.id),
    title: String(event.name),
    date: start.localDate,
    time: start.localTime ? String(start.localTime).slice(0, 5) : "",
    venue: venue?.name || "",
    city: venue?.city?.name || "",
    genre: cls?.subGenre?.name || cls?.genre?.name || "",
    image: pickImage(event.images),
    url: /^https:\/\//.test(event.url || "") ? event.url : "",
    status: event?.dates?.status?.code || "onsale",
  };
}

async function loadEvents(apiKey, scope) {
  const params = new URLSearchParams({
    apikey: apiKey,
    countryCode: "DK",
    classificationName: GENRES,
    sort: "date,asc",
    size: "100",
    startDateTime: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
  });
  if (scope === "aarhus") params.set("city", "Aarhus");

  const response = await fetch(`${TM_URL}?${params}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Ticketmaster responded ${response.status}`);
  const data = await response.json();
  const seen = new Set();
  const events = [];
  for (const raw of data?._embedded?.events || []) {
    const item = normalize(raw);
    if (!item) continue;
    const key = `${item.title.toLowerCase()}|${item.date}|${item.city.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    events.push(item);
  }
  return events;
}

/**
 * Upcoming metal / hard rock shows in Denmark, from the official Ticketmaster Discovery API.
 *   GET /api/events?scope=dk|aarhus  ->  { ok, configured, scope, events: [...] }
 * Without TICKETMASTER_API_KEY it answers with an empty list, so the site keeps working.
 */
export function createEventsHandler(env) {
  const apiKey = env.TICKETMASTER_API_KEY;

  return async function handler(req, res) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

    const scope = req.query?.scope === "aarhus" ? "aarhus" : "dk";
    if (!apiKey) {
      res.setHeader("Cache-Control", "public, max-age=300");
      return res.status(200).json({ ok: true, configured: false, scope, events: [] });
    }

    const hit = cache.get(scope);
    if (hit && Date.now() - hit.at < CACHE_MS) {
      res.setHeader("Cache-Control", "public, max-age=600");
      return res.status(200).json({ ok: true, configured: true, scope, events: hit.events });
    }

    try {
      const events = await loadEvents(apiKey, scope);
      cache.set(scope, { at: Date.now(), events });
      res.setHeader("Cache-Control", "public, max-age=600");
      return res.status(200).json({ ok: true, configured: true, scope, events });
    } catch (error) {
      console.error("Events API error", error);
      if (hit) {
        res.setHeader("Cache-Control", "public, max-age=120");
        return res.status(200).json({ ok: true, configured: true, scope, events: hit.events, stale: true });
      }
      return res.status(502).json({ ok: false, error: "Events service unavailable" });
    }
  };
}

// Vercel serverless entry point
export default function handler(req, res) {
  return createEventsHandler(process.env)(req, res);
}
