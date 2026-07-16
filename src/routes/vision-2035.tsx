import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

const PAGE_URL = "https://www.vtecgroup.co.ke/vision-2035";
const OG_IMAGE = "https://www.vtecgroup.co.ke/og-image.png";

export const Route = createFileRoute("/vision-2035")({
  component: Vision2035Page,
  head: () => ({
    meta: [
      { title: "Vision 2035 | VTEC Business Group's 10-Year Roadmap" },
      {
        name: "description",
        content:
          "Explore VTEC Business Group's Vision 2035 — a clear 10-year roadmap to build a recognised, impactful, and profitable business empire across Kenya and East Africa.",
      },
      {
        name: "keywords",
        content:
          "VTEC Vision 2035, VTEC Business Group roadmap, East Africa business empire, Kenya business expansion plan, VTEC 10 year strategy",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Vision 2035 | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Every great empire begins with a clear destination. See how VTEC is building purposefully toward 2035.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vision 2035 | VTEC Business Group" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Vision 2035 | VTEC Business Group's 10-Year Roadmap",
      description:
        "A clear 10-year roadmap to build a recognised, impactful, and profitable business empire across Kenya and East Africa.",
      about: { "@id": "https://www.vtecgroup.co.ke/#organization" },
    },
    {
      "@type": "ItemList",
      name: "VTEC Business Group Roadmap to 2035",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "2025 — Founded" },
        { "@type": "ListItem", position: 2, name: "2026 — Digital Launch" },
        { "@type": "ListItem", position: 3, name: "2027 — Retail Launch" },
        { "@type": "ListItem", position: 4, name: "2030 — Regional Expansion" },
        { "@type": "ListItem", position: 5, name: "2035 — Empire Status" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vtecgroup.co.ke/" },
        { "@type": "ListItem", position: 2, name: "Vision 2035", item: PAGE_URL },
      ],
    },
  ],
};

const milestones = [
  {
    year: "2025",
    title: "Founded",
    done: true,
    progress: 100,
    detail:
      "VTEC Business Group was officially founded in October 2025 in Nairobi, Kenya, with InvestorMind Academy and VTEC Consultancy Services established as the group's first operating arms.",
  },
  {
    year: "2026",
    title: "Digital Launch",
    done: false,
    progress: 65,
    detail:
      "MILIKI App, VTEC's flagship digital ownership and wealth management platform, moves from live beta to full public launch, putting NSE equities, Money Market Funds, and bonds under one dashboard for everyday Kenyans.",
  },
  {
    year: "2027",
    title: "Retail Launch",
    done: false,
    progress: 35,
    detail:
      "VTEC Retail Services opens to the Kenyan market, bringing curated apparel and lifestyle commerce under the same disciplined, multi-service brand standard as the rest of the group.",
  },
  {
    year: "2030",
    title: "Regional Expansion",
    done: false,
    progress: 12,
    detail:
      "VTEC begins extending its education, consultancy, and fintech offerings beyond Kenya into wider East African markets, backed by proven traction at home.",
  },
  {
    year: "2035",
    title: "Empire Status",
    done: false,
    progress: 3,
    detail:
      "VTEC Business Group stands as a recognised, integrated business and financial empowerment group — the destination this entire roadmap was built to reach.",
  },
];

function Vision2035Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D2149] to-[#0a1628] text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHeader />
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="inline-block text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase mb-3">
            Chapter 05
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">
            Our Vision: The <span className="text-[#27ae60]">2035 Empire</span>
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
            Every great empire begins with a clear destination. VTEC is
            building purposefully toward 2035, not in a hurry, but with
            intention.
          </p>
        </div>

        <div className="space-y-5">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-6 md:p-7"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-[#d4af37]">
                    {m.year}
                  </span>
                  <span className="text-lg font-semibold">{m.title}</span>
                </div>
                {m.done && (
                  <CheckCircle2 className="w-6 h-6 text-[#27ae60] shrink-0" />
                )}
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-4">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#27ae60] to-[#d4af37]"
                  style={{ width: `${m.progress}%` }}
                />
              </div>
              <p className="text-white/70 text-[15px] leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-5 text-center">
          <div className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-6">
            <div className="font-serif text-3xl font-bold text-[#27ae60]">4+</div>
            <div className="text-white/60 text-sm mt-1">Business Arms</div>
          </div>
          <div className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-6">
            <div className="font-serif text-3xl font-bold text-[#27ae60]">#1</div>
            <div className="text-white/60 text-sm mt-1">Holding Vision</div>
          </div>
          <div className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-6">
            <div className="font-serif text-3xl font-bold text-[#27ae60]">2035</div>
            <div className="text-white/60 text-sm mt-1">Empire Target</div>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="/about-us"
            className="inline-block px-9 py-4 rounded-full border-2 border-[#27ae60] hover:bg-[#27ae60]/10 transition font-semibold"
          >
            Read Our Full Story &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
