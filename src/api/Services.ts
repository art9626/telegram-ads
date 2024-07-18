import { InitData } from "@tma.js/sdk-react";
import { apiClient } from ".";
import { Endpoints } from "./Endpoints";

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
  earned_by_refs: number;
}

export interface GameGlobalInfo {
  users_count: number;
  total_balance: number;
  total_spent: number;
  total_watched: number;
  to_next_round: number;
}

export interface IPerk {
  id: number;
  name: string;
  description: string;
  effect: string;
  synergy: string;
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

export interface IAchievement {
  id: number;
  description: string;
  name: string;
  reward: number;
  claimed: boolean;
}

export interface DailyRewards {
  current_streak: number;
  last_claim_date: number;
  can_claim: boolean;
  rewards: DailyReward[];
}

export interface DailyReward {
  day: number;
  coins: number;
  xp: number;
}

export class Services {
  authUser = async (initData?: InitData) => {
    if (!initData) throw new Error("Init data is empty");

    const payload = {
      ...initData["initData"],
      authDate: initData.authDate.getTime(),
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
      .get<{ data: { perks: IPerk[] } }>(Endpoints.PERKS)
      .then((res) => res.data.data.perks);
  };

  applyPerk = async (id: number) => {
    return apiClient
      .post<{ data: { perks: IPerk[] } }>(`${Endpoints.PERKS}/${id}`)
      .then((res) => res.data.data.perks);
  };

  getUserFriends = async () => {
    return apiClient
      .get<{ data: UserFriends }>(Endpoints.FRIENDS)
      .then((res) => res.data.data);
  };

  getAchievements = async () => {
    return apiClient
      .get<{ data: { achievements: IAchievement[] } }>(Endpoints.ACHIEVEMENTS)
      .then((res) => res.data.data.achievements);
  };

  claimAchievement = async (id: number) => {
    return apiClient
      .post<{ data: { achievements: IAchievement[] } }>(
        `${Endpoints.ACHIEVEMENTS}/${id}`
      )
      .then((res) => res.data.data.achievements);
  };

  getDailyRewards = async () => {
    return apiClient
      .get<{ data: DailyRewards }>(Endpoints.DAILY)
      .then((res) => res.data.data);
  };

  claimDailyReward = async () => {
    return apiClient
      .post<{ data: DailyRewards }>(Endpoints.DAILY)
      .then((res) => res.data.data);
  };
}
