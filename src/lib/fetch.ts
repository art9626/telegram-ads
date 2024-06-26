import {InitData} from "@tma.js/sdk-react";

// const localUrl = "http://127.0.0.1:8000"
const prodUrl = "https://game.botsquad.win"
const baseUrl = `${prodUrl}/api/v1`
const authUrl = `${baseUrl}/auth`
const userUrl = `${baseUrl}/game/user`
const gameUrl = `${baseUrl}/game/info`
const friendsUrl = `${baseUrl}/game/user/friends`
const upgradesUrl = `${baseUrl}/game/upgrades`
const watchedUrl = `${baseUrl}/game/watched`

export interface GameData {
  balance: number,
  total: number,
  spent: number,
  watched: number,
}

export interface GameUser {
  id: bigint,
  username: string,
  full_name: string,
  premium: boolean,
  ref_link: string,
  game_data: GameData
}

export interface Friend {
  id: bigint,
  username: string,
  first_name: string,
  last_name: string,
  earned: number
}

export interface UserFriends {
  friends: Friend[],
  ref_link: string,
}

export interface GameGlobalInfo {
  users_count: number,
  total_balance: number,
  total_spent: number,
  total_watched: number
}

export interface UpgradeList {
  upgrades: Upgrade[]
}

export interface Upgrade {
  id: number,
  name: string,
  description: string,
  token_price: number,
  ton_price: string
}

function headers(token: string|null) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }
}


export function authUser(initData: InitData | undefined) {
  if (!initData) return

  const body = {
    ...initData["initData"],
    authDate: new Date(initData.authDate).getTime(),
  }

  if (initData["chatInstance"]) {
    body.chatInstance = parseInt(initData["chatInstance"])
  }

  fetch(authUrl, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const token = (await res.json()).data.token
    localStorage.setItem("token", token)
  });
}

export async function watched(token: string | null, initData: InitData | undefined) {
  const res = await fetch(watchedUrl, {
    method: "POST",
    headers: headers(token),
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
  }
}

export async function getUser(token: string | null, initData: InitData | undefined): Promise<GameUser> {
  const res = await fetch(userUrl, {
    method: "GET",
    headers: headers(token),
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
  }

  return (await res.json()).data
}

export async function getGameInfo(token: string | null, initData: InitData | undefined): Promise<GameGlobalInfo> {
  const res = await fetch(gameUrl, {
    method: "GET",
    headers: headers(token),
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
  }

  return (await res.json()).data
}

export async function getUpgrades(token: string | null, initData: InitData | undefined): Promise<UpgradeList> {
  const res = await fetch(upgradesUrl, {
    method: "GET",
    headers: headers(token),
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
  }

  return (await res.json()).data
}


export async function getUserFriends(token: string | null, initData: InitData | undefined): Promise<UserFriends> {
  const res = await fetch(friendsUrl, {
    method: "GET",
    headers: headers(token),
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
  }

  return (await res.json()).data
}
