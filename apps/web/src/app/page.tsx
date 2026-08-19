"use client";

import React, { useState } from "react";
import { TopAppBar } from "../components/common/TopAppBar";
import { useFinancialStore } from "../context/FinancialStore";
import { Card, Button, Modal } from "@nera/ui";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Wallet,
  Lock,
  ChevronRight,
  RefreshCw,
  PlusCircle,
  Receipt,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const {
    userName,
    dailyPocket,
    lockPocket,
    dailyBudgetSafe,
    runwayDays,
    state,
    nudges,
    transactions,
    isSweepModalOpen,
    setSweepModalOpen,
    executeEndOfMonthSweep,
    addTransaction,
  } = useFinancialStore();

  const [isQuickSpendOpen, setIsQuickSpendOpen] = useState(false);
  const [spendAmount, setSpendAmount] = useState("");
  const [spendTitle, setSpendTitle] = useState("");

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

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
  };

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* HERO CARD: Daily Runway */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#6C5CE7] via-[#5A48DE] to-[#3B28CC] text-white p-5 shadow-[0_8px_24px_rgba(108,92,231,0.25)]">
          {/* Background Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#4EA8FF]/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#4EA8FF]" />
                Runway Saldo Nera
              </span>
              <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium">
                Kebutuhan Harian
              </span>
            </div>

            <div>
              <p className="text-sm text-white/80">Uangmu aman bertahan</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-4xl font-extrabold tracking-tight">
                  {runwayDays}
                </span>
                <span className="text-lg font-medium text-white/90">hari lagi</span>
              </div>
            </div>

            {/* Daily Safe Limit */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
              <div>
                <span className="text-white/70 block text-[11px]">Batas Pengeluaran Aman</span>
                <span className="font-semibold text-white text-sm">
                  {formatRupiah(dailyBudgetSafe)} / hari
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsQuickSpendOpen(true)}
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs h-8 rounded-full"
              >
                <PlusCircle size={14} className="mr-1" /> Catat Transaksi
              </Button>
            </div>
          </div>
        </div>

        {/* POCKETS GRID: Kebutuhan Harian vs Tabungan Simpanan */}
        <div className="grid grid-cols-2 gap-3">
          {/* Pocket 1: Kebutuhan Harian */}
          <Card className="p-4 space-y-2 relative overflow-hidden border-l-4 border-l-[#4EA8FF]">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-semibold">Kebutuhan Harian</span>
              <Wallet size={16} className="text-[#4EA8FF]" />
            </div>
            <div>
              <span className="text-base font-bold text-[#0F172A] block">
                {formatRupiah(dailyPocket)}
              </span>
              <span className="text-[11px] text-[#64748B]">Siap dibelanjakan</span>
            </div>
          </Card>

          {/* Pocket 2: BNI Life Goals */}
          <Card className="p-4 space-y-2 relative overflow-hidden border-l-4 border-l-[#00747F]">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-semibold">Life Goals (Terkunci)</span>
              <Lock size={16} className="text-[#00747F]" />
            </div>
            <div>
              <span className="text-base font-bold text-[#0F172A] block">
                {formatRupiah(lockPocket)}
              </span>
              <span className="text-[11px] text-[#00747F] font-medium">CASA Terproteksi</span>
            </div>
          </Card>
        </div>

        {/* SMART NUDGES SECTION */}
        {nudges.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Smart Nudges wondr
              </h2>
              <span className="text-xs text-[#6C5CE7] font-medium">{nudges.length} Pengingat</span>
            </div>

            <div className="space-y-2">
              {nudges.map((nudge) => (
                <Card
                  key={nudge.id}
                  className="p-3.5 flex items-start justify-between gap-3 border-l-4 border-l-[#6C5CE7]"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Receipt size={14} className="text-[#6C5CE7]" />
                      <h4 className="text-xs font-bold text-[#0F172A]">{nudge.title}</h4>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {nudge.description}
                    </p>
                    {nudge.amount && (
                      <span className="text-xs font-semibold text-[#00747F] block">
                        {formatRupiah(nudge.amount)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={nudge.category === "SWEEP_LEFTOVER" ? "bni" : "primary"}
                    onClick={() => {
                      if (nudge.category === "SWEEP_LEFTOVER") {
                        setSweepModalOpen(true);
                      }
                    }}
                    className="text-xs h-8 px-3 rounded-full shrink-0"
                  >
                    {nudge.actionText}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ACTION SHORTCUTS / BANNER */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Link href="/family-hub" className="block">
            <Card className="p-3.5 hover:border-[#6C5CE7]/50 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#0F172A]">Smart Splitter</span>
                <ChevronRight size={14} className="text-[#64748B]" />
              </div>
              <p className="text-[11px] text-[#64748B]">Atur alokasi uang saku 80/20 dari orang tua</p>
            </Card>
          </Link>

          <Link href="/risk-check" className="block">
            <Card className="p-3.5 hover:border-[#6C5CE7]/50 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#0F172A]">Risk Guardrail</span>
                <ChevronRight size={14} className="text-[#64748B]" />
              </div>
              <p className="text-[11px] text-[#64748B]">Simulasi dampak cicilan & 24h timer</p>
            </Card>
          </Link>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Mutasi Rekening BNI
            </h2>
            <span className="text-xs text-[#00747F] font-medium">Taplus Muda</span>
          </div>

          <Card className="divide-y divide-[#E2E8F0] p-0">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="p-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#0F172A]">{tx.title}</p>
                  <p className="text-[10px] text-[#64748B]">{tx.source} • {new Date(tx.timestamp).toLocaleDateString("id-ID")}</p>
                </div>
                <span
                  className={`font-bold ${
                    tx.type === "income" ? "text-[#22C55E]" : "text-[#0F172A]"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatRupiah(tx.amount)}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </main>

      {/* END OF MONTH SWEEP MODAL */}
      <Modal
        isOpen={isSweepModalOpen}
        onClose={() => setSweepModalOpen(false)}
        title="End-of-Month Smart Sweep"
      >
        <div className="space-y-4">
          <div className="p-4 bg-[#DDF0E6] rounded-2xl border border-[#22C55E]/30 text-center space-y-1">
            <p className="text-xs text-[#15803D] font-medium">Sisa Saldo Kebutuhan Harian</p>
            <p className="text-2xl font-black text-[#15803D]">{formatRupiah(dailyPocket)}</p>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Nera mendeteksi sisa saldo yang belum terpakai di akhir periode. Mengalihkan sisa dana ke{" "}
            <strong className="text-[#00747F]">BNI Life Goals</strong> akan melindungi tabunganmu dari belanja impulsif dan mempercepat target Tier 1!
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setSweepModalOpen(false)}
            >
              Nanti Saja
            </Button>
            <Button
              variant="bni"
              fullWidth
              onClick={executeEndOfMonthSweep}
            >
              Sapu ke Life Goals
            </Button>
          </div>
        </div>
      </Modal>

      {/* QUICK SPEND MODAL */}
      <Modal
        isOpen={isQuickSpendOpen}
        onClose={() => setIsQuickSpendOpen(false)}
        title="Catat Pengeluaran Harian"
      >
        <form onSubmit={handleQuickSpend} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Keterangan Transaksi
            </label>
            <input
              type="text"
              placeholder="Contoh: Makan Siang / Fotokopi Buku"
              value={spendTitle}
              onChange={(e) => setSpendTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Nominal (Rp)
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
          <Button type="submit" variant="primary" fullWidth>
            Simpan Transaksi
          </Button>
        </form>
      </Modal>
    </div>
  );
}
