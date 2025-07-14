import { getCurrentUser, signIn, signOut } from "@aws-amplify/auth";
import { create } from "zustand";

type State = {
  authenticated: boolean;
  error: string;
  user?: unknown;
  loading?: boolean;
};

type Actions = {
  login(username: string, password: string): void;
  logout(): Promise<void>;
  setUser(user: unknown): void;
  checkUser(): Promise<void>;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>((set) => {
  return {
    authenticated: false,
    error: "",
    login: async (username, password) => {
      try {
        const { isSignedIn } = await signIn({ username, password });
        if (isSignedIn) {
          const user = await getCurrentUser();
          set({ user, authenticated: true, error: "", loading: false });
        } else {
          set({
            loading: false,
            error: "Sign in is not complete. Additional steps may be required.",
          });
        }
      } catch (error) {
        set({ error: (error as Error).message });
      }
    },
    logout: async () => {
      try {
        await signOut();
        set({ user: undefined, authenticated: false, loading: false });
      } catch (error) {
        console.error("Error signing out:", error);
        set({ error: (error as Error).message });
      }
    },
    setUser: (user: unknown) => {
      set({ user, authenticated: true, error: "" });
    },
    checkUser: async () => {
      try {
        const user = await getCurrentUser();
        set({ user, authenticated: true, loading: false });
      } catch (error) {
        console.error("Error during getCurrentUser", error);
        set({ user: undefined, authenticated: false, loading: false });
      }
    },
  };
});
