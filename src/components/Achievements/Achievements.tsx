import React from "react";
import {
  IAchievement,
  IAchievements,
  TAchievementCategory,
} from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHapticFeedback } from "@tma.js/sdk-react";
import classNames from "classnames";
import * as Tabs from "@radix-ui/react-tabs";
import UserInfo from "../UserInfo/UserInfo.tsx";
import { useAchievements } from "../../providers/AchievementsProvider.tsx";
import Button from "../ui/Button/Button.tsx";
import { TabTypes } from "../Tabs/Tabs.tsx";
import s from "./achievements.module.css";

const AchievementCategoryMap = new Map<TAchievementCategory, string>([
  ["achievements", "Achievements"],
  ["ads", "Ads"],
  ["balance", "Balance"],
  ["friends", "Friends"],
  ["level", "Level"],
  ["perks", "Perks"],
  ["referral_earnings", "Ref"],
  ["spending", "Spending"],
  ["unknown", "Other"],
]);

export default function Achievements() {
  const { data, isLoading } = useAchievements();
  const hf = useHapticFeedback();

  if (isLoading) return <div>Loading...</div>;

  // TODO tmp
  if (!data || data.achievements.length === 0) {
    return (
      <div className={s.container}>
        <UserInfo tab={TabTypes.ACHIEVEMENTS} />
        <div>You have no achievements</div>
      </div>
    );
  }

  const achievementsByCategory = groupByCategories(data.achievements);

  return (
    <div className={s.container}>
      <UserInfo tab={TabTypes.ACHIEVEMENTS} />
      <span className={s.counter}>
        {data.claimed_count}/{data.total_count}
      </span>
      <Tabs.Root defaultValue={achievementsByCategory[0][0]}>
        <Tabs.List className={s.tabsList}>
          {achievementsByCategory.map(([category, achievements]) => {
            return (
              <Tabs.Trigger
                key={category}
                value={category}
                className={classNames(s.trigger, {
                  [s.indicate]: achievements.some((a) => !a.claimed),
                })}
                onClick={() => hf.selectionChanged()}
              >
                {AchievementCategoryMap.get(category)}
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
  const { mutate, isPending } = useMutation({
    mutationFn: claimAchievement,
    onSuccess: (data) => {
      queryClient.setQueryData<IAchievements>(["achievements"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const clickHandler = () => {
    hf.impactOccurred("medium");
    if (isPending) return;
    mutate(id);
  };

  return (
    <li className={s.achievementsItem}>
      <Button
        className={s.claimButton}
        onClick={clickHandler}
        disabled={claimed}
      >
        <div className={s.content}>
          <div className={s.info}>
            <h4>{name}</h4>
            <p className={s.description}>{description}</p>
          </div>
          <div className={s.reward}>+ {reward}</div>
        </div>
      </Button>
    </li>
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
    if (!a.claimed && !b.claimed && a.reward < b.reward) return 1;
    if (!a.claimed && !b.claimed && a.reward > b.reward) return -1;
    if (a.claimed && b.claimed && a.reward < b.reward) return 1;
    if (a.claimed && b.claimed && a.reward > b.reward) return -1;

    return 0;
  });
}
