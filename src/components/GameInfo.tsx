import { useQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServicesProvider.tsx";

export default function GameInfo() {
  const { getGameInfo } = useServices();
  const {
    data: gameInfo,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gameInfo"],
    queryFn: getGameInfo,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <ul>
      <li>Total coins: {(gameInfo?.total_balance || 0) / 10e9}</li>
      <li>Total users: {gameInfo?.users_count}</li>
      <li>Total views: {gameInfo?.total_watched}</li>
    </ul>
  );
}
