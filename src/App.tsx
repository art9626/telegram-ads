/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { SDKProvider } from "@tma.js/sdk-react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import Auth from "./layout/Auth";
import BaseLayout from "./layout/BaseLayout";
import Main from "./pages/Main";
import useNavigator from "./hooks/useNavigator";
import MiniAppLayout from "./layout/MiniAppLayout";
import { ThemeProvider } from "next-themes";
import UserProvider from "./providers/UserProvider";

export const queryClient = new QueryClient();

function App() {
  const manifestUrl = React.useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  const [location, reactNavigator] = useNavigator();

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      uiPreferences={{
        theme: document.querySelector("html")?.classList.contains("dark")
          ? THEME.DARK
          : THEME.LIGHT,
      }}
    >
      <SDKProvider acceptCustomStyles debug>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class">
            <Theme accentColor="cyan">
              <Auth>
                <UserProvider>
                  <MiniAppLayout>
                    <Router location={location} navigator={reactNavigator}>
                      <BaseLayout>
                        <Routes>
                          <Route path="/" element={<Main />} />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      </BaseLayout>
                    </Router>
                  </MiniAppLayout>
                </UserProvider>
              </Auth>
            </Theme>
          </ThemeProvider>
        </QueryClientProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export default App;
