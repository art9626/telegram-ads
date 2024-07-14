import * as RProgress from "@radix-ui/react-progress";
import s from "./progress.module.css";

export default function Progress(props: RProgress.ProgressProps) {
  const max = props.max ?? 10;
  const value = props.value ?? 5;

  return (
    <RProgress.Root {...props} className={s.root}>
      <RProgress.Indicator
        className={s.indicator}
        style={{
          transform: `translateX(-${100 - (value * 100) / max}%)`,
        }}
      />
    </RProgress.Root>
  );
}
