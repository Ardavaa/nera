import { FinancialStateData, UserProfile, WealthTier, SaferAlternative } from "../types";

export const DEFAULT_MOCK_STATE: FinancialStateData = {
  userName: "Budi",
  campus: "Telkom University",
  score: 34,
  state: "AMAN",
  monthlyAllowance: 2000000,
  dailyPocket: 630000,
  lockPocket: 800000, // BNI Life Goals
  dailyBudgetSafe: 45000,
  runwayDays: 14,
  totalMonthlyInstallments: 0,
  loanCount: 0,
  activeLoanSources: [],
  safeConsecutiveMonths: 2,
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: "usr_budi_01",
  userName: "Budi Pratama",
  campus: "Telkom University",
  nim: "1301213045",
  email: "budi.pratama@student.telkomuniversity.ac.id",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop",
  isPairedWithParent: true,
  parentName: "Hendra Pratama (Ayah)",
  parentPhone: "+62 812-3456-7890",
  pairedAt: "2026-01-15T08:00:00Z",
};

export const NERA_BRAND = {
  name: "Nera",
  tagline: "Predict Risk. Borrow Smart. Live Free.",
  colors: {
    primaryPurple: "#6C5CE7",
    secondaryBlue: "#4EA8FF",
    bniTeal: "#00747F",
    safe: "#22C55E",
    safeSoft: "#DDF0E6",
    warning: "#FBBF24",
    warningSoft: "#FBF0D9",
    critical: "#EF4444",
    criticalSoft: "#FBE4DE",
    dark: "#0F172A",
    muted: "#64748B",
    subtle: "#7D8A9E",
    canvas: "#F8FAFC",
    card: "#FFFFFF",
    border: "#E2E8F0",
  },
} as const;

export const CAMPUS_SAFER_ALTERNATIVES: SaferAlternative[] = [
  {
    id: "alt_kopma",
    title: "Dana Talangan Koperasi Mahasiswa",
    provider: "Kopma Telkom University",
    interestRatePercent: 0,
    maxAmount: 1500000,
    description: "Bantuan darurat biaya kuliah & operasional tanpa bunga. Pelunasan fleksibel hingga 3 bulan.",
    badge: "0% Bunga",
    actionUrl: "https://telkomuniversity.ac.id/kopma",
  },
  {
    id: "alt_bni_fleksi",
    title: "BNI Fleksi Pendidikan Mahasiswa",
    provider: "PT Bank Negara Indonesia (Persero) Tbk",
    interestRatePercent: 0.75,
    maxAmount: 10000000,
    description: "Kredit pendidikan resmi bunga rendah terverifikasi OJK dengan autodebet BNI Taplus Muda.",
    badge: "Resmi BNI",
    actionUrl: "https://www.bni.co.id/id-id/personal/pinjaman/bni-fleksi",
  },
  {
    id: "alt_darurat_kemahasiswaan",
    title: "Dana Darurat Direktorat Kemahasiswaan",
    provider: "Direktorat Kemahasiswaan Tel-U",
    interestRatePercent: 0,
    maxAmount: 2000000,
    description: "Bantuan situasi genting kebutuhan medis/tempat tinggal tanpa penalti & biaya admin.",
    badge: "Bantuan Kampus",
    actionUrl: "https://kemahasiswaan.telkomuniversity.ac.id",
  },
];

export const INITIAL_WEALTH_TIERS: WealthTier[] = [
  {
    tier: 1,
    name: "Tier 1: Dana Darurat",
    productName: "BNI Life Goals (Locked Pocket)",
    targetAmount: 3000000, // 3x pengeluaran bulanan mahasiswa
    currentAmount: 800000,
    progressPercent: 26.6,
    isUnlocked: true,
    isCompleted: false,
    minMonthlyReturnPct: 3.0,
    description: "Target 3x pengeluaran bulanan. Wajib selesai 100% sebelum membuka instrumen investasi.",
    badgeText: "Wajib 100%",
  },
  {
    tier: 2,
    name: "Tier 2: Reksa Dana Pasar Uang",
    productName: "BNI-AM Dana Lancar Pasar Uang",
    targetAmount: 5000000,
    currentAmount: 0,
    progressPercent: 0,
    isUnlocked: false,
    isCompleted: false,
    minMonthlyReturnPct: 5.2,
    description: "Mulai dari Rp10.000, likuiditas harian bebas tarik tanpa pinalti dengan imbal hasil ~5.2% p.a.",
    badgeText: "Bunga ~5.2% p.a.",
  },
  {
    tier: 3,
    name: "Tier 3: Surat Berharga Negara (SBN)",
    productName: "ORI / Sukuk Tabungan wondr",
    targetAmount: 10000000,
    currentAmount: 0,
    progressPercent: 0,
    isUnlocked: false,
    isCompleted: false,
    minMonthlyReturnPct: 6.4,
    description: "Dijamin 100% oleh Negara Republik Indonesia. Kupon pasti masuk rekening BNI setiap bulan.",
    badgeText: "Dijamin Negara",
  },
];
