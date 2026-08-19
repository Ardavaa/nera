import { Router, type Request, type Response } from "express";
import { simulateLoanImpact, LoanSimulationInputSchema } from "@nera/core";

export const simulationRouter: Router = Router();

simulationRouter.post("/simulate", (req: Request, res: Response) => {
  try {
    const {
      loanAmount,
      tenorMonths,
      interestRateMonthly,
      adminFee = 0,
      platformName,
      userProfile = {
        monthlyAllowance: 2000000,
        dailyPocket: 630000,
        dailyBudgetSafe: 45000,
        totalMonthlyInstallments: 0,
        activeLoanSourcesCount: 0,
      },
    } = req.body;

    const validated = LoanSimulationInputSchema.parse({
      loanAmount: Number(loanAmount),
      tenorMonths: Number(tenorMonths),
      interestRateMonthly: Number(interestRateMonthly),
      adminFee: Number(adminFee),
      platformName,
    });

    const result = simulateLoanImpact(validated, userProfile);

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
});
