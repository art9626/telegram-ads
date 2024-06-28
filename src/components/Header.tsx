import { TonConnectButton } from "@tonconnect/ui-react";
import {Flex} from "@radix-ui/themes";
import {GearIcon} from "@radix-ui/react-icons";

export default function Header() {
  return (
    <header>
      <Flex direction="row" justify="between" align="center">
        <div><GearIcon></GearIcon></div>
        <div><TonConnectButton /></div>
      </Flex>
    </header>
  );
}
