import { createMediaHandler } from "./cms.js";

export default function handler(req, res) {
  return createMediaHandler(process.env)(req, res);
}
