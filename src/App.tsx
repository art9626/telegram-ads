/* eslint-disable react-refresh/only-export-components */
import {SDKProvider} from "@tma.js/sdk-react";
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import { useMemo } from "react";
import AppRoot from "./layout/AppRoot.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Flex, Theme} from "@radix-ui/themes";

export const queryClient = new QueryClient();

function App() {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  return (
    <Theme appearance="dark" accentColor="yellow">
      <Flex direction="column" height="100vh" p="2" justify="between">
        <TonConnectUIProvider manifestUrl={manifestUrl} uiPreferences={{theme: THEME.DARK}}>
          <SDKProvider acceptCustomStyles debug>
            <QueryClientProvider client={queryClient}>
              <AppRoot/>
            </QueryClientProvider>
          </SDKProvider>
        </TonConnectUIProvider>
      </Flex>
    </Theme>
  );
}

export default App;
