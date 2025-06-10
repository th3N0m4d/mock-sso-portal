import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username, password } = req.body;

  console.info("Login attempt received");

  try {
    const response = await fetch(
      `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "password",
          client_id: process.env.KEYCLOAK_CLIENT_ID!,
          client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
          username,
          password,
        }),
      }
    );

    console.info({ username: req.body.username }, "Login successful");
    res.status(response.status).end();
  } catch (error) {
    console.error({ error }, "Login failed");
    res.status(500).json({ error: "Something went wrong" });
  }
}
