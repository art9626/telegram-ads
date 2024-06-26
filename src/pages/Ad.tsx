import { useEffect } from "react";
import { InitData, useInitData } from "@tma.js/sdk-react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { watched } from "../api/fetch.ts";

declare global {
  interface Window {
    Adsgram: AdsgramProps;
  }
}

interface AdsgramProps {
  init: ({
    blockId,
    debug,
  }: {
    blockId: string;
    debug: boolean;
  }) => AdControllerProps;
}

interface AdControllerProps {
  show: () => Promise<ShowPromiseResult>;
  destroy: () => void;
}

interface ShowPromiseResult {
  done: boolean; // true if user watch till the end, otherwise false
  description: string; // event description
  state: "load" | "render" | "playing" | "destroy"; // banner state
  error: boolean; // true if event was emitted due to error, otherwise false
}

function showAd(data: InitData | undefined, navigate: NavigateFunction) {
  const token = localStorage.getItem("token");
  const AdController = window.Adsgram.init({ blockId: "239", debug: true });
  AdController.show()
    .then((result: ShowPromiseResult) => {
      // TODO: send to BE
      console.log(result);
      watched(token, data).then(() => navigate("/"));
    })
    .catch((result: ShowPromiseResult) => {
      AdController.destroy();
      console.error(result);
    });
}

export default function Ad() {
  const data = useInitData();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "AdsGram";
    showAd(data, navigate);
  });

  return <div>Loading...</div>;
}
