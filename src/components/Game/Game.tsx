import React from "react";
import UserInfo from "../UserInfo/UserInfo.tsx";
import { useUser } from "../../providers/UserProvider.tsx";
import ShowAdButton from "../ShowAdButton/ShowAdButton.tsx";
import s from "./game.module.css";

export default function Game() {
  return (
    <div className={s.container}>
      <CoinsMemo />
      <UserInfo />
      <GoldMiningPanMemo />
    </div>
  );
}

interface ICoin {
  left: string;
  animationDelay: string;
}

const COINS_NUMBER = 500;

function Coins() {
  const coins: ICoin[] = new Array(COINS_NUMBER).fill("").map(() => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 20}s`,
  }));

  return (
    <div className={s.coinsContainer}>
      {coins.map(({ animationDelay, left }, index) => (
        <div
          key={index}
          className={s.fallenCoin}
          style={{ left, animationDelay }}
        />
      ))}
    </div>
  );
}

const CoinsMemo = React.memo(Coins);

interface IGoldFlakes {
  left: string;
  top: string;
  size: string;
}

const GOLD_FLAKES_NUMBER = 200;
const MAX_FLAKE_SIZE = 10;

const GoldMiningPan = () => {
  const { data: user } = useUser();

  const goldFlakes: IGoldFlakes[] = React.useMemo(
    () =>
      new Array(GOLD_FLAKES_NUMBER).fill("").map(() => ({
        left: `${Math.random() * 95}%`,
        top: `${Math.random() * 95}%`,
        size: `${Math.random() * MAX_FLAKE_SIZE}px`,
      })),
    []
  );

  const isAdAvailable: boolean =
    (user?.game_data.available_watch_count &&
      user?.game_data.available_watch_count > 0) ||
    false;

  return (
    <div className={s.goldMiningPan}>
      <div className={s.goldFlakes}>
        {goldFlakes.map(({ left, top, size }, index) => (
          <div
            key={index}
            className={s.goldFlake}
            style={{ left, top, width: size, height: size }}
          />
        ))}
      </div>
      {isAdAvailable && <ShowAdButton />}
    </div>
  );
};

const GoldMiningPanMemo = React.memo(GoldMiningPan);
