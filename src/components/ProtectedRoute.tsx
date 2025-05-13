import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { authenticated } = useAuthStore();

  if (authenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
}
