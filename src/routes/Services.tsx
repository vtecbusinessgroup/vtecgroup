import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, ShoppingBag, Check } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const PAGE_URL = "https://vtecgroup.co.ke/services";
const OG_IMAGE = "https://www.vtecgroup.co.ke/og-image.png";

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
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Our Services | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Three strategically positioned services, each serving a distinct market need, unified under one multi-service brand.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Services | VTEC Business Group" },
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
      "@type": "Service",
      serviceType: "Financial Literacy Education",
      name: "InvestorMind Academy",
      provider: { "@id": "https://vtecgroup.co.ke/#organization" },
      areaServed: "Kenya",
      description:
        "Cohort-based courses covering NSE stock market fundamentals, Money Market Funds, and SACCOs.",
    },
    {
      "@type": "Service",
      serviceType: "Business Consultancy",
      name: "VTEC Consultancy Services",
      provider: { "@id": "https://vtecgroup.co.ke/#organization" },
      areaServed: "Kenya",
      description:
        "Financial consulting, brand consulting, content marketing, and business strategy for Kenyan SMEs and institutions.",
    },
    {
      "@type": "Service",
      serviceType: "Retail",
      name: "VTEC Retail Services",
      provider: { "@id": "https://vtecgroup.co.ke/#organization" },
      areaServed: "Kenya",
      description: "Premium apparel and lifestyle commerce for Kenya's urban fashion market.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vtecgroup.co.ke/" },
        { "@type": "ListItem", position: 2, name: "Our Services", item: PAGE_URL },
      ],
    },
  ],
};

const services = [
  {
    icon: GraduationCap,
    tag: "Education",
    color: "bg-gradient-to-br from-[#163272] to-[#0D2149]",
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
    color: "bg-gradient-to-br from-[#1f8c3b] to-[#22c55e]",
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
              What We Do
            </span>
            <h1 className="font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-[clamp(36px,6vw,64px)] font-extrabold leading-[1.2] tracking-[-0.01em]">
              Our Services
            </h1>
            <p className="text-white/60 mt-4 text-lg max-w-2xl">
              Three strategically positioned services, each serving a distinct
              market need — yet all unified under the VTEC Business Group
              standard of excellence.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 md:px-8 pb-[64px] lg:pb-[88px]">

        <div className="space-y-8">
          {services.map((s) => (
            <div
              key={s.name}
              className="rounded-[18px] overflow-hidden border border-white/[0.08] bg-[#0f2444]/60 hover:border-[#22c55e]/25 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300"
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
                <h2 className="font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-2xl font-bold">{s.name}</h2>
              </div>
              <div className="p-7">
                <p className="text-white/70 leading-relaxed mb-5">
                  {s.desc}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <Check className="w-4 h-4 text-[#22c55e] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={s.cta.href}
                  target={s.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.cta.href.startsWith("http") ? "noopener" : undefined}
                  className="inline-block px-6 py-3 rounded-[10px] border-2 border-white text-white font-bold hover:bg-white hover:text-[#0a1628] hover:-translate-y-0.5 transition-all"
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
            className="inline-block px-9 py-4 rounded-[10px] bg-[#22c55e] text-[#06190f] hover:bg-[#16a34a] hover:-translate-y-0.5 transition-all font-bold"
          >
            See Our Full Ecosystem of Solutions &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
