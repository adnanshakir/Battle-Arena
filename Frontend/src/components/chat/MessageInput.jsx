import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function MessageInput({ onSubmit, loading = false, disabled = false, placeholder }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || loading || disabled) return;
    onSubmit(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isBlocked = loading || disabled;
  const canSubmit = value.trim().length > 0 && !isBlocked;

  return (
    <div
      className={[
        'flex items-end gap-2 rounded-lg border px-4 py-2',
        'bg-card transition-colors duration-150',
        'focus-within:border-subtle border-border',
      ].join(' ')}
    >
      <textarea
        ref={textareaRef}
        id="query-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Ask coding, reasoning, or general questions'}
        rows={1}
        disabled={isBlocked}
        aria-label="Query input"
        style={{ minHeight: '40px', maxHeight: '180px' }}
        className={[
          'flex-1 bg-transparent text-fg text-sm',
          'placeholder:text-muted outline-none resize-none',
          'py-2 leading-relaxed',
          isBlocked ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
      />
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        size="icon"
        className="shrink-0 mb-0.5"
        aria-label="Submit query"
      >
        {loading
          ? <Loader2 size={14} className="animate-spin" />
          : <ArrowUp size={14} />
        }
      </Button>
    </div>
  );
}
