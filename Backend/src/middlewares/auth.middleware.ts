import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = { userId: string };

/**
 * Optional identity enrichment middleware: requests can proceed even without auth.
 */
export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = authHeader.slice(7).trim();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    next();
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;

    if (payload && typeof payload.userId === "string") {
      req.user = { userId: payload.userId };
    }
  } catch {
    // Intentionally non-blocking for guest mode support.
  }

  next();
};
