/* eslint-disable react-refresh/only-export-components */
import { QueryStatus, useQuery } from "@tanstack/react-query";
import React from "react";
import { GameUser, getUser } from "../api/fetch";

const UserContext = React.createContext<{
  user: GameUser | undefined;
  status: QueryStatus | undefined;
}>({ user: undefined, status: undefined });

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, status } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const providerValue = { user: data, status };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return React.useContext(UserContext);
}
