import { useInitData } from "@tma.js/sdk-react";
import React from "react";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import { useServices } from "../providers/ServicesProvider";
import { WebsocketMessage } from "../api/Services.ts";
import { SOCKET_URL } from "../api";

export default function Auth({ children }: { children: React.ReactNode }) {
  const { authUser } = useServices();
  const initData = useInitData();
  const [loading, setLoading] = React.useState(() => {
    const token = localStorage.getItem("token");
    return !token;
  });

  const [wsMessage, setWsMessage] = React.useState<WebsocketMessage | null>(
    null
  );

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = new WebSocket(`${SOCKET_URL}/events/${token}`);

    socket.onmessage = (message) => {
      const data: WebsocketMessage = JSON.parse(message.data);
      setWsMessage(data);
    };

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

    // return () => socket.close();
  }, [initData, authUser]);

  if (loading) return <Spinner size="3" />;

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
