"use client";

import React, { useState } from "react";
import { HelpCircle, X } from "lucide-react";
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

export const PersonaDemoSwitcher: React.FC = () => {
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
        aria-label="Demo: Ganti Persona"
        title="Demo: Ganti Persona"
      >
        <HelpCircle size={19} />
      </button>

      {isOpen && (
        <div className="absolute top-11 right-0 w-64 bg-white border border-dashed border-[#6C5CE7]/50 rounded-[18px] shadow-2xl p-2 space-y-1 z-50">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C5CE7]">
              Demo: Ganti Persona
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#94A3B8] hover:text-[#0F172A]"
              aria-label="Tutup"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-[10px] text-[#64748B] px-2 pb-1 leading-relaxed">
            Hanya mengganti angka transaksi mentah — persona tetap dihitung ulang oleh classifier.
          </p>
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
