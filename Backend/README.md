# AI Arena

An LMArena-style application where a user submits a prompt, two AI models generate responses, and a third AI evaluates them to recommend the better answer.

## 🚀 Features

* Compare responses from two different AI models
* Automated evaluation using a third AI “judge”
* Clean prompt → response → decision flow
* Extensible architecture for adding more models

## 🧠 Tech Stack

* TypeScript (Node.js backend)
* LangChain
* LangGraph

## ⚙️ How It Works

1. User submits a prompt
2. Prompt is sent to two AI models
3. Both models generate responses
4. A third AI evaluates both responses
5. The best response is returned to the user
