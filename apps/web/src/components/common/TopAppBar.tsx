"use client";

import React from "react";
import { useFinancialStore } from "../../context/FinancialStore";
import { StatusBadge } from "@nera/ui";
import { Bell, ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import Link from "next/link";

export interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title }) => {
  const { userName, campus, state, score } = useFinancialStore();

  const StatusIcon =
    state === "AMAN" ? ShieldCheck : state === "WASPADA" ? AlertTriangle : ShieldAlert;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Branding or Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6C5CE7] to-[#4EA8FF] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            N
          </div>
          <div>
            {title ? (
              <h1 className="text-base font-bold text-[#0F172A]">{title}</h1>
            ) : (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#00747F]">wondr by BNI</span>
                  <span className="text-[10px] bg-[#6C5CE7]/10 text-[#6C5CE7] font-bold px-1.5 py-0.2 rounded-full">
                    NERA
                  </span>
                </div>
                <p className="text-xs text-[#64748B] font-medium truncate max-w-[170px]">
                  {userName} • {campus}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Score & Notification */}
        <div className="flex items-center gap-2">
          <Link href="/risk-check" className="flex items-center">
            <StatusBadge status={state} className="shadow-xs cursor-pointer" />
          </Link>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] hover:bg-slate-100 transition-colors">
            <Bell size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
