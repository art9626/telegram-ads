import React from "react";
import * as RDialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Cross2Icon } from "@radix-ui/react-icons";
import s from "./dialog.module.css";

export default function Dialog({
  trigger,
  title,
  description,
  children,
  ...props
}: React.PropsWithChildren<
  RDialog.DialogProps & {
    trigger: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
  }
>) {
  return (
    <RDialog.Root {...props}>
      <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>
      <RDialog.Portal>
        <RDialog.Overlay className={s.overlay} />
        <RDialog.Content
          className={s.content}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {title ? (
            <RDialog.Title>{title}</RDialog.Title>
          ) : (
            <VisuallyHidden.Root>
              <RDialog.Title>{title}</RDialog.Title>
            </VisuallyHidden.Root>
          )}
          {description ? (
            <RDialog.Description>{description}</RDialog.Description>
          ) : (
            <VisuallyHidden.Root>
              <RDialog.Description>{description}</RDialog.Description>
            </VisuallyHidden.Root>
          )}
          {children}
          <RDialog.Close asChild>
            <button className={s.closeButton} aria-label="Close">
              <Cross2Icon fontSize={20} />
            </button>
          </RDialog.Close>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
