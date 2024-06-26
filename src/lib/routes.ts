import {ComponentType} from "react";
import Main from "../components/pages/Main.tsx";
import Friends from "../components/pages/Friends.tsx";
import Upgrades from "../components/pages/Upgrades.tsx";
import GameInfo from "../components/pages/GameInfo.tsx";
import Ad from "../components/pages/Ad.tsx";
import Tasks from "../components/pages/Tasks.tsx";

interface Route {
  path: string;
  Component: ComponentType;
}

export const routes: Route[] = [
  { path: '/', Component: Main},
  { path: '/friends', Component: Friends },
  { path: '/upgrades', Component: Upgrades },
  { path: '/game-info', Component: GameInfo },
  { path: '/ads', Component: Ad},
  { path: '/tasks', Component: Tasks},
]
