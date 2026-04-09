import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { useTheme } from './hooks/useTheme';
import { useSidebar } from './hooks/useSidebar';
import { mockComparisons } from './data/mockData';
import { generateId, truncate, timeAgo } from './utils/helpers';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { isOpen, isMobile, toggle, close } = useSidebar();

  // 'home' | 'chat'
  const [view, setView] = useState('home');
  const [currentChat, setCurrentChat] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ── Handle new query submission ─────────────────── */
  const handleSubmit = useCallback(
    async (query) => {
      setLoading(true);

      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1100));

      // Cycle through mock data so repeated queries feel distinct
      const idx = history.length % mockComparisons.length;
      const data = { ...mockComparisons[idx], problem: query };

      const chatItem = {
        id: generateId(),
        query,
        data,
        createdAt: Date.now(),
        timeLabel: 'just now',
      };

      setHistory((prev) => [chatItem, ...prev]);
      setCurrentChat(chatItem);
      setView('chat');
      setLoading(false);

      if (isMobile) close();
    },
    [history.length, isMobile, close],
  );

  /* ── Restore a previous comparison ───────────────── */
  const handleSelectChat = useCallback(
    (id) => {
      const item = history.find((h) => h.id === id);
      if (!item) return;
      setCurrentChat(item);
      setView('chat');
      if (isMobile) close();
    },
    [history, isMobile, close],
  );

  /* ── New chat / reset ─────────────────────────────── */
  const handleNewChat = useCallback(() => {
    setView('home');
    setCurrentChat(null);
    if (isMobile) close();
  }, [isMobile, close]);

  /* ── Sidebar offset on desktop ───────────────────── */
  const sidebarWidth = isMobile ? 0 : isOpen ? 256 : 0;

  return (
    <div className="flex h-full bg-surface overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────── */}
      <Sidebar
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={close}
        history={history}
        currentId={currentChat?.id}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      {/* ── Main column ─────────────────────────────── */}
      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header
          isOpen={isOpen}
          onToggleSidebar={toggle}
          theme={theme}
          onToggleTheme={toggleTheme}
          title={currentChat ? truncate(currentChat.query, 52) : undefined}
        />

        {/* Page area */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {view === 'home' ? (
            <Home onSubmit={handleSubmit} loading={loading} />
          ) : (
            <Chat
              chatData={currentChat}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  );
}
