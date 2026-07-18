import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  GraduationCap,
  Briefcase,
  Wallet,
  ChevronDown,
  Check,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const PAGE_URL = "https://vtecgroup.co.ke/solutions";
const OG_IMAGE = "https://www.vtecgroup.co.ke/og-image.png";

export const Route = createFileRoute("/solutions")({
  component: SolutionsPage,
  head: () => ({
    meta: [
      { title: "Solutions | VTEC Business Group's Ecosystem for Kenyans" },
      {
        name: "description",
        content:
          "One group, four pillars. Discover VTEC Business Group's connected ecosystem of solutions — from financial literacy and business consultancy to the MILIKI wealth app — engineered to educate, empower, and equip the modern Kenyan.",
      },
      {
        name: "keywords",
        content:
          "VTEC solutions, MILIKI App Kenya, wealth management Kenya, financial ecosystem Kenya, business growth solutions Nairobi, personal finance app Kenya, VTEC ecosystem, asset ownership Kenya, NSE investing app, financial literacy solution Kenya",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Solutions | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "A connected ecosystem of brands and digital tools, each engineered to educate, empower, and equip the modern Kenyan investor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Solutions | VTEC Business Group" },
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
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Solutions | VTEC Business Group's Ecosystem for Kenyans",
      description:
        "A connected ecosystem of brands and digital tools, each engineered to educate, empower, and equip the modern Kenyan investor.",
    },
    {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "VTEC Business Group", url: "https://vtecgroup.co.ke/about-us" },
        { "@type": "ListItem", position: 2, name: "InvestorMind Academy", url: "https://vtecgroup.co.ke/services" },
        { "@type": "ListItem", position: 3, name: "VTEC Consultancy Services", url: "https://vtecgroup.co.ke/services" },
        { "@type": "ListItem", position: 4, name: "MILIKI App", url: "https://miliki.vtecgroup.co.ke" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vtecgroup.co.ke/" },
        { "@type": "ListItem", position: 2, name: "Solutions", item: PAGE_URL },
      ],
    },
  ],
};

type Solution = {
  icon: typeof Building2;
  tag: string;
  name: string;
  forWho: string;
  desc: string;
  details: string[];
  href: string;
  cta: string;
  external?: boolean;
};

const solutions: Solution[] = [
  {
    icon: Building2,
    tag: "Parent Group",
    name: "VTEC Business Group",
    forWho: "For the ecosystem itself",
    desc: "The visionary multi-service brand uniting education, consultancy, retail, and digital innovation under one Kenyan-grown umbrella.",
    details: [
      "Founded October 2025 in Nairobi, Kenya, with a structured ten-year roadmap toward 2035.",
      "Four business arms — InvestorMind Academy, VTEC Consultancy Services, VTEC Retail Services, and MILIKI App — share one brand standard and one long-term vision.",
      "Governed by three co-founders bringing complementary strategy, operations, and growth expertise together.",
    ],
    href: "/about-us",
    cta: "Read the full story",
  },
  {
    icon: GraduationCap,
    tag: "Education Arm",
    name: "InvestorMind Academy",
    forWho: "For anyone who wants to understand money",
    desc: "The educational backbone of VTEC — building financial literacy, investor discipline, and the mindset for real wealth creation.",
    details: [
      "Cohort-based courses covering NSE stock market fundamentals, Money Market Funds, and SACCOs.",
      "Built specifically for everyday Kenyans, not just finance professionals — practical, jargon-free lessons.",
      "Graduates leave with a personal investment plan, not just theory.",
    ],
    href: "/services",
    cta: "See course details",
  },
  {
    icon: Briefcase,
    tag: "Advisory Arm",
    name: "VTEC Consultancy Services",
    forWho: "For founders, SMEs, and institutions",
    desc: "Strategic advisory bridging vision and execution — with sharp, on-the-ground expertise for Kenya's business landscape.",
    details: [
      "Services span financial consulting, brand consulting, content marketing, and business strategy.",
      "Engagements are built around measurable outcomes — client inquiries, revenue growth, and brand clarity.",
      "Works with businesses at every stage, from early SMEs to established institutions.",
    ],
    href: "/services",
    cta: "See what's included",
  },
  {
    icon: Wallet,
    tag: "Live Now",
    name: "MILIKI App",
    forWho: "For anyone ready to own assets",
    desc: "The flagship digital engine of VTEC — live and active, helping users turn financial knowledge into tangible asset ownership.",
    details: [
      "Brings NSE equities, Money Market Funds, and bonds under one transparent dashboard.",
      "Drawn from the Swahili word miliki, meaning \"to own\" — built to make ownership feel personal, not abstract.",
      "Currently live and onboarding new users in Kenya.",
    ],
    href: "https://miliki.vtecgroup.co.ke",
    cta: "Open MILIKI App",
    external: true,
  },
];

function SolutionCard({ s }: { s: Solution }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0f2444]/60 border border-white/[0.08] hover:border-[#22c55e]/25 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] rounded-[18px] p-7 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-11 h-11 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center">
          <s.icon className="w-5 h-5 text-[#22c55e]" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#d4af37]">
          {s.tag}
        </span>
      </div>
      <h2 className="font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-xl font-bold mb-1">{s.name}</h2>
      <div className="text-white/40 text-xs mb-3">{s.forWho}</div>
      <p className="text-white/65 text-sm leading-relaxed mb-4">{s.desc}</p>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[#22c55e] font-semibold text-sm mb-1"
        aria-expanded={open}
      >
        Read more
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ display: "grid" }}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2.5 mb-5 border-t border-white/[0.08] pt-4">
            {s.details.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/70 leading-relaxed">
                <Check className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                {d}
              </li>
            ))}
          </ul>
          <a
            href={s.href}
            target={s.external ? "_blank" : undefined}
            rel={s.external ? "noopener" : undefined}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] bg-[#22c55e] hover:bg-[#16a34a] hover:-translate-y-0.5 transition-all text-sm font-bold text-[#06190f]"
          >
            {s.cta} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

function SolutionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D2149] to-[#0a1628] text-white font-['Outfit',system-ui,sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader />
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 500px at 80% -10%, rgba(34,197,94,0.18), transparent 60%), radial-gradient(800px 400px at -10% 20%, rgba(201,162,39,0.12), transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-5 md:px-8 pt-[64px] lg:pt-[88px]">
          <Reveal className="mb-14">
            <span className="inline-block text-[#22c55e] text-xs font-bold tracking-[0.18em] uppercase border-l-[3px] border-[#22c55e] pl-[14px] mb-4">
              The Ecosystem
            </span>
            <h1 className="font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-[clamp(36px,6vw,64px)] font-extrabold leading-[1.2] tracking-[-0.01em]">
              One Group. Four Pillars.
            </h1>
            <p className="text-white/60 mt-4 text-lg max-w-2xl">
              A connected ecosystem of brands and digital tools — each
              engineered to educate, empower, and equip the modern Kenyan
              investor. Tap "Read more" on any solution for the full picture.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 md:px-8 pb-[64px] lg:pb-[88px]">

        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <SolutionCard key={s.name} s={s} />
          ))}
        </div>

        <div className="mt-16 bg-[#0f2444]/60 border border-white/[0.08] rounded-[18px] p-8 text-center">
          <h2 className="font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-2xl font-bold mb-3">
            Not sure which solution fits you?
          </h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Take our free VTEC Intelligence diagnostic and get matched to the
            right service or product in under two minutes.
          </p>
          <a
            href="/business-diagnostic"
            className="inline-block px-9 py-4 rounded-[10px] bg-[#22c55e] text-[#06190f] hover:bg-[#16a34a] hover:-translate-y-0.5 transition-all font-bold"
          >
            Get Your Free Diagnosis &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
