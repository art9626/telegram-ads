import ShowAdButton from "../ShowAdButton/ShowAdButton";
import UserInfo from "../UserInfo/UserInfo";
import WatchProgress from "../WatchProgress.tsx";
import s from "./adGame.module.css";

export default function AdGame() {
  return (
    <div className={s.container}>
      <UserInfo />
      <ShowAdButton />
      <WatchProgress />
    </div>
  );
}
