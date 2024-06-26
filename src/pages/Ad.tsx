import { useEffect, useMemo } from "react";
import {
  BrowserNavigator,
  InitData,
  initNavigator,
  useInitData,
} from "@tma.js/sdk-react";
import { watched } from "../api/fetch";

export default function Ad() {
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const data = useInitData();
  useEffect(() => {
    document.title = "AdsGram";
    showAd(data, navigator);
  });

  return <div>Loading...</div>;
}

function showAd(
  data: InitData | undefined,
  navigator: BrowserNavigator<unknown>
) {
  const token = localStorage.getItem("token");
  const AdController = window.Adsgram.init({ blockId: "239", debug: true });
  AdController.show()
    .then((result: ShowPromiseResult) => {
      // TODO: send to BE
      console.log(result);
      watched(token, data).then(() => navigator.back());
    })
    .catch((result: ShowPromiseResult) => {
      AdController.destroy();
      console.error(result);
    });
}
