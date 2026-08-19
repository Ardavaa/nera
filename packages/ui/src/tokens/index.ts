import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STATUS_COLORS = {
  AMAN: {
    bg: "bg-[#DDF0E6]",
    text: "text-[#22C55E]",
    border: "border-[#22C55E]/30",
    badge: "bg-[#22C55E] text-white",
    label: "Aman",
  },
  WASPADA: {
    bg: "bg-[#FBF0D9]",
    text: "text-[#FBBF24]",
    border: "border-[#FBBF24]/30",
    badge: "bg-[#FBBF24] text-[#0F172A]",
    label: "Waspada",
  },
  KRITIS: {
    bg: "bg-[#FBE4DE]",
    text: "text-[#EF4444]",
    border: "border-[#EF4444]/30",
    badge: "bg-[#EF4444] text-white",
    label: "Kritis",
  },
} as const;
