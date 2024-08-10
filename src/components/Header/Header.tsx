import s from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.logo}>Gold Rush</div>
      <nav>
        <Link to="/global-stats" className={s.infoLink}>
          Info
        </Link>
      </nav>
      {/*<TonConnectButton />*/}
    </header>
  );
}
