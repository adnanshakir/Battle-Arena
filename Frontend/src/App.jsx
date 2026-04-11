import React, { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { useTheme } from "./hooks/useTheme";
import { useSidebar } from "./hooks/useSidebar";
import { generateId } from "./utils/helpers";
import {
  deleteChatAPI,
  getChatsAPI,
  getJudgeAPI,
  getSolutionsAPI,
} from "./api/chat.api";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isOpen, isMobile, toggle, close } = useSidebar();

  // 'home' | 'chat'
  const [view, setView] = useState("home");
  const [currentChat, setCurrentChat] = useState(null);
  const [history, setHistory] = useState([]);
  const [solutionsLoading, setSolutionsLoading] = useState(false);
  const [judgeLoading, setJudgeLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [pendingQuery, setPendingQuery] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadChats = async () => {
      try {
        const res = await getChatsAPI();
        const chats = res?.data?.chats || [];

        const formatted = chats.map((c) => ({
          id: c._id,
          query: c.query,
          data: {
            solution_1: c.solution_1 || "",
            solution_2: c.solution_2 || "",
            judge_recommendation: c.judge_recommendation || null,
            model_1_failed: !c.solution_1,
            model_2_failed: !c.solution_2,
            judge_error: null,
          },
        }));

        setHistory(formatted);
      } catch {
        // fallback silently (guest mode safety)
        setHistory([]);
      }
    };

    loadChats();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      setCurrentChat(null);
      setView("home");
      setJudgeLoading(false);
      setSolutionsLoading(false);
      setPendingQuery("");
      setError(null);
    }
  }, [user]);

  /* ── Handle new query submission ─────────────────── */
  const handleSubmit = useCallback(
    async (query) => {
      try {
        setSolutionsLoading(true);
        setJudgeLoading(false);
        setError(null);
        setPendingQuery(query);
        setView("chat");

        const res = await getSolutionsAPI(query);
        const result = res?.data?.result || {};
        const chatId = result.chatId;

        const formattedData = {
          solution_1: result.solution_1 || "",
          solution_2: result.solution_2 || "",
          judge_recommendation: result.judge_recommendation || null,
          judge_error: null,
          model_1_failed: !result.solution_1,
          model_2_failed: !result.solution_2,
        };

        const chatItem = {
          id: chatId || generateId(),
          query,
          data: formattedData,
        };

        setCurrentChat(chatItem);
        setHistory((prev) => [chatItem, ...prev]);
        setPendingQuery("");
        setSolutionsLoading(false);
        setJudgeLoading(true);

        if (result.solution_1 && result.solution_2) {
          const judgePromise = getJudgeAPI({
            input: query,
            solution_1: result.solution_1,
            solution_2: result.solution_2,
            chatId,
          });

          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Judge timeout")), 15000);
          });

          Promise.race([judgePromise, timeoutPromise])
            .then((judgeRes) => {
              const judge = judgeRes?.data?.result;

              setCurrentChat((prev) => {
                if (!prev || prev.id !== chatItem.id) return prev;
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    judge_recommendation: judge,
                    judge_error: null,
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
                          judge_error: null,
                        },
                      }
                    : item,
                ),
              );

              setJudgeLoading(false);
            })
            .catch(() => {
              setJudgeLoading(false);

              setCurrentChat((prev) => {
                if (!prev || prev.id !== chatItem.id) return prev;
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    judge_recommendation: null,
                    judge_error: "Taking too long to evaluate",
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
                          judge_recommendation: null,
                          judge_error: "Taking too long to evaluate",
                        },
                      }
                    : item,
                ),
              );

              setToast("Request timed out. Try again.");
              setTimeout(() => setToast(null), 3000);
            });
        } else {
          setJudgeLoading(false);
        }
      } catch (error) {
        setSolutionsLoading(false);
        setJudgeLoading(false);
        setError("Something went wrong. Please try again.");
        if (error?.response?.status === 408) {
          console.error("Request timeout - models too slow");
          setToast("Request timed out. Try again.");
        } else {
          console.error("Error during submission:", error);
          setToast("Something went wrong. Please try again.");
        }

        setTimeout(() => setToast(null), 3000);
        setPendingQuery("");
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
            <Home onSubmit={handleSubmit} loading={solutionsLoading} />
          ) : (
            <Chat
              chatData={currentChat}
              pendingQuery={pendingQuery}
              onSubmit={handleSubmit}
              loading={solutionsLoading}
              judgeLoading={judgeLoading}
            />
          )}
        </main>
      </div>

      {toast && (
        <div className="fixed top-4 right-4 text-xs bg-card border border-border px-3 py-2 rounded-md shadow-sm z-50">
          {toast}
        </div>
      )}

      {error && (
        <div className="sr-only" aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
}
