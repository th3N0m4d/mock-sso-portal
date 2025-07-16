import { getCurrentUser, signIn, signOut, signUp } from "@aws-amplify/auth";
import { create } from "zustand";
import type { SignUpInput } from "aws-amplify/auth";

type State = {
  authenticated: boolean;
  error: string;
  user?: unknown;
  loading?: boolean;
  requiresConfirmation: boolean;
};

type Actions = {
  login(username: string, password: string): void;
  logout(): Promise<void>;
  setUser(user: unknown): void;
  checkUser(): Promise<void>;
  signUp(params: SignUpInput): void;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>((set) => {
  return {
    authenticated: false,
    requiresConfirmation: false,
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
    signUp: async (params) => {
      set({ loading: true, error: "" });
      try {
        const { nextStep } = await signUp(params);

        if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
          set({ loading: false, requiresConfirmation: true });
        } else {
          set({ loading: false, requiresConfirmation: false });
        }
      } catch (error) {
        set({ error: (error as Error).message, loading: false });
      }
    },
  };
});
