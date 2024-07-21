import GameInfo from "../components/GameInfo.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBackButton } from "@tma.js/sdk-react";

export default function InfoPage() {
  const navigate = useNavigate();
  const bb = useBackButton();

  React.useEffect(() => {
    const clickHandler = () => navigate("/");

    bb.show();
    bb.on("click", clickHandler);

    return () => {
      bb.off("click", clickHandler);
      bb.hide();
    };
  }, [bb, navigate]);

  return <GameInfo />;
}
