import React from "react";
import { IAchievement } from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHapticFeedback } from "@tma.js/sdk-react";
import UserInfo from "../UserInfo/UserInfo.tsx";
import { useAchievements } from "../../providers/AchievementsProvider.tsx";
import s from "./achievements.module.css";

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

  return (
    <li className={s.achievementsItem}>
      <div className={s.itemContent}>
        <h4>{name}</h4>
        <div>
          <span>{description}</span>
          <div>Reward: {Math.floor(reward / 10e9)}</div>
        </div>
        <button
          className={s.upButton}
          disabled={claimed}
          onClick={() => {
            if (isPending) return;
            hf.impactOccurred("medium");
            mutate(id);
          }}
        >
          Claim
        </button>
      </div>
    </li>
  );
}

const AchievementMemo = React.memo(Achievement);
