import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@radix-ui/themes";
import { useUser } from "../providers/UserProvider";
import { useServices } from "../providers/ServicesProvider";

interface ShowPromiseResult {
  done: boolean; // true if user watch till the end, otherwise false
  description: string; // event description
  state: "load" | "render" | "playing" | "destroy"; // banner state
  error: boolean; // true if event was emitted due to error, otherwise false
}

export default function ShowAdButton() {
  const { user } = useUser();
  const { watched } = useServices();
  const [loading, setLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: watched,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const counterIsOut = user?.game_data.available_watch_count === 0;

  return (
    <>
      <Button
        size="4"
        loading={loading}
        disabled={loading || !user || counterIsOut}
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
