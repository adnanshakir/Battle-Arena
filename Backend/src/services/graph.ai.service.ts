import { HumanMessage } from "@langchain/core/messages";
import { mistralModel, cohereModel, geminiModel } from "./models.service.js";
import * as z from "zod";
import { createAgent, providerStrategy } from "langchain";

export const getSolutions = async (problem: string) => {
  console.time("solutionNode");

  const results = await Promise.allSettled([
    mistralModel.invoke(problem),
    cohereModel.invoke(problem),
  ]);

  const mistral = results[0];
  const cohere = results[1];

  const solution_1 =
    mistral.status === "fulfilled" ? mistral.value.text || "" : "";

  const solution_2 =
    cohere.status === "fulfilled" ? cohere.value.text || "" : "";

  if (mistral.status === "rejected") {
    console.error("Mistral failed:", mistral.reason);
  }

  if (cohere.status === "rejected") {
    console.error("Cohere failed:", cohere.reason);
  }

  console.timeEnd("solutionNode");

  if (!solution_1 && !solution_2) {
    throw new Error("Both models failed");
  }

  return {
    solution_1,
    solution_2,
  };
};

export const getJudge = async ({
  problem,
  solution_1,
  solution_2,
}: {
  problem: string;
  solution_1: string;
  solution_2: string;
}) => {
  console.time("judgeNode");

  if (!solution_1 || !solution_2) {
    console.timeEnd("judgeNode");
    return null;
  }

  const judge = createAgent({
    model: geminiModel,
    tools: [],
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
      }),
    ),
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(
        `You are a judge tasked with evaluating the quality of two solutions to a problem. The problem is as follows: ${problem}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please evaluate each solution on a scale of 0 to 10, where 0 means the solution is completely ineffective and 10 means the solution is perfect.`,
      ),
    ],
  });

  console.timeEnd("judgeNode");

  return judgeResponse.structuredResponse;
};
