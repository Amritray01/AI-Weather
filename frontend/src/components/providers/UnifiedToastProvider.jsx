import React from "react";
import { ToastProvider as RadixToastProvider, ToastViewport } from "@/components/ui/Toast";
import { ToastProvider as CustomToastProvider } from "@/hooks/useToast";

/**
 * Unified provider mounts both the Radix UI provider and your custom state provider.
 * Put this near the root (we used it in src/main.jsx).
 */
export function UnifiedToastProvider({ children }) {
  return (
    <RadixToastProvider>
      <CustomToastProvider>
        {children}
        <ToastViewport />
      </CustomToastProvider>
    </RadixToastProvider>
  );
}
