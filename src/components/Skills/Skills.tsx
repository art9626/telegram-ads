import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaChevronRight,
} from "react-icons/fa";

import { ISkill } from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider";
import UserInfo from "../UserInfo/UserInfo";
import Dialog from "../ui/Dialog/Dialog";
import { TabTypes } from "../Tabs/Tabs";
import s from "./skills.module.css";
import { useUser } from "../../providers/UserProvider";
import Button from "../ui/Button/Button";
import { useHapticFeedback } from "@tma.js/sdk-react";
import { toast } from "react-toastify";

export default function Skills() {
  const { getSkills } = useServices();
  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  const { data: user } = useUser();

  return (
    <div className={s.container}>
      <UserInfo tab={TabTypes.SKILLS} />
      <h4>Skill points: {user?.data.skill_points}</h4>
      {
        !skills ? (
          <div>Loading...</div>
        ) : (
          <ul className={s.skillsList}>
            {skills.map((skill: ISkill) => (
              <Skill key={skill.id} skill={skill} />
            ))}
          </ul>
        )
      }
    </div >
  );
}

export function Skill({ skill }: { skill: ISkill }) {
  const { name, description, level } = skill;
  return (
    <Dialog
      className={s.skillDialog}
      title={name}
      description={description}
      trigger={
        <li className={s.skillsItem}>
          <div className={s.itemContent}>
            <h4>{name}</h4>
            <b>Level {level}</b>
          </div>
          <FaChevronRight size={20} />
        </li>
      }
    >
      <SkillDialogContent skill={skill} />
    </Dialog>
  );
}


function SkillDialogContent({ skill }: { skill: ISkill }) {
  const { data: user } = useUser();
  const { upgradeSkill } = useServices();
  const hf = useHapticFeedback();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: upgradeSkill,
    onSuccess: (data) => {
      queryClient.setQueryData(["skills"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return (
    <div className={s.SkillDialogContent}>
      <Button
        disabled={user?.data.skill_points == 0}
        className={s.upButton}
        onClick={() => {
          hf.impactOccurred("medium");
          if (isPending) return;
          mutate(skill.id, {
            onError: (e) => toast(e.message, { type: "error" }),
          });
        }}
      >
        Learn skill
      </Button>
    </div>
  );
}
