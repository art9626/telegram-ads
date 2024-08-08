import UserInfo from "../UserInfo/UserInfo";
import s from "./adGame.module.css";
import {useEffect, useState} from "react";
import {useUser} from "../../providers/UserProvider.tsx";
import ShowAdButton from "../ShowAdButton/ShowAdButton.tsx";

export default function AdGame() {
  return (
    <div className={s.container}>
        <Coins/>
        <UserInfo/>
        <GoldMiningPan/>
        {/*<ShowAdButton/>*/}
        {/*<WatchProgress/>*/}
    </div>
  );
}

interface Coin {
    left: string;
    animationDelay: string
}

interface GoldFlakes {
    left: string;
    top: string;
    size: string;
}

function Coins() {
    const [coins, setCoins] = useState<Coin[]>([]);

    useEffect(() => {
        const numCoins = 500; // Set the desired number of coins
        const newCoins = Array.from({ length: numCoins }, () => ({
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
        }));
        setCoins(newCoins);
    }, []);

    return (
      <div className="coins-container">
          {coins.map((coin, index) => (
            <div
              key={index}
              className="fallin-coin"
              style={{
                  left: coin.left,
                  animationDelay: coin.animationDelay,
              }}
            />
          ))}
      </div>
    );
}

const GoldMiningPan = ({ numGoldFlakes = 200, maxFlakeSize = 10 }) => {
    const [goldFlakes, setGoldFlakes] = useState<GoldFlakes[]>([]);
    const { data: user } = useUser();
    useEffect(() => {
        const newFlakes = Array.from({ length: numGoldFlakes }, () => ({
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
            size: `${Math.random() * maxFlakeSize}px`,
        }));
        setGoldFlakes(newFlakes);
    }, [numGoldFlakes, maxFlakeSize]);

    const isAdAvailable: boolean = (user?.game_data.available_watch_count && user?.game_data.available_watch_count > 0 || false) ;

    return (
      <div className="gold-mining-pan">
          <div className="gold-flakes">
              {goldFlakes.map((flake, index) => (
                <div
                  key={index}
                  className="gold-flake"
                  style={{
                      left: flake.left,
                      top: flake.top,
                      width: flake.size,
                      height: flake.size,
                  }}
                />
              ))}
          </div>
          <GoldenNugget available={isAdAvailable}/>
      </div>
    );
};

const GoldenNugget = ({available}: {available: boolean}) => {
    if (available) {
        return <ShowAdButton/>
    }

    return <div></div>
}
