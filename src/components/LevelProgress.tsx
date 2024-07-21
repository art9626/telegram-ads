import { useUser } from "../providers/UserProvider";
import Progress from "./ui/Progress/Progress";

export default function LevelProgress() {
  const { data: user } = useUser();

  if (!user) return null;

  const {
    game_data: { xp, xp_to_next_level },
  } = user;

  return (
    <div>
      <Progress max={xp_to_next_level} value={xp} size={"sm"}/>
    </div>
  );
}
