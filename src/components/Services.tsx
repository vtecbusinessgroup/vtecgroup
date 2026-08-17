import { GraduationCap, Briefcase, ShoppingBag, Smartphone } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: GraduationCap,
      tag: "Education",
      bg: "bg-[#0D2149]",
      title: "InvestorMind Academy",
      desc: "Kenya's dedicated financial literacy and investment education platform. We bridge the knowledge gap between everyday Kenyans and the wealth-building tools available to them.",
      tags: ["NSE Stock Market", "Money Market Funds", "SACCOs", "Financial Literacy", "Investment Strategy"],
      color: "text-[#0D2149]",
    },
    {
      icon: Briefcase,
      tag: "Consultancy",
      bg: "bg-gradient-to-br from-[#145a2b] to-[#1f8c3b]",
      title: "VTEC Consultancy Services",
      desc: "Strategic professional services tailored for Kenya's business landscape. We guide entrepreneurs, SMEs, and brands to make smarter decisions and build stronger market presence.",
      tags: ["Financial Consulting", "Brand Consulting", "Content Marketing", "Business Strategy"],
      color: "text-[#1f8c3b]",
    },
    {
      icon: ShoppingBag,
      tag: "Retail",
      bg: "bg-gradient-to-br from-[#7a5c10] to-[#c9a227]",
      title: "VTEC Retail Services",
      desc: "A premium clothing and apparel retail venture currently in its pre-launch phase. Designed to bring quality, style, and accessibility to Kenya's urban fashion market.",
      tags: ["Apparel", "Urban Fashion", "Kenyan Market", "Coming 2025/26"],
      color: "text-[#c9a227]",
      ribbon: "Coming Soon",
    },
    {
      icon: Smartphone,
      tag: "Digital Arm",
      bg: "bg-gradient-to-br from-[#0a0a0a] to-[#1a1400]",
      title: "MILIKI App",
      desc: "The flagship digital solution within the VTEC ecosystem — built to redefine asset ownership and wealth management for the modern Kenyan investor. Drawn from the Swahili word miliki, meaning 'to own'.",
      tags: ["NSE Equities", "Money Market Funds", "Wealth Tracking", "Asset Ownership"],
      color: "text-[#c9a227]",
      ribbon: "Live Now",
      goldRibbon: true
    },
  ];

  return (
    <section id="services" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 text-green-600 text-[11px] font-bold uppercase tracking-[0.18em] mb-4 before:w-6 before:h-0.5 before:bg-green-600">
          What We Do
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#0D2149] leading-tight mb-4">
          Our Business Arms
        </h2>
        <p className="text-slate-600 max-w-xl mb-10">
          Three strategically positioned sub-brands, each serving a distinct market need — yet all unified under the VTEC Business Group umbrella.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden shadow-[0_6px_28px_rgba(13,33,73,0.08)] hover:shadow-[0_16px_48px_rgba(13,33,73,0.15)] hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              
              {/* Ribbon handling */}
              {s.ribbon && !s.goldRibbon && (
                <div className="absolute top-4 right-0 bg-[#c9a227] text-white text-[9px] font-bold uppercase tracking-wider px-12 py-1 transform rotate-12 shadow-md z-10 translate-x-8 translate-y-4">
                  {s.ribbon}
                </div>
              )}
              {s.goldRibbon && (
                <div className="absolute top-4 right-0 bg-black text-green-500 border border-green-500 text-[9px] font-bold uppercase tracking-wider px-12 py-1 transform rotate-12 shadow-md z-10 translate-x-8 translate-y-4">
                  {s.ribbon}
                </div>
              )}

              {/* Header */}
              <div className={`${s.bg} px-6 py-10 text-white relative overflow-hidden`}>
                <div className="relative z-10">
                  <span className="inline-block bg-white/15 text-white rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-3">
                    {s.tag}
                  </span>
                  <div className="mb-2"><s.icon className="w-8 h-8 text-white/90" /></div>
                  <h3 className="font-serif text-xl md:text-2xl font-extrabold">{s.title}</h3>
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/5"></div>
              </div>

              {/* Body */}
              <div className="p-6 bg-white">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.tags.map((tag, j) => (
                    <span key={j} className="bg-slate-50 text-slate-700 rounded-full px-3 py-1 text-[11px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#contact" className={`inline-flex items-center gap-1 font-semibold text-sm ${s.color} hover:underline`}>
                  Explore {s.title.includes("Academy") ? "Academy" : s.title.includes("Consultancy") ? "Consultation" : "More"} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}