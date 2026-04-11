import express from "express";
import cors from "cors";
import invokeRouter from "./routes/invoke.route.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import authRouter from "./routes/auth.route.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import chatRouter from "./routes/chat.route.js";

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }),
);
app.use(authMiddleware);

app.use("/auth", authRouter);
app.use("/chat", chatRouter);

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
