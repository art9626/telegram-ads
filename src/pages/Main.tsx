import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/fetch.ts";
import BaseLayout from "../layout/BaseLayout.tsx";

export default function Main() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <BaseLayout>
      <h3>Name: {user?.full_name}</h3>
      <h3>Balance: {(user?.game_data.balance || 0) / 10e9}</h3>
      <h3>Views: {user?.game_data.watched}</h3>
      <h1>
        <Link to="/ads">Watch ad</Link>
      </h1>
    </BaseLayout>
  );
}
