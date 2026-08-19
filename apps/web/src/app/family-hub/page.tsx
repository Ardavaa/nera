"use client";

import React, { useState } from "react";
import { TopAppBar } from "../../components/common/TopAppBar";
import { useFinancialStore } from "../../context/FinancialStore";
import { Card, Button, Modal } from "@nera/ui";
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
} from "lucide-react";

export default function FamilyHubPage() {
  const {
    userName,
    monthlyAllowance,
    dailyPocket,
    lockPocket,
    setAllowanceSplit,
  } = useFinancialStore();

  const [splitRatio, setSplitRatio] = useState<number>(80); // 80% default
  const [allowanceInput, setAllowanceInput] = useState<number>(monthlyAllowance || 2000000);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

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
      <TopAppBar title="Family Hub & Pairing" />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* TRANSPARENT PERMISSION CARD */}
        <Card className="p-4 bg-gradient-to-br from-[#00747F]/5 to-[#6C5CE7]/5 border-[#00747F]/20 space-y-2">
          <div className="flex items-center gap-2 text-[#00747F]">
            <ShieldCheck size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Izin Akses Transparan (Data Protection)
            </h3>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Nera hanya membaca kategori mutasi masuk/keluar untuk kalkulasi runway & proteksi cicilan berisiko. Data rekening orang tua dan anak terenkripsi standar perbankan BNI.
          </p>
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-xs font-medium text-[#0F172A]">Status Izin Mutasi</span>
            <span className="inline-flex items-center gap-1 text-[#22C55E] font-semibold text-xs bg-[#DDF0E6] px-2 py-0.5 rounded-full">
              <CheckCircle2 size={12} /> Aktif & Terlindungi
            </span>
          </div>
        </Card>

        {/* PARENT-CHILD PAIRING CARD */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6C5CE7]/10 flex items-center justify-center text-[#6C5CE7]">
                <Users size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Akun Terhubung</h4>
                <p className="text-[11px] text-[#64748B]">Hendra Pratama (Ayah)</p>
              </div>
            </div>
            <span className="text-[10px] bg-[#DDF0E6] text-[#15803D] font-bold px-2 py-0.5 rounded-full">
              TERVERIFIKASI
            </span>
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

        {/* SMART ALLOWANCE SPLITTER */}
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

          {/* Real-time Allocation Preview */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-3 bg-[#EAF4FF] rounded-xl border border-[#4EA8FF]/30 space-y-0.5">
              <div className="flex items-center gap-1 text-[11px] text-[#4EA8FF] font-semibold">
                <Wallet size={12} /> Kebutuhan Harian
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

          <Button
            variant="primary"
            fullWidth
            onClick={handleSaveSplit}
            className="rounded-xl mt-2"
          >
            {isSaved ? "Tersimpan Otomatis!" : "Terapkan Alokasi Otomatis"}
          </Button>
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
