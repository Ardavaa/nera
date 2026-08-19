import React from "react";
import { cn } from "../tokens";
import { FinancialStatus } from "@nera/core";

export interface RiskGaugeProps {
  score: number;
  state: FinancialStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  state,
  size = "md",
  className,
}) => {
  // Clamped score between 0 and 100
  const clampedScore = Math.min(100, Math.max(0, score));

  // Color selection
  const strokeColor =
    state === "AMAN" ? "#22C55E" : state === "WASPADA" ? "#FBBF24" : "#EF4444";
  const bgColor =
    state === "AMAN" ? "#DDF0E6" : state === "WASPADA" ? "#FBF0D9" : "#FBE4DE";

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  // Semi-circle or 3/4 circle
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const sizeClasses = {
    sm: "w-20 h-20 text-xs",
    md: "w-28 h-28 text-sm",
    lg: "w-36 h-36 text-base",
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="8"
          className="transition-all"
        />
        {/* Animated Progress */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold text-[#0F172A] leading-none">{clampedScore}</span>
        <span
          className="text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: bgColor, color: strokeColor }}
        >
          {state}
        </span>
      </div>
    </div>
  );
};
