import React from "react";
import { useSpringValue, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import { FaTrophy, FaChevronRight } from "react-icons/fa";
import { useUser } from "../../providers/UserProvider";
import { numberSeparatedBySpaces } from "../../utils/convert";
import { useBalance } from "../../providers/BalanceProvider.tsx";
import { TabTypes } from "../Tabs/Tabs";
import LevelProgress from "../LevelProgress.tsx";
import s from "./userInfo.module.css";

export default function UserInfo({ tab }: { tab?: TabTypes }) {
  const { data: user } = useUser();

  return (
    <div className={s.info}>
      <BalanceMemo />
      <div>{user?.data.production} gold per second</div>
      <Link to="/user-stats" state={{ tab }} className={s.userInfoLink}>
        <FaTrophy size={25} />
        Level {user?.data.level}
        <FaChevronRight size={20} />
      </Link>
      <LevelProgress />
    </div>
  );
}

function Balance() {
  const { currentBalance, speed } = useBalance();
  const [startBalance] = React.useState(() => currentBalance - speed);

  return (
    <div className={s.balance}>
      <Number start={startBalance} n={currentBalance} />
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
