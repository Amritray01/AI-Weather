import React from "react";
import Index from "@/pages/Index";
import { Toaster } from "@/components/ui/Toaster";
import { TooltipProvider } from "@/components/ui/Tooltip";

export default function App() {
  return (
    <>
      <TooltipProvider>
        <Index />
        {/* Render the Toaster once so toasts appear */}
        <Toaster />
      </TooltipProvider>
    </>
  );
}
