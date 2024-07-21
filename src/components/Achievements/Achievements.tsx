import React from "react";
import { IAchievement } from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHapticFeedback } from "@tma.js/sdk-react";
import UserInfo from "../UserInfo/UserInfo.tsx";
import { useAchievements } from "../../providers/AchievementsProvider.tsx";
import { numberSeparatedBySpaces } from "../../utils/convert.ts";
import s from "./achievements.module.css";
import classNames from "classnames";
import Dialog from "../ui/Dialog/Dialog.tsx";

export default function Achievements() {
  const { data: achievements, isLoading } = useAchievements();

  if (isLoading) return <div>Loading...</div>;
  // TODO tmp
  if (!achievements || achievements.length === 0) {
    return (
      <div className={s.container}>
        <UserInfo />
        <div>You have no achievements</div>
      </div>
    );
  }

  const newAchievements: IAchievement[] = [];
  const claimedAchievements: IAchievement[] = [];

  for (const a of achievements) {
    if (a.claimed) {
      claimedAchievements.push(a);
    } else {
      newAchievements.push(a);
    }
  }

  return (
    <div className={s.container}>
      <UserInfo />
      <ul className={s.achievementsList}>
        {newAchievements
          .concat(claimedAchievements)
          .map((achievement: IAchievement) => {
            return (
              <AchievementMemo achievement={achievement} key={achievement.id} />
            );
          })}
      </ul>
    </div>
  );
}

export function Achievement({
  achievement: { name, reward, claimed, id, description },
}: {
  achievement: IAchievement;
}) {
  const { claimAchievement } = useServices();
  const hf = useHapticFeedback();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: claimAchievement,
    onSuccess: (data) => {
      queryClient.setQueryData<IAchievement[]>(["achievements"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const [open, setOpen] = React.useState(false);

  const clickHandler = () => {
    if (claimed) {
      setOpen(true);
    } else {
      if (isPending) return;
      mutate(id, {
        onSuccess: () => setOpen(true),
      });
    }
  };

  const trigger = (
    <button
      className={classNames(s.claimButton, { [s.claimed]: claimed })}
      onMouseDown={() => hf.impactOccurred("medium")}
      onClick={clickHandler}
    >
      <div className={s.content}>
        <div className={s.info}>
          <h4>{name}</h4>
          <p className={s.description}>{description}</p>
        </div>
        <div className={s.reward}>
          + {numberSeparatedBySpaces(Math.floor(reward / 10e9))}
        </div>
      </div>
    </button>
  );

  const content = (
    <div>
      <p>{description}</p>
      <div></div> {numberSeparatedBySpaces(Math.floor(reward / 10e9))}
    </div>
  );

  return (
    <li className={s.achievementsItem}>
      <Dialog
        open={open}
        trigger={trigger}
        onOpenChange={(o) => o === false && setOpen(o)}
        title={name}
      >
        {content}
      </Dialog>
    </li>
  );
}

const AchievementMemo = React.memo(Achievement);
