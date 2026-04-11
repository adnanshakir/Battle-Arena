import type { Request, Response } from "express";
import Chat from "../models/chat.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { AppError } from "../utils/app-error.js";

export const deleteChatController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!req.user?.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const deleted = await Chat.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!deleted) {
      throw new AppError("Chat not found or not authorized", 404);
    }

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  },
);
