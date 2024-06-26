import { useInitData } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import { Upgrade, UpgradeList, getUpgrades } from "../api/fetch";

export default function Upgrades() {
  const initData = useInitData();
  const token = localStorage.getItem("token");

  const [list, setUpgrades] = useState<UpgradeList | null>(null);
  useEffect(() => {
    getUpgrades(token, initData).then((res) => setUpgrades(res));
  }, []);

  return (
    <div>
      {list?.upgrades.map((upgrade) => (
        <UpgradeElement upgrade={upgrade} key={upgrade.id} />
      ))}
    </div>
  );
}

export function UpgradeElement({ upgrade }: { upgrade: Upgrade }) {
  return (
    <div>
      <div>Name: {upgrade.name}</div>
      <div>Description: {upgrade.description}</div>
      <div>Price: {upgrade.token_price}</div>
      <div>TON price: {upgrade.ton_price}</div>
    </div>
  );
}
