import {useServices} from "../providers/ServicesProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@radix-ui/themes";

export default function Achievements() {
  const { getAchievements } = useServices();
  const { claimAchievement } = useServices();
  const { data: achievements } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
  });

  return(
      <>
        <h1>Achievements</h1>
        {achievements?.achievements.map((achievement) => {
          return(
            <div>
              <div>{achievement.id}</div>
              <div>{achievement.name}</div>
              <div>{achievement.description}</div>
              <div>{achievement.reward / 10e9}</div>
              <Button
                disabled={achievement.claimed}
                onClick={() => {
                  claimAchievement(achievement.id).then((r) => console.log("achievement claimed", r));
                }}
                size={"3"}
              >
                Claim
              </Button>
            </div>
          )
        })}
      </>
  )
}
