import { LoginForm, ForgotPassword, ConfirmSignUpForm } from "../components";

import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks";
import { Hub } from "aws-amplify/utils";
import { confirmSignUp, getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import "./Login.css";
import type { ConfirmSignUpProps, FormFields, FormType } from "../types";

export default function LoginPage() {
  const [mode, setMode] = useState<FormType>("login");
  const { login, setUser, signUp } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // To hold username between steps

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          // User has been redirected to the provider
          break;
        case "signInWithRedirect_failure":
          console.error("SSO sign in failed:", payload.data);
          break;
        case "signedIn":
          getCurrentUser()
            .then((user) => {
              setUser(user);
              navigate("/dashboard");
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

  // const handleSSOClick = async (provider: "Google" | "Facebook" | "Amazon") => {
  //   try {
  //     await signInWithRedirect({ provider });
  //   } catch (error) {
  //     console.error("Error during signInWithRedirect", error);
  //   }
  // };

  useEffect(() => {
    console.log("mode", mode);
  }, [mode]);

  const handleRegister = ({ username, password }: FormFields) => {
    setUsername(username);
    signUp({
      username: username,
      password: password,
      options: { userAttributes: { email: username } },
    });
    setMode("confirm");
  };

  const handleConfirmSignUp = ({ confirmationCode }: ConfirmSignUpProps) => {
    confirmSignUp({ username, confirmationCode });
    setMode("login");
  };

  const handleForgotPassword = () => {};

  return (
    <div className="container">
      {mode === "login" && (
        <LoginForm onSubmit={handleSubmit} onSetMode={setMode} />
      )}
      {mode === "register" && (
        <RegisterForm onSubmit={handleRegister} onSetMode={setMode} />
      )}
      {mode === "confirm" && (
        <ConfirmSignUpForm onSubmit={handleConfirmSignUp} />
      )}
      {mode === "forgot" && (
        <ForgotPassword onSubmit={handleForgotPassword} onSetMode={setMode} />
      )}
      {/**@todo add SSO login options here  */}
    </div>
  );
}
