import React from 'react';
import { Scale, Trophy } from 'lucide-react';
import { formatScore } from '../../utils/helpers';

/* ── Circular score ─────────────────────────────────── */
function CircularScore({ score, max = 10 }) {
  const clamped = Math.min(Math.max(score, 0), max);
  const pct = clamped / max;
  const size = 88;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted-bg)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-fg tabular-nums">
        {formatScore(score)} / 10
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
  const hasValidScores =
    typeof judgeData?.solution_1_score === 'number' &&
    typeof judgeData?.solution_2_score === 'number';

  if (!hasValidScores) {
    return (
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Scale size={18} className="text-subtle" />
          <span className="text-sm font-semibold text-fg">Judge Evaluation</span>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted">Evaluation unavailable</p>
        </div>
      </div>
    );
  }

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
          <Scale size={18} className="text-subtle" />
          <span className="text-sm font-semibold text-fg">Judge Evaluation</span>
        </div>

        {winner ? (
          <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted-bg px-2 py-1">
            <Trophy size={18} className="text-accent" />
            <span className="text-xs text-fg-2">
              Winner:{' '}
              <span className="font-semibold text-accent">{winner}</span>
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted">Tie</span>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Circular scores */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-start">
          <div className="space-y-3 flex flex-col items-center">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-widest">
              Model A
            </p>
            <CircularScore score={solution_1_score} />
          </div>
          <div className="space-y-3 flex flex-col items-center">
            <p className="text-[11px] font-semibold text-muted uppercase tracking-widest">
              Model B
            </p>
            <CircularScore score={solution_2_score} />
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Reasoning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reasoning label="Model A — Reasoning" text={solution_1_reasoning} />
          <Reasoning label="Model B — Reasoning" text={solution_2_reasoning} />
        </div>
      </div>
    </div>
  );
}
