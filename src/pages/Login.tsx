import { LoginForm, ForgotPassword } from "../components";

import { useState } from "react";
import { useAuthStore } from "../hooks";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const { login, ssoLogin, error } = useAuthStore();

  const handleSubmit = (data: { username: string; password: string }) => {
    // handle auth
    const { username, password } = data;
    login(username, password);
  };

  const handleSSOClick = (provider: "google" | "facebook") => {
    // redirect or simulate
    ssoLogin(provider);
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
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
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
