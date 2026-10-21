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
        "rounded-[22px] border border-[#E9E5DD] bg-white p-4 sm:p-5",
        {
          "border-[#D8D3C9]": variant === "elevated",
          "border-[#EEDB9A] bg-[#FFF8E6]": variant === "highlight",
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
