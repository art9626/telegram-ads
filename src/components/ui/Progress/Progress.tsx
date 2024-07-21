import * as RProgress from "@radix-ui/react-progress";
import s from "./progress.module.css";
import classNames from "classnames";

type TVariants = "sm" | "md" | "lg";

interface IProgressProps extends RProgress.ProgressProps {
  size?: TVariants;
  label?: string;
}

const variants: Record<TVariants, string> = {
  sm: s.sm,
  lg: s.lg,
  md: s.md,
};

export default function Progress({ size, label, ...props }: IProgressProps) {
  const variantClass = size ? variants[size] : variants.md;
  const max = props.max ?? 10;
  const value = props.value ?? 5;

  return (
    <RProgress.Root {...props} className={classNames(s.root, variantClass)}>
      <RProgress.Indicator
        className={s.indicator}
        style={{
          transform: `translateX(-${100 - (value * 100) / max}%)`,
        }}
      />
      {!!label && <div className={s.label}>{label}</div>}
    </RProgress.Root>
  );
}
