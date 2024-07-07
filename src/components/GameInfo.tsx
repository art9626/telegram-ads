import { useQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServicesProvider.tsx";

export default function GameInfo() {
  const { getGameInfo } = useServices();
  const { data: gameInfo } = useQuery({
    queryKey: ["gameInfo"],
    queryFn: getGameInfo,
  });

  return (
    <div>
      <p>Total coins: {(gameInfo?.total_balance || 0) / 10e9}</p>
      <p>Total users: {gameInfo?.users_count}</p>
      <p>Total views: {gameInfo?.total_watched}</p>
    </div>
  );
}
