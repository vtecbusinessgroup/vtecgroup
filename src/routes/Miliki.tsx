import { useEffect, useState, type ReactNode } from "react";
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
  X,
  Check,
  Lock,
  Award,
  GraduationCap,
  Briefcase,
  Rocket,
  Users,
  HelpCircle,
} from "lucide-react";

const PAGE_URL = "https://www.vtecgroup.co.ke/miliki";
const OG_IMAGE = "https://www.vtecgroup.co.ke/og-image.png";

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
const HEADING_FONT = "'DM Serif Display', 'Playfair Display', Georgia, serif";
const BODY_FONT = "'Outfit', sans-serif";

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
    title: "Installable, Not Downloadable",
    desc: "Built mobile-first as a PWA, no App Store delay, no storage-hungry install, works instantly in-browser.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "MILIKI App",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web, PWA",
      url: "https://miliki.vtecgroup.co.ke",
      description:
        "A 2-in-1 financial co-pilot that fuses everyday budgeting with real investing in NSE equities, Money Market Funds, and bonds inside one dashboard.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KES",
        description: "Free Starter tier, with Premium and Pro tiers available.",
      },
      publisher: { "@id": "https://www.vtecgroup.co.ke/#organization" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vtecgroup.co.ke/" },
        { "@type": "ListItem", position: 2, name: "MILIKI App", item: PAGE_URL },
      ],
    },
  ],
};

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD, fontFamily: BODY_FONT }}>
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
    <div className="relative border-l-2 pl-6" style={{ borderColor: "rgba(201,162,39,0.35)" }}>
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
      <h2 className="relative mb-4 text-[clamp(1.5rem,4vw,2.2rem)] font-bold leading-tight" style={{ fontFamily: HEADING_FONT }}>
        {title}
      </h2>
      <div className="relative space-y-3 text-[15px] leading-relaxed text-white/75" style={{ fontFamily: BODY_FONT }}>
        {children}
      </div>
    </div>
  );
}

