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

const PAGE_URL = "https://www.vtecgroup.co.ke/solutions";
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
    links: [{ rel: "canonical", href: PAGE_URL }],
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
        { "@type": "ListItem", position: 1, name: "VTEC Business Group", url: "https://www.vtecgroup.co.ke/about-us" },
        { "@type": "ListItem", position: 2, name: "InvestorMind Academy", url: "https://www.vtecgroup.co.ke/services" },
        { "@type": "ListItem", position: 3, name: "VTEC Consultancy Services", url: "https://www.vtecgroup.co.ke/services" },
        { "@type": "ListItem", position: 4, name: "MILIKI App", url: "https://miliki.vtecgroup.co.ke" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vtecgroup.co.ke/" },
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
    <div className="bg-[#0f2444]/60 border border-white/10 hover:border-[#27ae60]/40 rounded-2xl p-7 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-11 h-11 rounded-xl bg-[#27ae60]/15 border border-[#27ae60]/30 flex items-center justify-center">
          <s.icon className="w-5 h-5 text-[#27ae60]" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#d4af37]">
          {s.tag}
        </span>
      </div>
      <h2 className="font-serif text-xl font-bold mb-1">{s.name}</h2>
      <div className="text-white/40 text-xs mb-3">{s.forWho}</div>
      <p className="text-white/65 text-sm leading-relaxed mb-4">{s.desc}</p>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[#27ae60] font-semibold text-sm mb-1"
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
          <ul className="space-y-2.5 mb-5 border-t border-white/10 pt-4">
            {s.details.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/70 leading-relaxed">
                <Check className="w-4 h-4 text-[#27ae60] shrink-0 mt-0.5" />
                {d}
              </li>
            ))}
          </ul>
          <a
            href={s.href}
            target={s.external ? "_blank" : undefined}
            rel={s.external ? "noopener" : undefined}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#27ae60] hover:bg-[#2ecc71] transition text-sm font-semibold text-white"
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
    <main className="min-h-screen bg-gradient-to-b from-[#0D2149] to-[#0a1628] text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader />
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="inline-block text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase mb-3">
            The Ecosystem
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">
            One Group. Four Pillars.
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            A connected ecosystem of brands and digital tools — each
            engineered to educate, empower, and equip the modern Kenyan
            investor. Tap "Read more" on any solution for the full picture.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <SolutionCard key={s.name} s={s} />
          ))}
        </div>

        <div className="mt-16 bg-[#0f2444]/60 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">
            Not sure which solution fits you?
          </h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Take our free VTEC Intelligence diagnostic and get matched to the
            right service or product in under two minutes.
          </p>
          <a
            href="/business-diagnostic"
            className="inline-block px-9 py-4 rounded-full bg-[#27ae60] hover:bg-[#2ecc71] transition font-semibold"
          >
            Get Your Free Diagnosis &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
