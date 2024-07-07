import { TonConnectButton } from "@tonconnect/ui-react";
import { Flex } from "@radix-ui/themes";
import GameInfo from "./GameInfo.tsx";

export default function Header() {
  return (
    <header>
      <Flex direction="row" justify="between" align="center" py="4" width="100%" >
        <GameInfo/>
        <TonConnectButton />
      </Flex>
    </header>
  );
}
