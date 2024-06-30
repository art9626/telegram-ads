import { useInitData } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import { Perk, PerksList, getPerks } from "../api/fetch";
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
        <>
          <PerkElement perk={perk} key={perk.id} />
          <Button>Get Perk</Button>
          <Separator orientation="horizontal" />
        </>
      ))}
    </div>
  );
}

export function PerkElement({ perk }: { perk: Perk }) {
  return (
    <div>
      <div>Name: {perk.name}</div>
      <div>Description: {perk.description}</div>
      <div>Price: {perk.requirements.cost}</div>
      <div>Friends count: {perk.requirements.friends_count}</div>
      <div>Level: {perk.requirements.game_level}</div>
    </div>
  );
}
