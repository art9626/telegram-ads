import { InitData } from "@tma.js/sdk-react";
import { apiClient } from ".";
import { Endpoints } from "./Endpoints";

export interface GameData {
  balance: number;
  current_exp: number;
  level: number;
  next_exp: number;
  mining_speed: number;
  production: number;
  skill_points: number;
}

export interface GameUser {
  id: bigint;
  username: string;
  full_name: string;
  premium: boolean;
  ref_link: string;
  wallet_id: string;
  data: GameData;
}

export interface IGameUserStats {
  gold_bonus: number;
  ref_bonus: number;
  mining_speed: number;
  total_balance: number;
  total_spent: number;
  total_watched: number;
  total_friends: number;
  total_achievements: number;
  double_gold_chance: number;
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

export enum PerkTypes {
  COIN_PERK,
  REF_PERK,
  EXP_PERK,
  ROBOT_PERK,
  FRIENDS_PERK,
  DOUBLE_CHANCE_PERK,
}

export interface ISkill {
  id: number;
  name: string;
  description: string;
  level: number;
}

export interface ITool {
  id: number
  name: string;
  desc: string;
  level: number;
  base_cost: number;
  upgrade_rate: number;
  base_production: number;
  produced: number;
  description: string;
  unlocked: boolean;
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

  watched = async (clicked: boolean) => {
    return apiClient.post<{ data: GameData }>(Endpoints.WATCHED, {
      clicked: clicked,
    });
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

  getSkills = async () => {
    return apiClient
      .get<{ data: { skills: ISkill[] } }>(Endpoints.SKILLS)
      .then((res) => res.data.data.skills);
  };

  upgradeSkill = async (id: number) => {
    return apiClient
      .post<{ data: { skills: ISkill[] } }>(`${Endpoints.SKILLS}/${id}`)
      .then((res) => res.data.data.skills)
  }

  getTools = async () => {
    return apiClient
      .get<{ data: { tools: ITool[] } }>(Endpoints.TOOLS)
      .then((res) => res.data.data.tools);
  };

  upgradeTool = async (id: number) => {
    return apiClient
      .post<{ data: { tools: ITool[] } }>(`${Endpoints.TOOLS}/${id}`)
      .then((res) => res.data.data.tools)
  }

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
