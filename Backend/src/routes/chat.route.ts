import { Router } from "express";
import {
	deleteChatController,
	getChatsController,
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.get("/", authMiddleware, getChatsController);
chatRouter.delete("/:id", authMiddleware, deleteChatController);

export default chatRouter;
