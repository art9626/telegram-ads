import {useInitData, useMiniApp, useViewport} from "@tma.js/sdk-react";
import React from "react";
import { authUser } from "../api/fetch";
import { Spinner } from "@radix-ui/themes";

export default function Auth({ children }: { children: React.ReactNode }) {
  const initData = useInitData();
  const [loading, setLoading] = React.useState(() => {
    const token = localStorage.getItem("token");
    return !token;
  });

  const app = useMiniApp()
  const viewPort = useViewport();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (initData) {
        authUser(initData).then(() => {
          setLoading(false);
        });
      } else {
        console.error("Init data is empty");
      }
    } else {
      setLoading(false);
    }
    app.ready()
    viewPort?.expand()
  }, [initData]);

  if (loading) return <Spinner size="3" />;

  return <>{children}</>;
}
