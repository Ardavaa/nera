import { DebtSnowballItem, DebtSnowballPlan } from "../types";

/**
 * Calculates a structured Debt Snowball payoff order and recovery timeline
 */
export function calculateDebtSnowball(items: DebtSnowballItem[]): DebtSnowballPlan {
  // Sort primarily by smallest principal (classic snowball) for psychological momentum
  const sorted = [...items].sort((a, b) => a.outstandingPrincipal - b.outstandingPrincipal);

  const prioritized = sorted.map((item, index) => ({
    ...item,
    payoffPriority: index + 1,
  }));

  const totalOutstanding = prioritized.reduce((acc, cur) => acc + cur.outstandingPrincipal, 0);
  const totalMonthlyBurn = prioritized.reduce((acc, cur) => acc + cur.monthlyInstallment, 0);

  // Estimate months to clear assuming all installments maintain constant velocity
  const maxTenor = prioritized.length > 0 ? Math.max(...prioritized.map((i) => i.remainingTenorMonths)) : 0;
  const estimatedMonthsToClear = maxTenor || 3;

  const recommendedSteps = [
    `Fokus pelunasan ekstra pada prioritas #1: ${prioritized[0]?.platformName ?? "Pinjaman Terkecil"} hingga lunas.`,
    "Pertahankan pembayaran minimum untuk pinjaman lainnya tanpa mengambil pinjaman baru.",
    "Alihkan sisa dana dari pinjaman yang lunas ke target pinjaman berikutnya (Snowball Effect).",
    "Gunakan fasilitas rujukan konseling kampus untuk negosiasi keringanan bunga jika diperlukan.",
  ];

  return {
    items: prioritized,
    totalOutstanding,
    totalMonthlyBurn,
    estimatedMonthsToClear,
    monthlySavingsAfterClear: totalMonthlyBurn,
    recommendedSteps,
  };
}
