import {useEffect} from "react";
import {InitData, useInitData} from '@tma.js/sdk-react';

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

function showAd(data: InitData | undefined) {
  const AdController = window.Adsgram.init({blockId: "239", debug: true})
  AdController.show()
    .then((result: ShowPromiseResult) => {
      // TODO: send to BE
      console.log(result);
    })
    .catch((result: ShowPromiseResult) => {
      AdController.destroy();
      console.log(data)
      console.error(result);
    })
}

export default function Ad() {
  const data = useInitData()

  useEffect(() => {
    document.title = 'AdsGram';
    showAd(data)
  });

  return (
    <div>Loading...</div>
  )
}
