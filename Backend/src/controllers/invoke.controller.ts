import type { Request, Response } from "express";
import useGraph from "../services/graph.ai.service.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AppError } from "../utils/app-error.js";
import { withTimeout } from "../utils/timeout.js";

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

    res.status(200).json({
      result,
      message: "Request processed successfully",
      success: true,
    });
  },
);
