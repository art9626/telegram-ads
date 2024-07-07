import { Perk } from "../api/Services";
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
    <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
      {perksList?.perks.map((perk: Perk) => (
        <PerkElement perk={perk} key={perk.id} />
      ))}
    </div>
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
    <div style={{ background: calcBackground(perk) }}>
      <div>
        <div>
          <div>
            <ImageIcon></ImageIcon>
            <p>{perk.name}</p>
          </div>
          <p>
            <p>{Math.floor(perk.requirements.cost / 10e9)}$</p>
            <p>{perk.requirements.game_level} level</p>
            <p>{perk.requirements.friends_count} friends</p>
          </p>
          <button
            disabled={!perk.available}
            onClick={() => {
              applyPerk(perk.id).then((r) => console.log("applyPerk", r));
            }}
          >
            UP
          </button>
        </div>
        <div>
          <p>{perk.description}</p>
        </div>
      </div>
    </div>
  );
}
