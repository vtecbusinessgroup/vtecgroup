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

// Brand gradient used for the launcher, avatar, and accents throughout —
// a distinct green-to-cyan tech gradient rather than a flat corporate solid.
const BRAND_GRADIENT = "linear-gradient(135deg, #10b981 0%, #14b8a6 55%, #06b6d4 100%)";

export const ChatBot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // The "/" route renders VTEC's own site.html splash screen first (a few
  // seconds of preloader animation) before the real homepage is visible.
  // We keep the launcher hidden until that splash screen tells us it's
  // done, so the chat bubble never appears floating over the splash.
  const [homepageReady, setHomepageReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const markReady = () => setHomepageReady(true);

    // site.html's preloader broadcasts this once its splash animation
    // finishes, via window.parent.postMessage (if embedded in an iframe)
    // and a same-document CustomEvent (if rendered inline).
    const onMessage = (e: MessageEvent) => {
      if (e?.data?.type === "vtec-preloader-done") markReady();
    };
    window.addEventListener("message", onMessage);
    window.addEventListener("vtec-preloader-done", markReady);

    // Safety net: if the signal never arrives for any reason (e.g. the
    // homepage markup changes and stops broadcasting it), don't hide the
    // assistant forever — reveal it a little after the splash's own
    // 3.5s timer would have finished.
    const fallback = setTimeout(markReady, 4200);

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("vtec-preloader-done", markReady);
      clearTimeout(fallback);
    };
  }, []);

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

  if (!isHomepage || !homepageReady) {
    return null;
  }

  return (
    <>
      {/* AI Chat Launcher — bottom-right corner, clear of any other UI
          now that the homepage no longer has a WhatsApp button or sticky
          banner competing for the same corner. Position uses Tailwind
          classes (compiled into the main CSS bundle) so it's correct on
          first paint rather than depending on this component's JS. */}
      <div className="fixed right-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-8 sm:bottom-8 z-30 flex items-end gap-3 pointer-events-none">
        {/* "Need Help?" Tooltip */}
        {showTooltip && !isOpen && (
          <div
            style={{
              animation: "fadeInSlide 0.3s ease-out forwards",
              pointerEvents: "none",
            }}
          >
            <div className="text-[#04140f] text-[13px] font-semibold whitespace-nowrap px-3 py-2 rounded-lg shadow-lg"
              style={{ background: "linear-gradient(135deg, #6ee7c9, #67e8f9)" }}
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
            className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_rgba(6,182,212,0.35)] transition-transform hover:scale-105"
            style={{
              backgroundImage: BRAND_GRADIENT,
              animation: "vtec-pulse 2.4s infinite",
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-40 blur-md -z-10"
              style={{ backgroundImage: BRAND_GRADIENT }}
            />
            <Sparkles className="h-6 w-6 drop-shadow-sm" />
            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#0A1628] flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-[#34d399] animate-pulse" />
            </span>
          </button>
        )}
      </div>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed z-40 flex flex-col overflow-hidden shadow-2xl
            inset-x-0 bottom-0 top-0 w-full rounded-none
            sm:inset-auto sm:bottom-8 sm:right-8 sm:top-auto sm:h-[620px] sm:w-[390px] sm:rounded-3xl sm:border sm:border-white/10"
          style={{
            backgroundColor: "#0A1628",
            animation: "vtec-panel-in 0.28s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* Header */}
          <div
            className="relative flex items-center justify-between px-4 py-4 border-b overflow-hidden"
            style={{ borderColor: "rgba(20,184,166,0.25)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: BRAND_GRADIENT }}
            />
            <div className="relative flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm text-white shadow-lg"
                style={{ backgroundImage: BRAND_GRADIENT }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm leading-tight">
                  VTEC Assistant
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/60 mt-0.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  Online now
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="relative rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div
                    className="max-w-[80%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-white shadow-md"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  >
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div
                    className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-white/90 border"
                    style={{
                      backgroundColor: "#13243d",
                      borderColor: "rgba(20,184,166,0.25)",
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
                  className="rounded-2xl rounded-bl-md px-4 py-3 border"
                  style={{
                    backgroundColor: "#13243d",
                    borderColor: "rgba(20,184,166,0.25)",
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
                <div className="text-[11px] uppercase tracking-wider text-white/40 px-1 font-semibold">
                  Suggested
                </div>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="group flex w-full items-center justify-between text-left text-sm text-white/85 rounded-xl border px-3.5 py-2.5 transition-all hover:bg-white/[0.06] hover:translate-x-0.5"
                    style={{ borderColor: "rgba(20,184,166,0.25)" }}
                  >
                    {s}
                    <span className="text-[#2dd4bf] opacity-0 group-hover:opacity-100 transition-opacity">
                      &rarr;
                    </span>
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
            style={{ borderColor: "rgba(20,184,166,0.2)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 rounded-full border px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#2dd4bf]"
              style={{
                backgroundColor: "#0d1c33",
                borderColor: "rgba(20,184,166,0.25)",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-40 shadow-md"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes vtec-pulse {
          0% { box-shadow: 0 0 0 0 rgba(20,184,166,0.55); }
          70% { box-shadow: 0 0 0 16px rgba(20,184,166,0); }
          100% { box-shadow: 0 0 0 0 rgba(20,184,166,0); }
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

        @keyframes vtec-panel-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
