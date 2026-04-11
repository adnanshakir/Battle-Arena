import jwt from "jsonwebtoken";
import { AppError } from "./app-error.js";

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError("JWT_SECRET is not set", 500);
  }

  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};
