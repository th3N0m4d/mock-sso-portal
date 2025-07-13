import { LoginForm, ForgotPassword } from "../components";

import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const { login, setUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          // User has been redirected to the provider
          break;
        case "signInWithRedirect_failure":
          // Handle sign in failure
          console.error("SSO sign in failed:", payload.data);
          break;
        case "signedIn":
          // User is signed in. Update the auth store and redirect.
          getCurrentUser()
            .then((user) => {
              setUser(user); // Update your auth state
              navigate("/dashboard"); // Redirect to a protected route
            })
            .catch(() => console.log("Not signed in"));
          break;
      }
    });

    return unsubscribe;
  }, [navigate, setUser]);

  const handleSubmit = (data: { username: string; password: string }) => {
    // handle auth
    const { username, password } = data;
    login(username, password);
  };

  const handleSSOClick = async (provider: "Google" | "Facebook" | "Amazon") => {
    try {
      await signInWithRedirect({ provider });
    } catch (error) {
      console.error("Error during signInWithRedirect", error);
    }
  };

  return (
    <div className="d-md-flex half">
      <div
        className="bg"
        style={{ backgroundImage: 'url("/images/bg_1.jpg")' }}
      ></div>

      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="form-block mx-auto">
                {mode === "login" ? (
                  <LoginForm
                    onSubmit={handleSubmit}
                    onForgot={() => setMode("forgot")}
                    onSSO={handleSSOClick}
                  />
                ) : (
                  <ForgotPassword onBack={() => setMode("login")} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
