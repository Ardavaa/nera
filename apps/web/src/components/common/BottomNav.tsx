"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFinancialStore } from "../../context/FinancialStore";
import {
  Home,
  Users,
  ShieldAlert,
  TrendingUp,
  BotMessageSquare,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@nera/ui";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { state } = useFinancialStore();

  const isCritical = state === "KRITIS";

  const navItems = [
    {
      label: "Beranda",
      href: "/",
      icon: Home,
    },
    {
      label: "Family Hub",
      href: "/family-hub",
      icon: Users,
    },
    {
      label: "Risk Guard",
      href: "/risk-check",
      icon: ShieldAlert,
    },
    {
      label: "Wealth",
      href: "/wealth-engine",
      icon: TrendingUp,
      disabled: state !== "AMAN",
    },
    {
      label: isCritical ? "Recovery" : "NerAI",
      href: isCritical ? "/recovery" : "/coach",
      icon: isCritical ? LifeBuoy : BotMessageSquare,
      highlight: isCritical,
    },
  ];

  return (
    <nav className="fixed bottom-0 z-40 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all",
                {
                  "text-[#6C5CE7] font-semibold": isActive && !item.highlight,
                  "text-[#64748B] hover:text-[#0F172A]": !isActive && !item.highlight && !item.disabled,
                  "text-[#EF4444] font-bold animate-pulse": item.highlight && isActive,
                  "text-[#EF4444]": item.highlight && !isActive,
                  "opacity-40 cursor-not-allowed": item.disabled,
                }
              )}
            >
              <div className="relative">
                <Icon size={20} />
                {item.disabled && (
                  <span className="absolute -top-1 -right-1 text-[8px] bg-slate-200 text-slate-500 rounded-full px-1">
                    🔒
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
