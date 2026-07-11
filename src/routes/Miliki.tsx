import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Shield,
  Wallet,
  TrendingUp,
  Target,
  Layers,
  Download,
  Crown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/miliki")({
  head: () => ({
    meta: [
      { title: "MILIKI App | Kenya's Financial Co-Pilot — VTEC Business Group" },
      {
        name: "description",
        content:
          "MILIKI is VTEC Business Group's 2-in-1 financial co-pilot: budget and invest in NSE equities, Money Market Funds, and more from one dashboard.",
      },
    ],
  }),
  component: MilikiPage,
});

const GOLD = "#c9a227";
const GOLD_LIGHT = "#f0d580";
const BLACK = "#0a0a0a";

const FEATURES = [
  "Real-time budget tracking with smart alerts before you overspend, not after",
  "Goal-based saving buckets that automatically convert surplus into investable capital",
  "A curated marketplace of vetted investment partners, spanning NSE-linked equities, Money Market Funds, and more",
  "One unified portfolio and budget view, so your net worth is never a guess",
  "Built mobile-first as an installable app (PWA), no App Store approval delays, no storage-hungry download, works instantly from any browser",
];

function QABlock({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-2 pl-6" style={{ borderColor: "rgba(201,162,39,0.35)" }}>
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(201,162,39,0.12)", color: GOLD_LIGHT, border: "1px solid rgba(201,162,39,0.3)" }}
        >
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
          {eyebrow}
        </span>
      </div>
      <h2
        className="mb-4 text-2xl font-bold sm:text-3xl"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-white/75">{children}</div>
    </div>
  );
}

function Verdict({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(201,162,39,0.2)" }}>
      <div className="mb-1.5 font-semibold text-white">{title}</div>
      <div className="text-sm text-white/65">{children}</div>
    </div>
  );
}

function InstallButton({ fixed = false }: { fixed?: boolean }) {
  return (
    <a
      href="https://miliki.vtecgroup.co.ke"
      target="_blank"
      rel="noopener noreferrer"
      className={
        fixed
          ? "fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-2xl transition-transform hover:scale-105"
          : "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-transform hover:scale-105"
      }
      style={{
        backgroundImage: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
        color: BLACK,
        boxShadow: fixed ? "0 10px 30px rgba(201,162,39,0.45)" : undefined,
      }}
    >
      <Download className="h-4 w-4" /> {fixed ? "Install App" : "Open MILIKI App"}
    </a>
  );
}

