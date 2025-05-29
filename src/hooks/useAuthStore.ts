import { create } from "zustand";
import { loginWithUsernamePassword } from "../services";

type State = {
  authenticated: boolean;
  token: string;
  error: string;
};

type Actions = {
  login(username: string, password: string): Promise<void>;
  logout(): void;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>((set) => {
  const token = localStorage.getItem("token") || "";
  const authenticated = token.length > 0;

  return {
    authenticated,
    token,
    error: "",
    login: async (username, password) => {
      const { error, accessToken } = await loginWithUsernamePassword(
        username,
        password
      );

      if (error) {
        set({ error });
      } else {
        set({ authenticated: true, token: accessToken, error: "" });
        localStorage.setItem("token", accessToken);
      }
    },
    logout: () => {
      localStorage.removeItem("token");
      set({ authenticated: false, token: "", error: "" });
    },
  };
});
