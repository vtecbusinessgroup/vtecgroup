import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  Wallet,
  TrendingUp,
  Target,
  Layers,
  Download,
  Crown,
  Sparkles,
  X,
  Check,
  Lock,
  Award,
  GraduationCap,
  Briefcase,
  Rocket,
  Users,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Reveal } from "../components/Reveal";

const PAGE_URL = "https://app.vtecgroup.co.ke";
const OG_IMAGE = "https://vtecgroup.co.ke/og-image.png";

export const Route = createFileRoute("/miliki")({
  head: () => ({
    meta: [
      { title: "MILIKI App | Kenya's Financial Co-Pilot — VTEC Business Group" },
      {
        name: "description",
        content:
          "MILIKI is VTEC Business Group's 2-in-1 financial co-pilot: budget and invest in NSE equities, Money Market Funds, and more from one dashboard.",
      },
      {
        name: "keywords",
        content:
          "MILIKI App Kenya, financial co-pilot Kenya, NSE investing app, Money Market Fund app Kenya, budgeting app Kenya, VTEC MILIKI, wealth app Kenya, asset ownership app",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "MILIKI App | Kenya's Financial Co-Pilot" },
      {
        property: "og:description",
        content:
          "Stop managing money. Start owning it. MILIKI fuses budgeting with real NSE and Money Market Fund investing in one dashboard.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MILIKI App | Kenya's Financial Co-Pilot" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600;700&display=swap",
      },
      { rel: "canonical", href: PAGE_URL },
    ],
  }),
  component: MilikiPage,
});

const GOLD = "#c9a227";
const GOLD_LIGHT = "#f0d580";
const BLACK = "#0a0a0a";
const HEADING_FONT = "'Playfair Display', 'DM Serif Display', Georgia, serif";
const BODY_FONT = "'Outfit', 'Inter', system-ui, sans-serif";
const APK_DOWNLOAD_URL = "https://bqeffpcdryvdurfzkjyu.supabase.co/storage/v1/object/public/apk/miliki.apk";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/leadership", label: "Leadership" },
  { href: "/vision-2035", label: "Vision 2035" },
  { href: "/blog", label: "Blog" },
];

const FEATURES = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Real-Time Budget Tracking",
    desc: "Smart alerts land before you overspend, not after, so discipline stops feeling like guesswork.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Goal-Based Saving Buckets",
    desc: "Surplus is automatically routed toward named goals, converting idle saving into investable capital.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Curated Investment Marketplace",
    desc: "Vetted partners spanning NSE-linked equities, Money Market Funds, and more, in one screen.",
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    title: "One Unified Net Worth View",
    desc: "Budget and portfolio share a single dashboard, so your net worth is never a guess.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Direct Native Installation",
    desc: "Built as a powerful native APK. No App Store delays, installed directly from our secure servers.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Bank-Grade Data Protection",
    desc: "Your financial data is encrypted in transit and at rest, visible to you, and no one else.",
  },
];

const PERSONAS = [
  { icon: <GraduationCap className="h-5 w-5" />, title: "The First-Time Investor", desc: "Never touched the NSE before. MILIKI makes the first move the easy one." },
  { icon: <Briefcase className="h-5 w-5" />, title: "The Busy Professional", desc: "No time to track five apps. Wants one honest number for their whole financial life." },
  { icon: <Rocket className="h-5 w-5" />, title: "The Side-Hustler", desc: "Irregular income, real ambition. Needs a system that adapts to good months and lean ones." },
  { icon: <Users className="h-5 w-5" />, title: "The Family Provider", desc: "Building something that outlasts them. Wants to see it growing, not hope it is." },
];

