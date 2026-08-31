"use client";

import React, { useEffect, useState } from "react";
import {
  CAMPUS_METRIC_CARDS,
  CAMPUS_SEMESTER_TREND,
  CAMPUS_SCORE_DISTRIBUTION,
  CAMPUS_HEALTH_INDICATORS,
  CAMPUS_KEY_INSIGHT,
} from "@nera/core";
import { Card } from "@nera/ui";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ChevronDown,
  Sparkles,
  Wallet,
  PieChart as PieChartIcon,
  CreditCard,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const STATUS_HEX: Record<string, string> = {
  AMAN: "#22C55E",
  WASPADA: "#FBBF24",
  KRITIS: "#EF4444",
};

const STATUS_LABEL: Record<string, string> = {
  AMAN: "Aman",
  WASPADA: "Waspada",
  KRITIS: "Kritis",
};

const ACCENT_HEX: Record<string, string> = {
  purple: "#6C5CE7",
  teal: "#14B8A6",
  amber: "#F59E0B",
  critical: "#EF4444",
};

const METRIC_ICONS: Record<string, React.ElementType> = {
  students: Users,
  avg_score: TrendingUp,
  critical_pct: AlertTriangle,
};

const INDICATOR_ICONS: Record<string, React.ElementType> = {
  cashflow: Wallet,
  savings: PieChartIcon,
  installment: CreditCard,
  risky_spend: AlertTriangle,
};

function CardSkeleton({ className = "" }: { className?: string }) {
  return <Card className={`animate-pulse ${className}`}>{null}</Card>;
}

export default function CampusOverviewPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const totalDistribution = CAMPUS_SCORE_DISTRIBUTION.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Halo, Nera Campus! 👋</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Ringkasan kesehatan finansial mahasiswa kampus Anda.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm font-medium text-[#0F172A] shadow-sm">
          <Calendar size={16} className="text-[#64748B]" />
          1 Mei 2026 – 31 Mei 2026
          <ChevronDown size={14} className="text-[#94A3B8]" />
        </button>
      </div>

      {/* METRIC CARDS WITH SPARKLINES */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          <CardSkeleton className="h-[170px]" />
          <CardSkeleton className="h-[170px]" />
          <CardSkeleton className="h-[170px]" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {CAMPUS_METRIC_CARDS.map((metric) => {
            const Icon = METRIC_ICONS[metric.id] || TrendingUp;
            const accent = ACCENT_HEX[metric.accent];
            const isUp = metric.trendPct >= 0;
            const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
            const trendColor = metric.trendIsPositive ? "#22C55E" : "#EF4444";
            const sparklineData = metric.sparkline.map((v, i) => ({ i, v }));

            return (
              <Card key={metric.id} className="p-0 overflow-hidden">
                <div className="p-5 pb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${accent}18`, color: accent }}
                  >
                    <Icon size={20} />
                  </div>
                  <p className="text-sm text-[#64748B]">{metric.label}</p>
                  <h2 className="text-[28px] font-bold text-[#0F172A] mt-1 leading-none">
                    {metric.value}
                  </h2>
                  <div className="flex items-center gap-1 mt-2 text-xs">
                    <TrendIcon size={13} style={{ color: trendColor }} />
                    <span className="font-bold" style={{ color: trendColor }}>
                      {Math.abs(metric.trendPct)}%
                    </span>
                    <span className="text-[#94A3B8]">dari periode sebelumnya</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={56}>
                  <AreaChart data={sparklineData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={`spark-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accent} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={accent} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={accent}
                      strokeWidth={2}
                      fill={`url(#spark-${metric.id})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            );
          })}
        </div>
      )}

      {/* TREND LINE + DISTRIBUTION DONUT */}
      <div className="grid grid-cols-3 gap-4 items-start">
        <div className="col-span-2">
          {isLoading ? (
            <CardSkeleton className="h-[420px]" />
          ) : (
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Tren Skor Rata-rata Sepanjang Semester
                </h3>
                <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-medium text-[#0F172A]">
                  Semester Genap 2025/2026
                  <ChevronDown size={12} className="text-[#94A3B8]" />
                </button>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={CAMPUS_SEMESTER_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} domain={[0, 100]} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    name="Skor Rata-rata"
                    stroke="#6C5CE7"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#6C5CE7", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex items-center gap-2.5 bg-[#F5F3FF] rounded-2xl p-4">
                <Sparkles size={16} className="text-[#6C5CE7] shrink-0" />
                <p className="text-xs text-[#0F172A] leading-relaxed">
                  Skor rata-rata saat ini berada di zona{" "}
                  <strong className="text-[#6C5CE7]">Aman</strong>. Pertahankan tren positif ini!
                </p>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <CardSkeleton className="h-[280px]" />
          ) : (
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0F172A]">Distribusi Skor Mahasiswa</h3>
                <Info size={14} className="text-[#94A3B8]" />
              </div>

              <div className="flex items-center gap-4">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={CAMPUS_SCORE_DISTRIBUTION}
                      dataKey="count"
                      nameKey="status"
                      innerRadius={38}
                      outerRadius={58}
                      paddingAngle={2}
                    >
                      {CAMPUS_SCORE_DISTRIBUTION.map((entry) => (
                        <Cell key={entry.status} fill={STATUS_HEX[entry.status]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-2 flex-1">
                  {CAMPUS_SCORE_DISTRIBUTION.map((entry) => (
                    <div key={entry.status} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: STATUS_HEX[entry.status] }}
                        />
                        <span className="text-xs text-[#64748B]">{STATUS_LABEL[entry.status]}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#0F172A]">
                          {((entry.count / totalDistribution) * 100).toFixed(1)}%
                        </p>
                        <p className="text-[10px] text-[#94A3B8]">({entry.count})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {isLoading ? (
            <CardSkeleton className="h-[100px]" />
          ) : (
            <Card>
              <h3 className="text-sm font-bold text-[#0F172A] mb-3">Insight Utama</h3>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#F5F3FF] flex items-center justify-center shrink-0">
                  <TrendingUp size={18} className="text-[#6C5CE7]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0F172A] leading-snug">
                    {CAMPUS_KEY_INSIGHT.title}
                  </p>
                  <p className="text-[11px] text-[#64748B] leading-snug mt-0.5">
                    {CAMPUS_KEY_INSIGHT.description}
                  </p>
                </div>
                <ChevronDown size={16} className="text-[#94A3B8] -rotate-90 shrink-0" />
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* HEALTH INDICATORS */}
      {isLoading ? (
        <CardSkeleton className="h-[130px]" />
      ) : (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Indikator Kesehatan Finansial</h3>
            <button className="text-xs font-bold text-[#6C5CE7] flex items-center gap-1">
              Lihat Detail <ChevronDown size={12} className="-rotate-90" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {CAMPUS_HEALTH_INDICATORS.map((indicator) => {
              const Icon = INDICATOR_ICONS[indicator.id] || Wallet;
              const accent = ACCENT_HEX[indicator.accent];
              return (
                <div key={indicator.id} className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accent}18`, color: accent }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-[#0F172A] leading-tight">
                      {indicator.valuePct}%
                    </p>
                    <p className="text-[11px] text-[#64748B] truncate">{indicator.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
