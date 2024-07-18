import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";
import { Endpoints } from "../api/Endpoints";
import { GameUser, IAchievement } from "../api/Services";

enum WebsocketMessageTypes {
  NEW_AD = "new_ad",
  NEW_ACHIEVEMENT = "new_achievement",
  NEW_LEVEL = "new_level",
  DIAMOND_AD = "diamond_ad",
}

interface INewAdMessage {
  event: {
    type: WebsocketMessageTypes.NEW_AD;
    message: {
      available_watch_count: number;
    };
  };
}

interface INewAchievementMessage {
  event: {
    type: WebsocketMessageTypes.NEW_ACHIEVEMENT;
    message: IAchievement;
  };
}

interface INewLevelMessage {
  event: {
    type: WebsocketMessageTypes.NEW_LEVEL;
    message: {
      level: number;
    };
  };
}

interface IDiamondAdMessage {
  event: {
    type: WebsocketMessageTypes.DIAMOND_AD;
    message: {
      amount: number;
    };
  };
}

type TWebsocketMessage =
  | INewAdMessage
  | INewAchievementMessage
  | INewLevelMessage
  | IDiamondAdMessage;

export default function useWS() {
  const queryClient = useQueryClient();
  const [token] = React.useState(() => localStorage.getItem("token"));

  const onMessage = React.useCallback(
    (message: WebSocketEventMap["message"]) => {
      const data: TWebsocketMessage = JSON.parse(message.data);
      const { event } = data;

      switch (event.type) {
        case WebsocketMessageTypes.NEW_AD:
          return queryClient.setQueryData<GameUser>(["user"], (oldData) => {
            if (!oldData) return;
            return {
              ...oldData,
              game_data: {
                ...oldData.game_data,
                available_watch_count: event.message.available_watch_count,
              },
            };
          });

        case WebsocketMessageTypes.NEW_ACHIEVEMENT:
          return queryClient.setQueryData<IAchievement[]>(
            ["achievements"],
            (oldData) => {
              if (!oldData) return;
              return [...oldData, event.message];
            }
          );

        case WebsocketMessageTypes.NEW_LEVEL:
          return queryClient.setQueryData<GameUser>(["user"], (oldData) => {
            if (!oldData) return;
            return {
              ...oldData,
              game_data: {
                ...oldData.game_data,
                level: event.message.level,
              },
            };
          });

        case WebsocketMessageTypes.DIAMOND_AD:
          console.log("You got doubled reward!", event.message.amount);
          return;

        default:
          ((v: never) => v)(event);
          return;
      }
    },
    [queryClient]
  );

  const ws = useWebSocket(`${Endpoints.SOCKET_URL}/events/${token}`, {
    onMessage,
  });

  return ws;
}
