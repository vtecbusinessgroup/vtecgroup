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
  ClipboardList,
  AlertTriangle,
  Target,
  Map as MapIcon,
  Lightbulb,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { generateDiagnostic } from "@/lib/diagnostic.functions";

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

type Report = {
  healthScore: number;
  profileSummary: string;
  criticalGap: string;
  actionSteps: string[];
  roadmap: { month1: string; month2: string; month3: string };
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

  const runDiagnostic = useServerFn(generateDiagnostic);

  async function submit() {
    setView("loading");
    try {
      const industryFinal =
        answers.industry === "Other" && answers.industryOther.trim()
          ? answers.industryOther.trim()
          : answers.industry;
      const result = await runDiagnostic({
        data: {
          stage: answers.stage,
          industry: industryFinal,
          challenge: answers.challenge,
          revenue: answers.revenue,
          team: answers.team,
          goal: answers.goal,
          name: answers.name,
          email: answers.email,
          whatsapp: answers.whatsapp,
        },
      });
      if (!("report" in result) || !result.report) {
        throw new Error(("error" in result && result.error) || "AI failed");
      }
      setReport(result.report as Report);
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
                onClick={onSu