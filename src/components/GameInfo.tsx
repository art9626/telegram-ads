import { useEffect, useState } from "react";
import { GameGlobalInfo, getGameInfo } from "../api/fetch.ts";
import { useInitData } from "@tma.js/sdk-react";
import {Box, Progress, Text} from "@radix-ui/themes";

export default function GameInfo() {
  const initData = useInitData();
  const token = localStorage.getItem("token");
  const [gameInfo, setGameInfo] = useState<GameGlobalInfo | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    getGameInfo(token, initData).then((res) => {
      setGameInfo(res)
      if (res) {
        setProgress((res.total_watched) / (res.to_next_round) * 100);
      }
    });
  }, []);

  return (
    <>
      <div>Total coins: {(gameInfo?.total_balance || 0) / 10e9}</div>
      <div>Total users: {gameInfo?.users_count}</div>
      <div>Total views: {gameInfo?.total_watched}</div>
      <div>Total spent: {gameInfo?.total_spent}</div>
      <Text as="div" align="center">Progress to listing</Text>
      <Box width="100%">
        <Progress value={progress} size="3" duration={"60ms"} />
      </Box>
    </>
  );
}
