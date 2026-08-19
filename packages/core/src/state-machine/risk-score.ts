import { FinancialStatus, FinancialStateData } from "../types";

export interface RiskEvaluationResult {
  score: number;
  state: FinancialStatus;
  dtiPercent: number;
  runwayDays: number;
  isStackingRisk: boolean;
  statusReasons: string[];
  recommendedFlow: "FLOW_B_E" | "FLOW_C" | "FLOW_D";
  allowInvestmentUpsell: boolean;
}

/**
 * Calculates Debt-to-Income (DTI) Ratio in percentage
 */
export function calculateDti(totalMonthlyInstallments: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) return 100;
  return Math.round(((totalMonthlyInstallments / monthlyIncome) * 100) * 10) / 10;
}

/**
 * Calculates runway in days based on current liquid pocket and safe daily spend
 */
export function calculateRunwayDays(dailyPocket: number, dailyBudgetSafe: number): number {
  if (dailyBudgetSafe <= 0) return 0;
  return Math.floor(dailyPocket / dailyBudgetSafe);
}

/**
 * Evaluates the entire Financial Risk State according to STATE_MACHINE.md specification
 */
export function evaluateFinancialState(data: {
  monthlyAllowance: number;
  dailyPocket: number;
  dailyBudgetSafe: number;
  totalMonthlyInstallments: number;
  activeLoanSourcesCount: number;
}): RiskEvaluationResult {
  const {
    monthlyAllowance,
    dailyPocket,
    dailyBudgetSafe,
    totalMonthlyInstallments,
    activeLoanSourcesCount,
  } = data;

  const dtiPercent = calculateDti(totalMonthlyInstallments, monthlyAllowance);
  const runwayDays = calculateRunwayDays(dailyPocket, dailyBudgetSafe);
  const isStackingRisk = activeLoanSourcesCount > 2;

  let baseScore = 0;
  const statusReasons: string[] = [];

  // 1. Base Score derived from DTI
  if (dtiPercent <= 20) {
    // 0 - 30 scale
    baseScore = Math.round((dtiPercent / 20) * 30);
    statusReasons.push(`DTI sehat (${dtiPercent}% <= 20%)`);
  } else if (dtiPercent <= 40) {
    // 31 - 60 scale
    const excess = (dtiPercent - 20) / 20;
    baseScore = 31 + Math.round(excess * 29);
    statusReasons.push(`DTI moderat (${dtiPercent}% melebihi batas ideal 20%)`);
  } else {
    // 61 - 100 scale
    const excess = Math.min((dtiPercent - 40) / 40, 1);
    baseScore = 61 + Math.round(excess * 39);
    statusReasons.push(`DTI tinggi (${dtiPercent}% > 40%, beban cicilan berat)`);
  }

  // 2. Runway Adjustments
  if (runwayDays < 7) {
    baseScore = Math.max(baseScore, 45); // Force at least WASPADA
    statusReasons.push(`Runway kritis (${runwayDays} hari < 7 hari)`);
  } else if (runwayDays >= 14) {
    statusReasons.push(`Runway aman (${runwayDays} hari >= 14 hari)`);
  }

  // 3. Stacking Guardrail
  if (isStackingRisk) {
    baseScore = Math.max(baseScore, 75); // Force into KRITIS
    statusReasons.push(`Terdeteksi ${activeLoanSourcesCount} sumber pinjaman (Stacking / Gali Lubang Tutup Lubang)`);
  }

  // Clamp score
  const finalScore = Math.min(100, Math.max(0, baseScore));

  // Determine State
  let state: FinancialStatus = "AMAN";
  let recommendedFlow: "FLOW_B_E" | "FLOW_C" | "FLOW_D" = "FLOW_B_E";
  let allowInvestmentUpsell = true;

  if (finalScore >= 70 || isStackingRisk) {
    state = "KRITIS";
    recommendedFlow = "FLOW_D";
    allowInvestmentUpsell = false;
  } else if (finalScore >= 40 || runwayDays < 7) {
    state = "WASPADA";
    recommendedFlow = "FLOW_C";
    allowInvestmentUpsell = false;
  } else {
    state = "AMAN";
    recommendedFlow = "FLOW_B_E";
    allowInvestmentUpsell = true;
  }

  return {
    score: finalScore,
    state,
    dtiPercent,
    runwayDays,
    isStackingRisk,
    statusReasons,
    recommendedFlow,
    allowInvestmentUpsell,
  };
}
