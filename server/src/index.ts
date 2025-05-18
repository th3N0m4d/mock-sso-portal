import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import { KeycloakTokenResponse } from "./types";

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.KEYCLOAK_DOMAIN, credentials: true }));

// Routes
app.post("/auth/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("client_id", process.env.KEYCLOAK_CLIENT_ID!);
    params.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET!);
    params.append("username", username);
    params.append("password", password);

    const response = await fetch(
      `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      }
    );

    if (!response.ok) {
      res.status(401).json({ error: "Invalid credentials" });
    }

    const data = (await response.json()) as KeycloakTokenResponse;
    res.json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
  } catch (err) {
    console.error("Login failed", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
