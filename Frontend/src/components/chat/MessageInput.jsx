import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function MessageInput({ onSubmit, loading = false, placeholder }) {
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
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = value.trim().length > 0 && !loading;

  return (
    <div
      className={[
        'flex items-end gap-2 rounded-lg border px-3 py-2',
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
        placeholder={placeholder ?? 'Enter a question or problem to compare models…'}
        rows={1}
        disabled={loading}
        aria-label="Query input"
        style={{ minHeight: '36px', maxHeight: '180px' }}
        className={[
          'flex-1 bg-transparent text-fg text-sm',
          'placeholder:text-muted outline-none resize-none',
          'py-1.5 leading-relaxed',
          loading ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
      />
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        size="icon"
        className="flex-shrink-0 mb-0.5"
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
