import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";
import { Endpoints } from "../api/Endpoints";
import { GameUser, IAchievement, IAchievements } from "../api/Services";

enum WebsocketMessageTypes {
  NEW_AD = "new_ad",
  NEW_ACHIEVEMENTS = "new_achievements",
  NEW_LEVEL = "new_level",
  DOUBLE_COINS = "double_coins",
  UPDATE = "update"
}

interface INewAdMessage {
  event: {
    type: WebsocketMessageTypes.NEW_AD;
    message: {
      available_watch_count: number;
    };
  };
}

interface INewAchievementsMessage {
  event: {
    type: WebsocketMessageTypes.NEW_ACHIEVEMENTS;
    message: {
      achievements: IAchievement[];
    };
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

interface IDoubleCoinsMessage {
  event: {
    type: WebsocketMessageTypes.DOUBLE_COINS;
    message: {
      double_coins: boolean;
    };
  };
}

interface IUpdate {
  event: {
    type: WebsocketMessageTypes.UPDATE,
    message: {
      balance: number,
      current_exp: number,
      next_exp: number,
      level: number,
      production: number
    }
  }
}

type TWebsocketMessage =
  | INewAdMessage
  | INewAchievementsMessage
  | INewLevelMessage
  | IDoubleCoinsMessage
  | IUpdate;

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
                ...oldData.data,
                available_watch_count: event.message.available_watch_count,
              },
            };
          });

        case WebsocketMessageTypes.NEW_ACHIEVEMENTS:
          return queryClient.setQueryData<IAchievements>(
            ["achievements"],
            (oldData) => {
              if (!oldData) return;
              return {
                ...oldData,
                achievements: [
                  ...oldData.achievements,
                  ...event.message.achievements,
                ],
              };
            }
          );

        case WebsocketMessageTypes.NEW_LEVEL:
          return queryClient.setQueryData<GameUser>(["user"], (oldData) => {
            if (!oldData) return;
            return {
              ...oldData,
              game_data: {
                ...oldData.data,
                level: event.message.level,
              },
            };
          });

        case WebsocketMessageTypes.UPDATE:
          return queryClient.setQueryData<GameUser>(["user"], (oldData) => {
            if (!oldData) return;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                level: event.message.level,
                balance: event.message.balance,
                current_exp: event.message.current_exp,
                next_exp: event.message.next_exp,
                production: event.message.production
              },
            };
          });
        case WebsocketMessageTypes.DOUBLE_COINS:
          console.log("You got doubled reward!");
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
