import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import {
  Sprout,
  Rocket,
  TrendingUp,
  Building2,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  Utensils,
  Laptop,
  HardHat,
  Sparkles,
  Wallet,
  Megaphone,
  Settings,
  Users,
  Banknote,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Clock,
  ShieldAlert,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type LucideIcon = ComponentType<{ size?: number | string; color?: string; strokeWidth?: number }>;

export const Route = createFileRoute("/business-diagnostic")({
  head: () => ({
    meta: [
      { title: "Free AI Business Diagnostic | VTEC Business Group" },
      {
        name: "description",
        content:
          "Answer 7 questions and get a personalised AI strategy report built for the Kenyan market. Free tool by VTEC Business Group.",
      },
      { property: "og:title", content: "Free AI Business Diagnostic | VTEC" },
      {
        property: "og:description",
        content: "Personalised business strategy report for Kenyan founders. 3 minutes. No sign up.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BusinessDiagnostic,
});

/* ---------------- Types ---------------- */

type Answers = {
  stage: string;
  industry: string;
  industryOther: string;
  challenge: string;
  revenue: string;
  team: string;
  goal: string;
  name: string;
  email: string;
  whatsapp: string;
  optIn: boolean;
};

type ActionStep = {
  step: string;
  priority: "high" | "medium" | "low";
  timeframe: "week" | "month" | "quarter";
};

type RoadmapMonth = { focus: string; milestones: string[]; kpi: string };

type Report = {
  healthScore: number;
  categoryScores: {
    financial: number;
    operations: number;
    marketing: number;
    team: number;
    strategy: number;
  };
  profileSummary: string;
  criticalGap: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  actionSteps: ActionStep[];
  roadmap: { month1: RoadmapMonth; month2: RoadmapMonth; month3: RoadmapMonth };
  revenueProjection: { current: number; month3: number; month6: number; month12: number };
  industryBenchmark: number;
  riskLevel: "low" | "medium" | "high";
  vtecRecommendation: { service: string; reason: string; ctaText: string };
};

/* ---------------- Brand tokens ---------------- */

const NAVY = "#0A1628";
const NAVY_DEEP = "#070F1C";
const NAVY_CARD = "#10223C";
const TEAL = "#00C896";
const GREEN = "#1B5E20";
const GREEN_BRIGHT = "#27AE60";
const TEXT = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.65)";
const BORDER = "rgba(0,200,150,0.18)";

const FONT_STACK =
  "'Outfit', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const SERIF_STACK =
  "'Playfair Display', 'DM Serif Display', Georgia, 'Times New Roman', serif";

/* ---------------- Question data ---------------- */

const STAGE_OPTS: { v: string; icon: LucideIcon; label: string; sub: string }[] = [
  { v: "Idea Stage", icon: Sprout, label: "Idea Stage", sub: "I have a concept but haven't started" },
  { v: "Early Stage", icon: Rocket, label: "Early Stage", sub: "Started but under 1 year old" },
  { v: "Growing", icon: TrendingUp, label: "Growing", sub: "1 to 3 years, gaining traction" },
  { v: "Established", icon: Building2, label: "Established", sub: "3+ years, stable operations" },
];

const INDUSTRY_OPTS: { v: string; icon: LucideIcon }[] = [
  { v: "Education / Training", icon: GraduationCap },
  { v: "Retail / E commerce", icon: ShoppingBag },
  { v: "Professional Services", icon: Briefcase },
  { v: "Food & Hospitality", icon: Utensils },
  { v: "Tech / Digital", icon: Laptop },
  { v: "Construction / Real Estate", icon: HardHat },
  { v: "Other", icon: Sparkles },
];

const CHALLENGE_OPTS: { v: string; icon: LucideIcon }[] = [
  { v: "Getting more customers / leads", icon: Wallet },
  { v: "Weak brand presence / marketing", icon: Megaphone },
  { v: "Operations and systems are messy", icon: Settings },
  { v: "Building the right team", icon: Users },
  { v: "Cash flow and financial management", icon: Banknote },
  { v: "I don't have a clear strategy", icon: HelpCircle },
];

const REVENUE_OPTS = [
  "Pre revenue (not earning yet)",
  "KES 0 to 50,000 / month",
  "KES 50,000 to 200,000 / month",
  "KES 200,000 to 500,000 / month",
  "KES 500,000+ / month",
];

const TEAM_OPTS = [
  "Just me (solo founder)",
  "2 to 5 people",
  "6 to 15 people",
  "15+ people",
];

const LOADING_LINES = [
  "Analysing your business profile...",
  "Matching Kenya market data...",
  "Building your strategy...",
];

/* ---------------- Component ---------------- */

function BusinessDiagnostic() {
  const [view, setView] = useState<"intro" | "form" | "loading" | "results" | "error">("intro");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    stage: "",
    industry: "",
    industryOther: "",
    challenge: "",
    revenue: "",
    team: "",
    goal: "",
    name: "",
    email: "",
    whatsapp: "",
    optIn: true,
  });
  const [report, setReport] = useState<Report | null>(null);
  const [errMsg, setErrMsg] = useState("");

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const update = <K extends keyof Answers>(k: K, v: Answers[K]) =>
    setAnswers((a) => ({ ...a, [k]: v }));

  function startForm() {
    setView("form");
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (step < totalSteps) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return !!answers.stage;
      case 2:
        return answers.industry !== "" && (answers.industry !== "Other" || answers.industryOther.trim().length > 1);
      case 3:
        return !!answers.challenge;
      case 4:
        return !!answers.revenue;
      case 5:
        return !!answers.team;
      case 6:
        return true; // skippable
      case 7:
        return (
          answers.name.trim().length > 1 &&
          /.+@.+\..+/.test(answers.email.trim())
        );
      default:
        return false;
    }
  }

  async function submit() {
    setView("loading");
    try {
      const industryFinal =
        answers.industry === "Other" && answers.industryOther.trim()
          ? answers.industryOther.trim()
          : answers.industry;
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: answers.stage,
          industry: industryFinal,
          challenge: answers.challenge,
          revenue: answers.revenue,
          team: answers.team,
          goal: answers.goal,
          name: answers.name,
          email: answers.email,
          whatsapp: answers.whatsapp,
        }),
      });
      const data = (await res.json()) as { report?: Report; error?: string };
      if (!res.ok || !data.report) {
        throw new Error(data.error || "AI failed");
      }
      setReport(data.report);
      setView("results");
    } catch (e) {
      console.error(e);
      setErrMsg(
        "Something went wrong generating your report. Our team has been notified. Please WhatsApp us at +254 116 6644 204 for your free diagnosis.",
      );
      setView("error");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: NAVY,
        color: TEXT,
        fontFamily: FONT_STACK,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <NavBar />
      {view === "intro" && <Hero onStart={startForm} />}

      {view === "form" && (
        <FormSection
          step={step}
          totalSteps={totalSteps}
          progress={progress}
          answers={answers}
          update={update}
          back={back}
          next={next}
          canAdvance={canAdvance()}
          onSubmit={submit}
        />
      )}

      {view === "loading" && <Loading />}

      {view === "results" && report && <Results report={report} answers={answers} />}

      {view === "error" && <ErrorBlock message={errMsg} onRetry={() => setView("form")} />}

      <FooterCTA />
    </div>
  );
}

