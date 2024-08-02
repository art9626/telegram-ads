import { useLocation, useNavigate } from "react-router-dom";
import { IPerk } from "../api/Services";
import { useBackButton } from "@tma.js/sdk-react";
import React from "react";

export default function PerkPage() {
  const { name, desc, effect_desc, synergy_desc, requirements, actual_data } = useLocation().state as IPerk;
  const navigate = useNavigate();
  const bb = useBackButton();

  // TODO вынести в отдельный хук
  React.useEffect(() => {
    const clickHandler = () => navigate("/", { state: { tab: "PERKS" } });

    bb.show();
    bb.on("click", clickHandler);

    return () => {
      bb.off("click", clickHandler);
      bb.hide();
    };
  }, [bb, navigate]);

  function checkActual(type: string): boolean {
    switch(type) {
      case "friends":
        return actual_data.friends_count < requirements.friends_count
      case "cost":
        return actual_data.balance < requirements.cost;
      case "level":
        return actual_data.game_level < requirements.game_level
    }

    return false
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>
        Requirements:
        <p className={checkActual("level") ? "danger" : "success"}>Level: {actual_data.game_level} / {requirements.game_level} </p>
        <p className={checkActual("friends") ? "danger" : "success"}>Friends invited: {actual_data.friends_count} / {requirements.friends_count}</p>
        <p className={checkActual("cost") ? "danger" : "success"}>Cost: {actual_data.balance} / {requirements.cost}</p>
      </p>
      <p>{desc}</p>
      <p>{effect_desc}</p>
      <p>{synergy_desc}</p>
    </div>
  );
}
