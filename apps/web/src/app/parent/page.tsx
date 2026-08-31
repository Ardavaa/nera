"use client";

import React from "react";
import { TopAppBar } from "../../components/common/TopAppBar";
import { useFinancialStore } from "../../context/FinancialStore";
import { Card, RiskGauge } from "@nera/ui";
import { ParentPairingCard } from "../../components/parent/ParentPairingCard";
import { EmergencyTopUpCard } from "../../components/parent/EmergencyTopUpCard";
import { ShieldCheck, EyeOff, ChevronDown } from "lucide-react";

// PRIVACY NOTE: this page must never render individual transactions or
// merchant names — only the aggregate score/status, mirroring the
// "Batasan Sebelum Manfaat" consent already established in Family Hub.
export default function ParentDashboardPage() {
  const { userName, score, state, isParentPaired, emergencyTopUpRequests } = useFinancialStore();

  if (!isParentPaired) {
    return (
      <div className="flex flex-col min-h-full">
        <TopAppBar />
        <ParentPairingCard />
      </div>
    );
  }

  const pendingRequests = emergencyTopUpRequests.filter((r) => r.status === "pending");

  const stateConfig = {
    AMAN: {
      label: "Aman",
      color: "#22C55E",
      copy: "Kondisi finansial anak Anda sehat dan terpantau baik.",
    },
    WASPADA: {
      label: "Waspada",
      color: "#FBBF24",
      copy: "Perlu perhatian — anak Anda mendekati batas pengeluaran aman.",
    },
    KRITIS: {
      label: "Kritis",
      color: "#EF4444",
      copy: "Butuh perhatian segera — hubungi anak Anda untuk berdiskusi.",
    },
  }[state];

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC]">
      <TopAppBar />

      <main className="flex-1 px-4 pt-3.5 pb-6 space-y-4">
        {/* CHILD SELECTOR */}
        <button className="flex items-center gap-2.5 bg-white border border-[#E2E8F0] rounded-full pl-1.5 pr-3.5 py-1.5 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-bold text-[#0F172A]">{userName}</span>
          <ChevronDown size={14} className="text-[#94A3B8]" />
        </button>

        <p className="text-sm text-[#64748B] -mt-2">Ringkasan untuk orang tua</p>

        {/* HERO CARD: Child Safety Status */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#F5F3FF] p-4 shadow-xs">
          <span className="absolute top-5 right-9 text-[#6C5CE7] text-xs select-none animate-pulse">✦</span>
          <span className="absolute top-16 right-5 text-[#6C5CE7]/60 text-[9px] select-none animate-pulse delay-500">✦</span>
          <span className="absolute bottom-16 right-7 text-[#6C5CE7]/70 text-[10px] select-none animate-pulse delay-700">✦</span>
          <span className="absolute bottom-6 right-16 text-[#6C5CE7]/50 text-[9px] select-none animate-pulse delay-300">✦</span>

          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Status Keamanan Finansial
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <ShieldCheck size={22} style={{ color: stateConfig.color }} />
                <h2 className="text-[28px] font-bold text-[#0F172A] tracking-tight leading-none">
                  {stateConfig.label}
                </h2>
              </div>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed max-w-[210px]">
                {stateConfig.copy}
              </p>
            </div>
            <RiskGauge score={score} state={state} size="sm" />
          </div>
        </div>

        <Card className="p-3.5 bg-white border-dashed flex items-start gap-2.5">
          <EyeOff size={16} className="text-[#6C5CE7] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            Demi privasi anak Anda, Nera <strong className="text-[#0F172A]">tidak menampilkan</strong> riwayat transaksi atau nama merchant — hanya status keamanan finansial secara umum.
          </p>
        </Card>

        {pendingRequests.length > 0 && (
          <section className="space-y-2.5">
            <h3 className="text-[15px] font-bold text-[#0F172A]">Insight Nera</h3>
            {pendingRequests.map((request) => (
              <EmergencyTopUpCard key={request.id} request={request} />
            ))}
          </section>
        )}

        <Card className="p-4 space-y-2 bg-[#F5F3FF] border-[#6C5CE7]/20">
          <div className="flex items-center gap-2 text-[#6C5CE7]">
            <ShieldCheck size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Terenkripsi BNI</h3>
          </div>
          <p className="text-xs text-[#0F172A] leading-relaxed">
            Akses ini bersifat read-only dan bisa dicabut kapan saja lewat aplikasi wondr by BNI milik Anda.
          </p>
        </Card>
      </main>
    </div>
  );
}
