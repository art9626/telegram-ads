import { TonConnectButton } from "@tonconnect/ui-react";
import { Flex } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <header>
      <Flex direction="row" justify="between" align="center" py="4">
        <GearIcon width={20} height={20} />
        <TonConnectButton />
      </Flex>
    </header>
  );
}
