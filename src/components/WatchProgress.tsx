import { useUser } from "../providers/UserProvider";
import Progress from "./ui/Progress/Progress";

export default function WatchProgress() {
  const { data: user } = useUser();

  if (!user) return null;

  const {
    game_data: { max_watch_count, available_watch_count },
  } = user;

  return (
    <Progress
      max={max_watch_count}
      value={available_watch_count}
      label={`${available_watch_count}/${max_watch_count}`}
      style={{ maxWidth: "80vw" }}
    />
  );
}
