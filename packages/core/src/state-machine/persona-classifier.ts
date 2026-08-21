import { FinancialStatus, PersonaId, PersonaMatch, SmartNudge, Transaction } from "../types";
import { PERSONA_LABELS } from "../constants";

export interface PersonaClassifierInput {
  transactions: Transaction[];
  nudges: SmartNudge[];
  score: number;
  state: FinancialStatus;
  monthlyAllowance: number;
  lockPocket: number;
  runwayDays: number;
  safeConsecutiveMonths: number;
  totalMonthlyInstallments: number;
  activeDebtsCount: number;
}

function buildMatch(id: PersonaId, matchReasons: string[]): PersonaMatch {
  const { label, tagline } = PERSONA_LABELS[id];
  return { id, label, tagline, matchReasons };
}

/**
 * Classifies which BNI-relevant personas a user matches, purely from
 * transaction/state signals already tracked by Nera — no extra data
 * collection required. Each match includes human-readable reasons so
 * the recommendation stays explainable rather than a black box.
 */
export function classifyPersonas(input: PersonaClassifierInput): PersonaMatch[] {
  const {
    transactions,
    nudges,
    score,
    state,
    monthlyAllowance,
    lockPocket,
    runwayDays,
    safeConsecutiveMonths,
    totalMonthlyInstallments,
    activeDebtsCount,
  } = input;

  // Recovery takes priority: while WASPADA/KRITIS, Nera only surfaces
  // supportive/official options — never investment or credit upselling —
  // mirroring the reputation-protection rule already enforced on /recovery.
  if (state !== "AMAN" || activeDebtsCount > 0) {
    return [
      buildMatch("pejuang_pemulihan", [
        `Status finansial saat ini ${state} (skor ${score})`,
        activeDebtsCount > 0
          ? `${activeDebtsCount} pos cicilan aktif sedang dilunasi`
          : "Perlu stabilisasi sebelum akses produk komersial dibuka kembali",
      ]),
    ];
  }

  const matches: PersonaMatch[] = [];

  const dtiRatio = monthlyAllowance > 0 ? totalMonthlyInstallments / monthlyAllowance : 0;
  const savingRatio = monthlyAllowance > 0 ? lockPocket / monthlyAllowance : 0;

  if (savingRatio >= 0.2 && safeConsecutiveMonths >= 1) {
    matches.push(
      buildMatch("konsisten_nabung", [
        `Lock Pocket setara ${Math.round(savingRatio * 100)}% dari uang saku bulanan`,
        `Skor Aman bertahan ${safeConsecutiveMonths} bulan berturut-turut`,
      ])
    );
  }

  if (runwayDays >= 14) {
    matches.push(
      buildMatch("pejuang_runway", [
        `Runway saldo ${runwayDays} hari, di atas ambang aman 14 hari`,
        "Pengeluaran harian konsisten di bawah budget yang direkomendasikan",
      ])
    );
  }

  const hasKosBill = nudges.some((n) => n.category === "BILL_KOS")
    || transactions.some((t) => t.title.toLowerCase().includes("kos"));
  if (hasKosBill) {
    matches.push(
      buildMatch("anak_rantau", [
        "Ada tagihan kos/tempat tinggal yang dibayar rutin setiap bulan",
      ])
    );
  }

  const allowanceIncomes = transactions
    .filter((t) => t.type === "income" && t.category === "allowance")
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const allowanceTrendingUp =
    allowanceIncomes.length >= 2 &&
    allowanceIncomes[allowanceIncomes.length - 1].amount > allowanceIncomes[0].amount;

  if (allowanceTrendingUp && dtiRatio < 0.1) {
    matches.push(
      buildMatch("calon_mapan", [
        "Uang saku bulanan menunjukkan tren naik",
        `Rasio cicilan terhadap pemasukan hanya ${Math.round(dtiRatio * 100)}%`,
      ])
    );
  }

  const nonAllowanceIncome = transactions.some(
    (t) => t.type === "income" && t.category !== "allowance"
  );
  if (nonAllowanceIncome) {
    matches.push(
      buildMatch("wirausaha_kampus", [
        "Terdeteksi pemasukan rutin di luar kategori uang saku",
      ])
    );
  }

  return matches;
}
