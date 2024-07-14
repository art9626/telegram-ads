import { useInitData } from "@tma.js/sdk-react";
import React, { useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useServices } from "./ServicesProvider.tsx";
import { WebsocketMessage } from "../api/Services.ts";
import Loader from "../components/Loader/Loader.tsx";
import { useQuery } from "@tanstack/react-query";
import { Endpoints } from "../api/Endpoints.ts";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initData = useInitData();
  const { authUser } = useServices();
  const [token] = useState(() => localStorage.getItem("token"));
  const { isError, isLoading, error } = useQuery({
    queryKey: ["token"],
    queryFn: () => {
      if (token) return token;
      return authUser(initData);
    },
  });

  const [wsMessage, setWsMessage] = React.useState<WebsocketMessage | null>(
    null
  );

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = new WebSocket(`${Endpoints.SOCKET_URL}/events/${token}`);

    socket.onmessage = (message) => {
      const data: WebsocketMessage = JSON.parse(message.data);
      setWsMessage(data);
    };

    return () => socket.close();
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <div>{error.message}</div>;
  return (
    <>
      <Flex>
        <Text as={"div"} id={"ai_field"}>
          {wsMessage?.event.message.toString()}
        </Text>
      </Flex>
      {children}
    </>
  );
}
