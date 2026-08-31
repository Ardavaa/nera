"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../tokens";

export interface CountdownTimerProps {
  targetTime: number; // epoch timestamp
  onExpired?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetTime,
  onExpired,
  className,
  size = "md",
}) => {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, targetTime - Date.now());
      setRemaining(diff);
      if (diff <= 0 && onExpired) {
        onExpired();
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime, onExpired]);

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const isExpired = remaining <= 0;

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("text-center", className)}>
      <div
        className={cn(
          "font-mono font-black tracking-widest tabular-nums",
          sizeClasses[size],
          isExpired ? "text-[#22C55E]" : "text-[#EF4444]"
        )}
      >
        {isExpired ? "00:00:00" : `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
      </div>
      <p className="text-[10px] font-semibold text-[#64748B] mt-1 uppercase tracking-wider">
        {isExpired ? "Jeda telah berakhir" : "Sisa Waktu Jeda"}
      </p>
    </div>
  );
};
