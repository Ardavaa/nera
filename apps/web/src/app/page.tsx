"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TopAppBar } from "../components/common/TopAppBar";
import { useFinancialStore } from "../context/FinancialStore";
import { Modal, Button } from "@nera/ui";
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
} from "lucide-react";

export default function HomePage() {
  const {
    dailyPocket,
    lockPocket,
    dailyBudgetSafe,
    runwayDays,
    score,
    addTransaction,
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

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC]">
      {/* 1. TOP APP BAR (Branding + Notification) */}
      <TopAppBar />

      <main className="flex-1 px-4 pt-3.5 pb-6 space-y-4">
        {/* 2. HERO CARD: DAILY RUNWAY & SMART POCKET */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#EBF4FF] via-[#FAF6FE]/40 to-[#FFFFFF] p-4 shadow-xs">
          {/* Subtle sparkles decoration matching design reference */}
          <span className="absolute top-6 right-28 text-[#6C5CE7] text-xs select-none">✦</span>
          <span className="absolute top-13 right-32 text-[#4EA8FF] text-[9px] select-none">✦</span>

          {/* Top-Left: Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8EE] border border-[#22C55E]/30 text-[#15803D] text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="font-bold">Skor {score} · Kondisi Sehat</span>
          </div>

          {/* Title & Runway Days */}
          <div className="mt-2.5 max-w-[210px] relative z-10">
            <p className="text-sm font-semibold text-[#0F172A]">Uangmu bertahan</p>
            <h2 className="text-[30px] font-bold text-[#0F172A] tracking-tight leading-tight mt-0.5">
              {runwayDays} Hari Lagi
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Estimasi aman hingga 22 Okt
            </p>
          </div>

          {/* Official Nera Mascot (mascot-okay.svg) - Overlaid behind the white inner card */}
          <div className="absolute top-2 -right-1 w-36 h-36 pointer-events-none select-none z-0">
            <Image
              src="/mascots/mascot-okay.svg"
              alt="Nera Bot Mascot"
              width={144}
              height={144}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Pure White Rounded Surface Card (wraps Progress Bar + Recommendation + Pockets) */}
          <div className="relative z-10 mt-3.5 -mx-1.5 bg-white rounded-[24px] p-4 space-y-3">
            {/* Runway Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3.5 rounded-full bg-[#E5F0FF] overflow-hidden p-[1.5px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4EA8FF] to-[#3B82F6] transition-all duration-500"
                  style={{ width: "68%" }}
                />
              </div>
              <span className="text-xs font-bold text-[#0F172A]">68%</span>
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

            {/* Pockets Grid: Daily Pocket & Lock Pocket */}
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

          {/* White Rounded Card Surface Container */}
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

        {/* 4. INSIGHT NERA SECTION */}
        <section className="space-y-2.5 pt-1">
          <h3 className="text-[15px] font-bold text-[#0F172A]">Insight Nera</h3>

          <div className="space-y-3">
            {/* Card 1: Kos Jatuh Tempo 3 Hari Lagi */}
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
                  Saldomu di Daily Pocket cukup (Rp630rb). Bayar sekarang agar runway tetap aman?
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

            {/* Card 2: Pengeluaran Jajan Naik */}
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
      </main>

      {/* TOAST NOTIFICATION */}
      {isSuccessToastOpen && (
        <div className="fixed top-14 inset-x-0 mx-auto max-w-[390px] px-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
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
