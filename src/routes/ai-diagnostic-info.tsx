import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  Clock,
  MapPin,
  Sparkles,
  ClipboardList,
  Cpu,
  FileText,
  Phone,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/ai-diagnostic-info")({
  head: () => ({
    meta: [
      { title: "AI Business Diagnostic Tool | VTEC Business Group" },
      {
        name: "description",
        content:
          "Learn how VTEC's free AI Business Diagnostic Tool gives Kenyan entrepreneurs a personalised strategy report in under 3 minutes.",
      },
      { property: "og:title", content: "The Future of Business Strategy is Here | VTEC" },
      {
        property: "og:description",
        content:
          "A free 7 question AI tool built for Kenya's entrepreneurs. Get a Business Health Score, critical gap analysis and 90 day roadmap.",
      },
      { property: "og:url", content: "https://vtecgroup.co.ke/ai-diagnostic-info" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/ai-diagnostic-info" }],
  }),
  component: AiDiagnosticInfo,
});

const NAVY = "#0A1628";
const NAVY_DEEP = "#070F1C";
const NAVY_CARD = "#10223C";
const TEAL = "#00C896";
const GREEN = "#1B5E20";
const GREEN_BRIGHT = "#27AE60";
const TEXT = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.7)";
const BORDER = "rgba(0,200,150,0.18)";

const FONT_STACK =
  "'Outfit', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const SERIF_STACK =
  "'Playfair Display', 'DM Serif Display', Georgia, 'Times New Roman', serif";

const primaryBtn: React.CSSProperties = {
  background: `linear-gradient(135deg, ${TEAL}, ${GREEN_BRIGHT})`,
  color: "#04221A",
  border: "none",
  padding: "16px 30px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  letterSpacing: 0.3,
  boxShadow: "0 10px 30px rgba(0,200,150,0.25)",
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  textDecoration: "none",
};

function AiDiagnosticInfo() {
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

      {/* Hero */}
      <section style={{ position: "relative", padding: "96px 20px 72px", textAlign: "center", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(0,200,150,0.22), transparent 70%), radial-gradient(40% 40% at 50% 70%, rgba(27,94,32,0.25), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 880, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
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
            <Sparkles size={14} /> VTEC INTELLIGENCE
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
            The Future of Business Strategy is Here
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 2.2vw, 21px)",
              color: MUTED,
              maxWidth: 720,
              margin: "0 auto 36px",
              lineHeight: 1.5,
            }}
          >
            VTEC's AI Business Diagnostic Tool, built for Kenya's entrepreneurs.
          </p>
          <a href="/business-diagnostic" style={primaryBtn}>
            Try It Free Now <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Section 1: What is it */}
      <Section
        eyebrow="What it is"
        title="A free intelligent strategy partner, always on"
      >
        <p style={paragraph}>
          The VTEC AI Business Diagnostic Tool is a free 7 question intelligent assessment that
          studies your business profile and generates a personalised strategy report. You receive a
          Business Health Score, a critical gap analysis, three immediate action steps and a focused
          90 day roadmap. The whole experience takes under three minutes.
        </p>
        <p style={paragraph}>
          It is designed for founders who want straight, honest direction without the long forms,
          spreadsheets or expensive discovery calls.
        </p>
      </Section>

      {/* Section 2: Why */}
      <Section
        eyebrow="Why it matters"
        title="Why every Kenyan business owner needs this"
        dark
      >
        <p style={paragraph}>
          Most small and medium businesses in Kenya operate without a clear, written strategy. Owners
          pour energy into the wrong priorities, spend on marketing that doesn't convert and lose
          months trying to identify what is really holding the business back.
        </p>
        <p style={paragraph}>
          This tool gives instant clarity that would normally cost upwards of KES 10,000 in a
          consultancy session. It is free because we believe every serious entrepreneur deserves a
          second pair of expert eyes on their business.
        </p>
      </Section>

      {/* Section 3: Stats */}
      <Section eyebrow="The impact" title="How it is changing business success">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
            marginTop: 14,
          }}
        >
          <StatCard
            icon={Clock}
            stat="3 Minutes"
            title="To Clarity"
            body="Seven focused questions, no fluff. You walk away knowing exactly where to focus next."
          />
          <StatCard
            icon={MapPin}
            stat="100%"
            title="Kenya Market Focused"
            body="Every recommendation reflects the realities of operating, hiring and selling in Kenya."
          />
          <StatCard
            icon={Cpu}
            stat="AI Powered"
            title="Strategy Engine"
            body="Built on a private intelligence stack tuned for SME growth, not generic templates."
          />
        </div>
      </Section>

      {/* Section 4: How it works */}
      <Section eyebrow="How it works" title="Four steps from question to action" dark>
        <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
          <Step n={1} icon={ClipboardList} title="Answer 7 questions" body="Tell us your stage, industry, biggest challenge and where you want to be in 12 months." />
          <Step n={2} icon={Brain} title="AI analyses your profile" body="Our engine maps your inputs against Kenyan market patterns and proven SME growth playbooks." />
          <Step n={3} icon={FileText} title="Get your personalised report" body="A Business Health Score, critical gap, three action steps and a 90 day roadmap, on screen and in your inbox." />
          <Step n={4} icon={Phone} title="Take action or book a consultation" body="Run the playbook yourself, or talk to a VTEC strategist to accelerate." />
        </div>
      </Section>

      {/* Final CTA */}
      <section style={{ padding: "84px 20px 100px", textAlign: "center", background: NAVY_DEEP }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: SERIF_STACK,
              fontWeight: 800,
              fontSize: "clamp(28px, 4.5vw, 42px)",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Ready to see what your business really needs?
          </h2>
          <p style={{ color: MUTED, marginBottom: 30, fontSize: 17, lineHeight: 1.55 }}>
            Three minutes from now you could have a full strategy report on your screen.
          </p>
          <a href="/business-diagnostic" style={primaryBtn}>
            Try It Free Now <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}