const FAQS = [
  { q: "Is my money actually safe with MILIKI?", a: "Your data is encrypted in transit and at rest, and every investment product on MILIKI is routed through vetted, licensed partners, MILIKI never holds your capital directly." },
  { q: "Do I need investing experience to start?", a: "No. MILIKI is built for the first-time investor as much as the seasoned one, InvestorMind Academy sits right alongside it if you want the fundamentals first." },
  { q: "What does MILIKI cost?", a: "MILIKI has a free Starter tier to begin budgeting and exploring investments today, with Premium and Pro tiers for deeper tools as your portfolio grows." },
  { q: "Can I withdraw my money anytime?", a: "Yes. MILIKI is built on ownership, your assets and your access are always yours, on your terms." },
];

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-[0.18em] border-l-[3px] pl-[14px]"
      style={{ color: GOLD, borderColor: GOLD, fontFamily: BODY_FONT }}
    >
      {children}
    </span>
  );
}

function QABlock({
  num,
  icon,
  eyebrow,
  title,
  children,
}: {
  num: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal className="relative border-l-2 border-[rgba(201,162,39,0.35)] pl-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 select-none text-[6rem] font-black leading-none opacity-[0.04] sm:text-[8rem]"
        style={{ fontFamily: HEADING_FONT }}
      >
        {num}
      </span>
      <div className="relative mb-3 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(201,162,39,0.12)", color: GOLD_LIGHT, border: "1px solid rgba(201,162,39,0.3)" }}
        >
          {icon}
        </div>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
      </div>
      <h2 className="relative mb-4 text-[clamp(1.5rem,4vw,2.2rem)] font-extrabold leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: HEADING_FONT }}>
        {title}
      </h2>
      <div className="relative space-y-3 text-[15px] leading-relaxed text-white/75" style={{ fontFamily: BODY_FONT }}>
        {children}
      </div>
    </Reveal>
  );
}

function Verdict({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div
      className="rounded-[18px] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] hover:border-[rgba(201,162,39,0.45)]"
      style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(201,162,39,0.2)" }}
    >
      <div className="mb-2.5 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(201,162,39,0.22), rgba(201,162,39,0.06))",
            color: GOLD_LIGHT,
            boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.25)",
          }}
        >
          {icon}
        </span>
        <div className="font-semibold text-white" style={{ fontFamily: BODY_FONT }}>
          {title}
        </div>
      </div>
      <div className="text-sm text-white/65" style={{ fontFamily: BODY_FONT }}>
        {children}
      </div>
    </div>
  );
}

function InstallButton({ fixed = false, visible = true }: { fixed?: boolean; visible?: boolean }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mbDownloaded, setMbDownloaded] = useState("0.00");
  
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;
    
    setIsDownloading(true);
    setProgress(0);
    setMbDownloaded("0.00");
    
    // Natively trigger download without opening a new tab. Chrome easily catches Supabase links.
    window.location.assign(APK_DOWNLOAD_URL);

    // Simulate VidMate progress bar UI while the native download runs in background
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setIsDownloading(false), 2000);
      }
      setProgress(currentProgress);
      setMbDownloaded(((currentProgress / 100) * 10.69).toFixed(2));
    }, 450);
  };

  return (
    <>
      <button
        onClick={handleDownload}
        className={
          fixed
            ? `group fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 overflow-hidden rounded-[10px] px-5 py-3 text-sm font-bold shadow-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
              }`
            : "group relative inline-flex items-center gap-2 overflow-hidden rounded-[10px] px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
        }
        style={{
          backgroundImage: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
          color: BLACK,
          fontFamily: BODY_FONT,
          boxShadow: fixed ? "0 10px 30px rgba(201,162,39,0.45)" : "0 8px 24px rgba(201,162,39,0.3)",
          border: "none",
          cursor: isDownloading ? "default" : "pointer"
        }}
      >
        <style>{`@keyframes miliki-spin { 100% { transform: rotate(360deg); } }`}</style>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/30 transition-transform duration-700 group-hover:translate-x-full"
        />
        {isDownloading ? (
          <>
            <div style={{ width: 15, height: 15, border: '2px solid #0A0A0A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'miliki-spin 1s linear infinite' }} />
            <span className="relative text-[#0A0A0A]">Downloading...</span>
          </>
        ) : (
          <>
            <Download className="relative h-4 w-4 text-[#0A0A0A]" /> 
            <span className="relative text-[#0A0A0A]">Download MILIKI APK</span>
          </>
        )}
      </button>

      {/* Floating VidMate-Style Download Card */}
      {isDownloading && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 999999,
          background: "#161616", borderRadius: 16, padding: "16px 20px", width: "calc(100% - 48px)", maxWidth: 400,
          boxShadow: "0 10px 40px rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", gap: 16
        }}>
          <div style={{ position: "relative", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle cx="20" cy="20" r="16" fill="none" stroke="#D4AF37" strokeWidth="4" 
                      strokeDasharray="100.5" strokeDashoffset={100.5 - (progress / 100) * 100.5} 
                      strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.2s ease" }} />
            </svg>
            <Download size={14} color="#D4AF37" style={{ position: "absolute" }} />
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <p style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 700, color: "#FFFFFF", margin: "0 0 4px 0" }}>Downloading MILIKI...</p>
            <p style={{ fontFamily: "Inter", fontSize: 12, color: "#A0A0A0", margin: 0 }}>{mbDownloaded} MB / 10.69 MB • {progress}%</p>
          </div>
        </div>
      )}
    </>
  );
}

