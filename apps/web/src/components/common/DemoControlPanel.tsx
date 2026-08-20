"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, X, GraduationCap, Users, Building2 } from "lucide-react";
import { PERSONA_LABELS, DEMO_PERSONA_SCENARIOS, PersonaId } from "@nera/core";
import { useFinancialStore } from "../../context/FinancialStore";

const PERSONA_ORDER: PersonaId[] = [
  "konsisten_nabung",
  "pejuang_runway",
  "anak_rantau",
  "calon_mapan",
  "wirausaha_kampus",
  "pejuang_pemulihan",
];

const VIEW_LINKS = [
  { href: "/", label: "Tampilan Mahasiswa", icon: GraduationCap },
  { href: "/parent", label: "Tampilan Orang Tua", icon: Users },
  { href: "/campus", label: "Tampilan Kampus", icon: Building2 },
];

export const DemoControlPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const applyPersonaDemoScenario = useFinancialStore((s) => s.applyPersonaDemoScenario);

  const handleSelect = (personaId: PersonaId) => {
    applyPersonaDemoScenario(personaId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-9 h-9 rounded-full flex items-center justify-center text-[#94A3B8] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
        aria-label="Menu Demo"
        title="Menu Demo"
      >
        <HelpCircle size={19} />
      </button>

      {isOpen && (
        <div className="absolute top-11 right-0 w-64 bg-white border border-dashed border-[#6C5CE7]/50 rounded-[18px] shadow-2xl p-2 space-y-1 z-50 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
              Menu Demo
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#94A3B8] hover:text-[#0F172A]"
              aria-label="Tutup"
            >
              <X size={14} />
            </button>
          </div>

          {/* Role Switcher */}
          <div className="px-2 pb-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Lihat Sebagai
            </span>
          </div>
          {VIEW_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-[#6C5CE7]/8 transition-colors"
            >
              <Icon size={14} className="text-[#6C5CE7]" />
              <span className="text-xs font-semibold text-[#0F172A]">{label}</span>
            </Link>
          ))}

          <div className="h-px bg-[#E2E8F0] my-1" />

          {/* Persona Scenario Switcher */}
          <div className="px-2 pb-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Ganti Persona (Mahasiswa)
            </span>
            <p className="text-[10px] text-[#64748B] leading-relaxed pt-0.5">
              Hanya mengganti angka transaksi mentah — persona tetap dihitung ulang oleh classifier.
            </p>
          </div>
          {PERSONA_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-[#6C5CE7]/8 transition-colors"
            >
              <p className="text-xs font-bold text-[#0F172A]">{PERSONA_LABELS[id].label}</p>
              <p className="text-[10px] text-[#64748B] leading-snug">
                {DEMO_PERSONA_SCENARIOS[id].scenarioLabel !== PERSONA_LABELS[id].label
                  ? DEMO_PERSONA_SCENARIOS[id].scenarioLabel
                  : PERSONA_LABELS[id].tagline}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
