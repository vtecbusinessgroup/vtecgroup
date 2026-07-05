import { createFileRoute } from "@tanstack/react-router";
import {
  Compass,
  TrendingUp,
  Users,
  Briefcase,
  Building2,
  Globe2,
  Rocket,
  Link2,
} from "lucide-react";

export const Route = createFileRoute("/about-us")({
  component: AboutUsPage,
  head: () => ({
    meta: [
      { title: "About Us | VTEC Business Group Kenya" },
      {
        name: "description",
        content:
          "VTEC Business Group is a modern, multi-service brand founded in October 2025 in Nairobi, Kenya. Learn our story, what VTEC stands for, and how three co-founders built a structured multi-service brand from a single idea.",
      },
      {
        name: "keywords",
        content:
          "About VTEC Business Group, VTEC Kenya history, Nairobi business group founded 2025, VTEC founders story, multi-service brand Kenya, financial literacy consultancy retail Kenya",
      },
      { property: "og:title", content: "About Us | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "From a single idea to an empire in motion — the story of VTEC Business Group.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const pillars = [
  {
    letter: "V",
    title: "Visionary",
    desc: "Forward-thinking strategy built for where Kenya's economy is heading.",
  },
  {
    letter: "T",
    title: "Trade",
    desc: "The commercial backbone — movement of goods, services, and ideas.",
  },
  {
    letter: "E",
    title: "Empowerment",
    desc: "Raising people before profits, through knowledge and opportunity.",
  },
  {
    letter: "C",
    title: "Consultancy",
    desc: "The intellectual engine guiding strategic decisions that shape futures.",
  },
];

const journey = [
  {
    num: "01",
    icon: Compass,
    title: "Strategy",
    desc: "A ten year roadmap to 2035 was structured, with measurable milestones across each business arm and a clear capital allocation logic.",
  },
  {
    num: "02",
    icon: Building2,
    title: "Brand Identity",
    desc: "VTEC Business Group launched with a unified visual identity, web presence, and positioning that signals seriousness and intent in every touchpoint.",
  },
  {
    num: "03",
    icon: Link2,
    title: "Operations",
    desc: "Internal workflows, governance norms, and a leadership cadence were established, turning a startup into a functioning, structured multi-service brand.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Growth",
    desc: "Early client engagements, partnership conversations, and InvestorMind Academy waitlist traction validated the demand we set out to serve.",
  },
];

const facts = [
  { icon: Users, label: "Co-Founded Leadership", desc: "Three complementary co-founders bringing vision, operations, and growth expertise together." },
  { icon: Briefcase, label: "Multi-Service Brand Structure", desc: "Diversified sub-brands under one parent group, sharing resources, vision, and network." },
  { icon: Globe2, label: "Rooted in Kenya", desc: "Operating within Kenya's urban economic landscape, designed for the Kenyan market with continental ambitions." },
  { icon: Rocket, label: "2035 Empire Vision", desc: "A clear 10-year roadmap to building a recognised, impactful, and profitable business empire." },
];

function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D2149] to-[#0a1628] text-white font-sans">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase mb-3">
            Our Story
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            From a Single Idea to <span className="text-[#27ae60]">An Empire in Motion.</span>
          </h1>
          <p className="text-white/60 mt-5 text-lg max-w-2xl mx-auto">
            The story of VTEC Business Group, how a shared vision in Nairobi
            became a structured multi-service brand with a ten year roadmap
            to redefine commerce, capital, and consultancy in East Africa.
          </p>
        </div>

        {/* Chapter 01 */}
        <section className="mb-16">
          <span className="text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase">
            Chapter 01
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2 mb-4">
            Where It All Began
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            VTEC Business Group was officially founded in October 2025, in
            Nairobi, Kenya, born out of countless late night conversations
            between three young Kenyans who refused to accept that financial
            empowerment, strategic thinking, and serious commerce had to
            remain reserved for the privileged few.
          </p>
          <div className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-6 md:p-7 mb-8">
            <p className="text-white/75 leading-relaxed mb-3">
              What started as a structured plan on paper quickly evolved
              into a registered multi-service brand with a clear mission:
              build Kenyan businesses that compete on merit, educate
              Kenyans on real wealth building, and deliver consultancy that
              translates ambition into outcomes.
            </p>
            <p className="text-white/75 leading-relaxed">
              The name itself, <span className="text-[#27ae60] font-semibold">VTEC</span>,
              was deliberate. Each letter is a pillar, a promise, and a
              discipline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.letter}
                className="flex gap-4 bg-[#0f2444]/60 border border-white/10 rounded-2xl p-5"
              >
                <span className="w-10 h-10 shrink-0 rounded-lg bg-[#27ae60] flex items-center justify-center font-bold">
                  {p.letter}
                </span>
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-white/60 text-sm mt-1">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What we stand for / facts */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
            Built on Vision. Driven by Purpose.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex gap-4 bg-[#0f2444]/60 border border-white/10 rounded-2xl p-5"
              >
                <span className="w-10 h-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-[#d4af37]" />
                </span>
                <div>
                  <div className="font-semibold">{f.label}</div>
                  <div className="text-white/60 text-sm mt-1">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey so far */}
        <section className="mb-16">
          <span className="text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase">
            Chapter 03
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2 mb-2">
            The Journey So Far
          </h2>
          <p className="text-white/60 mb-6">
            Months in, the group has already laid the foundations of a
            business built to last.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {journey.map((j) => (
              <div
                key={j.num}
                className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif text-2xl font-bold text-[#27ae60]">
                    {j.num}
                  </span>
                  <j.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="font-semibold text-lg mb-1">{j.title}</div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {j.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <a
            href="/leadership"
            className="inline-block px-9 py-4 rounded-full bg-[#27ae60] hover:bg-[#2ecc71] transition font-semibold"
          >
            Meet The Team &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
