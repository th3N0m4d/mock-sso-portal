import AppRoutes from "./Routes";
import { Amplify } from "aws-amplify";
// import amplifyconfig from "./amplifyconfiguration.json";
import amplifyconfig from "./amplify-config";
import { useEffect } from "react";
import { useAuthStore } from "./hooks";

Amplify.configure(amplifyconfig);

function App() {
  const { checkUser, loading } = useAuthStore();
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="app">
      <AppRoutes />
    </main>
  );
}

export default App;
