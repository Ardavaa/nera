import { Router, type Request, type Response } from "express";
import { evaluateFinancialState } from "@nera/core";

export const riskRouter: Router = Router();

riskRouter.post("/evaluate", (req: Request, res: Response) => {
  try {
    const {
      monthlyAllowance = 2000000,
      dailyPocket = 630000,
      dailyBudgetSafe = 45000,
      totalMonthlyInstallments = 0,
      activeLoanSourcesCount = 0,
    } = req.body;

    const result = evaluateFinancialState({
      monthlyAllowance,
      dailyPocket,
      dailyBudgetSafe,
      totalMonthlyInstallments,
      activeLoanSourcesCount,
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
