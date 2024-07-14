import { useLocation } from "react-router-dom";
import { IPerk } from "../api/Services";

export default function PerkPage() {
  const { name, description } = useLocation().state as IPerk;

  console.log(location);

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
