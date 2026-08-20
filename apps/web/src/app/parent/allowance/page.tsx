"use client";

import React, { useState } from "react";
import { TopAppBar } from "../../../components/common/TopAppBar";
import { useFinancialStore } from "../../../context/FinancialStore";
import { Card, Button } from "@nera/ui";
import { Sliders, ArrowDownLeft, Wallet, Lock, CheckCircle2, Sparkles } from "lucide-react";

export default function ParentAllowancePage() {
  const { monthlyAllowance, setAllowanceSplit } = useFinancialStore();

  const [splitRatio, setSplitRatio] = useState<number>(80);
  const [allowanceInput, setAllowanceInput] = useState<number>(monthlyAllowance || 2000000);
  const [isSaved, setIsSaved] = useState(false);

  const pocketAmount = (allowanceInput * splitRatio) / 100;
  const lockAmount = allowanceInput - pocketAmount;

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleSave = () => {
    setAllowanceSplit(allowanceInput, splitRatio);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="Atur Transfer Otomatis" showBack />

      <main className="flex-1 px-4 pt-3.5 pb-6 space-y-4">
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-[#00747F]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Transfer Uang Saku Bulanan
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748B] mb-1">
              Nominal Transfer Rutin
            </label>
            <input
              type="number"
              value={allowanceInput}
              onChange={(e) => setAllowanceInput(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-bold text-[#0F172A] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#00747F]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-[#64748B]">
              <span>Daily Pocket / QRIS ({splitRatio}%)</span>
              <span>Lock Pocket / Tabungan Wajib ({100 - splitRatio}%)</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={splitRatio}
              onChange={(e) => setSplitRatio(Number(e.target.value))}
              className="w-full accent-[#00747F] cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">
              <Sparkles size={10} className="text-[#00747F]" /> Pratinjau Alokasi Real-Time
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DDF0E6] flex items-center justify-center">
                <ArrowDownLeft size={14} className="text-[#22C55E]" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[#64748B]">Transfer per Bulan</p>
                <p className="text-sm font-bold text-[#0F172A]">{formatRupiah(allowanceInput)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#EAF4FF] rounded-xl border border-[#4EA8FF]/30 space-y-0.5">
                <div className="flex items-center gap-1 text-[11px] text-[#4EA8FF] font-semibold">
                  <Wallet size={12} /> Daily Pocket
                </div>
                <p className="text-sm font-black text-[#0F172A]">{formatRupiah(pocketAmount)}</p>
              </div>

              <div className="p-3 bg-[#DDF0E6] rounded-xl border border-[#22C55E]/30 space-y-0.5">
                <div className="flex items-center gap-1 text-[11px] text-[#15803D] font-semibold">
                  <Lock size={12} /> Lock Pocket
                </div>
                <p className="text-sm font-black text-[#0F172A]">{formatRupiah(lockAmount)}</p>
              </div>
            </div>
          </div>

          <Button variant="bni" fullWidth onClick={handleSave} className="rounded-xl mt-2">
            {isSaved ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} /> Tersimpan Otomatis!
              </span>
            ) : (
              "Simpan & Aktifkan Transfer Otomatis"
            )}
          </Button>
        </Card>
      </main>
    </div>
  );
}
