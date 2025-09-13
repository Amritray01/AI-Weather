import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function 'cn' to combine class names, with Tailwind merge support.
 * Usage:
 * cn("p-4", "bg-red-500", condition && "text-white")
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
