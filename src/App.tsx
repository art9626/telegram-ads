import React from "react";
import { SDKProvider } from "@tma.js/sdk-react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./layout/Auth";
import BaseLayout from "./layout/BaseLayout/BaseLayout";
import MainPage from "./pages/MainPage";
import PerkPage from "./pages/PerkPage";
import useNavigator from "./hooks/useNavigator";
import MiniAppLayout from "./layout/MiniAppLayout";
import UserProvider from "./providers/UserProvider";
import ServicesProvider from "./providers/ServicesProvider";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const manifestUrl = React.useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  const [location, reactNavigator] = useNavigator();

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      uiPreferences={{ theme: THEME.DARK }}
    >
      <SDKProvider acceptCustomStyles debug>
        <QueryClientProvider client={queryClient}>
          <ServicesProvider>
            <Auth>
              <UserProvider>
                <MiniAppLayout>
                  <Router location={location} navigator={reactNavigator}>
                    <Routes>
                      <Route path="/" element={<BaseLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="/perk" element={<PerkPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Route>
                    </Routes>
                  </Router>
                </MiniAppLayout>
              </UserProvider>
            </Auth>
          </ServicesProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} position="top" /> */}
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export default App;
