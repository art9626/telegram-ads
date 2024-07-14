import { useInitData } from "@tma.js/sdk-react";
import React, { useState } from "react";
import { useServices } from "./ServicesProvider.tsx";
import Loader from "../components/Loader/Loader.tsx";
import { useQuery } from "@tanstack/react-query";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initData = useInitData();
  const { authUser } = useServices();
  const [token] = useState(() => localStorage.getItem("token"));
  const { isError, isLoading, error } = useQuery({
    queryKey: ["token"],
    queryFn: () => {
      if (token) return token;
      return authUser(initData);
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>{error.message}</div>;
  return <>{children}</>;
}
