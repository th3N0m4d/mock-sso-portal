import { useState } from "react";

type Props = {
  onSubmit: (data: { confirmationCode: string }) => void;
};

export const ConfirmSignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ confirmationCode });
  };

  return (
    <div className="confirmation form">
      <header>Confirm Your Account</header>
      <p>Please enter the verification code sent to your email.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Verification Code"
          autoComplete="one-time-code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          required
        />
        <input type="submit" className="button" value="Confirm" />
      </form>
    </div>
  );
};
