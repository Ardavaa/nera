import { DebtSnowballItem, PersonaId, SmartNudge, Transaction } from "../types";

export interface DemoPersonaScenario {
  personaId: PersonaId;
  scenarioLabel: string;
  monthlyAllowance: number;
  dailyPocket: number;
  lockPocket: number;
  dailyBudgetSafe: number;
  totalMonthlyInstallments: number;
  loanCount: number;
  activeLoanSources: string[];
  safeConsecutiveMonths: number;
  transactions: Transaction[];
  nudges: SmartNudge[];
  activeDebts: DebtSnowballItem[];
}

// Each scenario only sets raw transaction/pocket numbers — score, state, and
// the matched persona are all still computed by the existing state machine
// (evaluateFinancialState) and classifier (classifyPersonas). Nothing here
// hardcodes a persona result directly, so switching scenarios is a genuine
// end-to-end demo of the derivation logic, not a UI mock.
export const DEMO_PERSONA_SCENARIOS: Record<PersonaId, DemoPersonaScenario> = {
  konsisten_nabung: {
    personaId: "konsisten_nabung",
    scenarioLabel: "Si Konsisten Nabung",
    monthlyAllowance: 2500000,
    dailyPocket: 550000,
    lockPocket: 1200000,
    dailyBudgetSafe: 45000,
    totalMonthlyInstallments: 0,
    loanCount: 0,
    activeLoanSources: [],
    safeConsecutiveMonths: 3,
    activeDebts: [],
    nudges: [],
    transactions: [
      { id: "d_kn_1", title: "Uang Saku Bulanan dari Ayah", category: "allowance", amount: 2500000, type: "income", timestamp: "2026-08-01T08:00:00Z", source: "TRANSFER" },
      { id: "d_kn_2", title: "Auto-Debet ke BNI Life Goals", category: "saving", amount: 1200000, type: "expense", timestamp: "2026-08-01T08:05:00Z", source: "AUTO_DEBET" },
      { id: "d_kn_3", title: "Makan Siang Kantin", category: "food", amount: 22000, type: "expense", timestamp: "2026-08-18T12:00:00Z", source: "QRIS_BNI" },
      { id: "d_kn_4", title: "Ojek ke Kampus", category: "transport", amount: 15000, type: "expense", timestamp: "2026-08-17T07:30:00Z", source: "QRIS_BNI" },
    ],
  },

  pejuang_runway: {
    personaId: "pejuang_runway",
    scenarioLabel: "Pejuang Runway",
    monthlyAllowance: 1800000,
    dailyPocket: 900000,
    lockPocket: 200000,
    dailyBudgetSafe: 45000,
    totalMonthlyInstallments: 0,
    loanCount: 0,
    activeLoanSources: [],
    safeConsecutiveMonths: 1,
    activeDebts: [],
    nudges: [],
    transactions: [
      { id: "d_pr_1", title: "Uang Saku Bulanan dari Ibu", category: "allowance", amount: 1800000, type: "income", timestamp: "2026-08-01T08:00:00Z", source: "TRANSFER" },
      { id: "d_pr_2", title: "Makan Warteg", category: "food", amount: 15000, type: "expense", timestamp: "2026-08-18T18:00:00Z", source: "QRIS_BNI" },
      { id: "d_pr_3", title: "Fotokopi Materi", category: "education", amount: 8000, type: "expense", timestamp: "2026-08-16T10:00:00Z", source: "QRIS_BNI" },
    ],
  },

  anak_rantau: {
    personaId: "anak_rantau",
    scenarioLabel: "Anak Rantau",
    monthlyAllowance: 2000000,
    dailyPocket: 400000,
    lockPocket: 300000,
    dailyBudgetSafe: 45000,
    totalMonthlyInstallments: 0,
    loanCount: 0,
    activeLoanSources: [],
    safeConsecutiveMonths: 1,
    activeDebts: [],
    nudges: [
      {
        id: "d_ar_nudge_kos",
        title: "Tagihan Kos Jatuh Tempo",
        description: "Kos bulan ini jatuh tempo dalam 3 hari.",
        category: "BILL_KOS",
        amount: 500000,
        dueDate: "2026-08-23",
        actionText: "Bayar via BNI",
        priority: "high",
      },
    ],
    transactions: [
      { id: "d_ar_1", title: "Uang Saku Bulanan dari Ayah", category: "allowance", amount: 2000000, type: "income", timestamp: "2026-08-01T08:00:00Z", source: "TRANSFER" },
      { id: "d_ar_2", title: "Bayar Kos Griya Asri Bulan Ini", category: "other", amount: 500000, type: "expense", timestamp: "2026-08-02T09:00:00Z", source: "TRANSFER" },
      { id: "d_ar_3", title: "Galon & Kebutuhan Kos", category: "other", amount: 35000, type: "expense", timestamp: "2026-08-14T14:00:00Z", source: "QRIS_BNI" },
    ],
  },

  calon_mapan: {
    personaId: "calon_mapan",
    scenarioLabel: "Calon Mapan",
    monthlyAllowance: 3000000,
    dailyPocket: 400000,
    lockPocket: 300000,
    dailyBudgetSafe: 45000,
    totalMonthlyInstallments: 50000,
    loanCount: 0,
    activeLoanSources: [],
    safeConsecutiveMonths: 2,
    activeDebts: [],
    nudges: [],
    transactions: [
      { id: "d_cm_1", title: "Uang Saku Bulan Juli", category: "allowance", amount: 2000000, type: "income", timestamp: "2026-07-01T08:00:00Z", source: "TRANSFER" },
      { id: "d_cm_2", title: "Uang Saku Bulan Agustus", category: "allowance", amount: 3000000, type: "income", timestamp: "2026-08-01T08:00:00Z", source: "TRANSFER" },
      { id: "d_cm_3", title: "Langganan Aplikasi Belajar", category: "education", amount: 50000, type: "expense", timestamp: "2026-08-05T09:00:00Z", source: "AUTO_DEBET" },
    ],
  },

  wirausaha_kampus: {
    personaId: "wirausaha_kampus",
    scenarioLabel: "Wirausaha Kampus",
    monthlyAllowance: 1500000,
    dailyPocket: 450000,
    lockPocket: 250000,
    dailyBudgetSafe: 45000,
    totalMonthlyInstallments: 0,
    loanCount: 0,
    activeLoanSources: [],
    safeConsecutiveMonths: 1,
    activeDebts: [],
    nudges: [],
    transactions: [
      { id: "d_wk_1", title: "Uang Saku Bulanan dari Orang Tua", category: "allowance", amount: 1500000, type: "income", timestamp: "2026-08-01T08:00:00Z", source: "TRANSFER" },
      { id: "d_wk_2", title: "Pemasukan Jual Jasa Desain Poster", category: "other", amount: 350000, type: "income", timestamp: "2026-08-10T15:00:00Z", source: "QRIS_BNI" },
      { id: "d_wk_3", title: "Beli Bahan Cetak", category: "other", amount: 90000, type: "expense", timestamp: "2026-08-11T10:00:00Z", source: "QRIS_BNI" },
    ],
  },

  pejuang_pemulihan: {
    personaId: "pejuang_pemulihan",
    scenarioLabel: "Pejuang Pemulihan",
    monthlyAllowance: 2000000,
    dailyPocket: 150000,
    lockPocket: 100000,
    dailyBudgetSafe: 45000,
    totalMonthlyInstallments: 900000,
    loanCount: 1,
    activeLoanSources: ["EasyDana"],
    safeConsecutiveMonths: 0,
    activeDebts: [
      {
        id: "d_pp_debt_1",
        platformName: "EasyDana",
        outstandingPrincipal: 1200000,
        monthlyInstallment: 900000,
        interestRateMonthly: 3.5,
        remainingTenorMonths: 2,
        payoffPriority: 1,
      },
    ],
    nudges: [],
    transactions: [
      { id: "d_pp_1", title: "Uang Saku Bulanan dari Ayah", category: "allowance", amount: 2000000, type: "income", timestamp: "2026-08-01T08:00:00Z", source: "TRANSFER" },
      { id: "d_pp_2", title: "Transfer Masuk EasyDana", category: "loan", amount: 1000000, type: "income", timestamp: "2026-08-03T10:00:00Z", source: "TRANSFER" },
      { id: "d_pp_3", title: "Cicilan EasyDana", category: "loan", amount: 900000, type: "expense", timestamp: "2026-08-10T10:00:00Z", source: "AUTO_DEBET" },
    ],
  },
};
