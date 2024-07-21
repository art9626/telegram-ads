import s from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.logo}>AdVenture(beta)</div>
      <nav>
        <Link to="/info" className={s.infoLink}>
          Info
        </Link>
      </nav>
      {/*<TonConnectButton />*/}
    </header>
  );
}
