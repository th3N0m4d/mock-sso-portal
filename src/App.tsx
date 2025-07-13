import AppRoutes from "./Routes";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

function App() {
  return (
    <main className="app">
      <AppRoutes />
    </main>
  );
}

export default App;
