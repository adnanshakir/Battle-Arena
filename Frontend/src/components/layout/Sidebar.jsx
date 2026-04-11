import React from 'react';
import { Plus, MessageSquare, X, Bot } from 'lucide-react';
import { Button } from '../ui/Button';
import { truncate } from '../../utils/helpers';

export function Sidebar({
  isOpen,
  isMobile,
  onClose,
  history,
  showLoginHint,
  currentId,
  onSelectChat,
  onNewChat,
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-fg/10 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={[
          'fixed top-0 left-0 h-full z-50 flex flex-col',
          'bg-card border-r border-border',
          'transition-transform duration-200 ease-in-out',
          isMobile ? 'w-72' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Sidebar"
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Bot size={18} className="text-accent" />
            <span className="text-sm font-semibold text-fg tracking-tight">
              Verdict
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={15} />
          </Button>
        </div>

        {/* New comparison button */}
        <div className="p-3 border-b border-border shrink-0">
          <Button
            variant="outline"
            className="w-full justify-start"
            size="md"
            onClick={onNewChat}
          >
            <Plus size={14} />
            New comparison
          </Button>
        </div>

        {/* History */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Chat history">
          {showLoginHint ? (
            <div className="px-4 py-10 text-center">
              <p className="text-xs text-muted">Login to save chats</p>
              <p className="text-[11px] text-muted mt-1 opacity-60">
                You can still chat as a guest
              </p>
            </div>
          ) : history.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-xs text-muted">No comparisons yet</p>
              <p className="text-[11px] text-muted mt-1 opacity-60">
                Try a coding, reasoning, or practical prompt
              </p>
            </div>
          ) : (
            <ul className="space-y-0.5 px-2">
              {history.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectChat(item.id)}
                    className={[
                      'w-full flex items-start gap-2.5 px-3 py-2.5 rounded-md text-left',
                      'transition-colors duration-100',
                      currentId === item.id
                        ? 'bg-muted-bg text-accent'
                        : 'text-subtle hover:bg-muted-bg hover:text-fg',
                    ].join(' ')}
                  >
                    <MessageSquare size={13} className="mt-0.5 shrink-0 opacity-60" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium leading-snug truncate">
                        {truncate(item.query, 44)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0">
          <p className="text-[10px] text-muted text-center leading-relaxed">
            Compare answers. Get a clear verdict.
          </p>
        </div>
      </aside>
    </>
  );
}
