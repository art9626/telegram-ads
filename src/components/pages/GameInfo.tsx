import {useEffect, useState} from "react";
import {GameGlobalInfo, getGameInfo} from "../../lib/fetch.ts";
import {useInitData} from "@tma.js/sdk-react";
import Footer from "../footer/Footer.tsx";

export default function GameInfo() {
  const initData = useInitData();
  const token = localStorage.getItem("token");
  const [gameInfo, setGameInfo] = useState<GameGlobalInfo|null>(null)
  useEffect(() => {
    getGameInfo(token, initData).then(res => setGameInfo(res))
  }, []);
  return(
    <>
      <div>Total coins: {(gameInfo?.total_balance || 0) / 10e9}</div>
      <div>Total users: {gameInfo?.users_count}</div>
      <div>Total views: {gameInfo?.total_watched}</div>
      <div>Total spent: {gameInfo?.total_spent}</div>
      <Footer/>
    </>

  )
}
