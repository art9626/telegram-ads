import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaUserFriends,
  FaTrophy,
  FaCoins,
  FaChevronRight,
} from "react-icons/fa";
import { IPerk, IPerkRequirements, PerkTypes } from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider";
import UserInfo from "../UserInfo/UserInfo";
import { useHapticFeedback } from "@tma.js/sdk-react";
import Button from "../ui/Button/Button";
import Dialog from "../ui/Dialog/Dialog";
import Progress from "../ui/Progress/Progress";
import { numberSeparatedBySpaces } from "../../utils/convert";
import { TabTypes } from "../Tabs/Tabs";
import s from "./perks.module.css";

export default function Perks() {
  const { getPerks } = useServices();
  const { data: perks } = useQuery({
    queryKey: ["perks"],
    queryFn: getPerks,
  });

  return (
    <div className={s.container}>
      <UserInfo tab={TabTypes.PERKS} />
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
  const { name, effect_desc, level, requirements } = perk;

  return (
    <Dialog
      className={s.perkDialog}
      title={name}
      description={effect_desc}
      trigger={
        <li className={s.perksItem}>
          <div className={s.itemContent}>
            <h4>{name}</h4>
            <b>Level {level}</b>
            <p>Current effect: {getBuildEffect(perk)}</p>
            <RequirementsMemo requirements={requirements} />
          </div>
          <FaChevronRight size={20} />
        </li>
      }
    >
      <PerkDialogContent perk={perk} />
    </Dialog>
  );
}

function PerkDialogContent({ perk }: { perk: IPerk }) {
  const { synergy_desc, requirements, max_level, level } = perk;

  const { applyPerk } = useServices();
  const hf = useHapticFeedback();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: applyPerk,
    onSuccess: (data) => {
      queryClient.setQueryData(["perks"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <div className={s.perkDialogContent}>
      <p>{synergy_desc}</p>
      <Progress
        size="sm"
        max={max_level}
        value={level}
        label={`${level}/${max_level}`}
      />
      <RequirementsMemo requirements={requirements} />
      <Button
        className={s.upButton}
        disabled={!perk.available}
        onClick={() => {
          hf.impactOccurred("medium");
          if (isPending) return;
          mutate(perk.id);
        }}
      >
        Get it!
      </Button>
    </div>
  );
}

function Requirements({ requirements }: { requirements: IPerkRequirements }) {
  const { cost, friends_count, game_level } = requirements;

  const info: Array<{
    id: number;
    value: string | number | null;
    icon: React.ReactNode;
  }> = [
    {
      id: 0,
      value: numberSeparatedBySpaces(cost),
      icon: <FaCoins />,
    },
    {
      id: 1,
      value: friends_count,
      icon: <FaUserFriends />,
    },
    {
      id: 2,
      value: game_level,
      icon: <FaTrophy />,
    },
  ];

  return (
    <ul className={s.requirementsList}>
      {info.map(({ id, value, icon }) => {
        return (
          <li key={id} className={s.requirementsItem}>
            {icon}
            {value}
          </li>
        );
      })}
    </ul>
  );
}

const RequirementsMemo = React.memo(Requirements);

function getBuildEffect(perk: IPerk): string {
  const effect = Math.round(perk.effect * 100) / 100;

  switch (perk.type) {
    case PerkTypes.REF_PERK:
      return `${effect}% from ref earnings`;
    case PerkTypes.COIN_PERK:
      return `${effect} coins per watch (x2 when you click ad)`;
    case PerkTypes.ADS_PERK:
      return `${effect} ads`;
    case PerkTypes.EXP_PERK:
      return `${effect * 100}%`;
    case PerkTypes.ROBOT_PERK:
      return `${effect} coins per hour`;
    case PerkTypes.FRIENDS_PERK:
      return `${effect} friends assigned`;
    case PerkTypes.DOUBLE_CHANCE_PERK:
      return `${effect}% chance`;
    default:
      ((v: never) => v)(perk.type);
      return "";
  }
}
