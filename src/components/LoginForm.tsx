import { useState } from "react";
import type { FormFields, FormType } from "../types";

type LoginFormProps = {
  onSubmit: (data: FormFields) => void;
  onSetMode: (mode: FormType) => void;
};

export function LoginForm({ onSubmit, onSetMode }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <div className="login form">
      <header>Login</header>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#" onClick={() => onSetMode("forgot")}>
          Forgot password?
        </a>
        <input type="submit" className="button" value="Login" />
      </form>
      <div className="signup">
        <span className="signup">
          Don't have an account?
          <label htmlFor="check" onClick={() => onSetMode("register")}>
            Signup
          </label>
        </span>
      </div>
    </div>
  );
}
