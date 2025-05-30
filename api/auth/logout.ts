// Clears the cookie
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_: VercelRequest, res: VercelResponse) {
  res.setHeader(
    "Set-Cookie",
    `token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict`
  );
  res.redirect("/");
}
