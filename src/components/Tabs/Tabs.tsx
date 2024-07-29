import React from "react";
import {
  DoubleArrowUpIcon,
  IdCardIcon,
  PersonIcon,
  TargetIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import * as RTabs from "@radix-ui/react-tabs";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useHapticFeedback } from "@tma.js/sdk-react";
import { useAchievements } from "../../providers/AchievementsProvider.tsx";
import AdGame from "../AdGame/AdGame.tsx";
import Tasks from "../Tasks.tsx";
import Friends from "../Friends/Friends.tsx";
import Perks from "../Perks/Perks.tsx";
import Achievements from "../Achievements/Achievements.tsx";
import s from "./tabs.module.css";

enum TabTypes {
  AD_GAME = "AD_GAME",
  ACHIEVEMENTS = "ACHIEVEMENTS",
  TASKS = "TASKS",
  PERKS = "PERKS",
  FRIENDS = "FRIENDS",
}

interface ITab {
  key: TabTypes;
  title: string;
  icon: React.ReactElement;
}

const tabs: ITab[] = [
  { key: TabTypes.FRIENDS, title: "Friends", icon: <PersonIcon /> },
  { key: TabTypes.PERKS, title: "Perks", icon: <DoubleArrowUpIcon /> },
  { key: TabTypes.AD_GAME, title: "Earn", icon: <TargetIcon /> },
  { key: TabTypes.ACHIEVEMENTS, title: "Prizes", icon: <IdCardIcon /> },
  { key: TabTypes.TASKS, title: "Tasks", icon: <TimerIcon /> },
];

export default function Tabs() {
  const location = useLocation();
  const defaultTab = location.state?.tab;

  React.useEffect(() => {
    if (location.state) window.history.replaceState({}, "");
  }, [location]);

  return (
    <RTabs.Root
      defaultValue={defaultTab ?? TabTypes.AD_GAME}
      className={s.root}
    >
      {tabs.map(({ key }) => {
        return (
          <RTabs.Content key={key} value={key} className={s.content}>
            <Content type={key} />
          </RTabs.Content>
        );
      })}
      <RTabs.List className={s.list}>
        {tabs.map((tab) => {
          return <Trigger key={tab.key} tab={tab} />;
        })}
      </RTabs.List>
    </RTabs.Root>
  );
}

const Trigger = React.memo(({ tab: { key, icon, title } }: { tab: ITab }) => {
  const hf = useHapticFeedback();
  const { data: achievementsResponse } = useAchievements();

  const hasNewAchievements = achievementsResponse?.achievements?.some((a) => !a.claimed);

  const className = classNames(s.trigger, {
    [s.indicate]: hasNewAchievements && key === TabTypes.ACHIEVEMENTS,
  });

  return (
    <RTabs.Trigger
      value={key}
      className={className}
      onClick={() => hf.selectionChanged()}
    >
      {icon}
      {title}
    </RTabs.Trigger>
  );
});

const Content = React.memo(({ type }: { type: TabTypes }) => {
  switch (type) {
    case TabTypes.AD_GAME:
      return <AdGame />;
    case TabTypes.ACHIEVEMENTS:
      return <Achievements />;
    case TabTypes.TASKS:
      return <Tasks />;
    case TabTypes.PERKS:
      return <Perks />;
    case TabTypes.FRIENDS:
      return <Friends />;

    default:
      ((v: never) => v)(type);
      return null;
  }
});
