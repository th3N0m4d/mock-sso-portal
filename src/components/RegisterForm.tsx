import { useState } from "react";
import type { FormFields, FormType } from "../types";
import { toast } from "react-toastify";

type Props = {
  onSubmit: (data: FormFields) => void;
  onSetMode: (mode: FormType) => void;
};

export function RegisterForm({ onSubmit, onSetMode }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onSubmit({ username, password });
    } else {
      toast.error("Please, make sure the passwords match.");
    }
  };

  return (
    <div className="registration form">
      <header>Signup</header>
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
          placeholder="Create a password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" className="button" value="Signup" />
      </form>
      <div className="signup">
        <span className="signup">
          Already have an account?
          <label htmlFor="check" onClick={() => onSetMode("login")}>
            Login
          </label>
        </span>
      </div>
    </div>
  );
}
