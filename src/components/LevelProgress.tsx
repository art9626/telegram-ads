import { useUser } from "../providers/UserProvider";
import Progress from "./ui/Progress/Progress";

export default function LevelProgress() {
  const { data: user } = useUser();

  if (!user) return null;

  const {
    data: { current_exp, next_exp },
  } = user;

  const label = `${current_exp} / ${next_exp}`
  return (
    <Progress max={next_exp}
      value={current_exp} size={"sm"}
      indProps={{ style: { backgroundColor: "gray" } }}
      label={label}
      style={{ maxWidth: "50vw", border: "1px solid gray" }}
    />
  );
}
