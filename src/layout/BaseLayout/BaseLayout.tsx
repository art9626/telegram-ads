import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Endpoints } from "../../api/Endpoints";
import s from "./base-layout.module.css";
import {handleWebsocketMessage} from "../../api/Websocket.ts";

export default function BaseLayout() {
  const queryClient = useQueryClient();
  const [token] = React.useState(() => localStorage.getItem("token"));
  const socket = React.useRef(
    new WebSocket(`${Endpoints.SOCKET_URL}/events/${token}`)
  );

  React.useEffect(() => {
    const ws = socket.current;
    ws.onmessage = (message) => handleWebsocketMessage(message, queryClient)
    return () => ws.close();
  }, [queryClient]);

  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}
