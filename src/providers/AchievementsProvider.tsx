/* eslint-disable react-refresh/only-export-components */
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React from "react";
import { IAchievements } from "../api/Services";
import { useServices } from "./ServicesProvider";

const AchievementsContext =
  // @ts-expect-error fix
  React.createContext<UseQueryResult<IAchievements, Error>>();

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
  return React.useContext(AchievementsContext);
}
