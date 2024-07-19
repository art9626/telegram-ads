import {useServices} from "../../providers/ServicesProvider.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import s from "./rewards.module.css";
import {IDailyReward} from "../../api/Services.ts";

function dayClaimed(reward: IDailyReward, streak: number) {
  return reward.day <= streak
}

export default function DailyRewards() {
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
    <div className={s.container}>
      <h1>Daily rewards</h1>
      <div>Visit AdVenture every day and get extra rewarded!</div>
      <div className={s.days}>
        {rewards?.rewards.map((reward, index) => {
          return <DailyReward reward={reward} key={index} streak={rewards.current_streak}/>;
        })}
      </div>
      <button
        className={s.upButton}
        disabled={!rewards?.can_claim}
        onClick={() => {
          mutation.mutate();
        }}
      >
        Claim
      </button>
    </div>
  )
}

export function DailyReward({reward, streak}: { reward: IDailyReward, streak: number }) {
  return (
    <div className={dayClaimed(reward, streak) ? s.dayClaimed : s.day}>
      {reward.day}
    </div>
  )
}
