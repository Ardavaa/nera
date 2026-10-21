"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, SlidersHorizontal } from "lucide-react";
import { cn } from "@nera/ui";

export const ParentBottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Ringkasan", href: "/parent", icon: LayoutDashboard },
    { label: "Alokasi", href: "/parent/allowance", icon: SlidersHorizontal },
  ];

  return (
    <nav className="absolute bottom-0 inset-x-0 z-40 w-full border-t border-[#F0EEE9] bg-white/95 px-2 pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-6 rounded-xl",
                {
                  "text-[#76520E] font-bold": isActive,
                  "text-[#736B60] hover:text-[#2F240E] font-medium": !isActive,
                }
              )}
            >
              <Icon
                size={22}
                className={cn({
                  "fill-[#FFB900]/15 stroke-[2.2]": isActive,
                  "stroke-[1.8]": !isActive,
                })}
              />
              <span
                className={cn("text-[11px] mt-0.5 tracking-tight", {
                  "font-bold text-[#76520E]": isActive,
                  "font-normal text-[#736B60]": !isActive,
                })}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="w-32 h-1 bg-[#D8D3C9] rounded-full mx-auto mt-1" />
    </nav>
  );
};
