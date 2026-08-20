"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopAppBar } from "../../components/common/TopAppBar";
import { useFinancialStore } from "../../context/FinancialStore";
import { Modal, Button } from "@nera/ui";
import { classifyPersonas } from "@nera/core";
import {
  FileText,
  Wallet,
  Lock,
  QrCode,
  ArrowUpRight,
  WalletCards,
  Home,
  Coffee,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  CalendarClock,
  ArrowDownLeft,
  ArrowUpFromLine,
  GraduationCap,
  Bus,
  ShoppingBag,
  Banknote,
  PiggyBank,
  Gift,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  allowance: ArrowDownLeft,
  food: Coffee,
  transport: Bus,
  education: GraduationCap,
  loan: Banknote,
  saving: PiggyBank,
  other: ShoppingBag,
};

const CATEGORY_COLORS: Record<string, string> = {
  allowance: "#22C55E",
  food: "#F59E0B",
  transport: "#3B82F6",
  education: "#6C5CE7",
  loan: "#EF4444",
  saving: "#00747F",
  other: "#64748B",
};

export default function HomePage() {
  const {
    dailyPocket,
    lockPocket,
    dailyBudgetSafe,
    runwayDays,
    score,
    state,
    transactions,
    nudges,
    monthlyAllowance,
    safeConsecutiveMonths,
    totalMonthlyInstallments,
    activeDebts,
    isSweepModalOpen,
    setSweepModalOpen,
    executeEndOfMonthSweep,
    addTransaction,
    resolveNudge,
  } = useFinancialStore();

  const [isPayKosOpen, setIsPayKosOpen] = useState(false);
  const [isQuickSpendOpen, setIsQuickSpendOpen] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState<string | null>(null);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [spendAmount, setSpendAmount] = useState("");
  const [spendTitle, setSpendTitle] = useState("");

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const formatRupiahShort = (val: number) => {
    if (val >= 1000000) return `Rp${(val / 1000000).toFixed(1)}jt`;
    if (val >= 1000) return `Rp${(val / 1000).toFixed(0)}rb`;
    return `Rp${val}`;
  };

  // Compute estimated runway end date
  const runwayEndDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + runwayDays);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  }, [runwayDays]);

  // Compute runway percentage (assuming 30-day month)
  const runwayPct = useMemo(() => {
    return Math.min(100, Math.round((runwayDays / 30) * 100));
  }, [runwayDays]);

  // Last 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  // Top matched persona for the "Manfaat BNI Untukmu" entry point
  const topPersona = useMemo(() => {
    const matches = classifyPersonas({
      transactions,
      nudges,
      score,
      state,
      monthlyAllowance,
      lockPocket,
      runwayDays,
      safeConsecutiveMonths,
      totalMonthlyInstallments,
      activeDebtsCount: activeDebts.length,
    });
    return matches[0] || null;
  }, [
    transactions,
    nudges,
    score,
    state,
    monthlyAllowance,
    lockPocket,
    runwayDays,
    safeConsecutiveMonths,
    totalMonthlyInstallments,
    activeDebts.length,
  ]);

  // State-based badge config
  const stateBadge = {
    AMAN: { label: `Skor ${score} · Kondisi Sehat`, bg: "bg-[#E8F8EE]", border: "border-[#22C55E]/30", text: "text-[#15803D]", dot: "bg-[#22C55E]" },
    WASPADA: { label: `Skor ${score} · Waspada`, bg: "bg-[#FBF0D9]", border: "border-[#FBBF24]/30", text: "text-[#92400E]", dot: "bg-[#FBBF24]" },
    KRITIS: { label: `Skor ${score} · Kritis`, bg: "bg-[#FBE4DE]", border: "border-[#EF4444]/30", text: "text-[#991B1B]", dot: "bg-[#EF4444]" },
  }[state];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setIsSuccessToastOpen(true);
    setTimeout(() => setIsSuccessToastOpen(false), 3000);
  };

  const handlePayKos = () => {
    const kosAmount = 500000;
    addTransaction({
      title: "Pembayaran Tagihan Kos Bulan Ini",
      category: "other",
      amount: kosAmount,
      type: "expense",
      source: "AUTO_DEBET",
    });
    resolveNudge("nudge_kos");
    setIsPayKosOpen(false);
    triggerToast("Tagihan Kos Rp500.000 berhasil dibayar via BNI!");
  };

  const handleQuickSpend = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(spendAmount);
    if (!amount || amount <= 0) return;

    addTransaction({
      title: spendTitle || "Transaksi QRIS wondr",
      category: "food",
      amount,
      type: "expense",
      source: "QRIS_BNI",
    });

    setSpendAmount("");
    setSpendTitle("");
    setIsQuickSpendOpen(false);
    triggerToast(`Transaksi QRIS ${formatRupiah(amount)} berhasil dicatat!`);
  };

  const mascotSrc = state === "AMAN" ? "/mascots/mascot-okay.svg" : "/mascots/mascot-okay.svg";

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC]">
      {/* 1. TOP APP BAR (Branding + Notification) */}
      <TopAppBar />

      <main className="flex-1 px-4 pt-3.5 pb-6 space-y-4">
        {/* 2. HERO CARD: DAILY RUNWAY & SMART POCKET */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#EBF4FF] via-[#FAF6FE]/40 to-[#FFFFFF] p-4 shadow-xs">
          {/* Subtle sparkles decoration */}
          <span className="absolute top-6 right-28 text-[#6C5CE7] text-xs select-none animate-pulse">✦</span>
          <span className="absolute top-13 right-32 text-[#4EA8FF] text-[9px] select-none animate-pulse delay-500">✦</span>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${stateBadge.bg} border ${stateBadge.border} ${stateBadge.text} text-xs font-bold shadow-2xs`}>
            <span className={`w-2 h-2 rounded-full ${stateBadge.dot}`} />
            <span className="font-bold">{stateBadge.label}</span>
          </div>

          {/* Title & Runway Days */}
          <div className="mt-2.5 max-w-[210px] relative z-10">
            <p className="text-sm font-semibold text-[#0F172A]">Uangmu bertahan</p>
            <h2 className="text-[30px] font-bold text-[#0F172A] tracking-tight leading-tight mt-0.5">
              {runwayDays} Hari Lagi
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Estimasi aman hingga {runwayEndDate}
            </p>
          </div>

          {/* Nera Mascot */}
          <div className="absolute top-2 -right-1 w-36 h-36 pointer-events-none select-none z-0">
            <Image
              src={mascotSrc}
              alt="Nera Bot Mascot"
              width={144}
              height={144}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* White Inner Card */}
          <div className="relative z-10 mt-3.5 -mx-1.5 bg-white rounded-[24px] p-4 space-y-3">
            {/* Runway Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3.5 rounded-full bg-[#E5F0FF] overflow-hidden p-[1.5px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4EA8FF] to-[#3B82F6] transition-all duration-500"
                  style={{ width: `${runwayPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#0F172A]">{runwayPct}%</span>
            </div>

            {/* Recommendation Info Row */}
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <FileText size={14} className="text-[#3B82F6]" />
              <span>
                Rekomendasi budget:{" "}
                <strong className="text-[#2563EB] font-bold">
                  {formatRupiah(dailyBudgetSafe)}
                </strong>{" "}
                / hari
              </span>
            </div>

            {/* Pockets Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-0.5">
              {/* Pocket 1: Daily Pocket */}
              <div className="bg-white border border-[#E8F0FA] rounded-[20px] p-3.5 flex items-center gap-2.5 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#EBF5FF] flex items-center justify-center text-[#2563EB] shrink-0">
                  <Wallet size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">Daily Pocket</p>
                  <span className="text-[10px] text-[#64748B] block mt-0.5">(Siap Pakai)</span>
                  <p className="text-sm font-bold text-[#0F172A] mt-0.5 truncate">
                    {formatRupiah(dailyPocket)}
                  </p>
                </div>
              </div>

              {/* Pocket 2: Lock Pocket */}
              <div className="bg-white border border-[#F0E8FA] rounded-[20px] p-3.5 flex items-center gap-2.5 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] shrink-0">
                  <Lock size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">Lock Pocket</p>
                  <span className="text-[10px] text-[#64748B] block mt-0.5">(BNI Life Goals)</span>
                  <p className="text-sm font-bold text-[#0F172A] mt-0.5 flex items-center gap-1 truncate">
                    <span>{formatRupiah(lockPocket)}</span>
                    <Lock size={12} className="text-[#7C3AED] fill-[#7C3AED] shrink-0" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUICK ACTION SECTION */}
        <section className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#0F172A]">Quick Action</h3>
            <button
              onClick={() => setActiveActionModal("Semua Menu Quick Action")}
              className="text-xs font-bold text-[#6C5CE7] hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[22px] p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
            <div className="grid grid-cols-4 gap-2">
              {/* 1. Scan QRIS */}
              <button
                onClick={() => setIsQuickSpendOpen(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#EDF6FF] text-[#2563EB] flex items-center justify-center shadow-xs transition-transform active:scale-95 group-hover:bg-[#E0EFFF]">
                  <QrCode size={22} className="stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] text-center leading-tight">
                  Scan QRIS
                </span>
              </button>

              {/* 2. Transfer */}
              <button
                onClick={() => setActiveActionModal("Transfer Saldo BNI")}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#EDF6FF] text-[#2563EB] flex items-center justify-center shadow-xs transition-transform active:scale-95 group-hover:bg-[#E0EFFF]">
                  <ArrowUpRight size={22} className="stroke-[2.2]" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] text-center leading-tight">
                  Transfer
                </span>
              </button>

              {/* 3. Bayar Tagihan */}
              <button
                onClick={() => setIsPayKosOpen(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#EDF6FF] text-[#2563EB] flex items-center justify-center shadow-xs transition-transform active:scale-95 group-hover:bg-[#E0EFFF]">
                  <FileText size={22} className="stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] text-center leading-tight">
                  Bayar<br />Tagihan
                </span>
              </button>

              {/* 4. Top Up */}
              <button
                onClick={() => setActiveActionModal("Top Up Saldo Taplus Muda")}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-[#EDF6FF] text-[#2563EB] flex items-center justify-center shadow-xs transition-transform active:scale-95 group-hover:bg-[#E0EFFF]">
                  <WalletCards size={22} className="stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] text-center leading-tight">
                  Top Up
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. INSIGHT NERA (Smart Nudges) */}
        <section className="space-y-2.5 pt-1">
          <h3 className="text-[15px] font-bold text-[#0F172A]">Insight Nera</h3>

          <div className="space-y-3">
            {/* Nudge: Kos Payment */}
            {nudges.find((n) => n.category === "BILL_KOS") && (
              <div className="bg-[#FDF6E9] border border-[#FDE68A]/80 rounded-[22px] p-4 flex gap-3.5 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#FDF0D5] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                  <Home size={22} className="stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F172A] tracking-tight">
                      Kos Jatuh Tempo 3 Hari Lagi
                    </h4>
                    <ChevronRight size={18} className="text-[#64748B] stroke-[2.5] shrink-0 ml-1" />
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Saldomu di Daily Pocket cukup ({formatRupiahShort(dailyPocket)}). Bayar sekarang agar runway tetap aman?
                  </p>
                  <div className="flex justify-end mt-2.5">
                    <button
                      onClick={() => setIsPayKosOpen(true)}
                      className="bg-[#6C5CE7] hover:bg-[#5B4CD4] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer active:scale-95"
                    >
                      Bayar via BNI
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Nudge: UKT */}
            {nudges.find((n) => n.category === "BILL_UKT") && (
              <div className="bg-[#F0EBFF] border border-[#C4B5FD]/60 rounded-[22px] p-4 flex gap-3.5 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#E8DEFF] text-[#6C5CE7] flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap size={22} className="stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F172A] tracking-tight">
                      UKT Semester Ganjil
                    </h4>
                    <span className="text-[10px] bg-[#6C5CE7] text-white font-bold px-2 py-0.5 rounded-full shrink-0">
                      12 Hari
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Rp3.500.000 jatuh tempo 31 Agustus. Cashback 5% jika bayar via wondr by BNI.
                  </p>
                </div>
              </div>
            )}

            {/* Nudge: End-of-Month Sweep */}
            {nudges.find((n) => n.category === "SWEEP_LEFTOVER") && (
              <div className="bg-[#ECF8F1] border border-[#86EFAC]/60 rounded-[22px] p-4 flex gap-3.5 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowUpFromLine size={22} className="stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F172A] tracking-tight">
                      Smart Sweep Akhir Bulan
                    </h4>
                    <ChevronRight size={18} className="text-[#64748B] stroke-[2.5] shrink-0 ml-1" />
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                    Sisa saldo harianmu bisa disapu otomatis ke BNI Life Goals agar tidak boros.
                  </p>
                  <div className="flex justify-end mt-2.5">
                    <button
                      onClick={() => setSweepModalOpen(true)}
                      className="bg-[#00747F] hover:bg-[#005F68] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer active:scale-95"
                    >
                      Sapu ke Life Goals
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Weekly Spending Insight */}
            <div className="bg-[#ECF1FD] border border-[#D9E4FA] rounded-[22px] p-4 flex gap-3.5 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                <Coffee size={22} className="stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#0F172A] tracking-tight">
                    Pengeluaran Jajan Naik
                  </h4>
                  <ChevronRight size={18} className="text-[#64748B] stroke-[2.5] shrink-0 ml-1" />
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                  Minggu ini jajan QRIS naik Rp85.000 dari rata-rata. Atur ritme belanjamu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4.5. MANFAAT BNI UNTUKMU (Persona-based Privilege Hub entry point) */}
        {topPersona && (
          <section className="space-y-2.5 pt-1">
            <h3 className="text-[15px] font-bold text-[#0F172A]">Manfaat BNI Untukmu</h3>
            <Link href="/privileges">
              <div className="bg-gradient-to-br from-[#6C5CE7] to-[#4EA8FF] rounded-[22px] p-4 flex items-center gap-3.5 shadow-[0_8px_24px_rgba(108,92,231,0.18)] active:scale-[0.99] transition-transform">
                <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                  <Gift size={22} className="stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white tracking-tight">{topPersona.label}</h4>
                  <p className="text-xs text-white/85 leading-relaxed mt-0.5">{topPersona.tagline}</p>
                </div>
                <ChevronRight size={20} className="text-white/90 stroke-[2.5] shrink-0" />
              </div>
            </Link>
          </section>
        )}

        {/* 5. RECENT TRANSACTIONS */}
        <section className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#0F172A]">Transaksi Terakhir</h3>
            <span className="text-xs font-medium text-[#64748B]">{transactions.length} total</span>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[22px] overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
            {recentTransactions.map((tx, idx) => {
              const IconComp = CATEGORY_ICONS[tx.category] || ShoppingBag;
              const color = CATEGORY_COLORS[tx.category] || "#64748B";
              const isLast = idx === recentTransactions.length - 1;
              const isIncome = tx.type === "income";
              const dateStr = new Date(tx.timestamp).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              });

              return (
                <div
                  key={tx.id}
                  className={`flex items-center gap-3 px-4 py-3 ${!isLast ? "border-b border-[#F1F5F9]" : ""}`}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <IconComp size={16} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#0F172A] truncate">{tx.title}</p>
                    <p className="text-[10px] text-[#64748B]">{dateStr}</p>
                  </div>
                  <span
                    className={`text-xs font-bold tabular-nums ${isIncome ? "text-[#22C55E]" : "text-[#0F172A]"}`}
                  >
                    {isIncome ? "+" : "-"}{formatRupiahShort(tx.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* TOAST NOTIFICATION */}
      {isSuccessToastOpen && (
        <div className="absolute top-14 inset-x-0 mx-auto max-w-[390px] px-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-[#0F172A] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-white/10">
            <CheckCircle2 size={18} className="text-[#22C55E] shrink-0" />
            <span className="flex-1">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* MODAL: BAYAR VIA BNI (TAGIHAN KOS) */}
      <Modal
        isOpen={isPayKosOpen}
        onClose={() => setIsPayKosOpen(false)}
        title="Pembayaran Tagihan Kos via BNI"
      >
        <div className="space-y-4">
          <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span>Tujuan Pembayaran</span>
              <span className="font-semibold text-[#0F172A]">Kos Griya Asri Tel-U</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span>Nomor Virtual Account</span>
              <span className="font-mono font-medium text-[#0F172A]">8808 1301 2130 4501</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
              <span>Total Tagihan</span>
              <span className="font-bold text-[#0F172A] text-base">Rp 500.000</span>
            </div>
          </div>

          <div className="p-3 bg-[#EBF5FF] rounded-xl border border-[#4EA8FF]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-[#2563EB]" />
              <span className="text-[#0F172A] font-medium">Daily Pocket</span>
            </div>
            <span className="font-bold text-[#2563EB]">Sisa {formatRupiah(dailyPocket)}</span>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsPayKosOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handlePayKos}
            >
              Konfirmasi Bayar
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL: SCAN QRIS / CATAT TRANSAKSI */}
      <Modal
        isOpen={isQuickSpendOpen}
        onClose={() => setIsQuickSpendOpen(false)}
        title="Scan QRIS / Catat Transaksi"
      >
        <form onSubmit={handleQuickSpend} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Nama Merchant / Keterangan
            </label>
            <input
              type="text"
              placeholder="Contoh: Kopi Tuku / Makan Siang Kantin"
              value={spendTitle}
              onChange={(e) => setSpendTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Nominal Transaksi (Rp)
            </label>
            <input
              type="number"
              placeholder="Contoh: 25000"
              value={spendAmount}
              onChange={(e) => setSpendAmount(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
              required
            />
          </div>

          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#64748B]">
            Transaksi akan otomatis memotong <strong>Daily Pocket</strong> dan menyesuaikan <strong>Runway Hari</strong> secara real-time.
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Bayar Transaksi
          </Button>
        </form>
      </Modal>

      {/* MODAL: END-OF-MONTH SWEEP */}
      <Modal
        isOpen={isSweepModalOpen}
        onClose={() => setSweepModalOpen(false)}
        title="Smart Sweep ke BNI Life Goals"
      >
        <div className="space-y-4">
          <div className="text-center py-3">
            <div className="w-16 h-16 bg-[#DDF0E6] text-[#22C55E] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ArrowUpFromLine size={32} />
            </div>
            <h4 className="text-base font-bold text-[#0F172A]">
              Sapu Sisa Saldo Harian
            </h4>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Pindahkan seluruh sisa Daily Pocket ke tabungan BNI Life Goals agar uangmu tidak habis percuma di akhir bulan.
            </p>
          </div>

          <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Sisa Daily Pocket</span>
              <span className="font-bold text-[#0F172A]">{formatRupiah(dailyPocket)}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E2E8F0]">
              <span className="text-[#64748B]">Life Goals Setelah Sweep</span>
              <span className="font-bold text-[#00747F]">{formatRupiah(lockPocket + dailyPocket)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" fullWidth onClick={() => setSweepModalOpen(false)}>
              Nanti Saja
            </Button>
            <Button variant="bni" fullWidth onClick={executeEndOfMonthSweep}>
              Sweep Sekarang
            </Button>
          </div>
        </div>
      </Modal>

      {/* MODAL: GENERIC ACTION (Transfer, Top Up, dll) */}
      <Modal
        isOpen={!!activeActionModal}
        onClose={() => setActiveActionModal(null)}
        title={activeActionModal || "Fitur wondr"}
      >
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 bg-[#EDF6FF] text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto">
            <Sparkles size={28} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A]">{activeActionModal}</h4>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Layanan perbankan wondr by BNI terintegrasi langsung dengan proteksi kecerdasan finansial Nera.
            </p>
          </div>
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              setActiveActionModal(null);
              triggerToast(`${activeActionModal} siap digunakan.`);
            }}
          >
            Lanjutkan di wondr
          </Button>
        </div>
      </Modal>
    </div>
  );
}
