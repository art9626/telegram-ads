import React from "react";
import { watched } from "../api/fetch";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";
import {Button} from "@radix-ui/themes";

interface ShowPromiseResult {
  done: boolean; // true if user watch till the end, otherwise false
  description: string; // event description
  state: "load" | "render" | "playing" | "destroy"; // banner state
  error: boolean; // true if event was emitted due to error, otherwise false
}

export default function ShowAdButton({availableCount}: {availableCount: number}) {
  const [loading, setLoading] = React.useState(false);
  const mutation = useMutation({
    mutationFn: watched,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <>
      <Button size="4"
        // TODO tmp
        disabled={loading || availableCount === 0}
        onClick={() => {
          setLoading(true);

          // @ts-expect-error Adsgram defined by script in index.html
          const AdController = window.Adsgram.init({
            blockId: "239",
            debug: true,
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
        }}
      >
        Money button
      </Button>
    </>
  );
}
