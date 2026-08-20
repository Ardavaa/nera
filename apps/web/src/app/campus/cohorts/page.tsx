"use client";

import React from "react";
import { CAMPUS_COHORT_RISK } from "@nera/core";
import { ShieldCheck } from "lucide-react";

export default function CampusCohortsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Kohort Risiko per Fakultas</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Dikelompokkan berdasarkan Fakultas &amp; Angkatan.
        </p>
      </div>

      <div className="flex items-start gap-2.5 bg-[#EAF4FF] border border-[#4EA8FF]/30 rounded-xl p-3.5">
        <ShieldCheck size={16} className="text-[#00747F] shrink-0 mt-0.5" />
        <p className="text-xs text-[#0F172A] leading-relaxed">
          Data pada tabel ini <strong>teragregasi dan anonim</strong> — tidak ada nama mahasiswa, NIM, atau data mutasi individual yang ditampilkan ke pihak kampus.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="px-5 py-3">Fakultas</th>
              <th className="px-5 py-3">Angkatan</th>
              <th className="px-5 py-3">Total Mahasiswa</th>
              <th className="px-5 py-3">Aman</th>
              <th className="px-5 py-3">Waspada</th>
              <th className="px-5 py-3">Kritis</th>
            </tr>
          </thead>
          <tbody>
            {CAMPUS_COHORT_RISK.map((row, idx) => (
              <tr
                key={row.id}
                className={idx !== CAMPUS_COHORT_RISK.length - 1 ? "border-b border-[#F1F5F9]" : ""}
              >
                <td className="px-5 py-3.5 font-semibold text-[#0F172A]">{row.faculty}</td>
                <td className="px-5 py-3.5 text-[#64748B]">{row.cohortYear}</td>
                <td className="px-5 py-3.5 text-[#64748B]">{row.totalStudents}</td>
                <td className="px-5 py-3.5">
                  <span className="text-[#15803D] font-bold">{row.amanPct}%</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-[#B45309] font-bold">{row.waspadaPct}%</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-[#B91C1C] font-bold">{row.kritisPct}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
