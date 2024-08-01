import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../providers/UserProvider";
import { useServices } from "../../providers/ServicesProvider";
import s from "./showAdButton.module.css";
import { useHapticFeedback } from "@tma.js/sdk-react";
import classNames from "classnames";
import { toast } from "react-toastify";

interface ShowPromiseResult {
  done: boolean; // true if user watch till the end, otherwise false
  description: string; // event description
  state: "load" | "render" | "playing" | "destroy"; // banner state
  error: boolean; // true if event was emitted due to error, otherwise false
}

export default function ShowAdButton() {
  const { data: user } = useUser();
  const { watched } = useServices();
  const hf = useHapticFeedback();
  const [loading, setLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: watched,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], {
        ...user,
        game_data: data.data.data,
      });
    },
    onError: (e) => toast(e.message, { type: "error" }),
  });

  const counterIsOut = user?.game_data.available_watch_count === 0;

  const clickHandler = () => {
    if (import.meta.env.DEV) {
      mutation.mutate();
    } else {
      setLoading(true);

      // @ts-expect-error Adsgram defined by script in index.html
      const AdController = window.Adsgram.init({
        blockId: "239",
        debug: false,
      });

      AdController.show()
        .then((result: ShowPromiseResult) => {
          // TODO: send to BE
          console.log(result);
          return mutation.mutate();
        })
        .catch((result: ShowPromiseResult) => {
          AdController.destroy();
          console.error(result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className={s.container}>
      <div
        className={s.coin}
        onClick={clickHandler}
        onTouchStart={() => hf.impactOccurred("medium")}
      >
        <div
          className={classNames(s.front, {
            [s.jump]: !counterIsOut || !loading,
          })}
        >
          <span className={s.currency}>
            <span>$</span>
          </span>
        </div>
      </div>
      <div className={s.shadow}></div>
    </div>
  );
}
