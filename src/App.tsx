import {initNavigator, SDKProvider} from "@tma.js/sdk-react";
import {Navigate, Route, Router, Routes} from "react-router-dom";
import { useIntegration } from '@tma.js/react-router-integration';
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import {useEffect, useMemo} from "react";
import {routes} from "./lib/routes.ts";

function App() {
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    navigator.attach()
    return () => navigator.detach()
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug>
        <Router location={location} navigator={reactNavigator}>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path='*' element={<Navigate to='/'/>}/>
          </Routes>
        </Router>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export default App;
