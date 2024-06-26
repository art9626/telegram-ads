import {useEffect, useMemo} from "react";
import {BrowserNavigator, InitData, initNavigator, useInitData} from '@tma.js/sdk-react';
import {watched} from "../../lib/fetch.ts";

declare global {
  interface Window { Adsgram: AdsgramProps; }
}

interface AdsgramProps {
  init: ({blockId, debug}: {blockId: string, debug: boolean}) => AdControllerProps,
}

interface AdControllerProps {
  show: () => Promise<ShowPromiseResult>,
  destroy: () => void,
}

interface ShowPromiseResult {
  done: boolean; // true if user watch till the end, otherwise false
  description: string; // event description
  state: 'load' | 'render' | 'playing' | 'destroy'; // banner state
  error: boolean; // true if event was emitted due to error, otherwise false
}

export default function Ad() {
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const data = useInitData()
  useEffect(() => {
    document.title = 'AdsGram';
    showAd(data, navigator)
  });

  return (
    <div>Loading...</div>
  )
}

function showAd(data: InitData | undefined, navigator: BrowserNavigator<unknown>) {
  const token = localStorage.getItem('token');
  const AdController = window.Adsgram.init({blockId: "239", debug: true})
  AdController.show()
    .then((result: ShowPromiseResult) => {
      // TODO: send to BE
      console.log(result);
      watched(token, data).then(() => navigator.back())
    })
    .catch((result: ShowPromiseResult) => {
      AdController.destroy();
      console.error(result);
    })
}
