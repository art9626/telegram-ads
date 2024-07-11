import { InitData } from "@tma.js/sdk-react";
import { Endpoints, apiClient } from ".";

export interface WebsocketMessage {
  event: {
    type: string;
    message: object;
  };
}

export interface GameData {
  balance: number;
  total: number;
  spent: number;
  watched: number;
  xp: number;
  level: number;
  xp_to_next_level: number;
  available_watch_count: number;
  max_watch_count: number;
  last_watched_at: string;
  friends_count: number;
  achievements_count: number;
  not_claimed_achievements_count: number;
}

export interface GameUser {
  id: bigint;
  username: string;
  full_name: string;
  premium: boolean;
  ref_link: string;
  wallet_id: string;
  game_data: GameData;
}

export interface Friend {
  id: bigint;
  username: string;
  first_name: string;
  last_name: string;
  earned: number;
}

export interface UserFriends {
  friends: Friend[];
  ref_link: string;
}

export interface GameGlobalInfo {
  users_count: number;
  total_balance: number;
  total_spent: number;
  total_watched: number;
  to_next_round: number;
}

export interface IPerksList {
  perks: IPerk[];
}

export interface IPerk {
  id: number;
  name: string;
  description: string;
  available: boolean;
  level: number;
  max_level: number;
  requirements: PerkRequirements;
}

export interface PerkRequirements {
  friends_count: number;
  game_level: number;
  cost: number;
}

export interface Achievement {
  id: number;
  description: string;
  name: string;
  reward: number;
  claimed: boolean;
}

export interface Achievements {
  achievements: Achievement[];
}

export class Services {
  authUser = async (initData: InitData) => {
    const payload = {
      ...initData["initData"],
      authDate: new Date(initData.authDate).getTime(),
    };
    if (initData["chatInstance"]) {
      payload.chatInstance = parseInt(initData["chatInstance"]);
    }
    return apiClient
      .post<{ data: { token: string } }>(Endpoints.AUTH, payload, {})
      .then((res) => {
        const token = res.data.data.token;
        if (token) localStorage.setItem("token", token);
        return token;
      });
  };

  watched = async () => {
    return apiClient.post<{ data: GameData }>(Endpoints.WATCHED);
  };

  getUser = async () => {
    return apiClient
      .get<{ data: GameUser }>(Endpoints.USER)
      .then((res) => res.data.data);
  };

  getGameInfo = async () => {
    return apiClient
      .get<{ data: GameGlobalInfo }>(Endpoints.GAME_INFO)
      .then((res) => res.data.data);
  };

  getPerks = async () => {
    return apiClient
      .get<{ data: IPerksList }>(Endpoints.PERKS)
      .then((res) => res.data.data);
  };

  applyPerk = async (id: number) => {
    return apiClient
      .post<{ data: IPerksList }>(`${Endpoints.PERKS}/${id}`)
      .then((res) => res.data.data);
  };

  getUserFriends = async () => {
    return apiClient
      .get<{ data: UserFriends }>(Endpoints.FRIENDS)
      .then((res) => res.data.data);
  };

  getAchievements = async () => {
    return apiClient
      .get<{ data: Achievements }>(Endpoints.ACHIEVEMENTS)
      .then((res) => res.data.data);
  };

  claimAchievement = async (id: number) => {
    return apiClient
      .post<{ data: GameData }>(`${Endpoints.ACHIEVEMENTS}/${id}`)
      .then((res) => res.data.data);
  };
}