function MilikiNav() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-[10px]"
      style={{ backgroundColor: "rgba(10,10,10,0.92)", borderColor: "rgba(201,162,39,0.25)" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <a href="https://vtecgroup.co.ke" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
          <div 
            style={{ 
              width: 36, 
              height: 36, 
              backgroundColor: "#FFFFFF", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              overflow: "hidden",
              padding: 2
            }}
          >
            <img
              src="https://vtecgroup.co.ke/vtec-logo.png"
              alt="VTEC Business Group"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <span className="leading-tight">
            <span className="block text-white font-bold text-sm tracking-wide" style={{ fontFamily: BODY_FONT }}>
              MILIKI
            </span>
            <span className="block text-[10px] font-semibold tracking-[1.5px] uppercase" style={{ color: GOLD }}>
              by VTEC Business Group
            </span>
          </span>
        </a>

        <details className="relative">
          <summary
            className="list-none inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] border text-white/85 text-xs font-semibold cursor-pointer select-none transition-colors"
            style={{ borderColor: "rgba(201,162,39,0.3)" }}
          >
            <Menu className="w-3.5 h-3.5" />
            Menu
          </summary>
          <nav
            aria-label="Site pages"
            className="absolute right-0 mt-2 w-56 rounded-xl border shadow-xl overflow-hidden"
            style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(201,162,39,0.2)" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-sm text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: BODY_FONT, textDecoration: "none" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

function MilikiPage() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: BLACK, minHeight: "100vh", fontFamily: BODY_FONT }} className="text-white w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <MilikiNav />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-[64px] lg:pt-[88px] pb-16 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 500px at 80% -10%, rgba(201,162,39,0.18), transparent 60%), radial-gradient(800px 400px at -10% 20%, rgba(201,162,39,0.10), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(201,162,39,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 500px 400px at 50% 15%, black 40%, transparent 80%)",
          }}
        />
        <Reveal>
          <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
            <div
              className="absolute inset-0 rounded-[26px] animate-pulse"
              style={{
                background: `conic-gradient(from 0deg, ${GOLD}, transparent 30%, transparent 70%, ${GOLD})`,
                opacity: 0.5,
                filter: "blur(8px)",
              }}
            />
            <img
              src="https://app.vtecgroup.co.ke/miliki-icon-512.png"
              alt="MILIKI App"
              className="relative h-28 w-28 rounded-2xl object-cover sm:h-32 sm:w-32"
              style={{
                boxShadow:
                  "0 0 60px rgba(201,162,39,0.35), 0 20px 40px -12px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            />
          </div>
          <div
            className="relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm"
            style={{ borderColor: "rgba(34,197,94,0.4)", color: "#4ade80", backgroundColor: "rgba(34,197,94,0.08)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Now
          </div>
          <h1
            className="relative mt-6 text-[clamp(2.25rem,8vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.01em]"
            style={{ fontFamily: HEADING_FONT }}
          >
            Stop Managing Money.
            <br />
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Start Owning It.
            </span>
          </h1>
          <p className="relative mx-auto mt-6 max-w-xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-white/70">
            MILIKI is Kenya's first 2-in-1 financial co-pilot. Download the native Android app below to access biometric security, M-Pesa sync, and live market integrations.
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <InstallButton />
          </div>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" style={{ color: GOLD }} /> Built &amp; operated by VTEC Business Group
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" style={{ color: GOLD }} /> Bank-grade encryption
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" style={{ color: GOLD }} /> Vetted investment partners only
            </span>
          </div>
        </Reveal>
      </section>

      {/* Old way vs MILIKI way */}
      <div className="mx-auto max-w-4xl h-px" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.25), transparent)' }} />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal className="mb-10 text-center">
          <SectionEyebrow>The Shift</SectionEyebrow>
          <h2 className="mt-3 text-[clamp(1.6rem,4.5vw,2.4rem)] font-extrabold leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: HEADING_FONT }}>
            Five Apps. One Habit. <span style={{ color: GOLD_LIGHT }}>Now Just One.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-[18px] border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
            style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.015)" }}
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <X className="h-3.5 w-3.5 text-white/40" />
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-white/40">The Old Way</div>
            </div>
            <ul className="space-y-3">
              {[
                "M-Pesa for spending, no visibility beyond the transaction",
                "A SACCO passbook nobody checks until year-end",
                "A separate MMF portal, logged into once a quarter",
                "Another app entirely for NSE shares",
                "A WhatsApp group for tips nobody can verify",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/55">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="relative overflow-hidden rounded-[18px] border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(201,162,39,0.15)]"
            style={{ borderColor: "rgba(201,162,39,0.35)", backgroundColor: "rgba(201,162,39,0.05)" }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ backgroundImage: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
            />
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(201,162,39,0.15)" }}
              >
                <Check className="h-3.5 w-3.5" style={{ color: GOLD_LIGHT }} />
              </span>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_LIGHT }}>
                The MILIKI Way
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "One dashboard for spending, saving, and investing",
                "Goals that auto-track themselves, every single day",
                "MMFs and NSE equities inside the same screen as your budget",
                "One net worth number you can trust at a glance",
                "Vetted partners, not group-chat rumors",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Q&A sections */}
      <section className="mx-auto max-w-4xl space-y-20 px-5 py-10">
        <QABlock num="01" icon={<Wallet className="h-6 w-6" />} eyebrow="01 — The Product" title="What Is MILIKI App?">
          <p>
            <strong style={{ color: GOLD_LIGHT }}>MILIKI</strong>, Swahili for <em>"to own,"</em> is VTEC Business
            Group's flagship digital product: a two-in-one financial co-pilot that fuses everyday budgeting with real
            investing inside a single, transparent dashboard.
          </p>
        </QABlock>

        <QABlock num="02" icon={<Layers className="h-6 w-6" />} eyebrow="02 — The Problem" title="What Problem Did We Identify?">
          <p>
            The average Kenyan's financial life is scattered across five different places: M-Pesa for spending, a
            SACCO passbook for savings, a separate portal for Money Market Funds, another app for NSE shares, and a
            WhatsApp group for "hot tips" nobody can verify.
          </p>
        </QABlock>

        <QABlock num="03" icon={<Target className="h-6 w-6" />} eyebrow="03 — The Solution" title="What Solution Are We Offering?">
          <p>
            One dashboard. One net worth number. One habit. Every shilling that enters MILIKI is either working for
            today, your budget, or working for tomorrow, your investments, visibly, in real time, in the same view.
          </p>
        </QABlock>

        <QABlock num="04" icon={<TrendingUp className="h-6 w-6" />} eyebrow="04 — How It Works" title="How Does It Deliver That Solution?">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-[18px] border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
                style={{ borderColor: "rgba(201,162,39,0.18)", backgroundColor: "rgba(255,255,255,0.015)" }}
              >
                <div className="mb-2.5 flex items-center gap-2.5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundImage: "linear-gradient(135deg, rgba(201,162,39,0.22), rgba(201,162,39,0.06))",
                      color: GOLD_LIGHT,
                      boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.25)",
                    }}
                  >
                    {f.icon}
                  </span>
                  <span className="text-sm font-semibold text-white">{f.title}</span>
                </div>
                <p className="text-[13.5px] leading-relaxed text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </QABlock>

        <QABlock num="05" icon={<Sparkles className="h-6 w-6" />} eyebrow="05 — The Impact" title="What Impact Does It Bring?">
          <p>
            MILIKI closes the gap that InvestorMind Academy opens. Education without a path to action produces
            knowledgeable spectators, not investors. MILIKI is that path, it lowers the barrier that once made the
            NSE and Money Market Funds feel reserved for the already-wealthy, and turns everyday Kenyans into
            legitimate, active market participants.
          </p>
        </QABlock>

        <QABlock num="06" icon={<Crown className="h-6 w-6" />} eyebrow="06 — The Verdict" title="What Makes MILIKI Indispensable?">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Verdict icon={<Crown className="h-4 w-4" />} title="There are spenders, and there are owners.">
              MILIKI doesn't ask which one you are. It quietly decides which one you become.
            </Verdict>
            <Verdict icon={<Target className="h-4 w-4" />} title="It isn't competing with your budgeting app or your broker.">
              It replaced the need for both, by refusing to be just one of them.
            </Verdict>
          </div>
        </QABlock>
      </section>

      {/* Who it's for */}
      <div className="mx-auto max-w-4xl h-px" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.25), transparent)' }} />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal className="mb-10 text-center">
          <SectionEyebrow>Built For You, Specifically</SectionEyebrow>
          <h2 className="mt-3 text-[clamp(1.6rem,4.5vw,2.4rem)] font-extrabold leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: HEADING_FONT }}>
            Who Is MILIKI <span style={{ color: GOLD_LIGHT }}>Really</span> For?
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PERSONAS.map((p) => (
            <div
              key={p.title}
              className="rounded-[18px] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
              style={{ borderColor: "rgba(201,162,39,0.2)", backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(201,162,39,0.22), rgba(201,162,39,0.06))",
                    color: GOLD_LIGHT,
                    boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.25)",
                  }}
                >
                  {p.icon}
                </div>
                <span className="font-semibold text-white">{p.title}</span>
              </div>
              <p className="text-sm text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <div className="mx-auto max-w-3xl h-px" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.25), transparent)' }} />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal className="mb-10 text-center">
          <SectionEyebrow>Before You Ask</SectionEyebrow>
          <h2 className="mt-3 text-[clamp(1.6rem,4.5vw,2.4rem)] font-extrabold leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: HEADING_FONT }}>
            Straight Answers.
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-[18px] border px-5 py-4 transition-all duration-300 open:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]"
              style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.015)" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2.5">
                <span className="flex items-start gap-2.5">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD }} />
                  <span className="font-semibold text-white">{f.q}</span>
                </span>
                <span
                  className="shrink-0 text-lg leading-none transition-transform duration-300 group-open:rotate-45"
                  style={{ color: GOLD }}
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pl-6 text-sm leading-relaxed text-white/65">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-5 pt-[64px] lg:pt-[88px] pb-20 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(201,162,39,0.14) 0%, transparent 60%)" }}
        />
        <Reveal>
          <h2
            className="relative text-[clamp(1.8rem,5vw,2.8rem)] font-extrabold leading-[1.2] tracking-[-0.01em]"
            style={{ fontFamily: HEADING_FONT }}
          >
            Your Money Is Already Moving.
            <br />
            <span style={{ color: GOLD_LIGHT }}>Decide Where It's Going.</span>
          </h2>
          <div className="relative mt-8">
            <InstallButton />
          </div>
          <p className="relative mt-4 text-xs text-white/40">app.vtecgroup.co.ke · A VTEC Business Group product</p>
        </Reveal>
      </section>

      <InstallButton fixed visible={scrolledPastHero} />
    </div>
  );
}

export default MilikiPage;