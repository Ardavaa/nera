"use client";

import React, { useState } from "react";
import { TopAppBar } from "../../components/common/TopAppBar";
import { useFinancialStore } from "../../context/FinancialStore";
import { Card, Button, Modal, StatusBadge } from "@nera/ui";
import {
  TrendingUp,
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Coins,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

export default function WealthEnginePage() {
  const {
    state,
    lockPocket,
    wealthTiers,
    safeConsecutiveMonths,
    depositToLifeGoals,
  } = useFinancialStore();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(100000);

  const isEligible = state === "AMAN";

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;
    depositToLifeGoals(depositAmount);
    setIsDepositOpen(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="Adaptive Wealth Engine" />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* ELIGIBILITY HEADER */}
        <Card
          className={`p-4 space-y-2 ${
            isEligible
              ? "bg-gradient-to-br from-[#DDF0E6] to-[#EAF4FF] border-[#22C55E]/40"
              : "bg-[#FBE4DE]/30 border-[#EF4444]/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp
                size={18}
                className={isEligible ? "text-[#00747F]" : "text-[#EF4444]"}
              />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Staged Wealth Ladder
              </h3>
            </div>
            <StatusBadge status={state} />
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed">
            {isEligible
              ? `Skor finansialmu AMAN selama ${safeConsecutiveMonths} bulan berturut-turut. Tangga kemapanan finansial terbuka!`
              : "Wealth Ladder terkunci saat skor finansial berada dalam status Waspada/Kritis. Selesaikan pemulihan terlebih dahulu."}
          </p>
        </Card>

        {/* 3-TIER STAGED WEALTH LADDER */}
        <div className="space-y-3">
          {wealthTiers.map((tier) => {
            const isTier1 = tier.tier === 1;
            const isTier2 = tier.tier === 2;
            const isTier3 = tier.tier === 3;

            // Tier 1 is always unlocked if eligible
            // Tier 2 is unlocked only if Tier 1 is 100% complete
            // Tier 3 is unlocked only if Tier 2 has funds
            const isCurrentUnlocked =
              isEligible &&
              (isTier1 || (isTier2 && wealthTiers[0].isCompleted));

            return (
              <Card
                key={tier.tier}
                className={`p-4 space-y-3 relative overflow-hidden transition-all ${
                  !isCurrentUnlocked
                    ? "opacity-60 bg-slate-50 border-slate-200"
                    : "border-[#6C5CE7]/30 bg-white"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                        isTier1
                          ? "bg-[#00747F] text-white"
                          : isTier2
                          ? "bg-[#6C5CE7] text-white"
                          : "bg-slate-400 text-white"
                      }`}
                    >
                      {tier.tier}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A]">{tier.name}</h4>
                      <p className="text-[10px] text-[#64748B]">{tier.productName}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tier.isCompleted
                        ? "bg-[#DDF0E6] text-[#15803D]"
                        : isCurrentUnlocked
                        ? "bg-[#6C5CE7]/10 text-[#6C5CE7]"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {tier.isCompleted ? "SELESAI (100%)" : tier.badgeText}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {tier.description}
                </p>

                {/* Progress Bar (For Tier 1) */}
                {isTier1 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#64748B]">Terkumpul: {formatRupiah(lockPocket)}</span>
                      <span className="text-[#00747F] font-bold">
                        {Math.min(100, Math.round((lockPocket / tier.targetAmount) * 100))}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00747F] to-[#22C55E] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (lockPocket / tier.targetAmount) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-[#64748B]">
                        Target: {formatRupiah(tier.targetAmount)}
                      </span>
                      <Button
                        size="sm"
                        variant="bni"
                        onClick={() => setIsDepositOpen(true)}
                        className="text-xs h-7 px-3 rounded-full"
                      >
                        <PlusCircle size={12} className="mr-1" /> Tambah Tabungan
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tier 2 & 3 Action / Lock State */}
                {!isTier1 && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B]">
                      {isCurrentUnlocked
                        ? "Mulai investasi dari Rp10.000"
                        : "Selesaikan Tier 1 terlebih dahulu"}
                    </span>
                    {isCurrentUnlocked ? (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => alert("Membuka katalog Reksa Dana wondr by BNI...")}
                        className="text-xs h-7 px-3 rounded-full"
                      >
                        Beli via wondr <ArrowRight size={12} className="ml-1" />
                      </Button>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <Lock size={12} /> Terkunci
                      </span>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </main>

      {/* DEPOSIT TO LIFE GOALS MODAL */}
      <Modal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        title="Top Up BNI Life Goals"
      >
        <form onSubmit={handleDeposit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Nominal Tambahan (Rp)
            </label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-bold border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#00747F]"
              required
            />
          </div>
          <Button type="submit" variant="bni" fullWidth>
            Simpan ke Life Goals
          </Button>
        </form>
      </Modal>
    </div>
  );
}
