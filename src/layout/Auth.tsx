import {useInitData, useMiniApp, useViewport} from "@tma.js/sdk-react";
import React from "react";
import {authUser, WebsocketMessage} from "../api/fetch";
import { Spinner } from "@radix-ui/themes";
import {SOCKET_URL} from "../api";

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
    const socket = new WebSocket(`${SOCKET_URL}/events/${token}`);
    socket.onmessage = (message) => {
      const data: WebsocketMessage = JSON.parse(message.data);

      if (data) {
        const field = document.getElementById("ai_field")
        if (field === null) return

        field.innerHTML = data.event.message.toString();
      }
    }

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

    return () => socket.close()
  }, [initData]);

  if (loading) return <Spinner size="3" />;

  return <>{children}</>;
}