function MilikiPage() {
  return (
    <div style={{ backgroundColor: BLACK, minHeight: "100vh" }} className="text-white">
      {/* Top bar */}
      <div
        className="sticky top-0 z-20 border-b backdrop-blur"
        style={{ backgroundColor: "rgba(10,10,10,0.85)", borderColor: "rgba(201,162,39,0.25)" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to VTEC Business Group
          </Link>
          <img src="/vtec-logo.png" alt="VTEC Business Group" className="h-8 w-8 rounded-full object-cover" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at top, rgba(201,162,39,0.16), transparent 60%)" }}
        />
        <img
          src="/miliki-app-logo.jpg"
          alt="MILIKI App"
          className="relative mx-auto mb-8 h-32 w-32 rounded-2xl object-cover shadow-2xl"
          style={{ boxShadow: "0 0 60px rgba(201,162,39,0.35)" }}
        />
        <div
          className="relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{ borderColor: "rgba(34,197,94,0.4)", color: "#4ade80", backgroundColor: "rgba(34,197,94,0.08)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Now
        </div>
        <h1
          className="relative mt-6 text-4xl font-black leading-tight sm:text-6xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Stop Managing Money.
          <br />
          <span style={{ color: GOLD_LIGHT }}>Start Owning It.</span>
        </h1>
        <p className="relative mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
          MILIKI is Kenya's first 2-in-1 financial co-pilot, one app that turns your everyday budget into your bridge
          to the Nairobi Securities Exchange, Money Market Funds, and beyond.
        </p>
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <InstallButton />
        </div>
        <div className="relative mt-6 flex items-center justify-center gap-2 text-xs text-white/40">
          <Shield className="h-3.5 w-3.5" style={{ color: GOLD }} /> Built and operated by VTEC Business Group, Nairobi
        </div>
      </section>

      {/* Q&A sections */}
      <section className="mx-auto max-w-4xl space-y-16 px-5 py-6">
        <QABlock icon={<Wallet className="h-6 w-6" />} eyebrow="01 — The Product" title="What Is MILIKI App?">
          <p>
            <strong style={{ color: GOLD_LIGHT }}>MILIKI</strong>, Swahili for <em>"to own,"</em> is VTEC Business
            Group's flagship digital product: a two-in-one financial co-pilot that fuses everyday budgeting with real
            investing inside a single, transparent dashboard.
          </p>
          <p>
            Where most apps force you to choose between tracking your shillings and growing them, MILIKI does both, at
            the same time, in the same place.
          </p>
        </QABlock>

        <QABlock icon={<Layers className="h-6 w-6" />} eyebrow="02 — The Problem" title="What Problem Did We Identify?">
          <p>
            The average Kenyan's financial life is scattered across five different places: M-Pesa for spending, a
            SACCO passbook for savings, a separate portal for Money Market Funds, another app for NSE shares, and a
            WhatsApp group for "hot tips" nobody can verify.
          </p>
          <p>
            No single source of truth exists. And the real damage isn't the clutter, it's the gap between{" "}
            <em>"I saved something this month"</em> and <em>"that saving is now working for me."</em> That gap is
            where most Kenyans' wealth quietly goes to die.
          </p>
        </QABlock>

        <QABlock icon={<Target className="h-6 w-6" />} eyebrow="03 — The Solution" title="What Solution Are We Offering?">
          <p>
            One dashboard. One net worth number. One habit. Every shilling that enters MILIKI is either working for
            today, your budget, or working for tomorrow, your investments, visibly, in real time, in the same view.
          </p>
        </QABlock>

        <QABlock icon={<TrendingUp className="h-6 w-6" />} eyebrow="04 — How It Works" title="How Does It Deliver That Solution?">
          <ul className="space-y-3">
            {FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: GOLD }} />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </QABlock>

        <QABlock icon={<Sparkles className="h-6 w-6" />} eyebrow="05 — The Impact" title="What Impact Does It Bring?">
          <p>
            MILIKI closes the gap that InvestorMind Academy opens. Education without a path to action produces
            knowledgeable spectators, not investors. MILIKI is that path, it lowers the barrier that once made the
            NSE and Money Market Funds feel reserved for the already-wealthy, and turns everyday Kenyans into
            legitimate, active market participants.
          </p>
        </QABlock>

        <QABlock icon={<Crown className="h-6 w-6" />} eyebrow="06 — The Verdict" title="What Makes MILIKI Indispensable?">
          <div className="space-y-5">
            <Verdict title="There are spenders, and there are owners.">
              MILIKI doesn't ask which one you are. It quietly decides which one you become.
            </Verdict>
            <Verdict title="It isn't competing with your budgeting app or your broker.">
              It replaced the need for both, by refusing to be just one of them.
            </Verdict>
            <Verdict title="Every idle shilling is a small, silent loss.">
              Every month your money sits uninvested is a month your future self quietly pays for. MILIKI exists to
              close that window.
            </Verdict>
            <Verdict title="The best financial tools don't demand your attention.">
              They work in the background so that ownership becomes your default, not your daily discipline.
            </Verdict>
          </div>
        </QABlock>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-20 text-center">
        <h2 className="text-3xl font-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Your Money Is Already Moving.
          <br />
          <span style={{ color: GOLD_LIGHT }}>Decide Where It's Going.</span>
        </h2>
        <div className="mt-8">
          <InstallButton />
        </div>
        <p className="mt-4 text-xs text-white/40">miliki.vtecgroup.co.ke · A VTEC Business Group product</p>
      </section>

      <InstallButton fixed />
    </div>
  );
}

export default MilikiPage;