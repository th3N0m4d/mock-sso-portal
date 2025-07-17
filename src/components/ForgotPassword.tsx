import { useState } from "react";
import type { FormType } from "../types";

type ForgotPasswordProps = {
  onSubmit: (email: string) => void;
  onSetMode: (mode: FormType) => void;
};

export function ForgotPassword({ onSubmit, onSetMode }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    onSubmit(email);
  };

  return (
    <div className="forgotPassword form">
      <header>Forgot Password</header>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" className="button" value="Send reset link" />
      </form>
      <div className="signup">
        <span className="signup">
          Back to Login
          <label htmlFor="check" onClick={() => onSetMode("login")}>
            Login
          </label>
        </span>
      </div>
    </div>
  );
}
