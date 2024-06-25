import {InitData} from "@tma.js/sdk-react";

const baseUrl = "https://game.botsquad.win/api/v1"
const authUrl = `${baseUrl}/auth`
const userUrl = `${baseUrl}/game/user`
const gameUrl = `${baseUrl}/game/info`
const friendsUrl = `${baseUrl}/game/user/friends`

export interface GameData {
  balance: number,
  total: number,
  spent: number
}

export interface GameUser {
  id: bigint,
  username: string,
  full_name: string,
  premium: boolean,
  ref_link: string,
  game_data: GameData
}

export interface UserFriends {
  friends: GameUser[],
  ref_link: string,
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

export async function getGameInfo(token: string | null, initData: InitData | undefined): Promise<GameData> {
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
