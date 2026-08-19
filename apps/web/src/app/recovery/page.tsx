"use client";

import React, { useState } from "react";
import { TopAppBar } from "../../components/common/TopAppBar";
import { useFinancialStore } from "../../context/FinancialStore";
import { Card, Button, StatusBadge } from "@nera/ui";
import { calculateDebtSnowball, DebtSnowballItem } from "@nera/core";
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
} from "lucide-react";

export default function RecoveryPage() {
  const {
    userName,
    state,
    activeDebts,
    addDebtItem,
    payOffDebt,
  } = useFinancialStore();

  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);
  const [platformName, setPlatformName] = useState("");
  const [principal, setPrincipal] = useState<number>(1000000);
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(380000);
  const [tenorMonths, setTenorMonths] = useState<number>(3);

  const snowballPlan = calculateDebtSnowball(activeDebts);

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

  return (
    <div className="flex flex-col min-h-full">
      <TopAppBar title="AI Recovery Consultant" />

      <main className="flex-1 px-4 py-4 space-y-4">
        {/* CRISIS BANNER & INVESTMENT LOCK NOTIFICATION */}
        <Card className="p-4 bg-[#FBE4DE] border-[#EF4444]/40 space-y-2">
          <div className="flex items-center gap-2 text-[#EF4444]">
            <AlertOctagon size={20} />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Mode Pemulihan Darurat Aktif
            </h3>
          </div>
          <p className="text-xs text-[#0F172A] leading-relaxed">
            Demi melindungi kesehatan finansialmu, <strong>semua penawaran produk investasi BNI dikunci total</strong> hingga siklus cicilan selesai dilunasi.
          </p>
        </Card>

        {/* RECOVERY SUMMARY */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Ringkasan Kewajiban
            </span>
            <span className="text-xs font-bold text-[#EF4444]">
              {activeDebts.length} Pos Cicilan
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-[#64748B]">Total Sisa Pokok:</span>
              <p className="text-base font-black text-[#EF4444]">
                {formatRupiah(snowballPlan.totalOutstanding)}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-[#64748B]">Beban per Bulan:</span>
              <p className="text-base font-black text-[#0F172A]">
                {formatRupiah(snowballPlan.totalMonthlyBurn)}
              </p>
            </div>
          </div>
        </Card>

        {/* DEBT SNOWBALL PRIORITIZATION LIST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
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
            <Card className="p-4 space-y-3 border-[#6C5CE7]">
              <h4 className="text-xs font-bold text-[#0F172A]">Input Kewajiban Pinjaman</h4>
              <form onSubmit={handleAddDebt} className="space-y-3">
                <input
                  type="text"
                  placeholder="Nama Platform (misal: EasyDana / PayLater)"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Sisa Pokok (Rp)"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border rounded-xl"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cicilan / bln"
                    value={monthlyInstallment}
                    onChange={(e) => setMonthlyInstallment(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border rounded-xl"
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
              <h4 className="text-sm font-bold text-[#0F172A]">Bebas Dari Beban Cicilan</h4>
              <p className="text-xs text-[#64748B]">
                Tidak ada cicilan terdeteksi. Pertahankan status amanmu dan bangun dana darurat di BNI Life Goals!
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {snowballPlan.items.map((debt, idx) => (
                <Card
                  key={debt.id}
                  className={`p-3.5 space-y-2 ${
                    idx === 0 ? "border-2 border-[#6C5CE7] bg-[#6C5CE7]/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#6C5CE7] text-white text-[10px] font-bold flex items-center justify-center">
                        #{debt.payoffPriority}
                      </span>
                      <h4 className="text-xs font-bold text-[#0F172A]">{debt.platformName}</h4>
                    </div>
                    {idx === 0 && (
                      <span className="text-[10px] bg-[#6C5CE7] text-white font-bold px-2 py-0.5 rounded-full">
                        Target Pelunasan #1
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-[#64748B]">
                    <span>Sisa: {formatRupiah(debt.outstandingPrincipal)}</span>
                    <span className="font-bold text-[#0F172A]">
                      {formatRupiah(debt.monthlyInstallment)} / bulan
                    </span>
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
            </div>
          )}
        </div>

        {/* CAMPUS COUNSELING REFERRAL */}
        <Card className="p-4 space-y-3 bg-[#EAF4FF] border-[#4EA8FF]/40">
          <div className="flex items-center gap-2 text-[#00747F]">
            <GraduationCap size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Rujukan Konseling Finansial Kampus
            </h3>
          </div>
          <p className="text-xs text-[#0F172A] leading-relaxed">
            Jika kamu merasa tertekan oleh tagihan pinjaman, jangan ragu untuk berkonsultasi secara rahasia dan gratis dengan Tim Advokasi Mahasiswa Telkom University.
          </p>
          <div className="pt-1">
            <Button
              variant="bni"
              size="sm"
              fullWidth
              onClick={() => alert("Menghubungkan ke Pusat Bantuan Mahasiswa Tel-U...")}
              className="text-xs h-9 rounded-xl gap-1.5"
            >
              <PhoneCall size={14} /> Hubungi Konseling Kampus (Gratis)
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
