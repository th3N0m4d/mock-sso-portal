import { useState } from "react";

type Props = {
  onSubmit: (data: unknown) => void;
  onBackToLogin: () => void;
};

export function RegisterForm({ onSubmit, onBackToLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register a new account</h3>
      <div className="form-group first">
        <label htmlFor="username">Email</label>
        <input
          type="email"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group last mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <input
        type="submit"
        value="Register"
        className="btn btn-block btn-primary"
      />

      <span
        onClick={onBackToLogin}
        className="d-block text-center my-4 text-muted"
        style={{ cursor: "pointer" }}
      >
        &mdash; or go back to login &mdash;
      </span>
    </form>
  );
}
