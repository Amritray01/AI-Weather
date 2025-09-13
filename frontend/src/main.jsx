import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/index.css"; // your tailwind / global css
import { UnifiedToastProvider } from "@/components/providers/UnifiedToastProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UnifiedToastProvider>
      <App />
    </UnifiedToastProvider>
  </React.StrictMode>
);
