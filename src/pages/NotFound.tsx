import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center p-4">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <p className="fs-3">
        <span className="text-danger">Oops!</span> Page not found.
      </p>
      <p className="lead">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
}
