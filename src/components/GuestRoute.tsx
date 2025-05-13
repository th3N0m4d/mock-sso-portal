import { useEffect, type PropsWithChildren } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks";

export function GuestRoute({ children }: PropsWithChildren) {
  const { authenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/", { replace: true });
    }
  }, [authenticated]);

  if (!authenticated) {
    return children;
  }
}
