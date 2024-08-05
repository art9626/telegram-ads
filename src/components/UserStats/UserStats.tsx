import { useQuery } from "@tanstack/react-query";
import { useServices } from "../../providers/ServicesProvider.tsx";
import s from "./userStats.module.css";
import StatsList from "../ui/StatsList/StatsList.tsx";

export default function UserStats() {
  const { getUserStats } = useServices();
  const {
    data: userStats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userStats"],
    queryFn: getUserStats,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  const stats = [
    {
      title: "Total Spent:",
      value: userStats?.total_spent,
    },
    {
      title: "Total Earned:",
      value: userStats?.total_balance,
    },
    {
      title: "Total Watched:",
      value: userStats?.total_watched,
    },
    {
      title: "Mining Speed (per hour):",
      value: userStats?.auto_mining_speed,
    },
    {
      title: "Mining Speed (per second):",
      value:
        Math.round(((userStats?.auto_mining_speed ?? 0) / 3600) * 100) / 100,
    },
    {
      title: "Coins per watch (x2 when you click ad):",
      value: userStats?.coins_per_watch,
    },
    {
      title: "Coins multiplier:",
      value: Math.round((userStats?.coins_multiplier ?? 0) * 100),
    },
    {
      title: "Coins per ref:",
      value: userStats?.coins_per_ref,
    },
    {
      title: "Ref multiplier:",
      value: `${Math.round((userStats?.ref_multiplier ?? 0) * 100) / 100}%`,
    },
    {
      title: "XP per watch:",
      value: userStats?.xp_per_watch,
    },
    {
      title: "Total friends:",
      value: userStats?.total_friends,
    },
    {
      title: "Total achievements:",
      value: userStats?.total_achievements,
    },
    {
      title: "Double coins chance:",
      value: `${userStats?.double_coins_chance}%`,
    },
  ];

  return (
    <div className={s.container}>
      <h1>Your stats</h1>
      <StatsList stats={stats} />
    </div>
  );
}
