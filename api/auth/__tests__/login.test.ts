import { createMocks } from "node-mocks-http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../login";
import { vi } from "vitest";

describe("Login Function", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  beforeAll(() => {
    process.env.KEYCLOAK_BASE_URL = "http://localhost:8080";
    process.env.KEYCLOAK_CLIENT_ID = "vite-frontend";
    process.env.KEYCLOAK_REALM = "vite-demo";
    process.env.REDIRECT_URI = "http://localhost:3000/api/auth/callback";
  });

  test("should return 200 for correct creds", async () => {
    // Arrange
    const fakeToken = "mocked-token";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            access_token: fakeToken,
            refresh_token: fakeToken,
            error_description: null,
          }),
      })
    );

    const { req, res } = createMocks<VercelRequest, VercelResponse>({
      method: "POST",
      body: {
        username: "john_wayne",
        password: "123",
      },
    });

    // Act
    await handler(req, res);

    const data = res._getJSONData();

    // Assert
    expect(res.statusCode).toBe(200);
    expect(data.access_token).toBe(fakeToken);
    expect(data.refresh_token).toBe(fakeToken);
    expect(data.error_description).toBeNull();
  });

  test("should return 500 for invalid creds", async () => {
    // Arrange

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 500,
        json: () =>
          Promise.resolve({
            access_token: null,
            refresh_token: null,
            error_description: "Something went wrong",
          }),
      })
    );

    const { req, res } = createMocks<VercelRequest, VercelResponse>({
      method: "POST",
      body: {
        username: "not_john_wayne",
        password: "123",
      },
    });

    // Act
    await handler(req, res);

    const data = res._getJSONData();

    // Assert
    expect(res.statusCode).toBe(500);
    expect(data.access_token).toBeNull();
    expect(data.refresh_token).toBeNull();
    expect(data.error_description).toBe("Something went wrong");
  });
});
