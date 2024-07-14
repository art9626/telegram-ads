import React from "react";
import { useMiniApp, useViewport } from "@tma.js/sdk-react";

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const app = useMiniApp();
  const viewPort = useViewport();

  React.useEffect(() => {
    viewPort?.expand();
    app.setBgColor("#31204e");
    app.setHeaderColor("#31204e");
    app.ready();
  }, [viewPort, app]);

  return <>{children}</>;
}
