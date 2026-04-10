import express from "express";
import useGraph from "./services/graph.ai.service.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST"],
}));

app.post("/", async (req, res) => {
  const result = await useGraph("Write an factorial function in javascript?");

  res.json(result);
});

app.post("/invoke", async (req, res) =>{
  const { input } = req.body;
  const result = await useGraph(input);

  res.status(200).json({
    result,
    message: "Request processed successfully",
    success: true,
  });
})

export default app;