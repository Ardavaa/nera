"use client";

import React, { useEffect, useState } from "react";
import {
  CAMPUS_OVERVIEW_METRICS,
  CAMPUS_SEMESTER_TREND,
  CAMPUS_SCORE_DISTRIBUTION,
} from "@nera/core";
import { Users, TrendingUp, AlertTriangle } from "lucide-react";
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
  Legend,
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

function MetricCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: `${accent}15`, color: accent }}
      >
        <Icon size={18} />
      </div>
      <p className="text-2xl font-black text-[#0F172A]">{value}</p>
      <p className="text-xs text-[#64748B] mt-1">{label}</p>
    </div>
  );
}

function CardSkeleton() {
  return <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 h-[110px] animate-pulse" />;
}

function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      className="bg-white border border-[#E2E8F0] rounded-2xl animate-pulse"
      style={{ height }}
    />
  );
}

export default function CampusOverviewPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Ringkasan Kesehatan Finansial Kampus</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Seluruh data di bawah ini teragregasi dan anonim — tidak ada nama mahasiswa atau data mutasi individual yang ditampilkan.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            icon={Users}
            label="Total Mahasiswa Terpantau"
            value={CAMPUS_OVERVIEW_METRICS.totalMonitoredStudents.toLocaleString("id-ID")}
            accent="#6C5CE7"
          />
          <MetricCard
            icon={TrendingUp}
            label="Rata-rata Skor Kesehatan Finansial"
            value={String(CAMPUS_OVERVIEW_METRICS.avgScore)}
            accent="#00747F"
          />
          <MetricCard
            icon={AlertTriangle}
            label="Persentase Zona Kritis"
            value={`${CAMPUS_OVERVIEW_METRICS.criticalPercentage}%`}
            accent="#EF4444"
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {isLoading ? (
            <ChartSkeleton height={340} />
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[#0F172A] mb-4">
                Tren Skor Rata-rata Sepanjang Semester
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={CAMPUS_SEMESTER_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#64748B" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748B" }} domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    name="Skor Rata-rata"
                    stroke="#6C5CE7"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div>
          {isLoading ? (
            <ChartSkeleton height={340} />
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[#0F172A] mb-4">Distribusi Skor</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={CAMPUS_SCORE_DISTRIBUTION}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                  >
                    {CAMPUS_SCORE_DISTRIBUTION.map((entry) => (
                      <Cell key={entry.status} fill={STATUS_HEX[entry.status]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [value, STATUS_LABEL[name] || name]} />
                  <Legend
                    formatter={(value: string) => STATUS_LABEL[value] || value}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
