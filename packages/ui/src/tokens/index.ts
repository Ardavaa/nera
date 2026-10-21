import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STATUS_COLORS = {
  AMAN: {
    bg: "bg-[#DDF0E6]",
    text: "text-[#277449]",
    border: "border-[#277449]/20",
    badge: "bg-[#277449] text-white",
    label: "Aman",
  },
  WASPADA: {
    bg: "bg-[#FFF3D6]",
    text: "text-[#A36A00]",
    border: "border-[#A36A00]/20",
    badge: "bg-[#FFF0BD] text-[#47310A]",
    label: "Waspada",
  },
  KRITIS: {
    bg: "bg-[#FBE4DE]",
    text: "text-[#C43737]",
    border: "border-[#C43737]/20",
    badge: "bg-[#EF4444] text-white",
    label: "Kritis",
  },
} as const;
