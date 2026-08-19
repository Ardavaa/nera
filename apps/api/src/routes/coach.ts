import { Router, type Request, type Response } from "express";
import { maiaClient } from "@nera/ai";

export const coachRouter: Router = Router();

coachRouter.post("/chat", async (req: Request, res: Response) => {
  try {
    const { messages = [] } = req.body;
    const response = await maiaClient.generateChatResponse(messages);

    res.json({
      success: true,
      message: response,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
