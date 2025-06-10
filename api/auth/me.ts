// Returns user info if logged in
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const cookie = req.headers.cookie || "";
  const tokenMatch = cookie.match(/token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const decoded = jwt.decode(token) as any;
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
