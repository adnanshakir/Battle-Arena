import {
  StateSchema,
  MessagesValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

type JUDGEMENT = {
  winner: "solution_1" | "solution_2" | "tie";
  solution_1_score: number;
  solution_2_score: number;
};

type BattleArenaState = {
  messages: typeof MessagesValue;
  solution_1: string;
  solution_2: string;
    judgement: JUDGEMENT;
};

const state:BattleArenaState = {
    messages: MessagesValue,
    solution_1: "",
    solution_2: "",
    judgement: {
        winner: "tie",
        solution_1_score: 0,
        solution_2_score: 0,
    }
}