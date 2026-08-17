export function About() {
  return (
    <section id="about" className="relative bg-gradient-to-b from-[#050b16] via-[#0f2e26] to-[#f4f7fc] px-4 pt-28 pb-20 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[200px] bg-green-500/20 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-3 text-green-600 text-[11px] font-bold uppercase tracking-[0.18em] mb-4 before:w-6 before:h-0.5 before:bg-green-600">
          Who We Are
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
          Built on Vision.<br />Driven by Purpose.
        </h2>
        <p className="text-slate-300 max-w-xl mb-10">
          VTEC Business Group is a modern, multi-service brand founded in October 2025 with the vision of building a dynamic platform that connects education, trade, empowerment, and professional consultancy within Kenya's growing economy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: VTEC Meaning */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <h3 className="font-serif text-xl font-extrabold text-[#0D2149] mb-5">
              What Does <span className="text-green-600">VTEC</span> Stand For?
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { letter: "V", title: "Visionary", desc: "Forward-thinking strategy built for where Kenya's economy is heading." },
                { letter: "T", title: "Trade", desc: "The commercial backbone — movement of goods, services, and ideas." },
                { letter: "E", title: "Empowerment", desc: "Raising people before profits — through knowledge and opportunity." },
                { letter: "C", title: "Consultancy", desc: "The intellectual engine guiding strategic decisions that shape futures." },
              ].map((item) => (
                <div key={item.letter} className="flex items-start gap-4 rounded-lg p-2 hover:bg-green-50/50 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#0D2149] to-[#163272] text-white flex items-center justify-center font-serif text-lg font-black shadow-md">
                    {item.letter}
                  </div>
                  <div>
                    <strong className="block text-[#0D2149] text-sm">{item.title}</strong>
                    <span className="text-slate-500 text-xs leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Stat Cards */}
          <div className="flex flex-col gap-4">
            {[
              { icon: "🏢", title: "Multi-Service Brand Structure", desc: "Three diversified sub-brands under one powerful parent group, sharing resources, vision, and network.", color: "bg-[#0D2149]/10 text-[#0D2149]" },
              { icon: "🌍", title: "Rooted in Kenya", desc: "Operating within Kenya's urban economic landscape, designed for the Kenyan market, with continental ambitions.", color: "bg-green-600/10 text-green-600" },
              { icon: "🚀", title: "2035 Empire Vision", desc: "A clear 10 year roadmap to building a recognized, impactful, and profitable business empire.", color: "bg-[#c9a227]/10 text-[#c9a227]" },
              { icon: "🔗", title: "Co Founded Leadership", desc: "Three complementary co founders bringing vision, operations, and growth expertise together.", color: "bg-[#0D2149]/10 text-[#0D2149]" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4 transition-all hover:translate-x-2 hover:shadow-lg">
                <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-[#0D2149] text-sm font-bold">{stat.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}