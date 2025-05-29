// Redirects to Keycloak to start SSO flow
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { provider } = req.query; // e.g. "google"
  const redirectUri = process.env.REDIRECT_URI;

  const authUrl =
    `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth?` +
    new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      redirect_uri: redirectUri!,
      response_type: "code",
      scope: "openid profile email",
      kc_idp_hint: provider as string,
    });

  res.redirect(authUrl);
}
