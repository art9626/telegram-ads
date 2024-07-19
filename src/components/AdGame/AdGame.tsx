import ShowAdButton from "../ShowAdButton/ShowAdButton";
import UserInfo from "../UserInfo/UserInfo";
import WatchCount from "../WatchCount";
import s from "./adGame.module.css";

export default function AdGame() {
  return (
    <div className={s.container}>
      <UserInfo />
      <ShowAdButton />
      <WatchCount />
    </div>
  );
}
