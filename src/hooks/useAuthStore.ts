import { create } from "zustand";

type State = {
  authenticated: boolean;
  user: any | null;
  error: string;
  loading: boolean;
};

type Actions = {
  login(username: string, password: string): Promise<void>;
  ssoLogin(provider: string): void;
  fetchUser(): Promise<void>;
  logout(): void;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  authenticated: false,
  user: null,
  error: "",
  loading: true,
  login: async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      set({ error: data.error || "Login failed" });
      return;
    }

    // After login, get user info from cookie
    await get().fetchUser();
  },

  ssoLogin: (provider: string) => {
    window.location.href = `/api/auth/sso?provider=${provider}`;
  },

  fetchUser: async () => {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const { user } = await res.json();
      set({ user, authenticated: true, error: "", loading: false });
    } else {
      set({ user: null, authenticated: false, loading: false });
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    set({ authenticated: false, user: null, error: "" });
  },
}));
