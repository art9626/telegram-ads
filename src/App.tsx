import React from "react";
import { SDKProvider } from "@tma.js/sdk-react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import BaseLayout from "./layout/BaseLayout/BaseLayout";
import MainPage from "./pages/MainPage";
import MiniAppLayout from "./layout/MiniAppLayout";
import UserProvider from "./providers/UserProvider";
import ServicesProvider from "./providers/ServicesProvider";
import AchievementsProvider from "./providers/AchievementsProvider";
import GlobalStatsPage from "./pages/GlobalStatsPage.tsx";
import UserStatsPage from "./pages/UserStatsPage.tsx";
import BalanceProvider from "./providers/BalanceProvider.tsx";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const manifestUrl = React.useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      uiPreferences={{ theme: THEME.DARK }}
    >
      <SDKProvider acceptCustomStyles debug>
        <MiniAppLayout>
          <QueryClientProvider client={queryClient}>
            <ServicesProvider>
              <AuthProvider>
                <UserProvider>
                  <AchievementsProvider>
                    <BalanceProvider>
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<BaseLayout />}>
                            <Route index element={<MainPage />} />
                            <Route
                              path="/global-stats"
                              element={<GlobalStatsPage />}
                            />
                            <Route
                              path="/user-stats"
                              element={<UserStatsPage />}
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                          </Route>
                        </Routes>
                      </BrowserRouter>
                    </BalanceProvider>
                  </AchievementsProvider>
                </UserProvider>
              </AuthProvider>
            </ServicesProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} position="top" /> */}
          </QueryClientProvider>
        </MiniAppLayout>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export default App;
