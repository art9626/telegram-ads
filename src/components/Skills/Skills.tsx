import { useQuery } from "@tanstack/react-query";
import {
  FaChevronRight,
} from "react-icons/fa";

import { ISkill } from "../../api/Services";
import { useServices } from "../../providers/ServicesProvider";
import UserInfo from "../UserInfo/UserInfo";
import Dialog from "../ui/Dialog/Dialog";
import { TabTypes } from "../Tabs/Tabs";
import s from "./skills.module.css";

export default function Skills() {
  const { getSkills } = useServices();
  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  return (
    <div className={s.container}>
      <UserInfo tab={TabTypes.SKILLS} />
      {!skills ? (
        <div>Loading...</div>
      ) : (
        <ul className={s.perksList}>
          {skills.map((skill: ISkill) => (
            <Skill key={skill.id} skill={skill} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function Skill({ skill }: { skill: ISkill }) {
  const { name, effect_desc, level } = skill;

  return (
    <Dialog
      className={s.perkDialog}
      title={name}
      description={effect_desc}
      trigger={
        <li className={s.perksItem}>
          <div className={s.itemContent}>
            <h4>{name}</h4>
            <b>Level {level}</b>
          </div>
          <FaChevronRight size={20} />
        </li>
      }
    >
    </Dialog>
  );
}
