import React from "react";
import {
  DoubleArrowUpIcon,
  IdCardIcon,
  PersonIcon,
  TargetIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import * as RTabs from "@radix-ui/react-tabs";
import AdGame from "../AdGame/AdGame.tsx";
import Tasks from "../Tasks.tsx";
import Friends from "../Friends.tsx";
import Achievements from "../Achievements.tsx";
import Perks from "../Perks/Perks.tsx";
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
  return (
    <RTabs.Root defaultValue={TabTypes.AD_GAME} className={s.root}>
      {tabs.map(({ key }) => {
        return (
          <RTabs.Content key={key} value={key} className={s.content}>
            <Content type={key} />
          </RTabs.Content>
        );
      })}
      <RTabs.List className={s.list}>
        {tabs.map(({ key, icon, title }) => {
          return (
            <RTabs.Trigger key={key} value={key} className={s.trigger}>
              {icon}
              {title}
            </RTabs.Trigger>
          );
        })}
      </RTabs.List>
    </RTabs.Root>
  );
}

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
