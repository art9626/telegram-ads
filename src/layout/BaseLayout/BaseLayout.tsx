import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Endpoints } from "../../api/Endpoints";
import s from "./base-layout.module.css";
import { GameUser } from "../../api/Services";

export default function BaseLayout() {
  const queryClient = useQueryClient();
  const [token] = React.useState(() => localStorage.getItem("token"));
  const socket = React.useRef(
    new WebSocket(`${Endpoints.SOCKET_URL}/events/${token}`)
  );

  React.useEffect(() => {
    const ws = socket.current;

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.event.type === "new_ad") {
        queryClient.setQueryData<GameUser>(["user"], (oldData) => {
          if (!oldData) return;
          return {
            ...oldData,
            game_data: {
              ...oldData.game_data,
              available_watch_count: data.event.message.available_count,
            },
          };
        });
      }
    };

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
