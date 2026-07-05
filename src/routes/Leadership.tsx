import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";

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
      { property: "og:title", content: "Leadership Team | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Built by visionaries, led by purpose. Meet the co-founders and business partners driving VTEC's 10-year roadmap.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

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
    borderColor: "border-[#27ae60]/60",
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
    email: "kevininyangala5@gmail.com",
  },
  {
    name: "Allan Andati",
    role: "Chief Operation Officer & Co-Founder",
    photo: "/allan-andati.jpg",
    borderColor: "border-[#27ae60]/50",
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
    email: "andatiallan047@gmail.com",
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
    email: "khaembachris2005@gmail.com",
  },
];

const partners: Leader[] = [
  {
    name: "Pride Andaye",
    role: "Business Partner",
    photo: "/pride-andaye.jpg",
    borderColor: "border-[#27ae60]/40",
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
  },
  {
    name: "Joel Odongo",
    role: "Business Partner",
    photo: "/joel-odongo.jpg",
    borderColor: "border-[#27ae60]/40",
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
  },
];

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 bg-[#0f2444]/60 border border-white/10 rounded-2xl p-7 md:p-9">
      <div className="flex flex-col items-center md:items-start shrink-0 md:w-48 text-center md:text-left">
        <div
          className={`w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 ${leader.borderColor} ${leader.glow ?? ""}`}
        >
          <img
            src={leader.photo}
            alt={`${leader.name} — ${leader.role} of VTEC Business Group`}
            loading="lazy"
            className="w-full h-full object-cover object-[center_28%]"
          />
        </div>
        <h3 className="mt-4 font-serif text-xl text-white">{leader.name}</h3>
        <div className="text-[#27ae60] font-semibold text-sm mt-1">{leader.role}</div>
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
          <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
            {leader.phone && (
              <a
                href={`tel:${leader.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition text-sm font-medium text-white/90"
              >
                <span className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition text-sm font-medium text-white/90"
              >
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#0D2149]" />
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
    <main className="min-h-screen bg-gradient-to-b from-[#0D2149] to-[#0a1628] text-white font-sans">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="inline-block text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase mb-3">
            The Team
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">
            Our Leadership Team
          </h1>
          <p className="text-white/60 mt-3 text-lg">
            Built by Visionaries. Led by Purpose.
          </p>
        </div>

        <div className="space-y-8">
          {leaders.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>

        <div className="text-center mt-16 mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold">
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
            className="inline-block px-9 py-4 rounded-full bg-[#27ae60] hover:bg-[#2ecc71] transition font-semibold"
          >
            Get Your Free VTEC Intelligence Diagnosis &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
