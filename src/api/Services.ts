import { InitData } from "@tma.js/sdk-react";
import { apiClient } from ".";
import { Endpoints } from "./Endpoints";

export interface GameData {
  balance: number;
  xp: number;
  level: number;
  xp_to_next_level: number;
  available_watch_count: number;
  max_watch_count: number;
  last_watched_at: string;
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

export interface IGameUserStats {
  coins_per_watch: number;
  coins_multiplier: number;
  xp_per_watch: number;
  coins_per_ref: number;
  ref_multiplier: number;
  auto_mining_speed: number;
  ads_available: number;
  total_balance: number;
  total_spent: number;
  total_watched: number;
  total_friends: number;
  total_achievements: number;
  double_coins_chance: number;
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
  friends_count: number;
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
  category: TAchievementCategory;
}

export type TAchievementCategory =
  | "balance"
  | "spending"
  | "friends"
  | "level"
  | "perks"
  | "referral_earnings"
  | "achievements"
  | "ads"
  | "unknown";

export interface IAchievements {
  achievements: IAchievement[];
  total_count: number;
  claimed_count: number;
}

export interface IDailyRewards {
  current_streak: number;
  last_claim_date: number;
  can_claim: boolean;
  rewards: IDailyReward[];
}

export interface IDailyReward {
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

  getUserStats = async () => {
    return apiClient
      .get<{ data: IGameUserStats }>(Endpoints.USER_STATS)
      .then((res) => res.data.data);
  };

  getGameStats = async () => {
    return apiClient
      .get<{ data: GameGlobalInfo }>(Endpoints.GLOBAL_GAME_STATS)
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
      .get<{ data: UserFriends }>(Endpoints.USER_FRIENDS)
      .then((res) => res.data.data);
  };

  getAchievements = async () => {
    return apiClient
      .get<{ data: IAchievements }>(Endpoints.ACHIEVEMENTS)
      .then((res) => res.data.data);
  };

  claimAchievement = async (id: number) => {
    return apiClient
      .post<{ data: IAchievements }>(`${Endpoints.ACHIEVEMENTS}/${id}`)
      .then((res) => res.data.data);
  };

  getDailyRewards = async () => {
    return apiClient
      .get<{ data: IDailyRewards }>(Endpoints.DAILY)
      .then((res) => res.data.data);
  };

  claimDailyReward = async () => {
    return apiClient
      .post<{ data: IDailyRewards }>(Endpoints.DAILY)
      .then((res) => res.data.data);
  };
}
