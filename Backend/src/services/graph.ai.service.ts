import { HumanMessage } from "@langchain/core/messages";
import {
  StateSchema,
  MessagesValue,
  ReducedValue,
  StateGraph,
  type GraphNode,
  START,
  END,
} from "@langchain/langgraph";
import { mistralModel, cohereModel, geminiModel } from "./models.service.js";
import * as z from "zod";
import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
  problem: z.string().default("No problem provided"),
  solution_1: new ReducedValue(z.string().default("No solution found"), {
    reducer: (current, next) => {
      return next;
    },
  }),
  solution_2: new ReducedValue(z.string().default("No solution found"), {
    reducer: (current, next) => {
      return next;
    },
  }),
  judge_recommendation: new ReducedValue(
    z.object({
      solution_1_score: z.number().default(0),
      solution_2_score: z.number().default(0),
      solution_1_reasoning: z.string().default("No reasoning provided"),
      solution_2_reasoning: z.string().default("No reasoning provided"),
    }),
    {
      reducer: (current, next) => next,
    },
  ),
});

const solutionNode: GraphNode<typeof State> = async (state) => {
  const [mistral_solution, cohere_solution] = await Promise.all([
    mistralModel.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);

  return {
    solution_1: mistral_solution.text,
    solution_2: cohere_solution.text,
  };
};

const judgeNode: GraphNode<typeof State> = async (state) => {
  const { solution_1, solution_2 } = state;
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
        `You are a judge tasked with evaluating the quality of two solutions to a problem. The problem is as follows: ${state.problem}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please evaluate each solution on a scale of 0 to 10, where 0 means the solution is completely ineffective and 10 means the solution is perfect.`,
      ),
    ],
  });

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judgeResponse.structuredResponse;

  return {
    judge_recommendation: {
      solution_1_score,
      solution_2_score,
      solution_1_reasoning,
      solution_2_reasoning,
    },
  };
};

const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default async function (problem: string) {
  const result = await graph.invoke({
    problem: problem,
  });

  console.log(result);

  return result;
}
