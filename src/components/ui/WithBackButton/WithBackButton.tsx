import React from "react";
import { To, useLocation, useNavigate } from "react-router-dom";
import { useBackButton } from "@tma.js/sdk-react";

export default function WithBackButton({
  children,
  to,
}: {
  children: React.ReactNode;
  to: To;
}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bb = useBackButton();

  React.useEffect(() => {
    const clickHandler = () => navigate(to, { state });

    bb.show();
    bb.on("click", clickHandler);

    return () => {
      bb.off("click", clickHandler);
      bb.hide();
    };
  }, [bb, navigate, state, to]);

  return <>{children}</>;
}
