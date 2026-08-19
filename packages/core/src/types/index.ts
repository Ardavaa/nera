import { z } from "zod";

export type FinancialStatus = "AMAN" | "WASPADA" | "KRITIS";

export interface UserProfile {
  id: string;
  userName: string;
  campus: string;
  nim?: string;
  avatarUrl?: string;
  email: string;
  isPairedWithParent: boolean;
  parentName?: string;
  parentPhone?: string;
  pairedAt?: string;
}

export interface FinancialStateData {
  userName: string;
  campus: string;
  score: number;
  state: FinancialStatus;
  monthlyAllowance: number;
  dailyPocket: number;
  lockPocket: number; // BNI Life Goals
  dailyBudgetSafe: number;
  runwayDays: number;
  totalMonthlyInstallments: number;
  loanCount: number;
  activeLoanSources: string[];
  safeConsecutiveMonths: number;
}

export interface Transaction {
  id: string;
  title: string;
  category: "allowance" | "food" | "transport" | "education" | "loan" | "saving" | "other";
  amount: number;
  type: "income" | "expense";
  timestamp: string;
  source: "BNI_TAPLUS" | "QRIS_BNI" | "TRANSFER" | "AUTO_DEBET";
  isNudgeTarget?: boolean;
}

export interface SmartNudge {
  id: string;
  title: string;
  description: string;
  category: "BILL_UKT" | "BILL_KOS" | "SWEEP_LEFTOVER" | "LOAN_RISK" | "WEALTH_TIER";
  amount?: number;
  dueDate?: string;
  actionText: string;
  actionUrl?: string;
  priority: "low" | "medium" | "high";
  isResolved?: boolean;
}

export interface LoanSimulationInput {
  loanAmount: number;
  tenorMonths: number;
  interestRateMonthly: number;
  adminFee: number;
  platformName?: string;
}

export interface LoanSimulationResult {
  monthlyInstallment: number;
  totalRepayment: number;
  totalInterestAndFees: number;
  newMonthlyInstallmentTotal: number;
  newDti: number;
  projectedScore: number;
  projectedState: FinancialStatus;
  monthlyDeficitAmount: number;
  isDangerous: boolean;
  deficitExplanation: string;
  coolingOffRequired: boolean;
  saferAlternatives: SaferAlternative[];
}

export interface SaferAlternative {
  id: string;
  title: string;
  provider: string;
  interestRatePercent: number;
  maxAmount: number;
  description: string;
  badge: string;
  actionUrl?: string;
}

export interface DebtSnowballItem {
  id: string;
  platformName: string;
  outstandingPrincipal: number;
  monthlyInstallment: number;
  interestRateMonthly: number;
  remainingTenorMonths: number;
  payoffPriority: number; // 1 = pay first
}

export interface DebtSnowballPlan {
  items: DebtSnowballItem[];
  totalOutstanding: number;
  totalMonthlyBurn: number;
  estimatedMonthsToClear: number;
  monthlySavingsAfterClear: number;
  recommendedSteps: string[];
}

export interface WealthTier {
  tier: 1 | 2 | 3;
  name: string;
  productName: string;
  targetAmount: number;
  currentAmount: number;
  progressPercent: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  minMonthlyReturnPct?: number;
  description: string;
  badgeText: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "nera" | "system";
  text: string;
  timestamp: string;
  quickReplies?: string[];
  suggestedAction?: {
    label: string;
    path: string;
  };
}

// Zod Schemas for validation
export const LoanSimulationInputSchema = z.object({
  loanAmount: z.number().positive(),
  tenorMonths: z.number().int().positive(),
  interestRateMonthly: z.number().min(0),
  adminFee: z.number().min(0).default(0),
  platformName: z.string().optional(),
});
