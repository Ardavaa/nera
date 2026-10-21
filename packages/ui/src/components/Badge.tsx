import React from "react";
import { cn, STATUS_COLORS } from "../tokens";
import { FinancialStatus } from "@nera/core";

export interface StatusBadgeProps {
  status: FinancialStatus;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
}) => {
  const config = STATUS_COLORS[status] || STATUS_COLORS.AMAN;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        config.bg,
        config.text,
        config.border,
        "border",
        className
      )}
    >
      {showIcon && (
        <span
          className={cn("w-2 h-2 rounded-full", {
            "bg-[#277449]": status === "AMAN",
            "bg-[#A36A00]": status === "WASPADA",
            "bg-[#C43737]": status === "KRITIS",
          })}
        />
      )}
      {config.label}
    </span>
  );
};
