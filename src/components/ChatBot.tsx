import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Send,
  X,
  Sparkles,
  MoreVertical,
  Download,
  Trash2,
  Copy,
  Check,
  Mail,
} from "lucide-react";
import { useLocation } from "@tanstack/react-router";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
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
  timestamp: Date.now(),
};

// Brand gradient used for the launcher, avatar, and accents throughout —
// a distinct green-to-cyan tech gradient rather than a flat corporate solid.
const BRAND_GRADIENT = "linear-gradient(135deg, #10b981 0%, #14b8a6 55%, #06b6d4 100%)";
const GOLD = "#D4AF37";
const STORAGE_KEY = "vtec-chat-session";

function loadStoredMessages(): Message[] {
  if (typeof window === "undefined") return [GREETING];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [GREETING];
    const parsed = JSON.parse(raw) as Message[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [GREETING];
  } catch {
    return [GREETING];
  }
}

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString("en-KE", { hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}

export const ChatBot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadStoredMessages());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [homepageReady, setHomepageReady] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailSentOnce, setEmailSentOnce] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // sessionStorage unavailable (private browsing, etc.) — fail silently
    }
  }, [messages]);

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

    const fallback = setTimeout(markReady, 4200);

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("vtec-preloader-done", markReady);
      clearTimeout(fallback);
    };
  }, []);

  const isHomepage = location.pathname === "/";
  const hasRealConversation = messages.some((m) => m.id !== "greeting");

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
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
        { id: `a-${Date.now()}`, role: "assistant", content: data.reply, timestamp: Date.now() },
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
          timestamp: Date.now(),
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
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
      setIsOpen(true);
    }, 1500);
  };

  const sendTranscript = async (email: string) => {
    setEmailStatus("sending");
    try {
      const res = await fetch("/api/chat-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          messages: messages
            .filter((m) => m.id !== "greeting")
            .map((m) => ({ role: m.role, content: m.content, timestamp: m.timestamp })),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setEmailStatus("sent");
      setEmailSentOnce(true);
    } catch {
      setEmailStatus("error");
    }
  };

  const handleCloseRequest = () => {
    if (hasRealConversation && !emailSentOnce) {
      setShowEmailPrompt(true);
      return;
    }
    setIsOpen(false);
  };

  const skipEmailAndClose = () => {
    setShowEmailPrompt(false);
    setEmailInput("");
    setEmailStatus("idle");
    setIsOpen(false);
  };

  const submitEmailAndClose = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed || !/.+@.+\..+/.test(trimmed)) return;
    await sendTranscript(trimmed);
    setShowEmailPrompt(false);
    setIsOpen(false);
  };

  const downloadTranscript = () => {
    const lines = messages
      .filter((m) => m.id !== "greeting")
      .map(
        (m) => `[${formatTime(m.timestamp)}] ${m.role === "user" ? "You" : "VTEC Assistant"}: ${m.content}`,
      );
    const blob = new Blob([lines.join("\n\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vtec-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const clearConversation = () => {
    setMessages([GREETING]);
    setEmailSentOnce(false);
    setEmailStatus("idle");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setShowMenu(false);
  };

  const copyMessage = async (m: Message) => {
    try {
      await navigator.clipboard.writeText(m.content);
      setCopiedId(m.id);
      setTimeout(() => setCopiedId((cur) => (cur === m.id ? null : cur)), 1500);
    } catch {
      // clipboard unavailable — fail silently
    }
  };

  if (!isHomepage || !homepageReady) {
    return null;
  }

  return (
    <>
      <div className="fixed right-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-8 sm:bottom-8 z-30 flex items-end gap-3 pointer-events-none">
        {showTooltip && !isOpen && (
          <div style={{ animation: "fadeInSlide 0.3s ease-out forwards", pointerEvents: "none" }}>
            <div
              className="text-[#04140f] text-[13px] font-semibold whitespace-nowrap px-3 py-2 rounded-lg shadow-lg"
              style={{ background: "linear-gradient(135deg, #6ee7c9, #67e8f9)" }}
            >
              Need Help?
            </div>
          </div>
        )}

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

      {isOpen && (
        <div
          className="fixed z-40 flex flex-col overflow-hidden shadow-2xl
            inset-x-0 bottom-0 top-0 w-full rounded-none
            sm:inset-auto sm:bottom-8 sm:right-8 sm:top-auto sm:h-[620px] sm:w-[390px] sm:rounded-3xl sm:border sm:border-white/10"
          style={{ backgroundColor: "#0A1628", animation: "vtec-panel-in 0.28s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <div
            className="relative flex items-center justify-between px-4 py-4 border-b overflow-hidden"
            style={{ borderColor: "rgba(20,184,166,0.25)" }}
          >
            <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: BRAND_GRADIENT }} />
            <div className="relative flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm text-white shadow-lg"
                style={{ backgroundImage: BRAND_GRADIENT, boxShadow: `0 0 0 1.5px ${GOLD}` }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm leading-tight">VTEC Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/60 mt-0.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  Online now
                </div>
              </div>
            </div>
            <div className="relative flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => setShowMenu((v) => !v)}
                aria-label="Chat options"
                className="relative rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleCloseRequest}
                aria-label="Close chat"
                className="relative rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {showMenu && (
              <>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setShowMenu(false)}
                  className="fixed inset-0 z-[5] cursor-default bg-transparent"
                />
                <div
                  className="absolute right-3 top-14 z-10 w-52 rounded-xl border shadow-xl overflow-hidden"
                  style={{ backgroundColor: "#0d1c33", borderColor: "rgba(20,184,166,0.25)" }}
                >
                  <button
                    type="button"
                    onClick={downloadTranscript}
                    disabled={!hasRealConversation}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-white/85 hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download className="h-4 w-4" /> Download chat
                  </button>
                  <button
                    type="button"
                    onClick={clearConversation}
                    disabled={!hasRealConversation}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-300 hover:bg-white/10 transition-colors border-t disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ borderColor: "rgba(20,184,166,0.15)" }}
                  >
                    <Trash2 className="h-4 w-4" /> Clear conversation
                  </button>
                </div>
              </>
            )}
          </div>

          <div
            style={{
              height: 2,
              backgroundImage: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              opacity: 0.55,
            }}
          />

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m) =>
              m.role === "user" ? (
                <div
                  key={m.id}
                  className="flex flex-col items-end"
                  style={{ animation: "vtec-msg-in 0.25s ease-out both" }}
                >
                  <div
                    className="max-w-[80%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-white shadow-md"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  >
                    {m.content}
                  </div>
                  <span className="text-[10px] text-white/35 mt-1 mr-1">{formatTime(m.timestamp)}</span>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="flex items-start gap-2"
                  style={{ animation: "vtec-msg-in 0.25s ease-out both" }}
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white mt-0.5"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col items-start max-w-[85%]">
                    <div
                      className="rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-white/90 border"
                      style={{ backgroundColor: "#13243d", borderColor: "rgba(20,184,166,0.25)" }}
                    >
                      {m.content.split("\n").map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-1 ml-1">
                      <span className="text-[10px] text-white/35">{formatTime(m.timestamp)}</span>
                      {m.id !== "greeting" && (
                        <button
                          type="button"
                          onClick={() => copyMessage(m)}
                          aria-label="Copy message"
                          className="text-white/35 hover:text-white/70 transition-colors"
                        >
                          {copiedId === m.id ? (
                            <Check className="h-3 w-3" style={{ color: "#34d399" }} />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex items-start gap-2">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white mt-0.5"
                  style={{ backgroundImage: BRAND_GRADIENT }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div
                  className="rounded-2xl rounded-bl-md px-4 py-3 border"
                  style={{ backgroundColor: "#13243d", borderColor: "rgba(20,184,166,0.25)" }}
                >
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-white/60 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0.3s" }} />
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
                    <span className="text-[#2dd4bf] opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </button>
                ))}
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {showEmailPrompt && (
            <div
              className="absolute inset-0 z-20 flex items-end sm:items-center justify-center p-4"
              style={{ backgroundColor: "rgba(10,22,40,0.8)" }}
            >
              <form
                onSubmit={submitEmailAndClose}
                className="w-full max-w-sm rounded-2xl p-5 border"
                style={{ backgroundColor: "#0d1c33", borderColor: "rgba(212,175,55,0.35)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" style={{ color: GOLD }} />
                  <div className="text-white font-semibold text-sm">Want this conversation emailed to you?</div>
                </div>
                <p className="text-white/60 text-xs mb-3">
                  We'll send a copy from VTEC Business Group. No spam, just this transcript.
                </p>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="w-full rounded-full border px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#2dd4bf] mb-3"
                  style={{ backgroundColor: "#13243d", borderColor: "rgba(20,184,166,0.25)" }}
                />
                {emailStatus === "error" && (
                  <p className="text-red-300 text-xs mb-2">Couldn't send that, you can try again or skip.</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={skipEmailAndClose}
                    className="flex-1 rounded-full border px-4 py-2 text-sm text-white/70 hover:bg-white/5"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    No thanks
                  </button>
                  <button
                    type="submit"
                    disabled={emailStatus === "sending"}
                    className="flex-1 rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    style={{ backgroundImage: BRAND_GRADIENT }}
                  >
                    {emailStatus === "sending" ? "Sending..." : "Send & close"}
                  </button>
                </div>
              </form>
            </div>
          )}

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
              style={{ backgroundColor: "#0d1c33", borderColor: "rgba(20,184,166,0.25)" }}
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
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes vtec-panel-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes vtec-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default ChatBot;