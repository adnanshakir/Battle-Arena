import React from "react";
import { Bot } from "lucide-react";
import { MessageInput } from "../components/chat/MessageInput";

const SUGGESTED = [
  "Write a factorial function in JS",
  "Explain closures in JavaScript",
  "Fix this bug: function sum(a, b) { return a - b; }",
  "Summarize this paragraph in 3 bullet points",
];

export function Home({ onSubmit, loading }) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 overflow-y-auto">
      <div className="w-full max-w-150 space-y-5">
        {/* Hero */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center rounded-md p-1">
            <Bot size={48} className="text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg leading-tight">
            Verdict
          </h1>
          <p className="text-base md:text-lg text-fg-2 mt-2">
            Test ideas. Compare outputs. Choose the better answer.
          </p>
        </div>

        {/* Primary input */}
        <div id="home-input-wrapper" className="max-w-150 mx-auto">
          <MessageInput
            onSubmit={onSubmit}
            loading={loading}
            placeholder="Ask coding, reasoning, or general questions"
          />
          <p className="mt-2 text-[11px] text-muted text-center">
            Press{" "}
            <kbd className="px-1 py-0.5 rounded text-[10px] border border-border bg-muted-bg font-mono">
              Enter
            </kbd>{" "}
            to submit &nbsp;·&nbsp;
            <kbd className="px-1 py-0.5 rounded text-[10px] border border-border bg-muted-bg font-mono">
              Shift+Enter
            </kbd>{" "}
            for newline
          </p>
        </div>

        {/* Suggested prompts */}
        <div className="space-y-2.5">
          <p className="text-[11px] font-medium text-muted uppercase tracking-widest px-0.5">
            Try an example
          </p>
          <ul className="space-y-1">
            {SUGGESTED.map((prompt, i) => (
              <li key={i}>
                <button
                  id={`suggested-prompt-${i}`}
                  onClick={() => onSubmit(prompt)}
                  disabled={loading}
                  className={[
                    "w-full text-left px-2.5 py-2 rounded-md text-sm",
                    "text-muted",
                    "hover:bg-muted-bg hover:text-fg-2",
                    "transition-colors duration-100",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                  ].join(" ")}
                >
                  {prompt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
