import React from "react";
import { useMiniApp, useViewport } from "@tma.js/sdk-react";

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const app = useMiniApp();
  const viewPort = useViewport();

  React.useLayoutEffect(() => {
    viewPort?.expand();
    app.setBgColor("#0b0f27");
    app.setHeaderColor("#0b0f27");
    app.ready();
  }, [viewPort, app]);

  return <>{children}</>;
}
