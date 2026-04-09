import React, { useEffect, useRef } from 'react';
import { ResponseCard } from '../components/chat/ResponseCard';
import { JudgeBlock } from '../components/chat/JudgeBlock';
import { MessageInput } from '../components/chat/MessageInput';

const MODEL_TAGS = ['mistral-medium-flash', 'cohere-a-03-2025'];

export function Chat({ chatData, pendingQuery, onSubmit, loading }) {
  const responsesRef = useRef(null);

  const query = chatData?.query ?? pendingQuery ?? '';
  const data = chatData?.data;

  useEffect(() => {
    if (!query || !responsesRef.current) return;
    responsesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [chatData?.id, query, loading]);

  return (
    <div className="flex-1 flex flex-col min-h-0">

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-7 space-y-6 md:space-y-7">

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
          <div ref={responsesRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <ResponseCard
              label="Model A"
              modelTag={MODEL_TAGS[0]}
              content={data?.solution_1}
              failed={Boolean(data?.model_1_failed)}
              loading={loading}
            />
            <ResponseCard
              label="Model B"
              modelTag={MODEL_TAGS[1]}
              content={data?.solution_2}
              failed={Boolean(data?.model_2_failed)}
              loading={loading}
            />
          </div>

          {/* Judge section */}
          {!loading && <JudgeBlock judgeData={data?.judge_recommendation} />}

        </div>
      </div>

      {/* Fixed bottom input */}
      <div className="flex-shrink-0 border-t border-border bg-surface/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-3.5">
          <MessageInput
            onSubmit={onSubmit}
            loading={loading}
            placeholder="Ask coding, reasoning, or general questions"
          />
        </div>
      </div>

    </div>
  );
}
