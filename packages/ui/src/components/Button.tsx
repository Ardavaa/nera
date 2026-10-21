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
        "inline-flex items-center justify-center rounded-[14px] font-medium transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BA8500] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        {
          "bg-[#FFB900] hover:bg-[#E6A700] text-[#352500]": variant === "primary",
          "bg-[#FFF0BD] hover:bg-[#FFE39A] text-[#5B410C]": variant === "secondary",
          "bg-[#3A2800] hover:bg-[#5A4009] text-white": variant === "bni",
          "border border-[#E9E5DD] bg-white hover:bg-[#F7F5F0] text-[#2F240E]": variant === "outline",
          "bg-[#C43737] hover:bg-[#A92F2F] text-white": variant === "danger",
          "bg-transparent hover:bg-[#F7F5F0] text-[#736B60]": variant === "ghost",
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
