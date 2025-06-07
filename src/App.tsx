import { useEffect } from "react";
import AppRoutes from "./Routes";
import { useAuthStore } from "./hooks";

function App() {
  useEffect(() => {
    useAuthStore.getState().fetchUser();
  }, []);

  return (
    <main className="app">
      <AppRoutes />
    </main>
  );
}

export default App;
