import express from "express";
import cors from "cors";
import invokeRouter from "./routes/invoke.route.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST"],
}));

// Keep app bootstrap focused on global middleware and router registration.
app.use("/invoke", invokeRouter);

app.use((_, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;