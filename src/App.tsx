import {SDKProvider} from "@tma.js/sdk-react";
import Main from "./components/pages/Main.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Friends from "./components/pages/Friends.tsx";
import Boosts from "./components/pages/Boosts.tsx";
import GameInfo from "./components/pages/GameInfo.tsx";
import Ad from "./components/pages/Ad.tsx";
import Tasks from "./components/pages/Tasks.tsx";

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
    path: "/boosts",
    element: <Boosts/>
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
  return (
    <SDKProvider acceptCustomStyles debug>
      <RouterProvider router={router}/>
    </SDKProvider>
  );
}

export default App;
