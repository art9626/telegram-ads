/* eslint-disable react-refresh/only-export-components */
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React from "react";
import { IAchievements } from "../api/Services";
import { useServices } from "./ServicesProvider";

const AchievementsContext = React.createContext<UseQueryResult<
  IAchievements,
  Error
> | null>(null);

export default function AchievementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getAchievements } = useServices();
  const achievementsQuery = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
  });

  return (
    <AchievementsContext.Provider value={achievementsQuery}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const achievements = React.useContext(AchievementsContext);
  if (!achievements) {
    throw new Error("Use achievements context within provider!");
  }
  return achievements;
}
