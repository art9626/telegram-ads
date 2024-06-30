import { useInitData } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import {Perk, PerksList, getPerks, applyPerk} from "../api/fetch";
import {Box, Button, Card, Flex, Text} from "@radix-ui/themes";
import {ImageIcon} from "@radix-ui/react-icons";

export default function Perks() {
  const initData = useInitData();
  const token = localStorage.getItem("token");

  const [list, setPerks] = useState<PerksList | null>(null);
  useEffect(() => {
    getPerks(token, initData).then((res) => setPerks(res));
  }, []);

  return (
    <>
      { list?.perks.map((perk: Perk) => (
        <PerkElement perk={perk} token={token} key={perk.id} />
      ))}
    </>
  );
}

function calcBackground(perk: Perk): string {
  if (perk.level >= perk.max_level) {
    return "indigo"
  }

  if (!perk.available) {
    return "gray"
  }

  return "white"
}

export function PerkElement({ perk, token }: { perk: Perk, token: string | null }) {
  return (
    <Box width={"100%"} my={"2"} style={{background: calcBackground(perk)}}>
      <Card>
        <Flex justify={"between"} align={"center"}>
          <Box>
            <ImageIcon></ImageIcon>
            <Text ml={"2"} size={"4"} weight={"bold"}>{perk.name}</Text>
          </Box>
          <Text size={"1"}>
            <Text mr={"1"}>{perk.requirements.cost}$ADC</Text>
            <Text mr={"1"}>{perk.requirements.game_level} level</Text>
            <Text mr={"1"}>{perk.requirements.friends_count} friends</Text>
          </Text>
          <Button disabled={!perk.available}
                  onClick={() => {
                    applyPerk(perk.id, token)
                  }}
                  size={"1"}
          >UP</Button>
        </Flex>
      </Card>
    </Box>

  );
}
