import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, ShoppingBag, Check } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Our Services | VTEC Business Group Kenya" },
      {
        name: "description",
        content:
          "Explore VTEC Business Group's core services: InvestorMind Academy financial literacy training, VTEC Consultancy strategic advisory, and VTEC Retail Services — built for Kenya's entrepreneurs, SMEs, and everyday investors.",
      },
      {
        name: "keywords",
        content:
          "VTEC services, financial literacy Kenya, investment education Nairobi, business consultancy Kenya, brand consulting SME, VTEC Retail Services, NSE investment training",
      },
      { property: "og:title", content: "Our Services | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Three strategically positioned services, each serving a distinct market need, unified under one multi-service brand.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const services = [
  {
    icon: GraduationCap,
    tag: "Education",
    color: "bg-[#0D2149]",
    name: "InvestorMind Academy",
    desc: "Kenya's dedicated financial literacy and investment education platform. We bridge the knowledge gap between everyday Kenyans and the wealth-building tools available to them — covering the NSE, Money Market Funds, SACCOs, and long-term investment strategy.",
    features: [
      "Beginner to advanced investing cohorts",
      "NSE stock market fundamentals",
      "Money Market Fund and SACCO literacy",
      "Practical, cohort-based learning",
    ],
    cta: { label: "Explore Academy", href: "https://wa.me/254705494594" },
  },
  {
    icon: Briefcase,
    tag: "Consultancy",
    color: "bg-gradient-to-br from-[#1f8c3b] to-[#27ae60]",
    name: "VTEC Consultancy Services",
    desc: "Strategic professional services tailored for Kenya's business landscape. We guide entrepreneurs, SMEs, and brands to make smarter decisions and build stronger market presence.",
    features: [
      "Financial consulting & advisory",
      "Brand consulting & positioning",
      "Content marketing strategy",
      "Business strategy & growth planning",
    ],
    cta: { label: "Request Consultation", href: "#contact" },
  },
  {
    icon: ShoppingBag,
    tag: "Retail",
    color: "bg-gradient-to-br from-[#c9a227] to-[#d4af37]",
    name: "VTEC Retail Services",
    desc: "A premium clothing and apparel retail venture currently in its pre-launch phase, designed to bring quality, style, and accessibility to Kenya's urban fashion market.",
    features: [
      "Urban fashion & apparel",
      "Kenyan market focus",
      "Quality-first sourcing",
      "Launching 2025/26",
    ],
    cta: { label: "Notify Me at Launch", href: "#contact" },
    comingSoon: true,
  },
];

function ServicesPage() {
  return (
    <>
      <PageHeader />
      <main className="min-h-screen bg-[#f4f6f9] text-[#0D2149] font-sans">
      <PageHeader />
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="inline-block text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase mb-3">
            What We Do
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">
            Our Services
          </h1>
          <p className="text-[#0D2149]/60 mt-4 text-lg max-w-2xl mx-auto">
            Three strategically positioned services, each serving a distinct
            market need — yet all unified under the VTEC Business Group
            standard of excellence.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-white"
            >
              <div className={`${s.color} px-7 py-8 text-white relative`}>
                {s.comingSoon && (
                  <span className="absolute top-4 right-4 text-[11px] font-semibold uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full">
                    Coming 2025/26
                  </span>
                )}
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide bg-white/15 px-3 py-1 rounded-full mb-4">
                  <s.icon className="w-3.5 h-3.5" /> {s.tag}
                </span>
                <h2 className="font-serif text-2xl font-bold">{s.name}</h2>
              </div>
              <div className="p-7">
                <p className="text-[#0D2149]/70 leading-relaxed mb-5">
                  {s.desc}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#0D2149]/80">
                      <Check className="w-4 h-4 text-[#27ae60] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={s.cta.href}
                  target={s.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.cta.href.startsWith("http") ? "noopener" : undefined}
                  className="inline-block px-6 py-3 rounded-full border-2 border-[#27ae60] text-[#27ae60] font-semibold hover:bg-[#27ae60] hover:text-white transition"
                >
                  {s.cta.label} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/solutions"
            className="inline-block px-9 py-4 rounded-full bg-[#0D2149] text-white hover:bg-[#163272] transition font-semibold"
          >
            See Our Full Ecosystem of Solutions &rarr;
          </a>
        </div>
      </div>
      </main>
    </>
  );
}