const paragraph: React.CSSProperties = {
  color: MUTED,
  fontSize: 17,
  lineHeight: 1.65,
  marginBottom: 14,
};

function Section({
  eyebrow,
  title,
  children,
  dark,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      style={{
        padding: "72px 20px",
        background: dark ? NAVY_DEEP : NAVY,
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <span
          style={{
            color: TEAL,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            fontFamily: SERIF_STACK,
            fontWeight: 800,
            fontSize: "clamp(26px, 4vw, 40px)",
            lineHeight: 1.15,
            margin: "10px 0 22px",
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  stat,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  stat: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        background: NAVY_CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        padding: "26px 22px",
        boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "rgba(0,200,150,0.12)",
          color: TEAL,
          marginBottom: 16,
        }}
      >
        <Icon size={22} strokeWidth={2} />
      </div>
      <div
        style={{
          fontFamily: SERIF_STACK,
          fontWeight: 900,
          fontSize: 32,
          color: TEAL,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {stat}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.55, margin: 0 }}>{body}</p>
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: number;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 18,
        alignItems: "flex-start",
        background: NAVY_CARD,
        border: `1px solid ${BORDER}`,
        borderLeft: `4px solid ${TEAL}`,
        borderRadius: 14,
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${TEAL}, ${GREEN})`,
          color: "#04221A",
          fontWeight: 900,
          fontFamily: SERIF_STACK,
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Icon size={18} strokeWidth={2} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>{title}</span>
        </div>
        <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.55, margin: 0 }}>{body}</p>
      </div>
    </div>
  );
}

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
          href="/business-diagnostic"
          style={{
            color: "#04221A",
            background: `linear-gradient(135deg, ${TEAL}, ${GREEN_BRIGHT})`,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 700,
            padding: "10px 18px",
            borderRadius: 10,
          }}
        >
          Try Free Tool
        </a>
      </div>
    </nav>
  );
}
