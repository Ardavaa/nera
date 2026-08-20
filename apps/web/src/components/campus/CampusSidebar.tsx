"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, Table2, BellRing, GraduationCap, Users } from "lucide-react";
import { cn } from "@nera/ui";

const NAV_ITEMS = [
  { label: "Ringkasan", href: "/campus", icon: LayoutGrid },
  { label: "Kohort Risiko", href: "/campus/cohorts", icon: Table2 },
  { label: "Peringatan", href: "/campus/alerts", icon: BellRing },
];

export const CampusSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-white border-r border-[#E2E8F0] flex flex-col">
      <div className="p-5 flex items-center gap-2.5 border-b border-[#E2E8F0]">
        <Image src="/logos/nera-logo.png" alt="Nera" width={90} height={28} className="h-6 w-auto object-contain" />
        <div className="h-5 w-px bg-[#E2E8F0]" />
        <span className="text-xs font-bold text-[#0F172A] leading-tight">
          Campus<br />Financial Safety
        </span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#00747F]/10 text-[#00747F]"
                  : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#E2E8F0] space-y-1">
        <span className="block px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
          Lihat Sebagai
        </span>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors"
        >
          <GraduationCap size={14} /> Tampilan Mahasiswa
        </Link>
        <Link
          href="/parent"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A] transition-colors"
        >
          <Users size={14} /> Tampilan Orang Tua
        </Link>
      </div>
    </aside>
  );
};
