import React from "react";
import { Toast, ToastTitle, ToastDescription, ToastClose } from "./Toast";
import { useToast } from "@/hooks/useToast";

/** single place to render toasts (Mount once in App root) */
export function Toaster() {
  const { toasts, toast, dismissToast } = useToast();

  return (
    <div aria-live="polite" className="pointer-events-none">
      {/* optional demo button left for manual testing (remove if not needed) */}
      {/* <div className="fixed left-4 top-4 z-50"><button onClick={() => toast({ title: 'Demo', description: 'Testing' })}>demo</button></div> */}

      {toasts.map(({ id, title, description, open = true }) => (
        <Toast
          key={id}
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) dismissToast(id);
          }}
        >
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
    </div>
  );
}
