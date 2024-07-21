import React from "react";
import classNames from "classnames";
import s from "./button.module.css";

export default function Button({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button className={classNames(className, s.button)} {...props}>
      {children}
    </button>
  );
}
