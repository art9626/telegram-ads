import { useQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServicesProvider.tsx";
import Progress from "./ui/Progress/Progress.tsx";

export default function GameInfo() {
  const { getGameStats, getUserStats } = useServices();
  const {
    data: gameStats,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gameStats"],
    queryFn: getGameStats,
  });

  const {
    data: userStats
  } = useQuery({
    queryKey: ["userStats"],
    queryFn: getUserStats,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <>

      <h1>Your stats</h1>
      <ul>
        <li>Total Spent: {userStats?.total_spent}</li>
        <li>Total Earned: {userStats?.total_balance}</li>
        <li>Total Watched: {userStats?.total_watched}</li>
        <li>Mining Speed (per hour): {userStats?.auto_mining_speed}</li>
        <li>Mining Speed (per second): {Math.round((userStats?.auto_mining_speed || 0) / 3600 * 100) / 100}</li>
        <li>Coins per watch: {userStats?.coins_per_watch}</li>
        <li>Coins multiplier: {Math.round((userStats?.coins_multiplier || 0) * 100)}%</li>
        <li>Coins per ref: {userStats?.coins_per_ref}</li>
        <li>Ref multiplier: {Math.round((userStats?.ref_multiplier || 0) * 100) / 100}%</li>
        <li>XP per watch: {userStats?.xp_per_watch}</li>
        <li>Total friends: {userStats?.total_friends}</li>
        <li>Total achievements: {userStats?.total_achievements}</li>
        <li>Double coins chance: {userStats?.double_coins_chance}%</li>
      </ul>

      <h1>Global stats</h1>
      <div>Listing progress</div>
      <Progress
        max={gameStats?.to_next_round}
        value={gameStats?.total_watched}
        label={`${gameStats?.total_watched}/${gameStats?.to_next_round}`}
        style={{ maxWidth: "80vw" }}
      />
      <br/>
      <ul>
        <li>Total coins: {(gameStats?.total_balance || 0)}</li>
        <li>Total users: {gameStats?.users_count}</li>
        <li>Total views: {gameStats?.total_watched}</li>
      </ul>
    </>
  );
}
