import { useState } from "react";

type LoginFormProps = {
  onSubmit: (data: { username: string; password: string }) => void;
  onForgot: () => void;
  onSSO: (provider: "google" | "facebook") => void;
};

export function LoginForm({ onSubmit, onForgot, onSSO }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <>
      <div className="text-center mb-5">
        <h3 className="text-uppercase">Login</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group first">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            className="form-control"
            placeholder="your-email@gmail.com"
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
            className="form-control is-valid"
            placeholder="Your Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-sm-flex mb-5 align-items-center">
          <label className="control control--checkbox mb-3 mb-sm-0">
            <span className="caption">Remember me</span>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <div className="control__indicator"></div>
          </label>
          <span className="ml-auto">
            <button
              type="button"
              className="forgot-pass btn btn-link p-0"
              onClick={onForgot}
            >
              Forgot Password
            </button>
          </span>
        </div>

        <input
          type="submit"
          value="Log In"
          className="btn btn-block py-2 btn-primary"
        />

        <span className="text-center my-3 d-block">or</span>

        <div className="">
          <button
            type="button"
            className="btn btn-block py-2 btn-google"
            onClick={() => onSSO("google")}
          >
            <span className="icon-google mr-3"></span> Login with Google
          </button>
        </div>
      </form>
    </>
  );
}
