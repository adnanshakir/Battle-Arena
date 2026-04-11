import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = { userId: string };

/**
 * Optional identity enrichment middleware: requests can proceed even without auth.
 */
export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie;

  let token: string | null = null;

  if (cookieHeader) {
    const tokenCookie = cookieHeader
      .split(";")
      .map((segment) => segment.trim())
      .find((segment) => segment.startsWith("token="));

    if (tokenCookie) {
      const rawValue = tokenCookie.slice("token=".length);
      token = decodeURIComponent(rawValue);
    }
  }

  if (!token && authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  }

  if (!token) {
    next();
    return;
  }

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
