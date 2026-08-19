import { LoanSimulationInput, LoanSimulationResult } from "../types";
import { CAMPUS_SAFER_ALTERNATIVES } from "../constants";
import { evaluateFinancialState } from "../state-machine/risk-score";

/**
 * Simulates a prospective loan against the student's current financial profile
 */
export function simulateLoanImpact(
  input: LoanSimulationInput,
  currentProfile: {
    monthlyAllowance: number;
    dailyPocket: number;
    dailyBudgetSafe: number;
    totalMonthlyInstallments: number;
    activeLoanSourcesCount: number;
  }
): LoanSimulationResult {
  const { loanAmount, tenorMonths, interestRateMonthly, adminFee } = input;

  // Monthly principal installment
  const monthlyPrincipal = loanAmount / tenorMonths;
  // Monthly interest payment
  const monthlyInterest = loanAmount * (interestRateMonthly / 100);
  // Monthly admin fee portion (amortized or flat)
  const monthlyFee = adminFee / tenorMonths;

  const monthlyInstallment = Math.round(monthlyPrincipal + monthlyInterest + monthlyFee);
  const totalRepayment = Math.round(monthlyInstallment * tenorMonths);
  const totalInterestAndFees = Math.round(totalRepayment - loanAmount);

  // New simulated totals
  const newMonthlyInstallmentTotal = currentProfile.totalMonthlyInstallments + monthlyInstallment;
  const newActiveLoanSources = currentProfile.activeLoanSourcesCount + 1;

  // Evaluate prospective financial state
  const evalResult = evaluateFinancialState({
    monthlyAllowance: currentProfile.monthlyAllowance,
    dailyPocket: currentProfile.dailyPocket,
    dailyBudgetSafe: currentProfile.dailyBudgetSafe,
    totalMonthlyInstallments: newMonthlyInstallmentTotal,
    activeLoanSourcesCount: newActiveLoanSources,
  });

  // Calculate real deficit
  // Monthly discretionary budget = allowance - essential fixed costs
  // If installment exceeds allowable threshold, calculate exact deficit
  const monthlyAvailableDiscretionary = currentProfile.monthlyAllowance - currentProfile.totalMonthlyInstallments;
  const monthlyDeficitAmount = Math.max(0, monthlyInstallment - (monthlyAvailableDiscretionary * 0.3));

  const isDangerous = evalResult.state !== "AMAN" || monthlyDeficitAmount > 0;
  
  let deficitExplanation = "";
  if (monthlyDeficitAmount > 0) {
    const formattedDeficit = new Intl.NumberFormat("id-ID").format(monthlyDeficitAmount);
    deficitExplanation = `Tekor Rp${formattedDeficit}/bulan sejak bulan pertama. Cicilan ini akan memangkas uang makan harianmu sebesar ${(monthlyInstallment / (currentProfile.monthlyAllowance || 1) * 100).toFixed(0)}%.`;
  } else {
    deficitExplanation = `Cicilan masih dalam batas toleransi, namun akan mengurangi sisa saldo harianmu setiap bulan.`;
  }

  return {
    monthlyInstallment,
    totalRepayment,
    totalInterestAndFees,
    newMonthlyInstallmentTotal,
    newDti: evalResult.dtiPercent,
    projectedScore: evalResult.score,
    projectedState: evalResult.state,
    monthlyDeficitAmount,
    isDangerous,
    deficitExplanation,
    coolingOffRequired: isDangerous,
    saferAlternatives: CAMPUS_SAFER_ALTERNATIVES,
  };
}
