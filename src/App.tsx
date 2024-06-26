import { initNavigator, SDKProvider } from "@tma.js/sdk-react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { useIntegration } from "@tma.js/react-router-integration";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useEffect, useMemo } from "react";
import Main from "./pages/Main.tsx";
import Friends from "./pages/Friends.tsx";
import Upgrades from "./pages/Upgrades.tsx";
import GameInfo from "./pages/GameInfo.tsx";
import Ad from "./pages/Ad.tsx";
import Tasks from "./pages/Tasks.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug>
        <QueryClientProvider client={queryClient}>
          <AppRoot>
            <AuthProvider>
              <Router location={location} navigator={reactNavigator}>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/upgrades" element={<Upgrades />} />
                  <Route path="/game-info" element={<GameInfo />} />
                  <Route path="/ads" element={<Ad />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Router>
            </AuthProvider>
          </AppRoot>
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export default App;
