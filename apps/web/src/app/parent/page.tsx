"use client";

import React from "react";
import { TopAppBar } from "../../components/common/TopAppBar";
import { useFinancialStore } from "../../context/FinancialStore";
import { Card, StatusBadge, RiskGauge } from "@nera/ui";
import { ParentPairingCard } from "../../components/parent/ParentPairingCard";
import { EmergencyTopUpCard } from "../../components/parent/EmergencyTopUpCard";
import { ShieldCheck, EyeOff } from "lucide-react";

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

  const stateCopy = {
    AMAN: "Kondisi finansial anakmu sehat dan terpantau baik.",
    WASPADA: "Perlu perhatian — anakmu mendekati batas pengeluaran aman.",
    KRITIS: "Butuh perhatian segera — hubungi anakmu untuk berdiskusi.",
  }[state];

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC]">
      <TopAppBar />

      <main className="flex-1 px-4 pt-3.5 pb-6 space-y-4">
        {/* HERO CARD: Child Safety Status */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#E3F3F1] via-[#EAF7F9]/40 to-white p-4 shadow-xs">
          <span className="absolute top-6 right-10 text-[#00747F] text-xs select-none animate-pulse">✦</span>
          <span className="absolute top-14 right-16 text-[#4EA8FF] text-[9px] select-none animate-pulse delay-500">✦</span>

          <StatusBadge status={state} />

          <div className="mt-2.5 flex items-center justify-between gap-3 relative z-10">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0F172A]">Status Keamanan Finansial</p>
              <h2 className="text-[26px] font-bold text-[#0F172A] tracking-tight leading-tight mt-0.5 truncate">
                {userName}
              </h2>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{stateCopy}</p>
            </div>
            <RiskGauge score={score} state={state} size="sm" />
          </div>
        </div>

        <Card className="p-3.5 bg-white border-dashed flex items-start gap-2.5">
          <EyeOff size={16} className="text-[#64748B] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            Demi privasi anakmu, Nera <strong className="text-[#0F172A]">tidak menampilkan</strong> riwayat transaksi atau nama merchant di sini — hanya status keamanan finansial secara umum.
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

        <Card className="p-4 space-y-2 bg-[#EAF4FF] border-[#4EA8FF]/30">
          <div className="flex items-center gap-2 text-[#00747F]">
            <ShieldCheck size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Terenkripsi BNI</h3>
          </div>
          <p className="text-xs text-[#0F172A] leading-relaxed">
            Akses ini bersifat read-only dan bisa dicabut kapan saja lewat aplikasi wondr by BNI milikmu.
          </p>
        </Card>
      </main>
    </div>
  );
}
