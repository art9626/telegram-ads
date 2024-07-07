/* eslint-disable react-refresh/only-export-components */
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React from "react";
import { GameUser } from "../api/Services";
import { useServices } from "./ServicesProvider";
import { FadeLoader } from "react-spinners";

// @ts-expect-error fix
const UserContext = React.createContext<UseQueryResult<GameUser, Error>>();

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = useServices();
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (userQuery.isLoading) return <FadeLoader color="#fff" />;

  return (
    <UserContext.Provider value={userQuery}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return React.useContext(UserContext);
}
