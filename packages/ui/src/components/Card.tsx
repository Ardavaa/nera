import React from "react";
import { cn } from "../tokens";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "highlight" | "danger";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-[20px] shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-4 sm:p-5 transition-all",
        {
          "hover:shadow-md": variant === "default",
          "shadow-[0_8px_24px_rgba(108,92,231,0.12)] border-[#6C5CE7]/30": variant === "elevated",
          "bg-gradient-to-br from-white to-[#F8FAFC] border-[#6C5CE7]/40": variant === "highlight",
          "bg-[#FBE4DE]/30 border-[#EF4444]/40": variant === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
