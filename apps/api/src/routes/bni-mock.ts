import { Router, type Request, type Response } from "express";
import { DEFAULT_MOCK_STATE, DEFAULT_USER_PROFILE } from "@nera/core";

export const bniMockRouter: Router = Router();

// GET /api/bni/profile
bniMockRouter.get("/profile", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      profile: DEFAULT_USER_PROFILE,
      account: {
        accountNumber: "0982341234",
        accountType: "BNI_TAPLUS_MUDA",
        totalBalance: 1430000,
        dailyPocket: DEFAULT_MOCK_STATE.dailyPocket,
        lockPocket: DEFAULT_MOCK_STATE.lockPocket,
        safeDailyBudget: DEFAULT_MOCK_STATE.dailyBudgetSafe,
      },
    },
  });
});

// POST /api/bni/sweep
bniMockRouter.post("/sweep", (req: Request, res: Response) => {
  const { amount } = req.body;
  res.json({
    success: true,
    message: `Berhasil menyapu Rp${amount} ke BNI Life Goals. Saldo terlindungi.`,
    timestamp: new Date().toISOString(),
  });
});
