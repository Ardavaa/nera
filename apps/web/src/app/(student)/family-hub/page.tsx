"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TopAppBar } from "../../../components/common/TopAppBar";
import { useFinancialStore } from "../../../context/FinancialStore";
import { Card, Button, Modal, TrustBanner } from "@nera/ui";
import {
  Users,
  ShieldCheck,
  QrCode,
  Share2,
  Sliders,
  CheckCircle2,
  Lock,
  Wallet,
  ArrowRight,
  Info,
  Eye,
  EyeOff,
  Fingerprint,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function FamilyHubPage() {
  const {
    userName,
    monthlyAllowance,
    dailyPocket,
    lockPocket,
    setAllowanceSplit,
  } = useFinancialStore();

  const [splitRatio, setSplitRatio] = useState<number>(80);
  const [allowanceInput, setAllowanceInput] = useState<number>(monthlyAllowance || 2000000);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const pocketAmount = (allowanceInput * splitRatio) / 100;
  const lockAmount = allowanceInput - pocketAmount;

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleSaveSplit = () => {
    setAllowanceSplit(allowanceInput, splitRatio);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="Family Hub & Pairing" showBack />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* SECTION 1: PERMISSION & ONBOARDING — "Batasan Sebelum Manfaat" */}
        <Card className="p-0 overflow-hidden">
          <TrustBanner
            icon={<Fingerprint size={18} />}
            eyebrow="Izin Akses Transparan"
            title={<>&quot;Batasan Sebelum Manfaat&quot;</>}
            showSparkles
          >
            Nera hanya membaca <strong className="text-white">kategori mutasi masuk/keluar</strong> untuk kalkulasi runway & proteksi cicilan berisiko. Tidak pernah membaca detail nomor rekening, nama penerima, atau data pribadi lainnya.
          </TrustBanner>

          <div className="p-4 space-y-3">
            {/* Permission toggles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-[#00747F]" />
                <span className="text-xs font-medium text-[#0F172A]">Baca Kategori Mutasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#22C55E] bg-[#DDF0E6] px-2 py-0.5 rounded-full">READ-ONLY</span>
                <div className="w-9 h-5 bg-[#22C55E] rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff size={14} className="text-[#64748B]" />
                <span className="text-xs font-medium text-[#0F172A]">Akses Detail Rekening</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full">DIBLOKIR</span>
                <div className="w-9 h-5 bg-[#E2E8F0] rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]">
              <span className="text-xs font-medium text-[#0F172A]">Status Proteksi Data</span>
              <span className="inline-flex items-center gap-1 text-[#22C55E] font-semibold text-xs bg-[#DDF0E6] px-2.5 py-1 rounded-full">
                <ShieldCheck size={12} /> Terenkripsi BNI
              </span>
            </div>
          </div>
        </Card>

        {/* SECTION 2: PARENT-CHILD LINK */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#4EA8FF] flex items-center justify-center text-white shadow-sm">
                <Users size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Akun Terhubung</h4>
                <p className="text-[11px] text-[#64748B]">Hendra Pratama (Ayah)</p>
              </div>
            </div>
            <span className="text-[10px] bg-[#DDF0E6] text-[#15803D] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
              <CheckCircle2 size={10} /> TERVERIFIKASI
            </span>
          </div>

          {/* Account details */}
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Rekening Orang Tua</span>
              <span className="font-mono font-medium text-[#0F172A]">BNI •••• 7890</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Rekening Anak</span>
              <span className="font-mono font-medium text-[#0F172A]">wondr •••• 4501</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Tanggal Pairing</span>
              <span className="font-medium text-[#0F172A]">15 Januari 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsQrModalOpen(true)}
              className="text-xs h-9 rounded-xl gap-1.5"
            >
              <QrCode size={14} /> Tampilkan QR
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Link undangan pairing telah disalin!")}
              className="text-xs h-9 rounded-xl gap-1.5"
            >
              <Share2 size={14} /> Share Link
            </Button>
          </div>
        </Card>

        {/* SECTION 3: SMART ALLOWANCE SPLITTER */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders size={16} className="text-[#6C5CE7]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Smart Allowance Splitter
              </h3>
            </div>
            <span className="text-xs font-bold text-[#6C5CE7] bg-[#6C5CE7]/10 px-2 py-0.5 rounded-full">
              {splitRatio}% / {100 - splitRatio}%
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1">
              Nominal Uang Saku Bulanan
            </label>
            <input
              type="number"
              value={allowanceInput}
              onChange={(e) => setAllowanceInput(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-bold text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-[#64748B]">
              <span>Kebutuhan Harian ({splitRatio}%)</span>
              <span>Life Goals ({100 - splitRatio}%)</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={splitRatio}
              onChange={(e) => setSplitRatio(Number(e.target.value))}
              className="w-full accent-[#6C5CE7] cursor-pointer"
            />
          </div>

          {/* Auto-routing Visualization */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">
              <Sparkles size={10} className="text-[#6C5CE7]" /> Pratinjau Alokasi Otomatis
            </div>

            {/* Flow visualization */}
            <div className="relative">
              {/* Source */}
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#DDF0E6] flex items-center justify-center">
                  <ArrowDownLeft size={14} className="text-[#22C55E]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#64748B]">Uang Saku Masuk</p>
                  <p className="text-sm font-bold text-[#0F172A]">{formatRupiah(allowanceInput)}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1.5">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-0.5 h-3 bg-[#6C5CE7]/30" />
                  <ArrowRight size={12} className="text-[#6C5CE7] rotate-90" />
                </div>
              </div>

              {/* Destinations */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-[#EAF4FF] rounded-xl border border-[#4EA8FF]/30 space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] text-[#4EA8FF] font-semibold">
                    <Wallet size={12} /> Daily Pocket
                  </div>
                  <p className="text-sm font-black text-[#0F172A]">{formatRupiah(pocketAmount)}</p>
                  <p className="text-[10px] text-[#64748B]">~{formatRupiah(Math.round(pocketAmount / 30))}/hari</p>
                </div>

                <div className="p-3 bg-[#DDF0E6] rounded-xl border border-[#22C55E]/30 space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] text-[#15803D] font-semibold">
                    <Lock size={12} /> BNI Life Goals
                  </div>
                  <p className="text-sm font-black text-[#0F172A]">{formatRupiah(lockAmount)}</p>
                  <p className="text-[10px] text-[#15803D]">Tabungan Wajib Aman</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={handleSaveSplit}
            className="rounded-xl mt-2"
          >
            {isSaved ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} /> Tersimpan Otomatis!
              </span>
            ) : (
              "Terapkan Alokasi Otomatis"
            )}
          </Button>
        </Card>

        {/* SECTION 4: NEXT MONTH PREVIEW */}
        <Card className="p-4 space-y-2 bg-gradient-to-br from-[#F8FAFC] to-[#EBF4FF]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#4EA8FF] font-semibold uppercase tracking-wider">
            <Sparkles size={12} /> Pratinjau Bulan Depan
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Saat uang saku <strong className="text-[#0F172A]">{formatRupiah(allowanceInput)}</strong> masuk bulan depan,
            Nera akan otomatis mengalokasikan{" "}
            <strong className="text-[#2563EB]">{formatRupiah(pocketAmount)}</strong> ke Daily Pocket dan{" "}
            <strong className="text-[#15803D]">{formatRupiah(lockAmount)}</strong> ke tabungan BNI Life Goals secara instan.
          </p>
        </Card>
      </main>

      {/* QR PAIRING MODAL */}
      <Modal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="QR Code Pairing Ortu-Anak"
      >
        <div className="text-center space-y-4">
          <div className="w-48 h-48 mx-auto bg-slate-100 rounded-2xl border-2 border-dashed border-[#6C5CE7] flex flex-col items-center justify-center p-4">
            <QrCode size={110} className="text-[#6C5CE7]" />
            <span className="text-[10px] font-mono text-[#64748B] mt-2">NERA-PAIR-BUDI-1301</span>
          </div>
          <p className="text-xs text-[#64748B]">
            Minta orang tua memindai QR code ini melalui aplikasi <strong className="text-[#00747F]">wondr by BNI</strong> untuk aktivasi pairing dan autodebet allowance.
          </p>
          <Button variant="outline" fullWidth onClick={() => setIsQrModalOpen(false)}>
            Tutup
          </Button>
        </div>
      </Modal>
    </div>
  );
}
