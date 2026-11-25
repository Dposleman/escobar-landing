import { createCmsHandler, createMediaHandler } from "../api/cms.js";
import submitHandler from "../api/submit.js";

const JSON_LIMIT = 1_000_000;
const MEDIA_LIMIT = 4_000_000;

/**
 * The handlers in /api use a small Node-style (req, res) contract. This adapts a Workers
 * Request/Response pair to it so the same code runs on Vercel and on Cloudflare.
 */
async function runHandler(request, env, handler, limit = JSON_LIMIT) {
  const url = new URL(request.url);
  const headers = Object.fromEntries(request.headers);
  if (headers["cf-connecting-ip"]) headers["x-forwarded-for"] = headers["cf-connecting-ip"];

  let body;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > limit) {
      return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
    }
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      body = {};
    }
  }

  const responseHeaders = new Headers();
  let status = 200;
  let payload;
  const res = {
    setHeader(name, value) {
      responseHeaders.set(name, value);
    },
    status(code) {
      status = code;
      return this;
    },
    json(value) {
      responseHeaders.set("Content-Type", "application/json; charset=utf-8");
      payload = JSON.stringify(value);
      return this;
    },
    send(value) {
      payload = value;
      return this;
    },
  };

  await handler({ method: request.method, headers, body, env, query: Object.fromEntries(url.searchParams) }, res);
  return new Response(payload ?? "{}", { status, headers: responseHeaders });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/cms") return runHandler(request, env, createCmsHandler(env));
    if (pathname === "/api/media") return runHandler(request, env, createMediaHandler(env), MEDIA_LIMIT);
    if (pathname === "/api/submit") return runHandler(request, env, submitHandler);
    if (pathname.startsWith("/api/")) return Response.json({ error: "Not found" }, { status: 404 });

    return env.ASSETS.fetch(request);
  },
};
