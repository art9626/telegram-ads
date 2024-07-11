import { IPerk } from "../../api/Services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServices } from "../../providers/ServicesProvider";
import UserInfo from "../UserInfo/UserInfo";
import s from "./perks.module.css";

export default function Perks() {
  const { getPerks } = useServices();
  const { data: perks } = useQuery({
    queryKey: ["perks"],
    queryFn: getPerks,
  });

  console.log(perks);

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
      <div>
        <h4>{perk.name}</h4>
        <p>{perk.description}</p>
        <button
          disabled={!perk.available}
          onClick={() => {
            mutation.mutate(perk.id);
          }}
        >
          UP
        </button>
      </div>
      <div>
        <span>{Math.floor(perk.requirements.cost / 10e9)}$</span>
        <span>{perk.requirements.game_level} level</span>
        <span>{perk.requirements.friends_count} friends</span>
      </div>
    </li>
  );
}
