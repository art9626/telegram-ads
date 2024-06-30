import React from "react";
import { useIntegration } from "@tma.js/react-router-integration";
import { initNavigator } from "@tma.js/sdk-react";

export default function useNavigator() {
  const navigator = React.useMemo(
    () => initNavigator("app-navigation-state"),
    []
  );
  const integration = useIntegration(navigator);

  React.useEffect(() => {
    navigator.attach().then(() => {});

    return () => navigator.detach();
  }, [navigator]);

  return integration;
}
