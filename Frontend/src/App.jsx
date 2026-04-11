import React, { useState, useCallback } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { useTheme } from "./hooks/useTheme";
import { useSidebar } from "./hooks/useSidebar";
import { generateId } from "./utils/helpers";
import { invokeAPI } from "./api/chat.api";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isOpen, isMobile, toggle, close } = useSidebar();

  // 'home' | 'chat'
  const [view, setView] = useState("home");
  const [currentChat, setCurrentChat] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingQuery, setPendingQuery] = useState("");

  /* ── Handle new query submission ─────────────────── */
  const handleSubmit = useCallback(
    async (query) => {
      try {
        setLoading(true);
        setPendingQuery(query);
        setView("chat");

        const response = await invokeAPI(query);
        const { data } = response;

        const result = data.result;

        const formattedData = {
          solution_1: result.solution_1,
          solution_2: result.solution_2,
          judge_recommendation: result.judge_recommendation || {
            solution_1_score: 0,
            solution_2_score: 0,
            solution_1_reasoning: "",
            solution_2_reasoning: "",
          },
          model_1_failed: !result.solution_1,
          model_2_failed: !result.solution_2,
        };

        const chatItem = {
          id: generateId(),
          query,
          data: formattedData,
        };

        setHistory((prev) => [chatItem, ...prev]);
        setCurrentChat(chatItem);
        setPendingQuery("");
      } catch (error) {
        console.error("Error during submission:", error);
        setPendingQuery("");
      } finally {
        setLoading(false);
        if (isMobile) close();
      }
    },
    [isMobile, close],
  );

  /* ── Restore a previous comparison ───────────────── */
  const handleSelectChat = useCallback(
    (id) => {
      const item = history.find((h) => h.id === id);
      if (!item) return;
      setCurrentChat(item);
      setView("chat");
      if (isMobile) close();
    },
    [history, isMobile, close],
  );

  /* ── New chat / reset ─────────────────────────────── */
  const handleNewChat = useCallback(() => {
    setView("home");
    setCurrentChat(null);
    setPendingQuery("");
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
        history={user ? history : []}
        showLoginHint={!user}
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
        />

        {/* Page area */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {view === "home" ? (
            <Home onSubmit={handleSubmit} loading={loading} />
          ) : (
            <Chat
              chatData={currentChat}
              pendingQuery={pendingQuery}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  );
}
