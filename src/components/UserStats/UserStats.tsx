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
      title: "Gold Nuggets Collected:",
      value: userStats?.total_watched,
    },
    {
      title: "Mining Speed (per hour):",
      value: Math.round(((userStats?.mining_speed ?? 0) * 3600) * 100) / 100,
    },
    {
      title: "Mining Speed (per second):",
      value: Math.round(((userStats?.mining_speed ?? 0)) * 100) / 100,
    },
    {
      title: "Gold bonus:",
      value: Math.round((userStats?.gold_bonus ?? 0) * 100) / 100,
    },
    {
      title: "Ref bonus:",
      value: `${userStats?.ref_bonus ?? 0}%`,
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
      value: `${userStats?.double_gold_chance}%`,
    },
  ];

  return (
    <div className={s.container}>
      <h1>Your stats</h1>
      <StatsList stats={stats} />
    </div>
  );
}
