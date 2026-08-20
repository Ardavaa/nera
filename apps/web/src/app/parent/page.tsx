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
        <TopAppBar title="Nera Family Hub" />
        <ParentPairingCard />
      </div>
    );
  }

  const pendingRequests = emergencyTopUpRequests.filter((r) => r.status === "pending");

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="Ringkasan Keamanan Anak" />

      <main className="flex-1 px-4 py-4 space-y-4">
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Status Finansial
              </span>
              <h3 className="text-base font-bold text-[#0F172A] mt-0.5">{userName}</h3>
            </div>
            <RiskGauge score={score} state={state} size="sm" />
          </div>
          <StatusBadge status={state} />
        </Card>

        <Card className="p-3.5 bg-[#F8FAFC] border-dashed flex items-start gap-2.5">
          <EyeOff size={16} className="text-[#64748B] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            Demi privasi anakmu, Nera <strong className="text-[#0F172A]">tidak menampilkan</strong> riwayat transaksi atau nama merchant di sini — hanya status keamanan finansial secara umum.
          </p>
        </Card>

        {pendingRequests.map((request) => (
          <EmergencyTopUpCard key={request.id} request={request} />
        ))}

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
