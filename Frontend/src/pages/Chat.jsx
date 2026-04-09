import React from 'react';
import { ResponseCard } from '../components/chat/ResponseCard';
import { JudgeBlock } from '../components/chat/JudgeBlock';
import { MessageInput } from '../components/chat/MessageInput';

const MODEL_TAGS = ['llama-3.1-8b', 'gemma-2-9b'];

export function Chat({ chatData, onSubmit, loading }) {
  const { query, data } = chatData;

  return (
    <div className="flex-1 flex flex-col min-h-0">

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">

          {/* User query bubble */}
          <div className="flex justify-end">
            <div className="max-w-2xl">
              <div className="bg-muted-bg border border-border rounded-lg px-4 py-3">
                <p className="text-sm text-fg leading-relaxed whitespace-pre-wrap">
                  {query}
                </p>
              </div>
            </div>
          </div>

          {/* Model response cards — 2-col on md+, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <ResponseCard
              label="Model A"
              modelTag={MODEL_TAGS[0]}
              content={data.solution_1}
            />
            <ResponseCard
              label="Model B"
              modelTag={MODEL_TAGS[1]}
              content={data.solution_2}
            />
          </div>

          {/* Judge section */}
          <JudgeBlock judgeData={data.judge_recommendation} />

        </div>
      </div>

      {/* Fixed bottom input */}
      <div className="flex-shrink-0 border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <MessageInput
            onSubmit={onSubmit}
            loading={loading}
            placeholder="Ask another question…"
          />
        </div>
      </div>

    </div>
  );
}
