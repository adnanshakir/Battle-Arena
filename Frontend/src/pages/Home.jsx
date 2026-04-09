import React from 'react';
import { Sparkles } from 'lucide-react';
import { MessageInput } from '../components/chat/MessageInput';

const SUGGESTED = [
  'Write a factorial function in JS',
  'Explain closures in JavaScript',
  'Fix this bug: function sum(a, b) { return a - b; }',
  'Summarize this paragraph in 3 bullet points',
];

export function Home({ onSubmit, loading }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 overflow-y-auto">
      <div className="w-full max-w-xl space-y-8">

        {/* Wordmark + tagline */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-muted-bg border border-border mb-1">
            <Sparkles size={16} className="text-subtle" />
          </div>
          <h1 className="text-[1.6rem] font-semibold tracking-tight text-fg leading-tight">
            Verdict
          </h1>
          <p className="text-sm text-fg-2 leading-relaxed max-w-sm mx-auto">Compare answers. Get a clear verdict.</p>
        </div>

        {/* Primary input */}
        <div id="home-input-wrapper">
          <MessageInput
            onSubmit={onSubmit}
            loading={loading}
            placeholder="Ask coding, reasoning, or general questions"
          />
          <p className="mt-2 text-[11px] text-muted text-center">
            Press <kbd className="px-1 py-0.5 rounded text-[10px] border border-border bg-muted-bg font-mono">Enter</kbd> to submit
            &nbsp;·&nbsp;
            <kbd className="px-1 py-0.5 rounded text-[10px] border border-border bg-muted-bg font-mono">Shift+Enter</kbd> for newline
          </p>
        </div>

        {/* Suggested prompts */}
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-muted uppercase tracking-widest px-0.5">
            Try an example
          </p>
          <ul className="space-y-1.5">
            {SUGGESTED.map((prompt, i) => (
              <li key={i}>
                <button
                  id={`suggested-prompt-${i}`}
                  onClick={() => onSubmit(prompt)}
                  disabled={loading}
                  className={[
                    'w-full text-left px-3.5 py-2.5 rounded-md text-sm',
                    'border border-border bg-card text-fg-2',
                    'hover:bg-muted-bg hover:text-fg',
                    'transition-colors duration-100',
                    'disabled:opacity-40 disabled:cursor-not-allowed',
                  ].join(' ')}
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
