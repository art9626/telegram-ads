import React from "react";
import {
  IAchievement,
  IAchievements,
  TAchievementCategory,
} from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHapticFeedback } from "@tma.js/sdk-react";
import UserInfo from "../UserInfo/UserInfo.tsx";
import { useAchievements } from "../../providers/AchievementsProvider.tsx";
import { numberSeparatedBySpaces } from "../../utils/convert.ts";
import Dialog from "../ui/Dialog/Dialog.tsx";
import Button from "../ui/Button/Button.tsx";
import s from "./achievements.module.css";
import * as Tabs from "@radix-ui/react-tabs";

export default function Achievements() {
  const { data, isLoading } = useAchievements();

  if (isLoading) return <div>Loading...</div>;

  // TODO tmp
  if (!data || data.achievements.length === 0) {
    return (
      <div className={s.container}>
        <UserInfo />
        <div>You have no achievements</div>
      </div>
    );
  }

  const achievementsByCategory = groupByCategories(data.achievements);

  return (
    <div className={s.container}>
      <UserInfo />
      <span className={s.counter}>
        {data.claimed_count}/{data.total_count}
      </span>
      <Tabs.Root defaultValue={achievementsByCategory[0][0]}>
        <Tabs.List>
          {achievementsByCategory.map(([category]) => {
            return (
              <Tabs.Trigger key={category} value={category}>
                {category}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {achievementsByCategory.map(([category, achievements]) => {
          const sortedAchievements = sortByClaimed(achievements);
          return (
            <Tabs.Content key={category} value={category} className={s.content}>
              <ul className={s.achievementsList}>
                {sortedAchievements.map((achievement) => {
                  return (
                    <AchievementMemo
                      achievement={achievement}
                      key={achievement.id}
                    />
                  );
                })}
              </ul>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </div>
  );
}

export function Achievement({ achievement }: { achievement: IAchievement }) {
  const { name, reward, claimed, id, description } = achievement;
  const { claimAchievement } = useServices();
  const hf = useHapticFeedback();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: claimAchievement,
    onSuccess: (data) => {
      queryClient.setQueryData<IAchievements>(["achievements"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const [open, setOpen] = React.useState(false);

  const clickHandler = () => {
    mutate(id);
  };

  const trigger = (
    <Button
      className={s.claimButton}
      onMouseDown={() => hf.impactOccurred("medium")}
      onClick={clickHandler}
      disabled={claimed}
    >
      <div className={s.content}>
        <div className={s.info}>
          <h4>{name}</h4>
          <p className={s.description}>{description}</p>
        </div>
        <div className={s.reward}>
          + {numberSeparatedBySpaces(Math.floor(reward))}
        </div>
      </div>
    </Button>
  );

  return (
    <li className={s.achievementsItem}>
      <Dialog
        open={open}
        trigger={trigger}
        onOpenChange={(o) => o === false && setOpen(o)}
        // title={name}
      >
        <DialogContent achievement={achievement} />
      </Dialog>
    </li>
  );
}

function DialogContent({
  achievement: { reward },
}: {
  achievement: IAchievement;
}) {
  return (
    <div className={s.dialogContent}>
      +{numberSeparatedBySpaces(Math.floor(reward))}
    </div>
  );
}

const AchievementMemo = React.memo(Achievement);

function groupByCategories(achievements: IAchievement[]) {
  return Array.from(
    achievements.reduce((acc: Map<TAchievementCategory, IAchievement[]>, a) => {
      const categoryAchievements = acc.get(a.category);
      if (!categoryAchievements) {
        acc.set(a.category, [a]);
      } else {
        categoryAchievements.push(a);
      }
      return acc;
    }, new Map<TAchievementCategory, IAchievement[]>())
  );
}

function sortByClaimed(achievements: IAchievement[]) {
  return [...achievements].sort((a, b) => {
    if (a.claimed && !b.claimed) return 1;
    if (!a.claimed && b.claimed) return -1;
    return 0;
  });
}
