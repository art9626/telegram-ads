import {IAchievement} from "../../api/Services";
import {useServices} from "../../providers/ServicesProvider.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import s from "./achievements.module.css";
import {useHapticFeedback} from "@tma.js/sdk-react";
import UserInfo from "../UserInfo/UserInfo.tsx";

export default function Achievements() {
  const { getAchievements } = useServices();
  const { data: achievements } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
  });

  return (
    <div className={s.container}>
      <UserInfo/>
      <ul className={s.achievementsList}>
        {achievements?.achievements
          .sort((a, b) => a.id - b.id)
          .map((achievement: IAchievement) => {
            return <Achievement achievement={achievement} key={achievement.id} />;
        })}
      </ul>
    </div>
  );
}

export function Achievement({ achievement }: { achievement: IAchievement }) {
  const { claimAchievement } = useServices();
  const hf = useHapticFeedback();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: claimAchievement,
    onSuccess: (data) => {
      queryClient.setQueryData(["achievements"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <li className={s.achievementsItem}>
      <div className={s.itemContent}>
        <h4>{achievement.name}</h4>
        <div>
          <span>{achievement.description}</span>
          <div>Reward: {Math.floor(achievement.reward / 10e9)}</div>
        </div>
        <button
          className={s.upButton}
          disabled={achievement.claimed}
          onClick={() => {
            hf.impactOccurred("medium");
            mutation.mutate(achievement.id);
          }}
        >
          Claim
        </button>
      </div>
    </li>
  );
}
