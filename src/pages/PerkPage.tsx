import { useLocation, useNavigate } from "react-router-dom";
import { IPerk } from "../api/Services";
import { useBackButton } from "@tma.js/sdk-react";
import React from "react";

export default function PerkPage() {
  const { name, description } = useLocation().state as IPerk;
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

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
