import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Maximize2, Minimize2, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { copyToClipboard } from "../../utils/helpers";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MarkdownCodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);

  const language = className?.replace("language-", "");
  const code = String(children).trim();
  const isSmall = code.length < 40 && !code.includes("\n");
  const isMultiLine = code.includes("\n");

  if (isSmall) {
    return (
      <code className="px-2 py-1 rounded bg-muted-bg border border-border text-fg text-sm">
        {code}
      </code>
    );
  }

  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden my-3">
      {isMultiLine && (
        <div className="flex justify-between items-center px-3 py-2 text-xs bg-muted-bg border-b border-border">
          {language && (
            <span className="text-subtle uppercase">{language}</span>
          )}

          <button
            onClick={handleCopy}
            className="text-subtle hover:text-fg flex items-center gap-1"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      )}

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "14px 16px",
          background: "transparent",
          fontSize: "13px",
          lineHeight: "1.6",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div
      className="space-y-3 animate-pulse"
      aria-label="Loading model response"
    >
      <div className="h-3 w-3/4 rounded bg-muted-bg" />
      <div className="h-3 w-full rounded bg-muted-bg" />
      <div className="h-3 w-5/6 rounded bg-muted-bg" />
      <div className="h-28 w-full rounded-md border border-border bg-muted-bg/70" />
      <div className="h-3 w-2/3 rounded bg-muted-bg" />
    </div>
  );
}

export function ResponseCard({
  label,
  modelTag,
  content,
  failed = false,
  loading = false,
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Close expanded on Escape
  useEffect(() => {
    if (!expanded) return;
    const handle = (e) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [expanded]);

  const normalized = typeof content === "string" ? content.trim() : "";
  const empty = !normalized;

  const handleCopy = async () => {
    if (!normalized) return;
    const ok = await copyToClipboard(normalized);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardClass = expanded
    ? "fixed inset-4 z-50 flex flex-col shadow-2xl"
    : "flex flex-col h-full hover:opacity-95";

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
              <span className="text-xs px-2 py-1 rounded border border-border bg-muted-bg text-subtle font-mono leading-none">
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
              disabled={!normalized || failed || loading}
            >
              {copied ? (
                <Check size={13} className="text-fg" />
              ) : (
                <Copy size={13} />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded((e) => !e)}
              title={expanded ? "Collapse" : "Expand"}
              aria-label={expanded ? "Collapse response" : "Expand response"}
            >
              {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </Button>
          </div>
        </CardHeader>

        {/* Scrollable content */}
        <CardContent
          className={[
            "flex-1 space-y-4",
            expanded ? "max-h-[calc(100%-49px)]" : "max-h-[420px]",
          ].join(" ")}
        >
          {loading ? (
            <LoadingSkeleton />
          ) : failed ? (
            <div className="h-full flex items-center">
              <div className="rounded-md border border-border bg-muted-bg/40 px-3 py-2.5 w-full">
                <p className="text-sm font-medium text-fg">
                  Model failed to respond
                </p>
                <p className="text-xs text-muted mt-1">
                  Please retry this prompt in a moment.
                </p>
              </div>
            </div>
          ) : empty ? (
            <div className="h-full flex items-center">
              <p className="text-sm text-muted">No response generated</p>
            </div>
          ) : (
            <>
              <article className="prose text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p({ children }) {
                      if (
                        Array.isArray(children) &&
                        children.some(
                          (child) =>
                            child?.type === "pre" ||
                            child?.props?.node?.tagName === "pre",
                        )
                      ) {
                        return <>{children}</>;
                      }

                      return <p className="mb-3 text-fg-2">{children}</p>;
                    },

                    code({ inline, className, children, ...props }) {
                      if (inline) {
                        return (
                          <code className="px-1 py-0.5 rounded bg-muted-bg border border-border text-fg text-[0.85em]">
                            {children}
                          </code>
                        );
                      }

                      return (
                        <MarkdownCodeBlock className={className} {...props}>
                          {children}
                        </MarkdownCodeBlock>
                      );
                    },
                  }}
                >
                  {normalized}
                </ReactMarkdown>
              </article>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
