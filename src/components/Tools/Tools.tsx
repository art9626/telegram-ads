import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaChevronRight,
} from "react-icons/fa";
import { useServices } from "../../providers/ServicesProvider";
import UserInfo from "../UserInfo/UserInfo";
import Dialog from "../ui/Dialog/Dialog";
import { TabTypes } from "../Tabs/Tabs";
import s from "./tools.module.css";
import { ITool } from "../../api/Services";
import Button from "../ui/Button/Button";
import { toast } from "react-toastify";
import { useHapticFeedback } from "@tma.js/sdk-react";
import { useUser } from "../../providers/UserProvider";
import { numberSeparatedBySpaces } from "../../utils/convert";

export default function Tools() {
  const { getTools } = useServices();
  const { data: tools } = useQuery({
    queryKey: ["tools"],
    queryFn: getTools,
  });

  return (
    <div className={s.container}>
      <UserInfo tab={TabTypes.TOOLS} />
      {!tools ? (
        <div>Loading...</div>
      ) : (
        <ul className={s.toolsList}>
          {tools.filter(tool => tool.unlocked).map((tool: ITool) => (
            <Tool key={tool.id} tool={tool} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function Tool({ tool }: { tool: ITool }) {
  const { name, desc, level, base_cost, upgrade_rate } = tool;
  const cost = Math.floor(base_cost * Math.pow(upgrade_rate, level))
  return (
    <Dialog
      className={s.toolDialog}
      title={name}
      description={desc}
      trigger={
        <li className={s.toolsItem}>
          <div className={s.itemContent}>
            <h4>{name}</h4>
            <div className={s.requirementsList}>
              <b className={s.requirementsItem}>Level {level}</b>
              <b className={s.requirementsItem}>Cost: {numberSeparatedBySpaces(cost)}</b>
            </div>
          </div>
          <FaChevronRight size={20} />
        </li>
      }
    >
      <ToolDialogContent tool={tool} />
    </Dialog>
  );
}

function ToolDialogContent({ tool }: { tool: ITool }) {
  const { level, base_cost, upgrade_rate, base_production, produced, description } = tool;

  const { data: user } = useUser();
  const cost = Math.floor(base_cost * Math.pow(upgrade_rate, level))

  const available = (user?.data.balance || 0) > base_cost * Math.pow(upgrade_rate, level)
  const production = level == 0 ? base_production : level * base_production
  const { upgradeTool } = useServices();
  const hf = useHapticFeedback();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: upgradeTool,
    onSuccess: (data) => {
      queryClient.setQueryData(["tools"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return (
    <div className={s.ToolDialogContent}>
      <p>{description}</p>
      <p>Level: {level}</p>
      <p>Base production: {numberSeparatedBySpaces(base_production)}</p>
      <p>Production: {numberSeparatedBySpaces(production)}</p>
      <p>Produced: {numberSeparatedBySpaces(produced)}</p>
      <Button
        disabled={!available}
        className={s.upButton}
        onClick={() => {
          hf.impactOccurred("medium");
          if (isPending) return;
          mutate(tool.id, {
            onError: (e) => toast(e.message, { type: "error" }),
          });
        }}
      >
        Upgrade {numberSeparatedBySpaces(cost)} gold
      </Button>
    </div>
  );
}
