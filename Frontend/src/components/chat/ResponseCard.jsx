import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Maximize2, Minimize2, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { copyToClipboard } from '../../utils/helpers';

export function ResponseCard({ label, modelTag, content }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Close expanded on Escape
  useEffect(() => {
    if (!expanded) return;
    const handle = (e) => { if (e.key === 'Escape') setExpanded(false); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [expanded]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardClass = expanded
    ? 'fixed inset-4 z-50 flex flex-col shadow-2xl'
    : 'flex flex-col h-full';

  return (
    <>
      {/* Expanded backdrop */}
      {expanded && (
        <div
          className="fixed inset-0 bg-fg/20 z-40"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      <Card className={cardClass}>
        {/* Card Header */}
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-fg">{label}</span>
            {modelTag && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted-bg border border-border text-muted font-mono leading-none">
                {modelTag}
              </span>
            )}
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              title="Copy response"
              aria-label="Copy response text"
            >
              {copied
                ? <Check size={13} className="text-fg" />
                : <Copy size={13} />
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded((e) => !e)}
              title={expanded ? 'Collapse' : 'Expand'}
              aria-label={expanded ? 'Collapse response' : 'Expand response'}
            >
              {expanded
                ? <Minimize2 size={13} />
                : <Maximize2 size={13} />
              }
            </Button>
          </div>
        </CardHeader>

        {/* Scrollable content */}
        <CardContent
          className={[
            'flex-1 overflow-y-auto',
            expanded ? 'max-h-[calc(100%-49px)]' : 'max-h-[420px]',
          ].join(' ')}
        >
          <article className="prose text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        </CardContent>
      </Card>
    </>
  );
}
