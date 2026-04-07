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
import { createAgent, providerStrategy, ProviderStrategy } from "langchain";

const State = new StateSchema({
  messages: MessagesValue,
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
    z
      .object({
        solution_1_score: z.number(),
        solution_2_score: z.number(),
      })
      .default({
        solution_1_score: 0,
        solution_2_score: 0,
      }),
    {
      reducer: (current, next) => next,
    },
  ),
});

const solutionNode: GraphNode<typeof State> = async (state) => {
  const [mistral_solution, cohere_solution] = await Promise.all([
    mistralModel.invoke(state.messages),
    cohereModel.invoke(state.messages),
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
    responseFormat: providerStrategy({
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
    }),
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(
        `You are a judge tasked with evaluating the quality of two solutions to a problem. The problem is as follows: ${state.messages}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please evaluate each solution on a scale of 0 to 10, where 0 means the solution is completely ineffective and 10 means the solution is perfect.`,
      ),
    ],
  });

  const result = judgeResponse.structuredResponse;

  return {
    judge_recommendation: result,
  };
};

const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default async function (userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });

  console.log(result);

  return result.messages;
}
