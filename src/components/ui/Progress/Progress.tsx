import * as RProgress from "@radix-ui/react-progress";
import s from "./progress.module.css";

interface IProgressProps extends RProgress.ProgressProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function Progress(props: IProgressProps) {
  const max = props.max ?? 10;
  const value = props.value ?? 5;
  const size = props.size ?? 'md'
  const showLabel = props.showLabel ?? false;

  return (
    <RProgress.Root {...props} className={`${s.root} ${s[size]}`}>
      <RProgress.Indicator
        className={s.indicator}
        style={{
          transform: `translateX(-${100 - (value * 100) / max}%)`,
        }}
      />
      <div className={s.progressLabel}>{showLabel ? `${value}/${max}` : ""}</div>
    </RProgress.Root>
  );
}
