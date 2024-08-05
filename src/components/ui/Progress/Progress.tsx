import * as RProgress from "@radix-ui/react-progress";
import s from "./progress.module.css";
import classNames from "classnames";
import {HTMLAttributes} from "react";

type TVariants = "sm" | "md" | "lg";

interface IProgressProps extends RProgress.ProgressProps {
  size?: TVariants;
  label?: string;
  indProps?: HTMLAttributes<HTMLDivElement>;
  labelProps?: HTMLAttributes<HTMLDivElement>;
}

const variants: Record<TVariants, string> = {
  sm: s.sm,
  lg: s.lg,
  md: s.md,
};

export default function Progress({ size, label, indProps, labelProps, ...props }: IProgressProps) {
  const variantClass = size ? variants[size] : variants.md;
  const max = props.max ?? 10;
  const value = props.value ?? 5;

  return (
    <RProgress.Root {...props} className={classNames(s.root, variantClass)}>
      <RProgress.Indicator
        className={s.indicator}
        style={{
          transform: `translateX(-${100 - (value * 100) / max}%)`,
          ...indProps?.style
        }}
      />
      {!!label && <div {...labelProps} className={s.label}>{label}</div>}
    </RProgress.Root>
  );
}
