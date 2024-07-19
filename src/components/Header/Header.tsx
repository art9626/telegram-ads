
import s from "./header.module.css";
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.logo}>AdVenture(beta)</div>
      <div className={s.info}><Link to="/info">Info</Link></div>
      {/*<TonConnectButton />*/}
    </header>
  );
}