/* ---------------- NavBar ---------------- */

function NavBar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,22,40,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: NAVY_CARD,
              border: `1px solid ${TEAL}`,
              display: "grid",
              placeItems: "center",
              fontFamily: SERIF_STACK,
              fontWeight: 900,
              color: TEAL,
              fontSize: 22,
            }}
          >
            V
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <strong style={{ display: "block", color: TEXT, fontSize: 16, letterSpacing: 0.5 }}>
              VTEC
            </strong>
            <span style={{ color: MUTED, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>
              Business Group
            </span>
          </div>
        </a>
        <a
          href="/"
          style={{
            color: TEXT,
            textDecoration: "none",
            fontSize: 14,
            padding: "10px 18px",
            borderRadius: 10,
            border: `1px solid ${BORDER}`,
          }}
        >
          ← Back to site
        </a>
      </div>
    </nav>
  );
}

/* ---------------- Hero ---------------- */

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section
      style={{
        position: "relative",
        padding: "96px 20px 80px",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(0,200,150,0.20), transparent 70%), radial-gradient(40% 40% at 50% 60%, rgba(27,94,32,0.25), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(0,200,150,0.12)",
            color: TEAL,
            border: `1px solid ${TEAL}`,
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.5,
          }}
        >
          FREE TOOL
        </span>
        <h1
          style={{
            fontFamily: SERIF_STACK,
            fontWeight: 900,
            fontSize: "clamp(38px, 6vw, 64px)",
            lineHeight: 1.05,
            margin: "20px 0 18px",
            letterSpacing: -1,
          }}
        >
          Is Your Business Built to Last?
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 19px)",
            color: MUTED,
            maxWidth: 620,
            margin: "0 auto 36px",
            lineHeight: 1.55,
          }}
        >
          Answer 7 questions. Get a personalised AI strategy report, built for the Kenyan market.
        </p>
        <button
          type="button"
          onClick={onStart}
          style={{
            ...primaryBtn,
            fontSize: 17,
            padding: "16px 32px",
          }}
        >
          Start My Diagnosis →
        </button>
        <p style={{ color: MUTED, fontSize: 13, marginTop: 18 }}>
          Takes 3 minutes. No sign up required to start.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Form Section ---------------- */

