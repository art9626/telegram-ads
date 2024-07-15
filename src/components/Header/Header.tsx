import { TonConnectButton } from "@tonconnect/ui-react";
import s from "./header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <TonConnectButton />
    </header>
  );
}
