import { TonConnectButton } from "@tonconnect/ui-react";
import GameInfo from "./GameInfo.tsx";

export default function Header() {
  return (
    <header>
      <GameInfo />
      <TonConnectButton />
    </header>
  );
}
