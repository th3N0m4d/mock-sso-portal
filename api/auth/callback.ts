import { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code as string;

  if (!code) return res.status(400).send("Missing code");

  try {
    const tokenRes = await axios.post(
      `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI!,
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token, access_token } = tokenRes.data;

    // Decode user info (optional: validate the token signature)
    const decoded = jwt.decode(id_token) as any;

    // Store in secure cookie
    res.setHeader(
      "Set-Cookie",
      `token=${access_token}; HttpOnly; Path=/; Secure; SameSite=Strict`
    );

    // Redirect back to app
    res.redirect("/");
  } catch (err) {
    console.error("SSO callback error:", err);
    res.status(500).send("Authentication failed");
  }
}
