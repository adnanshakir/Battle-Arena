import { config } from "dotenv";
import type app from "../app.js";

config();

/**
 * GOOGLE API Key
 * Mistral API Key
 * Cohere API Key
 */

type CONFIG = {
  readonly GOOGLE_API_KEY: string;
  readonly MISTRAL_API_KEY: string;
  readonly COHERE_API_KEY: string;
};

const app_config: CONFIG = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
};

export default app_config;