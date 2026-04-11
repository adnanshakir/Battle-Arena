import { Router } from "express";
import {
	judgeController,
	solutionsController,
} from "../controllers/invoke.controller.js";

const invokeRouter = Router();

// Route module exists so app bootstrap stays focused on app-wide concerns only.
invokeRouter.post("/solutions", solutionsController);
invokeRouter.post("/judge", judgeController);

export default invokeRouter;
