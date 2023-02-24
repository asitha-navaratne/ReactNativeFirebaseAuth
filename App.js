import { Provider as PaperProvider } from "react-native-paper";

import Router from "./app/routes/Router";
import AuthProvider from "./app/contexts/AuthContext";

import Theme from "./app/styles/Theme";

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={Theme}>
        <Router />
      </PaperProvider>
    </AuthProvider>
  );
}
