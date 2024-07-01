import { InitData } from "@tma.js/sdk-react";
import { Endpoints, apiClient } from ".";

export interface WebsocketMessage {
  event: {
    type: string;
    message: object
  }
}

export interface GameData {
  balance: number;
  total: number;
  spent: number;
  watched: number;
  xp: number
  level: number
  xp_to_next_level: number
  available_watch_count: number
  max_watch_count: number
  last_watched_at: string
}

export interface GameUser {
  id: bigint;
  username: string;
  full_name: string;
  premium: boolean;
  ref_link: string;
  wallet_id: string
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
  to_next_round: number
}

export interface PerksList {
  perks: Perk[];
}

export interface Perk {
  id: number;
  name: string;
  description: string;
  available: boolean;
  level: number
  max_level: number;
  requirements: PerkRequirements;
}

export interface PerkRequirements {
  friends_count: number;
  game_level: number
  cost: number
}

function headers(token: string | null) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function authUser(initData: InitData) {
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
}

export async function watched() {
  return apiClient.post<{data: GameData}>(Endpoints.WATCHED);
}

export async function getUser(): Promise<GameUser> {
  return apiClient
    .get<{ data: GameUser }>(Endpoints.USER)
    .then((res) => res.data.data);
}

export async function getGameInfo(
  token: string | null,
  initData: InitData | undefined
): Promise<GameGlobalInfo> {
  const res = await fetch(Endpoints.GAME_INFO, {
    method: "GET",
    headers: headers(token),
  });

  if (res.status === 401) {
    console.log("Unauthorized");
    if (initData) {
      authUser(initData);
    }
  }

  return (await res.json()).data;
}

export async function getPerks(
  token: string | null,
  initData: InitData | undefined
): Promise<PerksList> {
  const res = await fetch(Endpoints.PERKS, {
    method: "GET",
    headers: headers(token),
  });

  if (res.status === 401) {
    console.log("Unauthorized");
    if (initData) {
      authUser(initData);
    }
  }

  return (await res.json()).data;
}

export async function applyPerk(perkId: number, token: string | null): Promise<PerksList> {
  const res = await fetch(`${Endpoints.PERKS}/${perkId}`, {
    method: "POST",
    headers: headers(token),
  });

  return (await res.json()).data;
}

export async function getUserFriends(
  token: string | null,
  initData: InitData | undefined
): Promise<UserFriends> {
  const res = await fetch(Endpoints.FRIENDS, {
    method: "GET",
    headers: headers(token),
  });

  if (res.status === 401) {
    console.log("Unauthorized");
    if (initData) {
      authUser(initData);
    }
  }

  return (await res.json()).data;
}
