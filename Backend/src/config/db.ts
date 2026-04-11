import "dotenv/config";
import mongoose from "mongoose";

// Dedicated DB bootstrap keeps startup concerns out of request handlers.
export const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};
