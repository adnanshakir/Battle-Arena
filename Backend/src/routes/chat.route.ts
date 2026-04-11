import { Router } from "express";
import { deleteChatController } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.delete("/:id", authMiddleware, deleteChatController);

export default chatRouter;
