import { useInitData } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import {Perk, PerksList, getPerks, applyPerk} from "../api/fetch";
import {Button, Separator} from "@radix-ui/themes";

export default function Perks() {
  const initData = useInitData();
  const token = localStorage.getItem("token");

  const [list, setPerks] = useState<PerksList | null>(null);
  useEffect(() => {
    getPerks(token, initData).then((res) => setPerks(res));
  }, []);

  return (
    <div>
      {list?.perks.map((perk: Perk) => (
        <div key={perk.id}>
          <PerkElement perk={perk} key={perk.id} />
          <Button disabled={!perk.available}
                  onClick={() => {
                    applyPerk(perk.id, token).then(res => setPerks(res))
                  }}
          >Get Perk</Button>
        </div>
      ))}
    </div>
  );
}

export function PerkElement({ perk }: { perk: Perk }) {
  return (
    <div key={perk.id}>
      <div>ID: {perk.id}</div>
      <div>Name: {perk.name}</div>
      <div>Description: {perk.description}</div>
      <div>Level: {perk.level}</div>
      <div>Price: {perk.requirements.cost}</div>
      <div>Friends count: {perk.requirements.friends_count}</div>
      <div>Req Player Level: {perk.requirements.game_level}</div>
      <div>Available: {perk.available.toString()}</div>
      <Separator orientation="horizontal" />
    </div>
  );
}
