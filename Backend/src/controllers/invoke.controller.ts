import type { Request, Response } from "express";
import useGraph from "../services/graph.ai.service.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AppError } from "../utils/app-error.js";
import { withTimeout } from "../utils/timeout.js";
import Chat from "../models/chat.model.js";

/**
 * Controller only validates input and triggers the graph.
 * Error forwarding and timeout handling are delegated to shared utilities for consistency.
 */
export const invokeController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { input } = req.body as { input?: unknown };

    if (typeof input !== "string" || input.trim().length === 0) {
      throw new AppError("Input is required", 400);
    }

    console.log("Incoming request received");

    const result = await withTimeout(useGraph(input), 20000);

    if (!result) {
      throw new AppError("Failed to generate response", 500);
    }

    const invokeResult = result as {
      solution_1?: unknown;
      solution_2?: unknown;
      judge_recommendation?: unknown;
    };

    const safeResult = {
      solution_1:
        typeof invokeResult.solution_1 === "string"
          ? invokeResult.solution_1
          : "",
      solution_2:
        typeof invokeResult.solution_2 === "string"
          ? invokeResult.solution_2
          : "",
      judge_recommendation:
        typeof invokeResult.judge_recommendation === "object" &&
        invokeResult.judge_recommendation !== null
          ? invokeResult.judge_recommendation
          : {
              solution_1_score: 0,
              solution_2_score: 0,
              solution_1_reasoning: "",
              solution_2_reasoning: "",
            },
    };

    if (req.user?.userId) {
      try {
        await Chat.create({
          userId: req.user.userId,
          query: input,
          ...safeResult,
        });
      } catch (err) {
        console.error("Chat save failed:", err);
      }
    }

    res.status(200).json({
      result,
      message: "Request processed successfully",
      success: true,
    });
  },
);
