import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import {
  DoubleArrowUpIcon,
  IdCardIcon,
  PersonIcon,
  TargetIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import AdGame from "../components/AdGame";
import Tasks from "../components/Tasks";
import Perks from "../components/Perks";
import Friends from "../components/Friends";
import Achievements from "../components/Achievements.tsx";

type TabTypes = "AD_GAME" | "ACHIEVEMENTS" | "TASKS" | "PERKS" | "FRIENDS";

interface ITab {
  key: TabTypes;
  title: string;
  icon: React.ReactElement;
}

export default function MainPage() {
  const [tab, setTab] = React.useState<TabTypes>("AD_GAME");

  const tabs: ITab[] = [
    { key: "FRIENDS", title: "Friends", icon: <PersonIcon /> },
    { key: "PERKS", title: "Perks", icon: <DoubleArrowUpIcon /> },
    { key: "AD_GAME", title: "Earn", icon: <TargetIcon /> },
    { key: "ACHIEVEMENTS", title: "Prizes", icon: <IdCardIcon /> },
    { key: "TASKS", title: "Tasks", icon: <TimerIcon /> },
  ];

  return (
    <>
      <div>
        {(() => {
          switch (tab) {
            case "AD_GAME":
              return <AdGame />;
            case "ACHIEVEMENTS":
              return <Achievements />;
            case "TASKS":
              return <Tasks />;
            case "PERKS":
              return <Perks />;
            case "FRIENDS":
              return <Friends />;

            default:
              ((v: never) => v)(tab);
              return null;
          }
        })()}
      </div>
      <Flex
        justify="between"
        position="fixed"
        bottom="30px"
        left="0"
        right="0"
        p="4"
      >
        {tabs.map(({ key, icon, title }) => {
          return (
            <Flex
              key={key}
              onClick={() => setTab(key)}
              direction="column"
              align="center"
            >
              {icon}
              <Text>{title}</Text>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
}
