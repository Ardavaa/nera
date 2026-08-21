import {
  CampusOverviewMetrics,
  CampusTrendPoint,
  CampusScoreDistributionItem,
  CampusCohortRisk,
  CampusInterventionAlert,
  CampusMetricCard,
  CampusHealthIndicator,
  CampusKeyInsight,
  CampusProfile,
} from "../types";

// All campus-facing data below is aggregated/anonymized by construction —
// no student name, NIM, or individual transaction ever appears in this file.
// This mirrors the "anonimisasi wajib" requirement from the campus dashboard brief.

export const CAMPUS_OVERVIEW_METRICS: CampusOverviewMetrics = {
  totalMonitoredStudents: 1284,
  avgScore: 41,
  criticalPercentage: 8.4,
};

export const CAMPUS_SEMESTER_TREND: CampusTrendPoint[] = [
  { week: "M1", avgScore: 33 },
  { week: "M2", avgScore: 34 },
  { week: "M3", avgScore: 36 },
  { week: "M4", avgScore: 35 },
  { week: "M5", avgScore: 38 },
  { week: "M6", avgScore: 40 },
  { week: "M7", avgScore: 42 },
  { week: "M8", avgScore: 45 },
  { week: "M9", avgScore: 44 },
  { week: "M10", avgScore: 43 },
  { week: "M11", avgScore: 41 },
  { week: "M12", avgScore: 41 },
  { week: "M13", avgScore: 39 },
  { week: "M14", avgScore: 41 },
];

export const CAMPUS_PROFILE: CampusProfile = {
  name: "Nera Campus",
  institution: "Universitas Indonesia",
};

export const CAMPUS_METRIC_CARDS: CampusMetricCard[] = [
  {
    id: "students",
    label: "Total Mahasiswa Terpantau",
    value: CAMPUS_OVERVIEW_METRICS.totalMonitoredStudents.toLocaleString("id-ID"),
    trendPct: 6.2,
    trendIsPositive: true,
    sparkline: [30, 32, 31, 35, 34, 38, 42, 40, 44, 43, 41, 45, 44, 46],
    accent: "purple",
  },
  {
    id: "avg_score",
    label: "Rata-rata Skor Kesehatan",
    value: String(CAMPUS_OVERVIEW_METRICS.avgScore),
    trendPct: 3.1,
    trendIsPositive: true,
    sparkline: CAMPUS_SEMESTER_TREND.map((p) => p.avgScore),
    accent: "teal",
  },
  {
    id: "critical_pct",
    label: "Persentase Zona Kritis",
    value: `${CAMPUS_OVERVIEW_METRICS.criticalPercentage}%`,
    trendPct: -1.3,
    trendIsPositive: true,
    sparkline: [12, 11.5, 11, 11, 10, 10.5, 9.5, 9, 9.5, 8.8, 8.6, 9, 8.6, 8.4],
    accent: "critical",
  },
];

export const CAMPUS_HEALTH_INDICATORS: CampusHealthIndicator[] = [
  { id: "cashflow", label: "Cashflow Sehat", valuePct: 62, accent: "purple" },
  { id: "savings", label: "Tabungan Rutin", valuePct: 48, accent: "teal" },
  { id: "installment", label: "Rasio Cicilan Aman", valuePct: 71, accent: "amber" },
  { id: "risky_spend", label: "Pengeluaran Berisiko", valuePct: 23, accent: "critical" },
];

export const CAMPUS_KEY_INSIGHT: CampusKeyInsight = {
  title: "Penggunaan e-wallet meningkat +12% dibanding bulan lalu.",
  description: "Pantau kategori transportasi & makanan yang mendominasi.",
};

export const CAMPUS_SCORE_DISTRIBUTION: CampusScoreDistributionItem[] = [
  { status: "AMAN", count: 812 },
  { status: "WASPADA", count: 364 },
  { status: "KRITIS", count: 108 },
];

export const CAMPUS_COHORT_RISK: CampusCohortRisk[] = [
  { id: "cohort_1", faculty: "Fakultas Teknik", cohortYear: 2026, totalStudents: 312, amanPct: 58, waspadaPct: 30, kritisPct: 12 },
  { id: "cohort_2", faculty: "Fakultas Teknik", cohortYear: 2025, totalStudents: 289, amanPct: 66, waspadaPct: 26, kritisPct: 8 },
  { id: "cohort_3", faculty: "Fakultas Ekonomi & Bisnis", cohortYear: 2026, totalStudents: 254, amanPct: 61, waspadaPct: 29, kritisPct: 10 },
  { id: "cohort_4", faculty: "Fakultas Ekonomi & Bisnis", cohortYear: 2025, totalStudents: 201, amanPct: 70, waspadaPct: 24, kritisPct: 6 },
  { id: "cohort_5", faculty: "Fakultas Ilmu Komunikasi", cohortYear: 2026, totalStudents: 145, amanPct: 55, waspadaPct: 33, kritisPct: 12 },
  { id: "cohort_6", faculty: "Fakultas Industri Kreatif", cohortYear: 2026, totalStudents: 83, amanPct: 64, waspadaPct: 27, kritisPct: 9 },
];

export const CAMPUS_INTERVENTION_ALERTS: CampusInterventionAlert[] = [
  {
    id: "alert_1",
    severity: "critical",
    title: "Lonjakan indikasi pinjol berbunga tinggi pada Angkatan 2026",
    description: "Terdeteksi kenaikan 20% pola transfer masuk yang cocok dengan profil platform pinjaman berisiko tinggi pada mahasiswa baru minggu ini.",
    recommendedAction: "Jalankan kampanye literasi keuangan via email ke Angkatan 2026.",
    detectedAt: "2026-08-18T09:00:00Z",
  },
  {
    id: "alert_2",
    severity: "warning",
    title: "Runway rata-rata Fakultas Ilmu Komunikasi menurun",
    description: "Rata-rata hari runway turun dari 16 ke 11 hari dalam 3 minggu terakhir di fakultas ini.",
    recommendedAction: "Rekomendasikan sesi konsultasi anggaran bulanan bersama Direktorat Kemahasiswaan.",
    detectedAt: "2026-08-15T09:00:00Z",
  },
  {
    id: "alert_3",
    severity: "info",
    title: "Streak Aman 2 bulan meningkat 15% dibanding semester lalu",
    description: "Lebih banyak mahasiswa memenuhi syarat membuka Tangga Kemapanan Finansial (Wealth Ladder).",
    recommendedAction: "Tidak ada tindakan mendesak — cukup pantau tren pada dashboard.",
    detectedAt: "2026-08-10T09:00:00Z",
  },
];
