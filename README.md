# ⚔️ Verdict — AI Response Comparison Platform

A fullstack application to **compare two AI model outputs in real-time**, evaluate them with a judge model, and help users choose the best response.

---

## 🚀 What this project is

Verdict is an experimental platform where:

* A user asks a question
* Two AI models generate responses simultaneously
* A third model evaluates both responses and gives a recommendation

It’s built to explore **multi-model orchestration, latency handling, and real-world AI system design**.

---

## 🧠 What I built

*  Parallel AI response system (2 models at once)
*  Judge model to evaluate outputs
*  Progressive UI (solutions → then judge)
*  Fault-tolerant backend (handles model failures)
*  Auth system (JWT + optional guest mode)
*  Chat history (only for logged-in users)
*  Clean, responsive frontend UI

---

## ⚙️ Tech Stack

### Frontend

* React (Vite), JavaScript
* Tailwind CSS
* Axios

### Backend

* Node.js + Express + TypeScript
* MongoDB + Mongoose

### AI / LLMs

* Mistral AI (solution 1)
* Cohere (solution 2)
* Google (judge model)

### Other tools

* JWT Authentication
* LangGraph (for orchestration)
* dotenv
* CORS handling

---

## 🔥 Key Features

### 1. Parallel AI Execution

* Uses `Promise.allSettled`
* One model failing does NOT break the system

---

### 2. Progressive Rendering UX

* Solutions appear first
* Judge loads separately
* No blocking UI

---

### 3. Timeout + Late Response Handling

* Judge has timeout fallback
* If judge responds late → UI updates anyway

---

### 4. Fault Tolerance (Production mindset)

* Handles:

  * API failures (403 / quota)
  * Timeouts
  * Partial responses
* Prevents crashes

---

### 5. Auth System (Flexible)

* Users can:

  * Use app without login (guest mode)
  * Login to save history
* JWT stored via cookies

---

### 6. Chat Persistence Strategy

* Chats stored ONLY for logged-in users
* Guests → no DB writes
* Keeps DB lean and scalable

---

## 🧠 What I learned

### 1. Real-world AI is unreliable

* APIs fail (quota, latency, errors)
* You must design for failure, not success

---

### 2. Async architecture is hard

* Handling:

  * race conditions
  * late responses
  * partial updates
* Requires careful state control

---

### 3. UX matters more than speed

* Showing partial results early improves perceived performance
* Progressive rendering > waiting for full response

---

### 4. Backend resilience > fancy features

* `Promise.allSettled` > `Promise.all`
* Timeouts + fallbacks are essential

---

### 5. Authentication design decisions

* Not forcing login improves usability
* But requires careful handling of state + DB writes

---

### 6. Separation of concerns

* Controllers, services, utils
* API layer in frontend
* Context for auth

---

## ⚠️ Challenges I faced

* Long AI response times (30–60s)
* API failures (Cohere quota / 403)
* Race conditions in UI
* Syncing judge results with correct chat
* Preventing UI from breaking on partial data

---

## 🛠️ Things I kept in mind

* Do not block UI unnecessarily
* Always assume APIs can fail
* Keep backend responses consistent
* Avoid over-engineering (no unnecessary RAG)
* Optimize for real-world usage, not just demos

---

## 📦 Future Improvements

* Streaming responses (real-time tokens)
* Retry mechanism for judge
* Caching repeated queries
* Rate limiting
* Better analytics on model performance

---

## 🧪 Status

✅ Core system complete
🚧 Deployment in progress

---

## 💡 Why I built this

To explore:

* Multi-model AI systems
* Latency handling in production
* Fullstack architecture with real-world constraints

---

## 📌 Final Thought

This project is less about “using AI” and more about:

> **designing systems that can survive AI**

---
