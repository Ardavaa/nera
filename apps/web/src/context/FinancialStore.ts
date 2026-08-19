"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  FinancialStateData,
  Transaction,
  SmartNudge,
  WealthTier,
  DebtSnowballItem,
  DEFAULT_MOCK_STATE,
  INITIAL_WEALTH_TIERS,
  evaluateFinancialState,
  calculateDebtSnowball,
} from "@nera/core";

export interface FinancialStoreState extends FinancialStateData {
  transactions: Transaction[];
  nudges: SmartNudge[];
  wealthTiers: WealthTier[];
  activeDebts: DebtSnowballItem[];
  coolingOffTargetTime: number | null; // epoch timestamp
  isSweepModalOpen: boolean;

  // Actions
  recalculateState: () => void;
  setAllowanceSplit: (allowance: number, pocketPct: number) => void;
  addTransaction: (tx: Omit<Transaction, "id" | "timestamp">) => void;
  executeEndOfMonthSweep: () => void;
  startCoolingOff: (hours?: number) => void;
  clearCoolingOff: () => void;
  setSweepModalOpen: (open: boolean) => void;
  addDebtItem: (debt: Omit<DebtSnowballItem, "id" | "payoffPriority">) => void;
  payOffDebt: (debtId: string) => void;
  depositToLifeGoals: (amount: number) => void;
  resolveNudge: (nudgeId: string) => void;
  resetToDefault: () => void;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    title: "Uang Saku Bulanan dari Ayah",
    category: "allowance",
    amount: 2000000,
    type: "income",
    timestamp: "2026-08-01T08:00:00Z",
    source: "TRANSFER",
  },
  {
    id: "tx_2",
    title: "Smart Allowance Split (80% Pocket)",
    category: "saving",
    amount: 1600000,
    type: "expense",
    timestamp: "2026-08-01T08:05:00Z",
    source: "AUTO_DEBET",
  },
  {
    id: "tx_3",
    title: "Smart Allowance Split (20% BNI Life Goals)",
    category: "saving",
    amount: 400000,
    type: "expense",
    timestamp: "2026-08-01T08:05:00Z",
    source: "AUTO_DEBET",
  },
  {
    id: "tx_4",
    title: "Makan Siang Kantin Tel-U",
    category: "food",
    amount: 25000,
    type: "expense",
    timestamp: "2026-08-18T12:30:00Z",
    source: "QRIS_BNI",
  },
];

const INITIAL_NUDGES: SmartNudge[] = [
  {
    id: "nudge_ukt",
    title: "Tagihan UKT Semester Ganjil",
    description: "Jatuh tempo dalam 12 hari. Dapatkan cashback 5% bila bayar dengan BNI Mobile/wondr.",
    category: "BILL_UKT",
    amount: 3500000,
    dueDate: "2026-08-31",
    actionText: "Bayar via wondr",
    priority: "high",
  },
  {
    id: "nudge_sweep",
    title: "End-of-Month Smart Sweep",
    description: "Sisa saldo harian dapat disapu otomatis ke BNI Life Goals agar tidak boros.",
    category: "SWEEP_LEFTOVER",
    amount: 45000,
    actionText: "Sapu Saldo Sekarang",
    priority: "medium",
  },
];

