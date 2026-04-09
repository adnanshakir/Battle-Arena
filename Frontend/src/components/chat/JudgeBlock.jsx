import React from 'react';
import { Scale, Trophy } from 'lucide-react';
import { formatScore } from '../../utils/helpers';

/* ── Score bar ──────────────────────────────────────── */
function ScoreBar({ score, max = 10 }) {
  const pct = Math.min(Math.max((score / max) * 100, 0), 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1 bg-muted-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-fg rounded-full"
          style={{ width: `${pct}%`, transition: 'width 0.6s ease' }}
        />
      </div>
      <span className="text-sm font-semibold text-fg tabular-nums w-7 text-right">
        {formatScore(score)}
      </span>
    </div>
  );
}

/* ── Reasoning block ────────────────────────────────── */
function Reasoning({ label, text }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-semibold text-muted uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm text-fg-2 leading-relaxed">{text}</p>
    </div>
  );
}

/* ── JudgeBlock ─────────────────────────────────────── */
export function JudgeBlock({ judgeData }) {
  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judgeData;

  const winner =
    solution_1_score > solution_2_score
      ? 'Model A'
      : solution_2_score > solution_1_score
        ? 'Model B'
        : null; // tie

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale size={14} className="text-subtle" />
          <span className="text-sm font-semibold text-fg">Judge Evaluation</span>
        </div>

        {winner ? (
          <div className="flex items-center gap-1.5">
            <Trophy size={12} className="text-subtle" />
            <span className="text-xs text-subtle">
              Winner:{' '}
              <span className="font-semibold text-fg">{winner}</span>
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted">Tie</span>
        )}
      </div>

      <div className="p-4 space-y-5">
        {/* Score bars */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-widest">
              Model A
            </p>
            <ScoreBar score={solution_1_score} />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-widest">
              Model B
            </p>
            <ScoreBar score={solution_2_score} />
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Reasoning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reasoning label="Model A — Reasoning" text={solution_1_reasoning} />
          <Reasoning label="Model B — Reasoning" text={solution_2_reasoning} />
        </div>
      </div>
    </div>
  );
}
