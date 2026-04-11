import { Router } from "express";
import {
	getMeController,
	loginController,
	logoutController,
	registerController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

// Optional auth; guests must still be allowed.
authRouter.get("/me", authMiddleware, getMeController);

authRouter.post("/logout", logoutController);

export default authRouter;
