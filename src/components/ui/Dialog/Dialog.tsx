import React from "react";
import * as RDialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import classNames from "classnames";
import { MdClose } from "react-icons/md";
import s from "./dialog.module.css";

export default function Dialog({
  trigger,
  title,
  description,
  className,
  children,
  ...props
}: React.PropsWithChildren<
  RDialog.DialogProps & {
    trigger: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
  }
>) {
  return (
    <RDialog.Root {...props}>
      <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>
      <RDialog.Portal>
        <RDialog.Overlay className={s.overlay}>
          <RDialog.Content
            className={classNames(s.content, className)}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {title ? (
              <RDialog.Title className={s.title}>{title}</RDialog.Title>
            ) : (
              <VisuallyHidden.Root>
                <RDialog.Title>{title}</RDialog.Title>
              </VisuallyHidden.Root>
            )}
            {description ? (
              <RDialog.Description className={s.description}>
                {description}
              </RDialog.Description>
            ) : (
              <VisuallyHidden.Root>
                <RDialog.Description>{description}</RDialog.Description>
              </VisuallyHidden.Root>
            )}
            {children}
            <RDialog.Close asChild>
              <button className={s.closeButton} aria-label="Close">
                <MdClose size={20} />
              </button>
            </RDialog.Close>
          </RDialog.Content>
        </RDialog.Overlay>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
