import {useServices} from "../providers/ServicesProvider.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import s from "./Perks/perks.module.css";
import {DailyReward} from "../api/Services.ts";


function dayClaimed(reward: DailyReward, streak: number) {
  return reward.day <= streak
}

export default function Tasks() {
  const { getDailyRewards, claimDailyReward } = useServices();
  const { data: rewards } = useQuery({
    queryKey: ["rewards"],
    queryFn: getDailyRewards,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: claimDailyReward,
    onSuccess: (data) => {
      queryClient.setQueryData(["rewards"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <>
      <h1>
        Current streak: {rewards?.current_streak}
      </h1>
      {rewards?.rewards.map(reward => {
        return (<div>
          {dayClaimed(reward, rewards?.current_streak) ? "claimed" : ""}
          Day: {reward.day}
          Coins: {reward.coins}
          XP: {reward.xp}
        </div>)
      })}
      <button
        className={s.upButton}
        disabled={!rewards?.can_claim}
        onClick={() => {
          mutation.mutate();
        }}
      >
        Claim
      </button>
    </>
  )
}
