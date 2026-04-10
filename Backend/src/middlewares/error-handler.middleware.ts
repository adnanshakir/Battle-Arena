import type { NextFunction, Request, Response } from "express";

/**
 * Centralized error responder prevents leaking stack traces and keeps controller code clean.
 */
export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Central log point makes production troubleshooting consistent across all controllers.
  console.error("ERROR:", error);

  const status =
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
      ? error.statusCode
      : 500;

  const message = error instanceof Error ? error.message : "Internal server error";

  res.status(status).json({
    success: false,
    message,
  });
};
