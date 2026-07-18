import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const PAGE_URL = "https://vtecgroup.co.ke/leadership";
const OG_IMAGE = "https://www.vtecgroup.co.ke/og-image.png";

export const Route = createFileRoute("/leadership")({
  component: LeadershipPage,
  head: () => ({
    meta: [
      {
        title: "Leadership Team | VTEC Business Group Kenya",
      },
      {
        name: "description",
        content:
          "Meet the leadership team behind VTEC Business Group: Kevin Inyangala, Allan Andati, and Chrisantus Khaemba, plus strategic business partners Pride Andaye and Joel Odongo, driving VTEC's 2035 empire vision from Nairobi, Kenya.",
      },
      {
        name: "keywords",
        content:
          "VTEC Business Group leadership, Kevin Inyangala CEO, Allan Andati COO, Chrisantus Khaemba, VTEC founders, Nairobi business leaders, Kenya business group leadership team",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Leadership Team | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Built by visionaries, led by purpose. Meet the co-founders and business partners driving VTEC's 10-year roadmap.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Leadership Team | VTEC Business Group" },
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
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Leadership Team | VTEC Business Group Kenya",
      description:
        "Meet the leadership team behind VTEC Business Group and the strategic partners driving its 2035 empire vision.",
    },
    {
      "@type": "Person",
      name: "Kevin Inyangala",
      jobTitle: "Group CEO & Co-Founder",
      worksFor: { "@id": "https://vtecgroup.co.ke/#organization" },
      email: "kevin@vtecgroup.co.ke",
      telephone: "+254748626367",
    },
    {
      "@type": "Person",
      name: "Allan Andati",
      jobTitle: "Chief Operation Officer & Co-Founder",
      worksFor: { "@id": "https://vtecgroup.co.ke/#organization" },
      email: "andati@vtecgroup.co.ke",
      telephone: "+254728004765",
    },
    {
      "@type": "Person",
      name: "Chrisantus Khaemba",
      jobTitle: "Chief Growth Officer & Co-Founder",
      worksFor: { "@id": "https://vtecgroup.co.ke/#organization" },
      email: "khaemba@vtecgroup.co.ke",
      telephone: "+254742264472",
    },
    {
      "@type": "Organization",
      "@id": "https://vtecgroup.co.ke/#organization",
      name: "VTEC Business Group",
      url: "https://vtecgroup.co.ke",
      founder: [
        { "@type": "Person", name: "Kevin Inyangala" },
        { "@type": "Person", name: "Allan Andati" },
        { "@type": "Person", name: "Chrisantus Khaemba" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vtecgroup.co.ke/" },
        { "@type": "ListItem", position: 2, name: "Leadership", item: PAGE_URL },
      ],
    },
  ],
};

type Leader = {
  name: string;
  role: string;
  photo: string;
  borderColor: string;
  glow?: string;
  bio: string;
  sections: { heading: string; paragraphs: string[] }[];
  phone?: string;
  email?: string;
};

const leaders: Leader[] = [
  {
    name: "Kevin Inyangala",
    role: "Group CEO & Co-Founder",
    photo: "/kevin-inyangala.jpg",
    borderColor: "border-[#22c55e]/60",
    bio: "Kevin is the visionary architect of VTEC Business Group. He steers the overarching strategy and 10 year roadmap, drawing on deep expertise in media, communication, and market compounding.",
    sections: [
      {
        heading: "Achievements",
        paragraphs: [
          "Kevin successfully architected the foundational strategy that transformed VTEC Business Group from a concept into a structured, multi vertical enterprise.",
          "Under his leadership, VTEC established its brand identity and secured its initial market foothold.",
          "He also built a cohesive leadership team capable of executing a long term vision. His expertise in media and communication has enabled VTEC to craft a compelling narrative that resonates with clients, partners, and stakeholders across key markets.",
        ],
      },
      {
        heading: "Expectations Toward Vision 2035",
        paragraphs: [
          "Kevin is expected to steer VTEC Business Group into becoming a regionally recognised business conglomerate by 2035.",
          "His mandate includes consolidating strategic partnerships and diversifying revenue streams across emerging markets.",
          "He will also lead the institutionalisation of a corporate governance framework that upholds accountability and sustainable growth. Kevin is committed to ensuring that every milestone on the 10 year roadmap is met with precision, purpose, and measurable impact.",
        ],
      },
    ],
    phone: "+254748626367",
    email: "kevin@vtecgroup.co.ke",
  },
  {
    name: "Allan Andati",
    role: "Chief Operation Officer & Co-Founder",
    photo: "/allan-andati.jpg",
    borderColor: "border-[#22c55e]/50",
    bio: "Allan is the engine room of VTEC Business Group. He ensures the ambitious vision is executed flawlessly on a day to day basis, overseeing logistics, infrastructure, and internal workflows.",
    sections: [
      {
        heading: "Achievements",
        paragraphs: [
          "Allan has been instrumental in building the operational backbone of VTEC Business Group. He successfully designed and implemented internal workflows that have improved efficiency and reduced redundancy.",
          "He further created a scalable infrastructure capable of supporting VTEC's expanding portfolio.",
          "His hands on approach to logistics and resource management has consistently ensured that strategic initiatives are delivered on time and within scope, earning him a reputation as the organisation's execution engine.",
        ],
      },
      {
        heading: "Expectations Toward Vision 2035",
        paragraphs: [
          "Allan is expected to lead the development of world class operational systems that can support VTEC's growth across multiple business units by 2035.",
          "This includes driving the adoption of technology driven process automation and establishing performance management frameworks. He will cultivate an operations team that consistently delivers excellence.",
          "His role will be central to ensuring that VTEC's ambitious vision is not merely planned, but consistently and flawlessly executed at every level of the organisation.",
        ],
      },
    ],
    phone: "+254728004765",
    email: "andati@vtecgroup.co.ke",
  },
  {
    name: "Chrisantus Khaemba",
    role: "Chief Growth Officer & Co-Founder",
    photo: "/chrisantus-khaemba.jpg",
    borderColor: "border-[#d4af37]/60",
    glow: "shadow-[0_0_22px_rgba(212,175,55,0.22)]",
    bio: "The driving force behind revenue and market expansion. Chrisantus is tasked with taking the VTEC brand to the masses through client acquisition and community growth.",
    sections: [
      {
        heading: "Achievements",
        paragraphs: [
          "Chrisantus has played a pivotal role in driving VTEC's early revenue generation and market penetration efforts. Through strategic client acquisition initiatives and targeted brand outreach, he has laid the commercial foundation upon which VTEC's growth trajectory is built. His ability to identify market opportunities and translate them into actionable growth strategies has positioned VTEC competitively within its target markets from the outset.",
        ],
      },
      {
        heading: "Expectations Toward Vision 2035",
        paragraphs: [
          "Chrisantus is expected to scale VTEC Business Group into a recognised market leader with a robust client portfolio and a strong presence in regional and international markets by 2035. His strategic focus will encompass the development of sustainable revenue models, the expansion of VTEC's brand equity across digital and physical platforms, and the forging of high-value commercial partnerships. He is committed to ensuring that VTEC's growth is not only rapid but deeply rooted in client trust, value delivery, and long-term market relevance.",
        ],
      },
    ],
    phone: "+254742264472",
    email: "khaemba@vtecgroup.co.ke",
  },
];

const partners: Leader[] = [
  {
    name: "Pride Andaye",
    role: "Business Partner",
    photo: "/pride-andaye.jpg",
    borderColor: "border-[#22c55e]/40",
    bio: "Pride is a strategic partner to VTEC Business Group, contributing to the relationships and collaborations that extend the group's reach and open new avenues for growth.",
    sections: [
      {
        heading: "Focus Areas",
        paragraphs: [
          "Pride works alongside the founding team to strengthen VTEC's network of partnerships, supporting initiatives that connect the group with new markets, collaborators, and opportunities.",
        ],
      },
      {
        heading: "Expectations Toward Vision 2035",
        paragraphs: [
          "Pride is expected to play a key role in deepening VTEC's partnership network as the group scales toward its 2035 empire vision, helping forge the relationships that support long term, sustainable growth.",
        ],
      },
    ],
    phone: "+254769229543",
    email: "pride@vtecgroup.co.ke",
  },
  {
    name: "Joel Odongo",
    role: "Business Partner",
    photo: "/joel-odongo.jpg",
    borderColor: "border-[#22c55e]/40",
    bio: "Joel is a strategic partner to VTEC Business Group, contributing to the partnerships and business development efforts that strengthen the group's footprint in Kenya's market.",
    sections: [
      {
        heading: "Focus Areas",
        paragraphs: [
          "Joel supports the founding team in building relationships and identifying opportunities that align with VTEC's business arms and long term growth strategy.",
        ],
      },
      {
        heading: "Expectations Toward Vision 2035",
        paragraphs: [
          "Joel is expected to contribute to VTEC's expanding partnership base as the group scales toward its 2035 empire vision, helping strengthen relationships that support sustainable, long term growth.",
        ],
      },
    ],
    phone: "+254748390599",
    email: "odongo@vtecgroup.co.ke",
  },
];

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 bg-gradient-to-br from-[#10264a]/80 to-[#0a1830]/80 border border-white/[0.08] rounded-[18px] p-7 md:p-9 shadow-[0_18px_40px_rgba(0,0,0,0.28)] hover:border-[#22c55e]/25 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#22c55e] via-[#d4af37] to-[#22c55e] opacity-70" />
      <div className="flex flex-col items-center md:items-start shrink-0 md:w-48 text-center md:text-left">
        <div
          className={`w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-[3px] ${leader.borderColor} ${leader.glow ?? "shadow-[0_0_24px_rgba(34,197,94,0.15)]"} ring-4 ring-black/20`}
        >
          <img
            src={leader.photo}
            alt={`${leader.name} — ${leader.role} of VTEC Business Group`}
            loading="lazy"
            className="w-full h-full object-cover object-[center_28%]"
          />
        </div>
        <h3 className="mt-4 font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-xl text-white">{leader.name}</h3>
        <div className="text-[#22c55e] font-semibold text-sm mt-1">{leader.role}</div>
      </div>

      <div className="flex-1 text-white/75 text-[15px] leading-relaxed space-y-4">
        <p>{leader.bio}</p>
        {leader.sections.map((s) => (
          <div key={s.heading}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-2">
              {s.heading}
            </h4>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="mb-2">
                {p}
              </p>
            ))}
          </div>
        ))}

        {(leader.phone || leader.email) && (
          <div className="flex flex-wrap gap-2.5 pt-4 mt-2 border-t border-white/[0.08]">
            {leader.phone && (
              <a
                href={`tel:${leader.phone}`}
                className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] hover:border-[#25D366]/50 hover:bg-white/10 transition text-sm font-medium text-white/90 shadow-sm"
              >
                <span className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </span>
                {leader.phone.replace(
                  /^\+254(\d{3})(\d{3})(\d{3})$/,
                  "+254 $1 $2 $3"
                )}
              </a>
            )}
            {leader.email && (
              <a
                href={`mailto:${leader.email}`}
                className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] hover:border-[#d4af37]/50 hover:bg-white/10 transition text-sm font-medium text-white/90 shadow-sm"
              >
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#0D2149]" />
                </span>
                {leader.email}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LeadershipPage() {
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
              The Team
            </span>
            <h1 className="font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-[clamp(36px,6vw,64px)] font-extrabold leading-[1.2] tracking-[-0.01em]">
              Our Leadership Team
            </h1>
            <p className="text-white/60 mt-3 text-lg">
              Built by Visionaries. Led by Purpose.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 md:px-8 pb-[64px] lg:pb-[88px]">

        <div className="space-y-8">
          {leaders.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>

        <div className="text-center mt-16 mb-8">
          <h2 className="font-['Playfair_Display','DM_Serif_Display',Georgia,serif] text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.2] tracking-[-0.01em]">
            Our Business Partners
          </h2>
          <p className="text-white/60 mt-2">
            Trusted partners extending VTEC's reach and strengthening the group's network.
          </p>
        </div>

        <div className="space-y-8">
          {partners.map((partner) => (
            <LeaderCard key={partner.name} leader={partner} />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/business-diagnostic"
            className="inline-block px-9 py-4 rounded-[10px] bg-[#22c55e] text-[#06190f] hover:bg-[#16a34a] hover:-translate-y-0.5 transition-all font-bold"
          >
            Get Your Free VTEC Intelligence Diagnosis &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
