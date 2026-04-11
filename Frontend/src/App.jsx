import React, { useState, useCallback } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { useTheme } from "./hooks/useTheme";
import { useSidebar } from "./hooks/useSidebar";
import { generateId } from "./utils/helpers";
import { deleteChatAPI, getJudgeAPI, getSolutionsAPI } from "./api/chat.api";
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

        const res = await getSolutionsAPI(query);
        const result = res?.data?.result || {};
        const chatId = result.chatId;

        const baseData = {
          solution_1: result.solution_1,
          solution_2: result.solution_2,
          judge_recommendation: null,
          model_1_failed: !result.solution_1,
          model_2_failed: !result.solution_2,
        };

        const chatItem = {
          id: chatId || generateId(),
          query,
          data: baseData,
        };

        setCurrentChat(chatItem);
        setHistory((prev) => [chatItem, ...prev]);
        setPendingQuery("");
        setLoading(false);

        if (result.solution_1 && result.solution_2) {
          getJudgeAPI({
            input: query,
            solution_1: result.solution_1,
            solution_2: result.solution_2,
            chatId,
          })
            .then((judgeRes) => {
              const judge = judgeRes?.data?.result;

              setCurrentChat((prev) => {
                if (!prev || prev.id !== chatItem.id) return prev;
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    judge_recommendation: judge,
                  },
                };
              });

              setHistory((prev) =>
                prev.map((item) =>
                  item.id === chatItem.id
                    ? {
                        ...item,
                        data: {
                          ...item.data,
                          judge_recommendation: judge,
                        },
                      }
                    : item,
                ),
              );
            })
            .catch((err) => {
              console.error("Judge failed:", err);
            });
        }
      } catch (error) {
        if (error?.response?.status === 408) {
          console.error("Request timeout - models too slow");
        } else {
          console.error("Error during submission:", error);
        }
        setPendingQuery("");
        setLoading(false);
      }

      if (isMobile) close();
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

  const handleDeleteChat = useCallback(
    async (chatId) => {
      try {
        await deleteChatAPI(chatId);

        setHistory((prev) => prev.filter((c) => c.id !== chatId));

        if (currentChat?.id === chatId) {
          setCurrentChat(null);
          setView("home");
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    },
    [currentChat],
  );

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
        user={user}
        currentId={currentChat?.id}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
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
