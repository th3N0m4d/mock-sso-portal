import { describe, expect, it, beforeEach } from "vitest";
import { useAuthStore } from "../hooks";

describe("Auth Store", () => {
  beforeEach(() => {
    useAuthStore.setState({ authenticated: false, token: "", error: "" });
    localStorage.clear();
  });

  it("should initialize with default state", () => {
    const state = useAuthStore.getState();
    expect(state.authenticated).toBe(false);
    expect(state.token).toBe("");
    expect(state.error).toBe("");
  });

  it("should login with correct credentials", () => {
    useAuthStore.getState().login("admin", "pwd");

    const state = useAuthStore.getState();
    expect(state.authenticated).toBe(true);
    expect(state.token).toBe("mock-jwt-token");
    expect(state.error).toBe("");
    expect(localStorage.getItem("token")).toBe("mock-jwt-token");
  });

  it("should set error on invalid login", () => {
    useAuthStore.getState().login("bad", "creds");

    const state = useAuthStore.getState();
    expect(state.authenticated).toBe(false);
    expect(state.token).toBe("");
    expect(state.error).toBe("Invalid username or password");
  });

  it("should logout and clear token", () => {
    useAuthStore.getState().login("admin", "pwd");
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.authenticated).toBe(false);
    expect(state.token).toBe("");
    expect(localStorage.getItem("token")).toBe(null);
  });
});
