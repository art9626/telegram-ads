import { IPerk } from "../../api/Services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../../providers/ServicesProvider";
import UserInfo from "../UserInfo/UserInfo";
import s from "./perks.module.css";
import { Link } from "react-router-dom";
import { useHapticFeedback } from "@tma.js/sdk-react";

export default function Perks() {
  const { getPerks } = useServices();
  const { data: perks } = useQuery({
    queryKey: ["perks"],
    queryFn: getPerks,
  });

  return (
    <div className={s.container}>
      <UserInfo />
      {!perks ? (
        <div>Loading...</div>
      ) : (
        <ul className={s.perksList}>
          {perks.map((perk: IPerk) => (
            <Perk key={perk.id} perk={perk} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function Perk({ perk }: { perk: IPerk }) {
  const { applyPerk } = useServices();
  const hf = useHapticFeedback();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: applyPerk,
    onSuccess: (data) => {
      queryClient.setQueryData(["perks"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <li className={s.perksItem}>
      <div className={s.itemContent}>
        <h4>{perk.name} {perk.level}</h4>
        <div>
          <span>{Math.floor(perk.requirements.cost / 10e9)}$</span>
          <span>{perk.requirements.game_level} level</span>
          <span>{perk.requirements.friends_count} friends</span>
        </div>
        <button
          className={s.upButton}
          disabled={!perk.available}
          onClick={() => {
            hf.impactOccurred("medium");
            mutation.mutate(perk.id);
          }}
        >
          UP
        </button>
        <Link className={s.perkLink} to="/perk" state={perk} />
      </div>
      <span className={s.iconWrapper}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </li>
  );
}