export const useFinancialStore = create<FinancialStoreState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_MOCK_STATE,
      transactions: INITIAL_TRANSACTIONS,
      nudges: INITIAL_NUDGES,
      wealthTiers: INITIAL_WEALTH_TIERS,
      activeDebts: [],
      coolingOffTargetTime: null,
      isSweepModalOpen: false,

      recalculateState: () => {
        const state = get();
        const evalResult = evaluateFinancialState({
          monthlyAllowance: state.monthlyAllowance,
          dailyPocket: state.dailyPocket,
          dailyBudgetSafe: state.dailyBudgetSafe,
          totalMonthlyInstallments: state.totalMonthlyInstallments,
          activeLoanSourcesCount: state.activeLoanSources.length,
        });

        set({
          score: evalResult.score,
          state: evalResult.state,
          runwayDays: evalResult.runwayDays,
        });
      },

      setAllowanceSplit: (allowance: number, pocketPct: number) => {
        const pocketAmount = (allowance * pocketPct) / 100;
        const lockAmount = allowance - pocketAmount;
        const safeDaily = Math.round(pocketAmount / 30);

        set((s) => ({
          monthlyAllowance: allowance,
          dailyPocket: pocketAmount,
          lockPocket: s.lockPocket + lockAmount,
          dailyBudgetSafe: safeDaily,
        }));

        get().recalculateState();
      },

      addTransaction: (tx) => {
        const newTx: Transaction = {
          ...tx,
          id: `tx_${Date.now()}`,
          timestamp: new Date().toISOString(),
        };

        set((s) => {
          const updatedPocket =
            tx.type === "expense"
              ? Math.max(0, s.dailyPocket - tx.amount)
              : s.dailyPocket + tx.amount;

          return {
            transactions: [newTx, ...s.transactions],
            dailyPocket: updatedPocket,
          };
        });

        get().recalculateState();
      },

      executeEndOfMonthSweep: () => {
        const { dailyPocket } = get();
        if (dailyPocket <= 0) return;

        set((s) => ({
          lockPocket: s.lockPocket + s.dailyPocket,
          dailyPocket: 0,
          isSweepModalOpen: false,
          transactions: [
            {
              id: `tx_sweep_${Date.now()}`,
              title: "End-of-Month Auto Sweep to Life Goals",
              category: "saving",
              amount: s.dailyPocket,
              type: "expense",
              timestamp: new Date().toISOString(),
              source: "AUTO_DEBET",
            },
            ...s.transactions,
          ],
        }));

        get().recalculateState();
      },

      startCoolingOff: (hours = 24) => {
        const target = Date.now() + hours * 60 * 60 * 1000;
        set({ coolingOffTargetTime: target });
      },

      clearCoolingOff: () => {
        set({ coolingOffTargetTime: null });
      },

      setSweepModalOpen: (open: boolean) => {
        set({ isSweepModalOpen: open });
      },

      addDebtItem: (debt) => {
        const newDebt: DebtSnowballItem = {
          ...debt,
          id: `debt_${Date.now()}`,
          payoffPriority: 1,
        };

        const updatedList = [...get().activeDebts, newDebt];
        const snowball = calculateDebtSnowball(updatedList);

        set((s) => ({
          activeDebts: snowball.items,
          totalMonthlyInstallments: snowball.totalMonthlyBurn,
          loanCount: snowball.items.length,
          activeLoanSources: Array.from(new Set(snowball.items.map((d) => d.platformName))),
        }));

        get().recalculateState();
      },

      payOffDebt: (debtId: string) => {
        const remaining = get().activeDebts.filter((d) => d.id !== debtId);
        const snowball = calculateDebtSnowball(remaining);

        set({
          activeDebts: snowball.items,
          totalMonthlyInstallments: snowball.totalMonthlyBurn,
          loanCount: snowball.items.length,
          activeLoanSources: Array.from(new Set(snowball.items.map((d) => d.platformName))),
        });

        get().recalculateState();
      },

      depositToLifeGoals: (amount: number) => {
        set((s) => {
          const newLock = s.lockPocket + amount;
          const updatedTiers = s.wealthTiers.map((tier) => {
            if (tier.tier === 1) {
              const current = newLock;
              const progress = Math.min(100, Math.round((current / tier.targetAmount) * 100));
              return {
                ...tier,
                currentAmount: current,
                progressPercent: progress,
                isCompleted: progress >= 100,
              };
            }
            return tier;
          });

          return {
            lockPocket: newLock,
            dailyPocket: Math.max(0, s.dailyPocket - amount),
            wealthTiers: updatedTiers,
          };
        });

        get().recalculateState();
      },

      resolveNudge: (nudgeId: string) => {
        set((s) => ({
          nudges: s.nudges.filter((n) => n.id !== nudgeId),
        }));
      },

      resetToDefault: () => {
        set({
          ...DEFAULT_MOCK_STATE,
          transactions: INITIAL_TRANSACTIONS,
          nudges: INITIAL_NUDGES,
          wealthTiers: INITIAL_WEALTH_TIERS,
          activeDebts: [],
          coolingOffTargetTime: null,
          isSweepModalOpen: false,
        });
      },
    }),
    {
      name: "nera-financial-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
