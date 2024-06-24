import {InitData, SDKProvider, useInitData} from "@tma.js/sdk-react";
import {useEffect, useState} from "react";

const baseUrl = "http://127.0.0.1:8000/app/api/v1"
const authUrl = `${baseUrl}/auth`
const userUrl = `${baseUrl}/game/user`
const gameUrl = `${baseUrl}/game/info`
const friendsUrl = `${baseUrl}/game/user/friends`

function App() {
  return (
    <SDKProvider acceptCustomStyles debug>
      <MainPage />
    </SDKProvider>
  );
}

function authUser(initData: InitData) {
  let body = {
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
    let token = (await res.json()).data.token
    localStorage.setItem("token", token)
  });
}

interface GameData {
  balance: number,
  total: number,
  spent: number
}

interface GameUser {
  id: bigint,
  username: string,
  full_name: string,
  premium: boolean,
  ref_link: string,
  game_data: GameData
}

interface userFriends {
  friends: GameUser[],
  ref_link: string,
}

async function getUser(token: string, initData: InitData): Promise<GameUser> {
  const res = await fetch(userUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
    window.location.reload();
  }

  return (await res.json()).data
}

async function getGameInfo(token: string, initData: InitData): Promise<GameData> {
  let res = await fetch(gameUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
    window.location.reload();
  }

  return (await res.json()).data

}

async function getUserFriends(token: string, initData: InitData): Promise<userFriends> {
  let res = await fetch(friendsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    console.log("Unauthorized");
    authUser(initData)
    window.location.reload();
  }

  return (await res.json()).data
}

function MainPage() {
  const initData = useInitData();
  const [user, setUser] = useState<GameUser>();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (initData) authUser(initData)
    if (token && initData) {
      getUser(token, initData).then(res => setUser(res))
    }
  }, []);

  return (
    <div><span>{user?.game_data.balance}</span></div>
  );
}

export default App;
