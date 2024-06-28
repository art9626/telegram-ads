import Auth from "./Auth.tsx";
import {Navigate, Route, Router, Routes} from "react-router-dom";
import BaseLayout from "./BaseLayout.tsx";
import Main from "../pages/Main.tsx";
import Friends from "../pages/Friends.tsx";
import Upgrades from "../pages/Upgrades.tsx";
import GameInfo from "../pages/GameInfo.tsx";
import Tasks from "../pages/Tasks.tsx";
import {useEffect, useMemo} from "react";
import {initNavigator, useMiniApp, useViewport} from "@tma.js/sdk-react";
import {useIntegration} from "@tma.js/react-router-integration";

export default function  AppRoot() {
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);
  const app = useMiniApp();
  const viewPort = useViewport()

  useEffect(() => {
    navigator.attach();
    app.setBgColor("#111110")
    app.setHeaderColor("#111110")
    app.ready()
    viewPort?.expand()
    return () => navigator.detach();
  }, [navigator]);

  return(
    <Auth>
      <Router location={location} navigator={reactNavigator}>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/upgrades" element={<Upgrades />} />
            <Route path="/game-info" element={<GameInfo />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BaseLayout>
      </Router>
    </Auth>
  )
}