function Verdict({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div
      className="rounded-xl border p-5 transition-colors hover:border-[rgba(201,162,39,0.45)]"
      style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(201,162,39,0.2)" }}
    >
      <div className="mb-2 flex items-center gap-2.5">
        <span style={{ color: GOLD }}>{icon}</span>
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
  return (
    <a
      href="https://miliki.vtecgroup.co.ke"
      target="_blank"
      rel="noopener noreferrer"
      className={
        fixed
          ? `fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-2xl transition-all duration-300 hover:scale-105 ${
              visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            }`
          : "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-transform hover:scale-105"
      }
      style={{
        backgroundImage: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
        color: BLACK,
        fontFamily: BODY_FONT,
        boxShadow: fixed ? "0 10px 30px rgba(201,162,39,0.45)" : undefined,
      }}
    >
      <Download className="h-4 w-4" /> {fixed ? "Install App" : "Open MILIKI App"}
    </a>
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
    <div style={{ backgroundColor: BLACK, minHeight: "100vh", fontFamily: BODY_FONT }} className="text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
      <section className="relative overflow-hidden px-5 py-20 text-center sm:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at top, rgba(201,162,39,0.18) 0%, transparent 60%)" }}
        />
        <img
          src="/miliki-app-logo.jpg"
          alt="MILIKI App"
          className="relative mx-auto mb-8 h-28 w-28 rounded-2xl object-cover shadow-2xl sm:h-32 sm:w-32"
          style={{ boxShadow: "0 0 60px rgba(201,162,39,0.35)" }}
        />
        <div
          className="relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{ borderColor: "rgba(34,197,94,0.4)", color: "#4ade80", backgroundColor: "rgba(34,197,94,0.08)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Now
        </div>
        <h1
          className="relative mt-6 text-[clamp(2.25rem,8vw,4rem)] font-black leading-[1.1]"
          style={{ fontFamily: HEADING_FONT }}
        >
          Stop Managing Money.
          <br />
          <span style={{ color: GOLD_LIGHT }}>Start Owning It.</span>
        </h1>
        <p className="relative mx-auto mt-6 max-w-xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-white/70">
          MILIKI is Kenya's first 2-in-1 financial co-pilot, one app that turns your everyday budget into your bridge
          to the Nairobi Securities Exchange, Money Market Funds, and beyond.
        </p>
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <InstallButton />
        </div>

        {/* Trust badge row */}
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
      </section>

      {/* Old way vs MILIKI way */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="mb-10 text-center">
          <SectionEyebrow>The Shift</SectionEyebrow>
          <h2 className="mt-3 text-[clamp(1.6rem,4.5vw,2.4rem)] font-bold" style={{ fontFamily: HEADING_FONT }}>
            Five Apps. One Habit. <span style={{ color: GOLD_LIGHT }}>Now Just One.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.015)" }}>
            <div className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">The Old Way</div>
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
            className="rounded-2xl border p-6"
            style={{ borderColor: "rgba(201,162,39,0.35)", backgroundColor: "rgba(201,162,39,0.05)" }}
          >
            <div className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: GOLD_LIGHT }}>
              The MILIKI Way
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
          <p>
            Where most apps force you to choose between tracking your shillings and growing them, MILIKI does both, at
            the same time, in the same place.
          </p>
        </QABlock>

        <QABlock num="02" icon={<Layers className="h-6 w-6" />} eyebrow="02 — The Problem" title="What Problem Did We Identify?">
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
                className="rounded-xl border p-4"
                style={{ borderColor: "rgba(201,162,39,0.18)", backgroundColor: "rgba(255,255,255,0.015)" }}
              >
                <div className="mb-2 flex items-center gap-2.5">
                  <span style={{ color: GOLD }}>{f.icon}</span>
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
            <Verdict icon={<TrendingUp className="h-4 w-4" />} title="Every idle shilling is a small, silent loss.">
              Every month your money sits uninvested is a month your future self quietly pays for. MILIKI exists to
              close that window.
            </Verdict>
            <Verdict icon={<Sparkles className="h-4 w-4" />} title="The best financial tools don't demand your attention.">
              They work in the background so that ownership becomes your default, not your daily discipline.
            </Verdict>
          </div>
        </QABlock>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="mb-10 text-center">
          <SectionEyebrow>Built For You, Specifically</SectionEyebrow>
          <h2 className="mt-3 text-[clamp(1.6rem,4.5vw,2.4rem)] font-bold" style={{ fontFamily: HEADING_FONT }}>
            Who Is MILIKI <span style={{ color: GOLD_LIGHT }}>Really</span> For?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PERSONAS.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border p-5"
              style={{ borderColor: "rgba(201,162,39,0.2)", backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(201,162,39,0.12)", color: GOLD_LIGHT }}
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
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="mb-10 text-center">
          <SectionEyebrow>Before You Ask</SectionEyebrow>
          <h2 className="mt-3 text-[clamp(1.6rem,4.5vw,2.4rem)] font-bold" style={{ fontFamily: HEADING_FONT }}>
            Straight Answers.
          </h2>
        </div>
        <div className="space-y-5">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-xl border p-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="mb-1.5 flex items-start gap-2.5">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD }} />
                <span className="font-semibold text-white">{f.q}</span>
              </div>
              <p className="pl-6 text-sm leading-relaxed text-white/65">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-5 py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(201,162,39,0.14) 0%, transparent 60%)" }}
        />
        <h2
          className="relative text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight"
          style={{ fontFamily: HEADING_FONT }}
        >
          Your Money Is Already Moving.
          <br />
          <span style={{ color: GOLD_LIGHT }}>Decide Where It's Going.</span>
        </h2>
        <div className="relative mt-8">
          <InstallButton />
        </div>
        <p className="relative mt-4 text-xs text-white/40">miliki.vtecgroup.co.ke · A VTEC Business Group product</p>
      </section>

      {/* Footer nav — keeps MILIKI connected to the rest of the site for navigation and crawl discovery */}
      <footer className="border-t px-5 py-8 text-center" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about-us" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link>
          <Link to="/leadership" className="hover:text-white transition-colors">Leadership</Link>
        </nav>
      </footer>

      <InstallButton fixed visible={scrolledPastHero} />
    </div>
  );
}

export default MilikiPage;