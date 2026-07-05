import { createFileRoute } from "@tanstack/react-router";
import { Building2, GraduationCap, Briefcase, Wallet } from "lucide-react";

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
          "VTEC solutions, MILIKI App, wealth management Kenya, financial ecosystem Kenya, business growth solutions Nairobi, personal finance app Kenya, VTEC ecosystem",
      },
      { property: "og:title", content: "Solutions | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "A connected ecosystem of brands and digital tools, each engineered to educate, empower, and equip the modern Kenyan investor.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const solutions = [
  {
    icon: Building2,
    tag: "Parent Group",
    name: "VTEC Business Group",
    forWho: "For the ecosystem itself",
    desc: "The visionary multi-service brand uniting education, consultancy, retail, and digital innovation under one Kenyan-grown umbrella.",
    href: "/about-us",
    cta: "Read more",
  },
  {
    icon: GraduationCap,
    tag: "Education Arm",
    name: "InvestorMind Academy",
    forWho: "For anyone who wants to understand money",
    desc: "The educational backbone of VTEC — building financial literacy, investor discipline, and the mindset for real wealth creation.",
    href: "/services",
    cta: "Read more",
  },
  {
    icon: Briefcase,
    tag: "Advisory Arm",
    name: "VTEC Consultancy Services",
    forWho: "For founders, SMEs, and institutions",
    desc: "Strategic advisory bridging vision and execution — with sharp, on-the-ground expertise for Kenya's business landscape.",
    href: "/services",
    cta: "Read more",
  },
  {
    icon: Wallet,
    tag: "Live Now",
    name: "MILIKI App",
    forWho: "For anyone ready to own assets",
    desc: "The flagship digital engine of VTEC — live and active, helping users turn financial knowledge into tangible asset ownership.",
    href: "https://miliki.vtecgroup.co.ke",
    cta: "Open MILIKI App",
    external: true,
  },
];

function SolutionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D2149] to-[#0a1628] text-white font-sans">
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
            investor. Tap any solution to learn more.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener" : undefined}
              className="block bg-[#0f2444]/60 border border-white/10 hover:border-[#27ae60]/50 rounded-2xl p-7 transition group"
            >
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
              <p className="text-white/65 text-sm leading-relaxed mb-5">
                {s.desc}
              </p>
              <span className="text-[#27ae60] font-semibold text-sm group-hover:translate-x-1 inline-block transition-transform">
                {s.cta} &rarr;
              </span>
            </a>
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
