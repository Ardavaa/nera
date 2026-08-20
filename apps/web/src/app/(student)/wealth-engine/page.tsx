"use client";

import React, { useState, useMemo } from "react";
import { TopAppBar } from "../../../components/common/TopAppBar";
import { useFinancialStore } from "../../../context/FinancialStore";
import { Card, Button, Modal, StatusBadge, ProgressRing } from "@nera/ui";
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
  Sparkles,
  Calendar,
  Star,
  Trophy,
  Target,
  Landmark,
} from "lucide-react";

export default function WealthEnginePage() {
  const {
    state,
    score,
    lockPocket,
    wealthTiers,
    safeConsecutiveMonths,
    depositToLifeGoals,
    dailyPocket,
  } = useFinancialStore();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(100000);

  const isEligible = state === "AMAN";
  const hasTwoMonthStreak = safeConsecutiveMonths >= 2;
  const isFullyEligible = isEligible && hasTwoMonthStreak;

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

  // Generate calendar streak visualization (last 8 weeks)
  const calendarWeeks = useMemo(() => {
    const weeks = [];
    for (let i = 7; i >= 0; i--) {
      const isGreen = i < safeConsecutiveMonths * 4; // rough: 4 weeks per month
      weeks.push({
        weekLabel: `W${8 - i}`,
        isGreen,
      });
    }
    return weeks;
  }, [safeConsecutiveMonths]);

  // Tier styling
  const tierConfig = [
    { bg: "from-[#00747F] to-[#0C9B8A]", icon: ShieldCheck, iconBg: "bg-[#00747F]" },
    { bg: "from-[#6C5CE7] to-[#4EA8FF]", icon: Coins, iconBg: "bg-[#6C5CE7]" },
    { bg: "from-[#D97706] to-[#F59E0B]", icon: Landmark, iconBg: "bg-[#D97706]" },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="Adaptive Wealth Engine" showBack />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* ELIGIBILITY HEADER */}
        <Card
          className={`p-4 space-y-3 overflow-hidden relative ${
            isFullyEligible
              ? "bg-gradient-to-br from-[#DDF0E6] to-[#EAF4FF] border-[#22C55E]/40"
              : !isEligible
              ? "bg-[#FBE4DE]/30 border-[#EF4444]/30"
              : "bg-[#FBF0D9]/30 border-[#FBBF24]/30"
          }`}
        >
          {isFullyEligible && (
            <span className="absolute top-3 right-4 text-[#22C55E] text-lg animate-pulse select-none">✦</span>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp
                size={18}
                className={isFullyEligible ? "text-[#00747F]" : "text-[#EF4444]"}
              />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Staged Wealth Ladder
              </h3>
            </div>
            <StatusBadge status={state} />
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed">
            {isFullyEligible
              ? `Skor finansialmu AMAN selama ${safeConsecutiveMonths} bulan berturut-turut. Tangga kemapanan finansial terbuka!`
              : !isEligible
              ? "Wealth Ladder terkunci saat skor finansial berada dalam status Waspada/Kritis. Selesaikan pemulihan terlebih dahulu."
              : `Perlu ${2 - safeConsecutiveMonths} bulan lagi dengan skor AMAN untuk membuka fitur investasi penuh.`}
          </p>
        </Card>

        {/* GREEN STREAK CALENDAR */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#6C5CE7]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Streak Hijau ({safeConsecutiveMonths}/2 Bulan)
            </h3>
          </div>

          <div className="flex gap-1.5">
            {calendarWeeks.map((week, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full aspect-square rounded-lg ${
                    week.isGreen
                      ? "bg-[#22C55E]"
                      : "bg-[#E2E8F0]"
                  } transition-all`}
                />
                <span className="text-[8px] text-[#64748B] font-medium">{week.weekLabel}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-[#22C55E]" />
              <span>Aman</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-[#E2E8F0]" />
              <span>Belum tercapai</span>
            </div>
          </div>

          {hasTwoMonthStreak && (
            <div className="p-2.5 bg-[#DDF0E6] rounded-xl flex items-center gap-2">
              <Trophy size={14} className="text-[#22C55E]" />
              <span className="text-[11px] text-[#15803D] font-semibold">
                Selamat! Streak 2 bulan tercapai — fitur investasi terbuka!
              </span>
            </div>
          )}
        </Card>

        {/* 3-TIER STAGED WEALTH LADDER */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-[#6C5CE7]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Tangga Kemapanan Finansial
            </h3>
          </div>

          {/* Vertical connector line + tier cards */}
          <div className="relative pl-5">
            {/* Vertical connector */}
            <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-[#E2E8F0]" />

            <div className="space-y-3">
              {wealthTiers.map((tier) => {
                const isTier1 = tier.tier === 1;
                const isTier2 = tier.tier === 2;
                const config = tierConfig[tier.tier - 1];
                const TierIcon = config.icon;

                const isCurrentUnlocked =
                  isEligible &&
                  (isTier1 || (isTier2 && wealthTiers[0].isCompleted));

                return (
                  <div key={tier.tier} className="relative">
                    {/* Connector dot */}
                    <div
                      className={`absolute -left-5 top-4 w-3 h-3 rounded-full border-2 z-10 ${
                        tier.isCompleted
                          ? "bg-[#22C55E] border-[#22C55E]"
                          : isCurrentUnlocked
                          ? `border-[#6C5CE7] bg-[#6C5CE7]`
                          : "bg-white border-[#E2E8F0]"
                      }`}
                    />

                    <Card
                      className={`p-4 space-y-3 relative overflow-hidden transition-all ${
                        !isCurrentUnlocked
                          ? "opacity-50 bg-slate-50 border-slate-200"
                          : "border-[#6C5CE7]/30 bg-white"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl ${config.iconBg} text-white flex items-center justify-center shadow-sm`}
                          >
                            <TierIcon size={16} />
                          </div>
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
                          {tier.isCompleted ? "SELESAI ✓" : tier.badgeText}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {tier.description}
                      </p>

                      {/* Progress for Tier 1 */}
                      {isTier1 && (
                        <div className="space-y-2 pt-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-[#64748B]">Terkumpul: {formatRupiah(lockPocket)}</span>
                            <span className="text-[#00747F] font-bold">
                              {Math.min(100, Math.round((lockPocket / tier.targetAmount) * 100))}%
                            </span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#00747F] to-[#22C55E] rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, (lockPocket / tier.targetAmount) * 100)}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[10px] text-[#64748B]">
                              Target: {formatRupiah(tier.targetAmount)}
                            </span>
                            <Button
                              size="sm"
                              variant="bni"
                              onClick={() => setIsDepositOpen(true)}
                              className="text-xs h-7 px-3 rounded-full"
                            >
                              <PlusCircle size={12} className="mr-1" /> Tambah
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Tier 2 & 3 Action */}
                      {!isTier1 && (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-[11px] text-[#64748B] block">
                              {isCurrentUnlocked
                                ? `Mulai investasi dari ${isTier2 ? "Rp10.000" : "Rp1.000.000"}`
                                : isTier2
                                ? "Selesaikan Tier 1 terlebih dahulu"
                                : "Selesaikan Tier 2 terlebih dahulu"}
                            </span>
                            {tier.minMonthlyReturnPct && (
                              <span className="text-[10px] text-[#6C5CE7] font-semibold">
                                Est. return ~{tier.minMonthlyReturnPct}% p.a.
                              </span>
                            )}
                          </div>
                          {isCurrentUnlocked ? (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => alert(`Membuka katalog ${tier.productName} wondr by BNI...`)}
                              className="text-xs h-7 px-3 rounded-full"
                            >
                              Beli <ArrowRight size={12} className="ml-1" />
                            </Button>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                              <Lock size={12} /> Terkunci
                            </span>
                          )}
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* DEPOSIT TO LIFE GOALS MODAL */}
      <Modal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        title="Top Up BNI Life Goals"
      >
        <form onSubmit={handleDeposit} className="space-y-4">
          <div className="text-center py-2">
            <ProgressRing
              progress={Math.min(100, Math.round((lockPocket / (wealthTiers[0]?.targetAmount || 3000000)) * 100))}
              size={80}
              color="#00747F"
              trackColor="#DDF0E6"
            >
              <span className="text-sm font-bold text-[#00747F]">
                {Math.min(100, Math.round((lockPocket / (wealthTiers[0]?.targetAmount || 3000000)) * 100))}%
              </span>
            </ProgressRing>
            <p className="text-[11px] text-[#64748B] mt-2">
              {formatRupiah(lockPocket)} / {formatRupiah(wealthTiers[0]?.targetAmount || 3000000)}
            </p>
          </div>

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

          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#64748B] space-y-1">
            <div className="flex justify-between">
              <span>Daily Pocket saat ini</span>
              <span className="font-semibold text-[#0F172A]">{formatRupiah(dailyPocket)}</span>
            </div>
            <div className="flex justify-between">
              <span>Setelah deposit</span>
              <span className="font-semibold text-[#0F172A]">{formatRupiah(Math.max(0, dailyPocket - depositAmount))}</span>
            </div>
          </div>

          <Button type="submit" variant="bni" fullWidth>
            Simpan ke Life Goals
          </Button>
        </form>
      </Modal>
    </div>
  );
}
