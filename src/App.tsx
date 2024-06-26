import {SDKProvider} from "@tma.js/sdk-react";
import Main from "./components/pages/Main.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Friends from "./components/pages/Friends.tsx";
import GameInfo from "./components/pages/GameInfo.tsx";
import Ad from "./components/pages/Ad.tsx";
import Tasks from "./components/pages/Tasks.tsx";
import Upgrades from "./components/pages/Upgrades.tsx";
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import {useMemo} from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>
  },
  {
    path: "/friends",
    element: <Friends/>
  },
  {
    path: "/upgrades",
    element: <Upgrades/>
  },
  {
    path: "/game_info",
    element: <GameInfo/>
  },
  {
    path: "/ads",
    element: <Ad/>
  },
  {
    path: "/tasks",
    element: <Tasks/>
  }
]);

function App() {
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug>
        <RouterProvider router={router}/>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export default App;
