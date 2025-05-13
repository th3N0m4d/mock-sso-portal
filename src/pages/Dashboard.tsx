import { useAuthStore } from "../hooks";

export default function Dashboard() {
  const { logout } = useAuthStore();
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center p-4">
      <h1 className="display-1 fw-bold text-primary">Home Page</h1>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}
