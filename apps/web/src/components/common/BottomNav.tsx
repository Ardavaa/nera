"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShieldAlert,
  Users,
  LifeBuoy,
  TrendingUp,
} from "lucide-react";
import { cn } from "@nera/ui";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Beranda",
      href: "/",
      icon: Home,
    },
    {
      label: "Cek Risiko",
      href: "/risk-check",
      icon: ShieldAlert,
    },
    {
      label: "Keluarga",
      href: "/family-hub",
      icon: Users,
    },
    {
      label: "Pemulihan",
      href: "/recovery",
      icon: LifeBuoy,
    },
    {
      label: "Investasi",
      href: "/wealth-engine",
      icon: TrendingUp,
    },
  ];

  return (
    <nav className="absolute bottom-0 inset-x-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-2 pt-1.5 shadow-[0_-4px_20px_rgba(15,23,42,0.04)] pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150",
                {
                  "text-[#6C5CE7] font-bold": isActive,
                  "text-[#64748B] hover:text-[#0F172A] font-medium": !isActive,
                }
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={cn("transition-transform duration-150", {
                    "fill-[#6C5CE7]/15 stroke-[2.2]": isActive,
                    "stroke-[1.8]": !isActive,
                  })}
                />
              </div>
              <span
                className={cn("text-[11px] mt-0.5 tracking-tight", {
                  "font-bold text-[#6C5CE7]": isActive,
                  "font-normal text-[#64748B]": !isActive,
                })}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-[#CBD5E1] rounded-full mx-auto mt-1" />
    </nav>
  );
};
