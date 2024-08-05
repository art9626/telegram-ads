import React from "react";
import { useSpringValue, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import { FaTrophy, FaChevronRight } from "react-icons/fa";
import { useUser } from "../../providers/UserProvider";
import { numberSeparatedBySpaces } from "../../utils/convert";
import s from "./userInfo.module.css";
import { TabTypes } from "../Tabs/Tabs";
import LevelProgress from "../LevelProgress.tsx";

export default function UserInfo({ tab }: { tab?: TabTypes }) {
  const { data: user } = useUser();

  return (
    <div className={s.info}>
      <BalanceMemo />
      <Link to="/user-stats" state={{ tab }} className={s.userInfoLink}>
        <FaTrophy size={25} />
        Level {user?.game_data.level}
        <FaChevronRight size={20} />
      </Link>
      <LevelProgress/>
    </div>
  );
}

function Balance() {
  const { data: user } = useUser();
  const getBalance = () => user?.game_data.balance ?? 0;
  const [startBalance] = React.useState(() => getBalance());
  const balance = getBalance();

  return (
    <div className={s.balance}>
      <Number start={startBalance} n={balance} />
    </div>
  );
}

function Number({ start, n }: { start: number; n: number }) {
  const number = useSpringValue(start, {
    config: { mass: 1, tension: 20, friction: 10 },
  });

  React.useEffect(() => {
    number.start(n);
  }, [n, number]);

  return (
    <animated.div className={s.balance}>
      {number.to((n) => numberSeparatedBySpaces(n.toFixed(0)))}
    </animated.div>
  );
}

const BalanceMemo = React.memo(Balance);
