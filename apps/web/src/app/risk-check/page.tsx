"use client";

import React, { useState } from "react";
import { TopAppBar } from "../../components/common/TopAppBar";
import { useFinancialStore } from "../../context/FinancialStore";
import { Card, Button, RiskGauge, StatusBadge } from "@nera/ui";
import {
  simulateLoanImpact,
  LoanSimulationInput,
  LoanSimulationResult,
  CAMPUS_SAFER_ALTERNATIVES,
} from "@nera/core";
import {
  ShieldAlert,
  Clock,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  TrendingDown,
  Building2,
  CheckCircle,
} from "lucide-react";

export default function RiskCheckPage() {
  const {
    monthlyAllowance,
    dailyPocket,
    dailyBudgetSafe,
    totalMonthlyInstallments,
    activeLoanSources,
    score,
    state,
    coolingOffTargetTime,
    startCoolingOff,
    clearCoolingOff,
  } = useFinancialStore();

  const [loanAmount, setLoanAmount] = useState<number>(1500000);
  const [tenorMonths, setTenorMonths] = useState<number>(3);
  const [interestRateMonthly, setInterestRateMonthly] = useState<number>(3.5); // 3.5%
  const [adminFee, setAdminFee] = useState<number>(75000);
  const [platformName, setPlatformName] = useState<string>("Pinjaman Online X");

  const [simulationResult, setSimulationResult] = useState<LoanSimulationResult | null>(null);

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = simulateLoanImpact(
      {
        loanAmount,
        tenorMonths,
        interestRateMonthly,
        adminFee,
        platformName,
      },
      {
        monthlyAllowance,
        dailyPocket,
        dailyBudgetSafe,
        totalMonthlyInstallments,
        activeLoanSourcesCount: activeLoanSources.length,
      }
    );

    setSimulationResult(result);
  };

  // Cooling-off Remaining Time calculation
  const now = Date.now();
  const isCoolingActive = coolingOffTargetTime !== null && coolingOffTargetTime > now;
  const remainingHours = isCoolingActive
    ? Math.max(1, Math.round((coolingOffTargetTime - now) / (1000 * 60 * 60)))
    : 0;

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="AI Risk Intelligence" />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* FINANCIAL HEALTH OVERVIEW GAUGE */}
        <Card className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Skor Risiko Finansial
            </span>
            <div className="flex items-center gap-2">
              <StatusBadge status={state} />
            </div>
            <p className="text-xs text-[#64748B] pt-1">
              DTI: {((totalMonthlyInstallments / (monthlyAllowance || 1)) * 100).toFixed(0)}% • {activeLoanSources.length} Cicilan Aktif
            </p>
          </div>
          <RiskGauge score={score} state={state} size="sm" />
        </Card>

        {/* 24-HOUR COOLING-OFF TIMER BANNER (If Active) */}
        {isCoolingActive && (
          <Card className="p-4 bg-gradient-to-r from-[#EF4444]/10 to-[#FBBF24]/10 border-[#EF4444]/30 space-y-3 animate-pulse">
            <div className="flex items-center gap-2 text-[#EF4444]">
              <Clock size={20} />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                24-Hour Cooling-Off Guardrail Aktif
              </h3>
            </div>
            <p className="text-xs text-[#0F172A] leading-relaxed">
              Jeda tunda keputusan impulsif sedang berlangsung. Sisa waktu penundaan:{" "}
              <strong className="text-[#EF4444]">{remainingHours} jam lagi</strong>. Tinjau kembali alternatif aman di bawah ini sebelum membuat keputusan.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCoolingOff}
              className="text-xs h-8 border-slate-300"
            >
              Batalkan Timer Penundaan
            </Button>
          </Card>
        )}

        {/* LOAN SIMULATOR FORM */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-[#6C5CE7]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Simulator Risiko Cicilan
            </h3>
          </div>

          <form onSubmit={handleSimulate} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">
                Plafon Pinjaman / Cicilan (Rp)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-bold text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1">
                  Tenor (Bulan)
                </label>
                <select
                  value={tenorMonths}
                  onChange={(e) => setTenorMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
                >
                  <option value={1}>1 Bulan</option>
                  <option value={3}>3 Bulan</option>
                  <option value={6}>6 Bulan</option>
                  <option value={12}>12 Bulan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-1">
                  Bunga Bulanan (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRateMonthly}
                  onChange={(e) => setInterestRateMonthly(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] mb-1">
                Biaya Admin / Layanan (Rp)
              </label>
              <input
                type="number"
                value={adminFee}
                onChange={(e) => setAdminFee(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth className="rounded-xl mt-2">
              Analisis Dampak Defisit
            </Button>
          </form>
        </Card>

        {/* SIMULATION RESULT BREAKDOWN */}
        {simulationResult && (
          <div className="space-y-4 animate-fade-in">
            <Card
              className={`p-4 space-y-3 ${
                simulationResult.isDangerous
                  ? "border-[#EF4444] bg-[#FBE4DE]/20"
                  : "border-[#22C55E] bg-[#DDF0E6]/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  Hasil Simulasi NerAI
                </span>
                <StatusBadge status={simulationResult.projectedState} />
              </div>

              {/* Real Deficit Callout */}
              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#64748B]">Cicilan per Bulan:</span>
                  <span className="font-bold text-[#0F172A]">
                    {formatRupiah(simulationResult.monthlyInstallment)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#64748B]">Total Bunga & Admin:</span>
                  <span className="font-bold text-[#EF4444]">
                    +{formatRupiah(simulationResult.totalInterestAndFees)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#64748B]">Proyeksi DTI Baru:</span>
                  <span className="font-bold text-[#0F172A]">
                    {simulationResult.newDti}%
                  </span>
                </div>
              </div>

              {/* Explanatory Banner */}
              <p className="text-xs text-[#0F172A] font-medium leading-relaxed">
                {simulationResult.deficitExplanation}
              </p>

              {simulationResult.coolingOffRequired && (
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => startCoolingOff(24)}
                  className="rounded-xl text-xs gap-1.5"
                >
                  <Clock size={16} /> Aktifkan 24-Hour Cooling-Off Timer
                </Button>
              )}
            </Card>

            {/* SAFER CAMPUS ALTERNATIVES */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Alternatif Aman Kampus (Rekomendasi Nera)
              </h3>

              <div className="space-y-2">
                {CAMPUS_SAFER_ALTERNATIVES.map((alt) => (
                  <Card key={alt.id} className="p-3.5 space-y-2 border-l-4 border-l-[#00747F]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={14} className="text-[#00747F]" />
                        <h4 className="text-xs font-bold text-[#0F172A]">{alt.title}</h4>
                      </div>
                      <span className="text-[10px] bg-[#DDF0E6] text-[#15803D] font-bold px-2 py-0.5 rounded-full">
                        {alt.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">{alt.description}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-semibold text-[#00747F]">
                        Plafon s/d {formatRupiah(alt.maxAmount)}
                      </span>
                      <a
                        href={alt.actionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-[#6C5CE7] hover:underline flex items-center gap-1"
                      >
                        Ajukan Resmi <ArrowRight size={12} />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
