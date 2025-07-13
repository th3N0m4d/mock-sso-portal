import { create } from "zustand";

const INVALID_CREDS = "Invalid username or password";
const MOCK_TOKEN = "mock-jwt-token";

type State = {
  authenticated: boolean;
  token: string;
  error: string;
  user?: unknown;
};

type Actions = {
  login(username: string, password: string): void;
  logout(): void;
  setUser(user: unknown): void;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>((set) => {
  const token = localStorage.getItem("token") || "";
  const authenticated = token.length > 0;

  return {
    authenticated,
    token,
    error: "",
    login: (username, password) => {
      if (username === "admin" && password === "pwd") {
        set({ authenticated: true, token: MOCK_TOKEN, error: "" });
        localStorage.setItem("token", MOCK_TOKEN);
      } else {
        set({ error: INVALID_CREDS });
        console.error(INVALID_CREDS);
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ authenticated: false, token: "", error: "" });
    },
    setUser: (user: unknown) => {
      set({ user, authenticated: true, token: "", error: "" });
    },
  };
});
