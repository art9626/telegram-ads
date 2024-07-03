import { Perk } from "../api/Services";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { ImageIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "../providers/ServicesProvider";

export default function Perks() {
  const { getPerks } = useServices();
  const { data: perksList } = useQuery({
    queryKey: ["perks"],
    queryFn: getPerks,
  });

  return (
    <>
      {perksList?.perks.map((perk: Perk) => (
        <PerkElement perk={perk} key={perk.id} />
      ))}
    </>
  );
}

function calcBackground(perk: Perk): string {
  if (perk.level >= perk.max_level) {
    return "indigo";
  }

  if (!perk.available) {
    return "gray";
  }

  return "white";
}

export function PerkElement({ perk }: { perk: Perk }) {
  const { applyPerk } = useServices();

  return (
    <Box width={"100%"} my={"2"} style={{ background: calcBackground(perk) }}>
      <Card>
        <Flex justify={"between"} align={"center"}>
          <Box>
            <ImageIcon></ImageIcon>
            <Text ml={"2"} size={"4"} weight={"bold"}>
              {perk.name}
            </Text>
          </Box>
          <Text size={"1"}>
            <Text mr={"1"}>{Math.floor(perk.requirements.cost / 10e9)}$</Text>
            <Text mr={"1"}>{perk.requirements.game_level} level</Text>
            <Text mr={"1"}>{perk.requirements.friends_count} friends</Text>
          </Text>
          <Button
            disabled={!perk.available}
            onClick={() => {
              applyPerk(perk.id).then((r) => console.log("applyPerk", r));
            }}
            size={"1"}
          >
            UP
          </Button>
        </Flex>
        <Flex>
          <Text size={"2"}>{perk.description}</Text>
        </Flex>
      </Card>
    </Box>
  );
}
