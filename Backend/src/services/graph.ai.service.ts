import { HumanMessage } from "@langchain/core/messages";
import { mistralModel, cohereModel, geminiModel } from "./models.service.js";
import * as z from "zod";
import { createAgent, providerStrategy } from "langchain";

export const getSolutions = async (problem: string) => {
  console.time("solutionNode");

  const [mistral_solution, cohere_solution] = await Promise.all([
    mistralModel.invoke(problem),
    cohereModel.invoke(problem),
  ]);

  console.timeEnd("solutionNode");

  return {
    solution_1: mistral_solution.text || "",
    solution_2: cohere_solution.text || "",
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
