import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, X, Sparkles } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Which course is right for me?",
  "How can VTEC help my business?",
  "I want to book a consultation",
  "Tell me about InvestorMind Academy",
];

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Hi, I'm VTEC Assistant. I can help you find the right programme, learn about our services, or book a consultation. How can I help today?",
};

export const ChatBot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Show ChatBot only on the homepage (/)
  // NOTE: this check must stay AFTER every hook above so the same number
  // of hooks runs on every render, regardless of route. Returning early
  // between hooks breaks the Rules of Hooks and forces React to remount
  // this component whenever the route changes back to "/", which is what
  // caused the chat button to render in the wrong spot right after
  // navigation before "settling" into place.
  const isHomepage = location.pathname === "/";

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const history = messages
      .filter((m) => m.id !== "greeting")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Chat failed");

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. You can reach us at info@vtecgroup.co.ke or WhatsApp +254 116 644204.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const handleChatButtonClick = () => {
    setShowTooltip(true);
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
      setIsOpen(true);
    }, 1500);
  };

  if (!isHomepage) {
    return null;
  }

  return (
    <>
      {/* AI Chat Button - z-index: 30, bottom: 90px on mobile / 160px on desktop.
          Position is set via Tailwind classes (compiled into the main CSS
          bundle) instead of an inline style + injected <style> media query,
          so it renders in the correct spot on first paint instead of
          jumping into place once this component's JS finishes hydrating. */}
      <div
        className="fixed right-4 sm:right-6 bottom-[90px] sm:bottom-[160px] z-30 flex items-center gap-3 pointer-events-none"
      >
        {/* "Need Help?" Tooltip */}
        {showTooltip && !isOpen && (
          <div
            style={{
              animation: "fadeInSlide 0.3s ease-out forwards",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: "rgba(0,200,150,0.95)",
                color: "#0A1628",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(0,200,150,0.3)",
              }}
            >
              Need Help?
            </div>
          </div>
        )}

        {/* AI Chat Button */}
        {!isOpen && (
          <button
            type="button"
            onClick={handleChatButtonClick}
            aria-label="Open VTEC Assistant chat"
            className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-transform hover:scale-105"
            style={{
              backgroundColor: "#00C896",
              boxShadow: "0 0 0 0 rgba(0,200,150,0.6)",
              animation: "vtec-pulse 2s infinite",
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          >
            <Sparkles className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed z-40 flex flex-col overflow-hidden shadow-2xl
            inset-x-0 bottom-0 top-0 w-full rounded-none
            sm:inset-auto sm:bottom-5 sm:right-5 sm:top-auto sm:h-[600px] sm:w-[380px] sm:rounded-2xl"
          style={{ backgroundColor: "#0A1628" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: "rgba(0,200,150,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg font-bold text-sm"
                style={{ backgroundColor: "#00C896", color: "#0A1628" }}
              >
                V
              </div>
              <div>
                <div className="text-white font-semibold text-sm leading-tight">
                  VTEC Assistant
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: "#00C896" }}
                  />
                  Online
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div
                    className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 text-sm"
                    style={{ backgroundColor: "#00C896", color: "#0A1628" }}
                  >
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div
                    className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2 text-sm text-white border"
                    style={{
                      backgroundColor: "#13243d",
                      borderColor: "rgba(0,200,150,0.35)",
                    }}
                  >
                    {m.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-bl-sm px-4 py-3 border"
                  style={{
                    backgroundColor: "#13243d",
                    borderColor: "rgba(0,200,150,0.35)",
                  }}
                >
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-white/60 animate-bounce" />
                    <span
                      className="h-2 w-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="pt-2 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-white/50 px-1">
                  Suggested
                </div>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="block w-full text-left text-sm text-white rounded-lg border px-3 py-2 transition-colors hover:bg-white/5"
                    style={{ borderColor: "rgba(0,200,150,0.35)" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="border-t p-3 flex gap-2"
            style={{ borderColor: "rgba(0,200,150,0.2)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 rounded-lg border px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "#0d1c33",
                borderColor: "rgba(0,200,150,0.25)",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0A1628] transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#00C896" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes vtec-pulse {
          0% { box-shadow: 0 0 0 0 rgba(0,200,150,0.6); }
          70% { box-shadow: 0 0 0 16px rgba(0,200,150,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,200,150,0); }
        }
        
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default ChatBot;


