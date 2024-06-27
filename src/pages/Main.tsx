import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/fetch.ts";
import ShowAdButton from "../components/ShowAdButton.tsx";

export default function Main() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <>
      <h3>Name: {user?.full_name}</h3>
      <h3>Balance: {(user?.game_data.balance || 0) / 10e9}</h3>
      <h3>Views: {user?.game_data.watched}</h3>
      <ShowAdButton />
    </>
  );
}
