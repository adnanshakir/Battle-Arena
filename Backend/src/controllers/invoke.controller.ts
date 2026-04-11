import type { Request, Response } from "express";
import { getJudge, getSolutions } from "../services/graph.ai.service.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AppError } from "../utils/app-error.js";
import { withTimeout } from "../utils/timeout.js";
import Chat from "../models/chat.model.js";

/**
 * Controller only validates input and triggers the graph.
 * Error forwarding and timeout handling are delegated to shared utilities for consistency.
 */
export const solutionsController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { input } = req.body as { input?: unknown };

    if (typeof input !== "string" || input.trim().length === 0) {
      throw new AppError("Input required", 400);
    }

    const result = await withTimeout(getSolutions(input), 45000);

    if (!result) {
      throw new AppError("Failed to generate response", 500);
    }

    const safeResult = {
      solution_1:
        typeof result?.solution_1 === "string" ? result.solution_1 : "",
      solution_2:
        typeof result?.solution_2 === "string" ? result.solution_2 : "",
      judge_recommendation: null,
    };

    let savedChat: { _id: unknown } | null = null;

    if (req.user?.userId) {
      try {
        savedChat = await Chat.create({
          userId: req.user.userId,
          query: input,
          ...safeResult,
        });
      } catch (err) {
        console.error("Chat save failed:", err);
      }
    }

    res.status(200).json({
      success: true,
      result: {
        solution_1: safeResult.solution_1,
        solution_2: safeResult.solution_2,
        chatId: savedChat?._id ?? null,
      },
    });
  },
);

export const judgeController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { input, problem, solution_1, solution_2, chatId } = req.body as {
      input?: unknown;
      problem?: unknown;
      solution_1?: unknown;
      solution_2?: unknown;
      chatId?: unknown;
    };

    const judgeProblem = input ?? problem;

    if (!judgeProblem || !solution_1 || !solution_2) {
      throw new AppError("Missing judge input", 400);
    }

    if (
      typeof judgeProblem !== "string" ||
      typeof solution_1 !== "string" ||
      typeof solution_2 !== "string"
    ) {
      throw new AppError("Missing judge input", 400);
    }

    const judgeResult = await withTimeout(
      getJudge({ problem: judgeProblem, solution_1, solution_2 }),
      45000,
    );

    if (!chatId) {
      console.warn("No chatId provided, skipping DB update");
    }

    if (req.user?.userId && chatId) {
      try {
        await Chat.findByIdAndUpdate(chatId, {
          judge_recommendation: judgeResult,
        });
      } catch (err) {
        console.error("Judge update failed:", err);
      }
    }

    res.status(200).json({
      success: true,
      result: judgeResult,
    });
  },
);
