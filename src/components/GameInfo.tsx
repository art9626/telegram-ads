import { Box, Progress, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServicesProvider.tsx";

export default function GameInfo() {
  const { getGameInfo } = useServices();
  const { data: gameInfo } = useQuery({
    queryKey: ["gameInfo"],
    queryFn: getGameInfo,
  });

  const progress = gameInfo
    ? (gameInfo.total_watched / gameInfo.to_next_round) * 100
    : 0;

  return (
    <>
      <div>Total coins: {(gameInfo?.total_balance || 0) / 10e9}</div>
      <div>Total users: {gameInfo?.users_count}</div>
      <div>Total views: {gameInfo?.total_watched}</div>
      <div>Total spent: {gameInfo?.total_spent}</div>
      <Text as="div" align="center">
        Progress to listing
      </Text>
      <Box width="100%">
        <Progress value={progress} size="3" duration={"60ms"} />
      </Box>
    </>
  );
}
