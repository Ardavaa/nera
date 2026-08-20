import React from "react";
import { cn } from "../tokens";
import { Check } from "lucide-react";

export interface StepProgressItem {
  id: string;
  label: string;
  description?: string;
  isCompleted: boolean;
  isActive?: boolean;
}

export interface StepProgressProps {
  steps: StepProgressItem[];
  className?: string;
  accentColor?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  className,
  accentColor = "#6C5CE7",
}) => {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.id} className="flex gap-3">
            {/* Vertical line + circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 transition-all",
                  step.isCompleted
                    ? "bg-[#22C55E] border-[#22C55E] text-white"
                    : step.isActive
                    ? "border-current text-white"
                    : "bg-white border-[#E2E8F0] text-[#64748B]"
                )}
                style={
                  step.isActive && !step.isCompleted
                    ? { backgroundColor: accentColor, borderColor: accentColor }
                    : undefined
                }
              >
                {step.isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  idx + 1
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[24px] transition-all",
                    step.isCompleted ? "bg-[#22C55E]" : "bg-[#E2E8F0]"
                  )}
                />
              )}
            </div>

            {/* Label + description */}
            <div className={cn("pb-4", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-xs font-bold leading-tight pt-1",
                  step.isCompleted
                    ? "text-[#22C55E]"
                    : step.isActive
                    ? "text-[#0F172A]"
                    : "text-[#64748B]"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
