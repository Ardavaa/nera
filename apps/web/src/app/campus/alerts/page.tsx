"use client";

import React from "react";
import { CAMPUS_INTERVENTION_ALERTS } from "@nera/core";
import { Card } from "@nera/ui";
import { AlertOctagon, AlertTriangle, Info, ArrowRight } from "lucide-react";

const SEVERITY_CONFIG = {
  critical: { icon: AlertOctagon, bg: "bg-[#FBE4DE]", border: "border-[#EF4444]/30", text: "text-[#EF4444]", label: "Kritis" },
  warning: { icon: AlertTriangle, bg: "bg-[#FBF0D9]", border: "border-[#FBBF24]/30", text: "text-[#B45309]", label: "Perhatian" },
  info: { icon: Info, bg: "bg-[#EAF4FF]", border: "border-[#4EA8FF]/30", text: "text-[#2563EB]", label: "Info" },
} as const;

export default function CampusAlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Peringatan &amp; Rekomendasi Intervensi</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Dihasilkan otomatis dari pola agregat, bukan pemantauan individu mahasiswa.
        </p>
      </div>

      <div className="space-y-3">
        {CAMPUS_INTERVENTION_ALERTS.map((alert) => {
          const config = SEVERITY_CONFIG[alert.severity];
          const Icon = config.icon;
          const dateStr = new Date(alert.detectedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
          });

          return (
            <Card key={alert.id} className={`space-y-3 ${config.border}`}>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${config.text}`}>
                  <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">{config.label}</span>
                </div>
                <span className="text-[11px] text-[#94A3B8]">{dateStr}</span>
              </div>

              <h3 className="text-sm font-bold text-[#0F172A]">{alert.title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{alert.description}</p>

              <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9] text-xs">
                <ArrowRight size={12} className="text-[#00747F] shrink-0" />
                <span className="text-[#0F172A] font-medium">{alert.recommendedAction}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