function FormSection(props: {
  step: number;
  totalSteps: number;
  progress: number;
  answers: Answers;
  update: <K extends keyof Answers>(k: K, v: Answers[K]) => void;
  back: () => void;
  next: () => void;
  canAdvance: boolean;
  onSubmit: () => void;
}) {
  const { step, totalSteps, progress, answers, update, back, next, canAdvance, onSubmit } = props;
  const isLast = step === totalSteps;

  return (
    <section style={{ padding: "40px 20px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: MUTED,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: 4,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${TEAL}, ${GREEN_BRIGHT})`,
                transition: "width 400ms ease",
              }}
            />
          </div>
        </div>

        {/* Card */}
        <div
          key={step}
          style={{
            background: "#FFFFFF",
            color: "#0A1628",
            borderRadius: 16,
            padding: "32px 28px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            animation: "vtecFade 350ms ease",
          }}
        >
          {step === 1 && (
            <Question title="Where is your business right now?">
              <RadioCards
                value={answers.stage}
                onChange={(v) => update("stage", v)}
                options={STAGE_OPTS.map((o) => ({
                  value: o.v,
                  label: o.label,
                  sub: o.sub,
                  icon: o.icon,
                }))}
              />
            </Question>
          )}
          {step === 2 && (
            <Question title="What industry are you in?">
              <RadioCards
                value={answers.industry}
                onChange={(v) => update("industry", v)}
                options={INDUSTRY_OPTS.map((o) => ({ value: o.v, label: o.v, icon: o.icon }))}
                columns={2}
              />
              {answers.industry === "Other" && (
                <input
                  type="text"
                  placeholder="Tell us your industry"
                  value={answers.industryOther}
                  onChange={(e) => update("industryOther", e.target.value)}
                  style={{ ...inputStyle, marginTop: 14 }}
                  maxLength={80}
                />
              )}
            </Question>
          )}
          {step === 3 && (
            <Question title="What is your #1 challenge right now?">
              <RadioCards
                value={answers.challenge}
                onChange={(v) => update("challenge", v)}
                options={CHALLENGE_OPTS.map((o) => ({ value: o.v, label: o.v, icon: o.icon }))}
                columns={2}
              />
            </Question>
          )}
          {step === 4 && (
            <Question title="What does your monthly revenue look like?">
              <RadioCards
                value={answers.revenue}
                onChange={(v) => update("revenue", v)}
                options={REVENUE_OPTS.map((o) => ({ value: o, label: o }))}
              />
            </Question>
          )}
          {step === 5 && (
            <Question title="How many people are actively working in the business?">
              <RadioCards
                value={answers.team}
                onChange={(v) => update("team", v)}
                options={TEAM_OPTS.map((o) => ({ value: o, label: o }))}
              />
            </Question>
          )}
          {step === 6 && (
            <Question title="What does success look like for you in the next 12 months?">
              <textarea
                value={answers.goal}
                onChange={(e) => update("goal", e.target.value.slice(0, 300))}
                placeholder="e.g. I want to grow from 50 to 200 clients, launch a new product, or stabilize cash flow..."
                rows={5}
                style={{ ...inputStyle, fontFamily: FONT_STACK, resize: "vertical" }}
              />
              <div style={{ textAlign: "right", color: "#6B7280", fontSize: 12, marginTop: 6 }}>
                {answers.goal.length} / 300
              </div>
            </Question>
          )}
          {step === 7 && (
            <Question
              title="Almost done. Where should we send your report?"
              subtitle="Your personalised strategy report will appear on screen instantly AND be sent to your email."
            >
              <div style={{ display: "grid", gap: 14 }}>
                <input
                  style={inputStyle}
                  placeholder="Full name"
                  value={answers.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={80}
                />
                <input
                  style={inputStyle}
                  placeholder="Email address"
                  type="email"
                  value={answers.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={120}
                />
                <input
                  style={inputStyle}
                  placeholder="+254... (WhatsApp number, optional)"
                  type="tel"
                  value={answers.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  maxLength={30}
                />
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#374151" }}>
                  <input
                    type="checkbox"
                    checked={answers.optIn}
                    onChange={(e) => update("optIn", e.target.checked)}
                    style={{ marginTop: 3, accentColor: GREEN_BRIGHT }}
                  />
                  <span>Keep me updated with free business tips from VTEC</span>
                </label>
              </div>
            </Question>
          )}
        </div>

        {/* Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 22,
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            style={{
              background: "transparent",
              border: "none",
              color: step === 1 ? "rgba(255,255,255,0.25)" : MUTED,
              cursor: step === 1 ? "default" : "pointer",
              fontSize: 14,
              padding: "10px 6px",
            }}
          >
            ← Back
          </button>

          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            {step === 6 && (
              <button
                type="button"
                onClick={next}
                style={{
                  background: "transparent",
                  border: "none",
                  color: MUTED,
                  cursor: "pointer",
                  fontSize: 13,
                  textDecoration: "underline",
                }}
              >
                Skip this
              </button>
            )}
            {isLast ? (
              <button
                type="button"
                disabled={!canAdvance}
                onClick={onSubmit}
                style={{
                  ...primaryBtn,
                  opacity: canAdvance ? 1 : 0.45,
                  cursor: canAdvance ? "pointer" : "not-allowed",
                }}
              >
                Generate My Report →
              </button>
            ) : (
              <button
                type="button"
                disabled={!canAdvance}
                onClick={next}
                style={{
                  ...primaryBtn,
                  opacity: canAdvance ? 1 : 0.45,
                  cursor: canAdvance ? "pointer" : "not-allowed",
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes vtecFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontFamily: SERIF_STACK,
          fontWeight: 700,
          fontSize: "clamp(22px, 3.4vw, 30px)",
          lineHeight: 1.2,
          color: "#0A1628",
          marginBottom: subtitle ? 8 : 22,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "#4B5563", marginBottom: 22, fontSize: 15 }}>{subtitle}</p>
      )}
      {children}
    </div>
  );
}

function RadioCards(props: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; sub?: string; icon?: LucideIcon }[];
  columns?: 1 | 2;
}) {
  const { value, onChange, options, columns = 1 } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns === 2 ? "repeat(auto-fit, minmax(220px, 1fr))" : "1fr",
        gap: 10,
      }}
    >
      {options.map((o) => {
        const selected = value === o.value;
        const Icon = o.icon;
        return (
          <button
            type="button"
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              textAlign: "left",
              background: selected ? "rgba(0,200,150,0.08)" : "#FFFFFF",
              border: selected ? `2px solid ${TEAL}` : "2px solid #E5E7EB",
              borderRadius: 12,
              padding: "16px 16px",
              cursor: "pointer",
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              transition: "all 180ms ease",
              color: "#0A1628",
            }}
          >
            {Icon && (
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: selected ? TEAL : "rgba(0,200,150,0.10)",
                  color: selected ? "#04221A" : GREEN_BRIGHT,
                  flexShrink: 0,
                }}
              >
                <Icon size={20} strokeWidth={2} />
              </span>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{o.label}</div>
              {o.sub && (
                <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>{o.sub}</div>
              )}
            </div>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `2px solid ${selected ? TEAL : "#D1D5DB"}`,
                background: selected ? TEAL : "transparent",
                marginTop: 2,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
              }}
            >
              {selected && (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                  }}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Loading ---------------- */

function Loading() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % LOADING_LINES.length), 1400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <section style={{ padding: "120px 20px", textAlign: "center" }}>
      <div
        style={{
          width: 84,
          height: 84,
          margin: "0 auto 28px",
          borderRadius: 18,
          background: NAVY_CARD,
          border: `2px solid ${TEAL}`,
          display: "grid",
          placeItems: "center",
          fontFamily: SERIF_STACK,
          fontWeight: 900,
          color: TEAL,
          fontSize: 44,
          animation: "vtecPulse 1.4s ease-in-out infinite",
        }}
      >
        V
      </div>
      <div
        style={{
          width: 28,
          height: 28,
          border: `3px solid rgba(0,200,150,0.25)`,
          borderTopColor: TEAL,
          borderRadius: "50%",
          margin: "0 auto 22px",
          animation: "vtecSpin 0.9s linear infinite",
        }}
      />
      <p style={{ color: MUTED, fontSize: 16 }}>{LOADING_LINES[i]}</p>
      <style>{`
        @keyframes vtecSpin { to { transform: rotate(360deg); } }
        @keyframes vtecPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,200,150,0.6); } 50% { transform: scale(1.06); box-shadow: 0 0 0 14px rgba(0,200,150,0); } }
      `}</style>
    </section>
  );
}

/* ---------------- Results ---------------- */

function useCountUp(target: number, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 1.6 + Math.random() * 1.2,
        rot: Math.random() * 360,
        color: i % 3 === 0 ? TEAL : i % 3 === 1 ? GREEN_BRIGHT : "#A7F3D0",
        size: 6 + Math.random() * 6,
      })),
    [],
  );
  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-10px",
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            borderRadius: 1,
            transform: `rotate(${p.rot}deg)`,
            animation: `vtecConfetti ${p.dur}s ${p.delay}s ease-out forwards`,
            opacity: 0.9,
          }}
        />
      ))}
      <style>{`
        @keyframes vtecConfetti {
          to { transform: translateY(420px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Results({ report, answers }: { report: Report; answers: Answers }) {
  const score = useCountUp(Math.max(0, Math.min(100, Math.round(report.healthScore))));
  const printRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const industryDisplay =
    answers.industry === "Other" ? answers.industryOther : answers.industry;

  function downloadPDF() {
    window.print();
  }
  function shareWhatsApp() {
    const text = encodeURIComponent(
      `My VTEC Business Diagnostic score: ${report.healthScore}/100. Get yours free at https://vtecgroup.co.ke/business-diagnostic`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  return (
    <section style={{ position: "relative", padding: "60px 20px 80px" }}>
      <Confetti />
      <div ref={printRef} style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1
            style={{
              fontFamily: SERIF_STACK,
              fontWeight: 900,
              fontSize: "clamp(30px, 5vw, 46px)",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Your VTEC Business Diagnostic Report
          </h1>
          <p style={{ color: MUTED, fontSize: 16 }}>
            Built for {answers.name}'s {industryDisplay} business · {today}
          </p>

          <div
            style={{
              marginTop: 28,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: "22px 36px",
              borderRadius: 20,
              background: `linear-gradient(135deg, ${TEAL}, ${GREEN})`,
              boxShadow: "0 18px 50px rgba(0,200,150,0.25)",
            }}
          >
            <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.9 }}>
              Business Health Score
            </span>
            <span style={{ fontFamily: SERIF_STACK, fontWeight: 900, fontSize: 64, lineHeight: 1 }}>
              {score}
              <span style={{ fontSize: 22, opacity: 0.8 }}> / 100</span>
            </span>
          </div>
        </div>

        <ResultCard icon={ClipboardList} title="Your Business Profile Summary">
          <p>{report.profileSummary}</p>
        </ResultCard>

        <ResultCard icon={AlertTriangle} title="Your Critical Gap">
          <p>{report.criticalGap}</p>
        </ResultCard>

        <ResultCard icon={Target} title="3 Immediate Action Steps">
          <ol style={{ paddingLeft: 22, display: "grid", gap: 12 }}>
            {report.actionSteps.map((s, i) => (
              <li key={i} style={{ lineHeight: 1.55 }}>
                {s}
              </li>
            ))}
          </ol>
        </ResultCard>

        <ResultCard icon={MapIcon} title="90 Day Priority Roadmap">
          <div style={{ display: "grid", gap: 14 }}>
            {(["month1", "month2", "month3"] as const).map((k, i) => (
              <div
                key={k}
                style={{
                  padding: "14px 16px",
                  background: "rgba(0,200,150,0.06)",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 10,
                }}
              >
                <div style={{ color: TEAL, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>
                  Month {i + 1}
                </div>
                <div style={{ lineHeight: 1.55 }}>{report.roadmap[k]}</div>
              </div>
            ))}
          </div>
        </ResultCard>

        <ResultCard icon={Lightbulb} title="VTEC Recommendation">
          <div style={{ marginBottom: 10, fontWeight: 700, color: TEAL, fontSize: 18 }}>
            {report.vtecRecommendation.service}
          </div>
          <p style={{ marginBottom: 18 }}>{report.vtecRecommendation.reason}</p>
          <a
            href="/#contact"
            style={{ ...primaryBtn, display: "inline-block", textDecoration: "none" }}
          >
            {report.vtecRecommendation.ctaText} →
          </a>
        </ResultCard>

        {/* CTA Row */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a href="/#contact" style={{ ...primaryBtn, textDecoration: "none" }}>
            Book a Free Strategy Call with VTEC →
          </a>
          <button type="button" onClick={downloadPDF} style={outlineBtn}>
            Download Report as PDF
          </button>
        </div>
        <p style={{ textAlign: "center", color: MUTED, marginTop: 18, fontSize: 14 }}>
          Share your results:{" "}
          <button
            type="button"
            onClick={shareWhatsApp}
            style={{
              background: "transparent",
              border: "none",
              color: TEAL,
              cursor: "pointer",
              fontSize: 14,
              textDecoration: "underline",
              padding: 0,
            }}
          >
            WhatsApp
          </button>
        </p>
      </div>
      <style>{`
        @media print {
          nav, button { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
    </section>
  );
}

function ResultCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: NAVY_CARD,
        borderRadius: 14,
        padding: "24px 24px",
        marginBottom: 18,
        borderLeft: `4px solid ${TEAL}`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        lineHeight: 1.6,
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 14,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 34,
            height: 34,
            borderRadius: 8,
            background: "rgba(0,200,150,0.15)",
            color: TEAL,
          }}
        >
          <Icon size={18} strokeWidth={2} />
        </span>
        {title}
      </h3>
      <div style={{ color: "rgba(255,255,255,0.85)" }}>{children}</div>
    </div>
  );
}

/* ---------------- Error ---------------- */

function ErrorBlock({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section style={{ padding: "100px 20px", textAlign: "center" }}>
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          background: NAVY_CARD,
          border: `1px solid ${BORDER}`,
          borderRadius: 16,
          padding: 32,
        }}
      >
        <div style={{ display: "grid", placeItems: "center", margin: "0 auto 16px", width: 56, height: 56, borderRadius: 14, background: "rgba(0,200,150,0.12)", color: TEAL }}><AlertTriangle size={28} /></div>
        <p style={{ marginBottom: 22, lineHeight: 1.6 }}>{message}</p>
        <button type="button" onClick={onRetry} style={primaryBtn}>
          Try again
        </button>
      </div>
    </section>
  );
}

/* ---------------- Footer CTA ---------------- */

function FooterCTA() {
  return (
    <section
      style={{
        background: NAVY_DEEP,
        padding: "64px 20px",
        textAlign: "center",
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: SERIF_STACK,
            fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 38px)",
            marginBottom: 14,
          }}
        >
          Prefer to talk to a real strategist?
        </h2>
        <p style={{ color: MUTED, marginBottom: 28, fontSize: 16, lineHeight: 1.6 }}>
          VTEC Consultancy Services offers hands on strategy sessions for Kenyan businesses ready to grow.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/254116644204"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...primaryBtn, textDecoration: "none" }}
          >
            Book a Consultation →
          </a>
          <a
            href="/ai-diagnostic-info"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...outlineBtn, textDecoration: "none" }}
          >
            Learn About Our Services
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Shared button styles ---------------- */

const primaryBtn: React.CSSProperties = {
  background: `linear-gradient(135deg, ${TEAL}, ${GREEN_BRIGHT})`,
  color: "#04221A",
  border: "none",
  padding: "14px 26px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  letterSpacing: 0.3,
  boxShadow: "0 10px 30px rgba(0,200,150,0.25)",
};

const outlineBtn: React.CSSProperties = {
  background: "transparent",
  color: TEXT,
  border: `1.5px solid ${TEAL}`,
  padding: "14px 26px",
  borderRadius: 12,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 10,
  border: "2px solid #E5E7EB",
  fontSize: 15,
  color: "#0A1628",
  background: "#FFFFFF",
  outline: "none",
  fontFamily: "inherit",
};
