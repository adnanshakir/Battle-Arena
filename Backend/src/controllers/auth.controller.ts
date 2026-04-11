import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AppError } from "../utils/app-error.js";
import { generateToken } from "../utils/jwt.js";

const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: false,
};

/**
 * Auth controllers return only token metadata so user persistence details stay internal.
 */
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as {
    email?: unknown;
    password?: unknown;
  };

  if (typeof email !== "string" || !email.includes("@")) {
    throw new AppError("Valid email is required", 400);
  }

  if (typeof password !== "string" || password.trim().length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  const token = generateToken(String(user._id));

  res.cookie("token", token, authCookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    // token,
  });
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as {
    email?: unknown;
    password?: unknown;
  };

  if (typeof email !== "string" || typeof password !== "string") {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken(String(user._id));

  res.cookie("token", token, authCookieOptions);

  res.status(200).json({
    success: true,
    message: "Login successful",
    // token,
  });
});

export const registerController = register;
export const loginController = login;

export const getMeController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user?.userId) {
    res.status(200).json({
      success: true,
      user: null,
    });
    return;
  }

  const user = await User.findById(req.user.userId).select("-password");

  res.status(200).json({
    success: true,
    user: user
      ? {
          _id: user._id,
          createdAt: user.get("createdAt"),
        }
      : null,
  });
});

export const logoutController = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie("token", authCookieOptions);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
