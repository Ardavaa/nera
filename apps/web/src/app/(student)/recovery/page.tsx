"use client";

import React, { useState } from "react";
import { TopAppBar } from "../../../components/common/TopAppBar";
import { useFinancialStore } from "../../../context/FinancialStore";
import { Card, Button, StatusBadge, StepProgress } from "@nera/ui";
import { calculateDebtSnowball } from "@nera/core";
import {
  LifeBuoy,
  AlertOctagon,
  TrendingDown,
  GraduationCap,
  CheckCircle,
  PlusCircle,
  PhoneCall,
  ShieldCheck,
  Lock,
  Ban,
  TrendingUp,
  ArrowRight,
  MessageCircle,
  Heart,
} from "lucide-react";

export default function RecoveryPage() {
  const {
    userName,
    state,
    score,
    activeDebts,
    recoveryMilestones,
    totalMonthlyInstallments,
    monthlyAllowance,
    addDebtItem,
    payOffDebt,
  } = useFinancialStore();

  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);
  const [platformName, setPlatformName] = useState("");
  const [principal, setPrincipal] = useState<number>(1000000);
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(380000);
  const [tenorMonths, setTenorMonths] = useState<number>(3);

  const snowballPlan = calculateDebtSnowball(activeDebts);
  const dtiPct = monthlyAllowance > 0 ? ((totalMonthlyInstallments / monthlyAllowance) * 100).toFixed(0) : "0";

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!platformName || principal <= 0) return;

    addDebtItem({
      platformName,
      outstandingPrincipal: principal,
      monthlyInstallment,
      interestRateMonthly: 3.5,
      remainingTenorMonths: tenorMonths,
    });

    setPlatformName("");
    setPrincipal(1000000);
    setMonthlyInstallment(380000);
    setIsAddDebtOpen(false);
  };

  // Map recovery milestones to StepProgress format
  const stepItems = recoveryMilestones.map((m, idx) => ({
    id: m.id,
    label: m.label,
    description: m.description,
    isCompleted: m.isCompleted,
    isActive: !m.isCompleted && (idx === 0 || recoveryMilestones[idx - 1]?.isCompleted),
  }));

  const isKritis = state === "KRITIS";

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="AI Recovery Consultant" showBack />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* CRISIS BANNER & INVESTMENT LOCK */}
        <Card className="p-0 overflow-hidden">
          <div className={`p-4 rounded-t-[22px] ${isKritis ? "bg-[#C43737] text-white" : "bg-[#FFF0BD] text-[#47310A]"} space-y-2`}>
            <div className="flex items-center gap-2">
              <AlertOctagon size={20} />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                {isKritis ? "Mode Pemulihan Darurat Aktif" : "Mode Pemulihan Aktif"}
              </h3>
            </div>
            <p className="text-[11px] leading-relaxed">
              Demi melindungi kesehatan finansialmu, <strong>semua penawaran produk investasi BNI dikunci total</strong> hingga siklus cicilan selesai dilunasi.
            </p>
          </div>

          {/* Reputation Protection Lock */}
          <div className="p-4 space-y-2 bg-[#FBE4DE]/20">
            <div className="flex items-center gap-2 text-[#736B60]">
              <Ban size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Proteksi Reputasi BNI</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Reksa Dana", "SBN / Sukuk", "KPR / KKB"].map((product) => (
                <div key={product} className="flex items-center gap-1.5 px-2 py-1.5 bg-[#F7F5F0] rounded-lg">
                  <Lock size={10} className="text-[#EF4444]" />
                  <span className="text-[10px] text-[#736B60] font-medium">{product}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* RECOVERY SUMMARY STATS */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#736B60]">
              Ringkasan Kewajiban
            </span>
            <StatusBadge status={state} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-[#F7F5F0] rounded-xl text-center">
              <span className="text-[10px] text-[#736B60] block">Total Sisa</span>
              <p className="text-sm font-black text-[#EF4444] mt-0.5">
                {formatRupiah(snowballPlan.totalOutstanding)}
              </p>
            </div>
            <div className="p-3 bg-[#F7F5F0] rounded-xl text-center">
              <span className="text-[10px] text-[#736B60] block">Beban/Bulan</span>
              <p className="text-sm font-black text-[#2F240E] mt-0.5">
                {formatRupiah(snowballPlan.totalMonthlyBurn)}
              </p>
            </div>
            <div className="p-3 bg-[#F7F5F0] rounded-xl text-center">
              <span className="text-[10px] text-[#736B60] block">DTI Ratio</span>
              <p className={`text-sm font-black mt-0.5 ${Number(dtiPct) > 40 ? "text-[#C43737]" : "text-[#A36A00]"}`}>
                {dtiPct}%
              </p>
            </div>
          </div>

          {/* Savings after clear */}
          {snowballPlan.totalMonthlyBurn > 0 && (
            <div className="p-3 bg-[#DDF0E6] rounded-xl border border-[#22C55E]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-[#15803D]" />
                <span className="text-xs text-[#15803D] font-medium">Hemat setelah lunas</span>
              </div>
              <span className="text-xs font-bold text-[#15803D]">
                +{formatRupiah(snowballPlan.monthlySavingsAfterClear)}/bln
              </span>
            </div>
          )}
        </Card>

        {/* RECOVERY MILESTONES (Step Progress) */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <LifeBuoy size={16} className="text-[#76520E]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2F240E]">
              Milestone Pemulihan
            </h3>
          </div>

          <StepProgress steps={stepItems} accentColor="#76520E" />
        </Card>

        {/* DEBT SNOWBALL PRIORITIZATION LIST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2F240E]">
              Urutan Pelunasan (Debt Snowball)
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddDebtOpen(!isAddDebtOpen)}
              className="text-xs h-7 px-2.5 rounded-full"
            >
              <PlusCircle size={12} className="mr-1" /> Tambah Pos
            </Button>
          </div>

          {isAddDebtOpen && (
            <Card className="p-4 space-y-3 border-[#76520E]">
              <h4 className="text-xs font-bold text-[#2F240E]">Input Kewajiban Pinjaman</h4>
              <form onSubmit={handleAddDebt} className="space-y-3">
                <input
                  type="text"
                  placeholder="Nama Platform (misal: EasyDana / PayLater)"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:border-[#76520E]"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Sisa Pokok (Rp)"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:border-[#76520E]"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cicilan / bln"
                    value={monthlyInstallment}
                    onChange={(e) => setMonthlyInstallment(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:border-[#76520E]"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" size="sm" fullWidth>
                  Simpan Pos Pelunasan
                </Button>
              </form>
            </Card>
          )}

          {activeDebts.length === 0 ? (
            <Card className="p-6 text-center space-y-2 bg-slate-50">
              <CheckCircle size={36} className="text-[#22C55E] mx-auto" />
              <h4 className="text-sm font-bold text-[#2F240E]">Bebas Dari Beban Cicilan</h4>
              <p className="text-xs text-[#736B60]">
                Tidak ada cicilan terdeteksi. Pertahankan status amanmu dan bangun dana darurat di BNI Life Goals!
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {snowballPlan.items.map((debt, idx) => (
                <Card
                  key={debt.id}
                  className={`p-3.5 space-y-2 ${
                    idx === 0 ? "border-2 border-[#76520E] bg-[#76520E]/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#76520E] text-white text-[10px] font-bold flex items-center justify-center">
                        #{debt.payoffPriority}
                      </span>
                      <h4 className="text-xs font-bold text-[#2F240E]">{debt.platformName}</h4>
                    </div>
                    {idx === 0 && (
                      <span className="text-[10px] bg-[#76520E] text-white font-bold px-2 py-0.5 rounded-full">
                        Target #1
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-[#736B60]">
                    <span>Sisa: {formatRupiah(debt.outstandingPrincipal)}</span>
                    <span className="font-bold text-[#2F240E]">
                      {formatRupiah(debt.monthlyInstallment)} / bulan
                    </span>
                  </div>

                  {/* Estimated payoff */}
                  <div className="flex items-center justify-between text-[11px] text-[#736B60] pt-1 border-t border-slate-100">
                    <span>Estimasi lunas: ~{debt.remainingTenorMonths} bulan</span>
                  </div>

                  <Button
                    variant="bni"
                    size="sm"
                    fullWidth
                    onClick={() => payOffDebt(debt.id)}
                    className="text-xs h-8 rounded-xl"
                  >
                    Tandai Lunas
                  </Button>
                </Card>
              ))}

              {/* Snowball recommended steps */}
              <Card className="p-4 space-y-2 bg-[#F1F2F4]">
                <h4 className="text-xs font-bold text-[#2F240E] flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-[#76520E]" /> Langkah Rekomendasi
                </h4>
                <ul className="space-y-1.5">
                  {snowballPlan.recommendedSteps.map((step, i) => (
                    <li key={i} className="text-[11px] text-[#736B60] leading-relaxed flex gap-2">
                      <span className="text-[#76520E] font-bold shrink-0">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </div>

        {/* CAMPUS COUNSELING REFERRAL */}
        <Card className="p-4 space-y-3 bg-[#FFF3D6] border-[#A36A00]/40">
          <div className="flex items-center gap-2 text-[#5B410C]">
            <Heart size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Rujukan Konseling Kampus
            </h3>
          </div>
          <p className="text-xs text-[#2F240E] leading-relaxed">
            Jika kamu merasa tertekan oleh tagihan pinjaman, jangan ragu untuk berkonsultasi secara <strong>rahasia dan gratis</strong> dengan Tim Advokasi Mahasiswa Telkom University.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="bni"
              size="sm"
              fullWidth
              onClick={() => alert("Menghubungkan ke Pusat Bantuan Mahasiswa Tel-U...")}
              className="text-xs h-9 rounded-xl gap-1.5"
            >
              <PhoneCall size={14} /> Telepon
            </Button>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => alert("Membuka chat konseling kampus...")}
              className="text-xs h-9 rounded-xl gap-1.5"
            >
              <MessageCircle size={14} /> Chat
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
