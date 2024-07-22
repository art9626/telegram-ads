import React from "react";
import classNames from "classnames";
import s from "./button.module.css";

function ButtonComponent(
  {
    className,
    ...props
  }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button className={classNames(className, s.button)} {...props} ref={ref} />
  );
}

const Button = React.forwardRef(ButtonComponent);
export default Button;
