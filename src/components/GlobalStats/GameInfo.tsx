import { useQuery } from "@tanstack/react-query";
import { useServices } from "../../providers/ServicesProvider.tsx";
import Progress from "../ui/Progress/Progress.tsx";
import StatsList from "../ui/StatsList/StatsList.tsx";
import s from "./globalStats.module.css";

export default function GlobalStats() {
  const { getGameStats } = useServices();
  const {
    data: gameStats,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gameStats"],
    queryFn: getGameStats,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  const stats = [
    {
      title: "Total coins:",
      value: gameStats?.total_balance ?? 0,
    },
    {
      title: "Total users:",
      value: gameStats?.users_count,
    },
    {
      title: "Total views:",
      value: gameStats?.total_watched,
    },
  ];

  return (
    <div className={s.container}>
      <h1>Global stats</h1>
      <h2>Listing progress</h2>
      <Progress
        max={gameStats?.to_next_round}
        value={gameStats?.total_watched}
        label={`${gameStats?.total_watched}/${gameStats?.to_next_round}`}
        style={{ maxWidth: "80vw" }}
      />
      <br />
      <StatsList stats={stats} />
    </div>
  );
}
