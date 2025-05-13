import { useState } from "react";

type ForgotPasswordProps = {
  onBack: () => void;
  onSubmit?: (email: string) => void;
};

export function ForgotPassword({ onBack, onSubmit }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    onSubmit?.(email);
  };

  return (
    <>
      <div className="text-center mb-4">
        <h3 className="text-uppercase">Reset Password</h3>
        <p className="text-muted">
          Enter your email address to receive a password reset link.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onBack}
            >
              Back to Login
            </button>
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
          </div>
        </form>
      ) : (
        <div className="alert alert-success text-center">
          If an account with <strong>{email}</strong> exists, a reset link has
          been sent.
        </div>
      )}
    </>
  );
}
