import type { NextFunction, Request, Response } from "express";

// Prevents repetitive try/catch in controllers while preserving Express error flow.
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
