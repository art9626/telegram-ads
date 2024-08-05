import { useUser } from "../providers/UserProvider";
import Progress from "./ui/Progress/Progress";

export default function LevelProgress() {
  const { data: user } = useUser();

  if (!user) return null;

  const {
    game_data: { xp, xp_to_next_level },
  } = user;

  const label = `${user.game_data.xp} / ${user.game_data.xp_to_next_level}`
  return (
    <Progress max={xp_to_next_level}
              value={xp} size={"sm"}
              indProps={{style: {backgroundColor: "gray"}}}
              label={label}
              style={{ maxWidth: "50vw", border: "1px solid gray" }}
    />
  );
}
