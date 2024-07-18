import {GameUser, IAchievements} from "./Services.ts";
import {QueryClient} from "@tanstack/react-query";

export type WebsocketMessage = NewAdMessage | NewLevelMessage | NewAchievementMessage | DiamondAdMessage;

export interface NewAdMessage {
  event: {
    type: "new_ad",
    message: {
      available_watch_count: number
    }
  }
}

export interface NewLevelMessage {
  event: {
    type: "new_level",
    message: {
      level: number;
    }
  }
}

export interface NewAchievementMessage {
  event: {
    type: "new_achievement",
    message: {
      id: number;
      name: string;
      description: string;
      reward: number;
      claimed: boolean;
    }
  }
}

export interface DiamondAdMessage {
  event: {
    type: "diamond_ad",
    message: {
      amount: number;
    }
  }
}

export function isNewAdMessage(newMessage: WebsocketMessage): newMessage is NewAdMessage {
  return newMessage.event.type === "new_ad" && newMessage.event.message.available_watch_count !== undefined
}

export function isNewLevelMessage(newMessage: WebsocketMessage): newMessage is NewLevelMessage {
  return newMessage.event.type === "new_level" && newMessage.event.message.level !== undefined
}

export function isNewAchievementMessage(newMessage: WebsocketMessage): newMessage is NewAchievementMessage {
  return newMessage.event.type == "new_achievement" && newMessage.event.message.id !== undefined
}

export function isDiamondAdMessage(newMessage: WebsocketMessage): newMessage is DiamondAdMessage  {
  return newMessage.event.type === "diamond_ad" && newMessage.event.message.amount !== undefined
}

export function handleWebsocketMessage(message: MessageEvent, queryClient: QueryClient) {
  const data: WebsocketMessage = JSON.parse(message.data);

  if (isNewAdMessage(data)) {
    queryClient.setQueryData<GameUser>(["user"], (oldData) => {
      if (!oldData) return;
      return {
        ...oldData,
        game_data: {
          ...oldData.game_data,
          available_watch_count: data.event.message.available_watch_count,
        },
      };
    });
  }

  if (isNewLevelMessage(data)) {
    queryClient.setQueryData<GameUser>(["user"], (oldData) => {
      if (!oldData) return;
      return {
        ...oldData,
        game_data: {
          ...oldData.game_data,
          level: data.event.message.level,
        },
      };
    });
  }

  if (isNewAchievementMessage(data)) {
    queryClient.setQueryData<IAchievements>(["achievements"], (oldData) => {
      if (!oldData) return;

      oldData.achievements.push({
        id: data.event.message.id,
        name: data.event.message.name,
        description: data.event.message.description,
        reward: data.event.message.reward,
        claimed: data.event.message.claimed,
      })

      return oldData
    })
  }

  if (isDiamondAdMessage(data)) {
    console.log("You got doubled reward!", data.event.message.amount)
  }
}
