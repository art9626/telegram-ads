import { useUser } from "../../providers/UserProvider";
import coin from "../../assets/coin.png";
import s from "./userInfo.module.css";
import { numberSeparatedBySpaces } from "../../utils/convert";

export default function UserInfo() {
  const { data: user } = useUser();

  // const progress =
  //   ((user?.game_data.xp || 0) * 100) / (user?.game_data.xp_to_next_level || 1);

  const balance = numberSeparatedBySpaces(
    (user?.game_data.balance ?? 0) / 10e9
  );

  return (
    <div className={s.info}>
      <div className={s.balance}>
        <img src={coin} />
        <span>{balance}</span>
      </div>
      <span className={s.level}>Level {user?.game_data.level}</span>
    </div>
  );
}
