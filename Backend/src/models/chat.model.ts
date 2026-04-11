import { Schema, Types, model } from "mongoose";

interface IJudgeRecommendation {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_reasoning: string;
  solution_2_reasoning: string;
}

export interface IChat {
  userId?: Types.ObjectId | null;
  query: string;
  solution_1: string;
  solution_2: string;
  judge_recommendation?: IJudgeRecommendation | null;
}

const judgeRecommendationSchema = new Schema<IJudgeRecommendation>(
  {
    solution_1_score: { type: Number, default: 0 },
    solution_2_score: { type: Number, default: 0 },
    solution_1_reasoning: { type: String, default: "" },
    solution_2_reasoning: { type: String, default: "" },
  },
  { _id: false },
);

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    query: { type: String, required: true },
    solution_1: { type: String, default: "" },
    solution_2: { type: String, default: "" },
    judge_recommendation: {
      type: judgeRecommendationSchema,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
