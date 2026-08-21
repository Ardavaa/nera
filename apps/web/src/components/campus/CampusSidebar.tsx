"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShieldCheck, BellRing, ChevronDown, MapPin, GraduationCap, Users } from "lucide-react";
import { cn } from "@nera/ui";
import { CAMPUS_PROFILE } from "@nera/core";

const NAV_ITEMS = [
  { label: "Ringkasan", href: "/campus", icon: LayoutGrid },
  { label: "Kohort Risiko", href: "/campus/cohorts", icon: ShieldCheck },
  { label: "Peringatan", href: "/campus/alerts", icon: BellRing },
];

export const CampusSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-72 shrink-0 min-h-screen bg-white border-r border-[#E2E8F0] flex flex-col">
      <div className="p-6 space-y-2.5">
        <div className="flex items-center gap-3">
          <Image
            src="/logos/nera-logo.png"
            alt="Nera Logo"
            width={100}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
          <div className="h-5 w-[1.5px] bg-[#CBD5E1]" />
          <Image
            src="/logos/wondr-bni.svg"
            alt="wondr by BNI"
            width={105}
            height={28}
            className="h-6 w-auto object-contain"
            priority
          />
        </div>
        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
          Campus Financial Safety
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                  : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-2.5">
        <div className="flex items-center justify-center gap-3 text-[10px] font-medium text-[#94A3B8]">
          <span>Lihat sebagai:</span>
          <Link href="/" className="flex items-center gap-1 hover:text-[#6C5CE7] transition-colors">
            <GraduationCap size={11} /> Mahasiswa
          </Link>
          <span>·</span>
          <Link href="/parent" className="flex items-center gap-1 hover:text-[#6C5CE7] transition-colors">
            <Users size={11} /> Orang Tua
          </Link>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F5F3FF] cursor-pointer hover:bg-[#EDE9FE] transition-colors">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-sm">
              N
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white border-2 border-[#F5F3FF] flex items-center justify-center">
              <MapPin size={9} className="text-[#6C5CE7]" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#0F172A] truncate">{CAMPUS_PROFILE.name}</p>
            <p className="text-[11px] text-[#64748B] truncate">{CAMPUS_PROFILE.institution}</p>
          </div>
          <ChevronDown size={16} className="text-[#94A3B8] shrink-0" />
        </div>
      </div>
    </aside>
  );
};
