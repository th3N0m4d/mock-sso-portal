import { createMocks } from "node-mocks-http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../sso";

describe("SSO Function", () => {
  test("should return 302 with proper redirect URL", () => {
    process.env.KEYCLOAK_BASE_URL = "http://localhost:8080";
    process.env.KEYCLOAK_CLIENT_ID = "vite-frontend";
    process.env.KEYCLOAK_REALM = "vite-demo";
    process.env.REDIRECT_URI = "http://localhost:3000/api/auth/callback";

    const { req, res } = createMocks<VercelRequest, VercelResponse>({
      method: "POST",
      query: {
        provider: "facebook",
      },
    });

    handler(req, res);

    const redirectUri = res._getRedirectUrl();

    expect(res.statusCode).toBe(302);
    expect(redirectUri).toContain("kc_idp_hint=facebook");
    expect(redirectUri).toContain("client_id=vite-frontend");
    expect(redirectUri).toContain("scope=openid+profile+email");
    expect(redirectUri).toContain("response_type=code");
    expect(redirectUri).toContain(
      "redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback"
    );
  });

  test("should return 400 when provider is missing", () => {
    const { req, res } = createMocks<VercelRequest, VercelResponse>({
      method: "POST",
      query: {},
    });

    handler(req, res);

    const data = res._getJSONData();

    expect(res.statusCode).toBe(400);
    expect(data).toHaveProperty("error", "Missing provider");
  });
});
