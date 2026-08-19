import React from "react";
import { cn } from "../tokens";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "bni" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-[14px] transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        {
          "bg-[#6C5CE7] hover:bg-[#5B4CD4] text-white shadow-sm": variant === "primary",
          "bg-[#4EA8FF] hover:bg-[#3B96ED] text-white shadow-sm": variant === "secondary",
          "bg-[#00747F] hover:bg-[#005F68] text-white shadow-sm": variant === "bni",
          "bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A]": variant === "outline",
          "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-sm": variant === "danger",
          "bg-transparent hover:bg-slate-100 text-[#64748B]": variant === "ghost",
          "text-xs px-3 py-1.5 h-8": size === "sm",
          "text-sm px-4 py-2.5 h-11": size === "md",
          "text-base px-6 py-3.5 h-13 font-semibold": size === "lg",
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};
