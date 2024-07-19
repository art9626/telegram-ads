import { useUser } from "../providers/UserProvider";
import Progress from "./ui/Progress/Progress";

export default function WatchProgress() {
  const { data: user } = useUser();

  if (!user) return null;

  const {
    game_data: { max_watch_count, available_watch_count },
  } = user;

  return (
    <div>
      <Progress max={max_watch_count} value={available_watch_count} showLabel={true}/>
    </div>
  );
}
