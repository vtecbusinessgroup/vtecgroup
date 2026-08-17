import { GraduationCap, Briefcase, ShoppingBag, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button"; // Using your existing Shadcn button

export function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden bg-[url('/1000100227.jpg')] bg-cover bg-center"
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,14,28,0.6)] via-[rgba(8,17,32,0.8)] to-[#050b16] z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEuNSIgZmlsbD0icmdiYSgzOSwxNzQsOTYsMC4wMykiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Est. October 2025 — Nairobi, Kenya
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 border-b border-white/10 pb-6 w-full max-w-md md:max-w-2xl">
          <div className="text-center"><div className="font-serif text-3xl font-black text-white">4<span className="text-green-500">+</span></div><p className="text-[10px] uppercase tracking-wider text-white/70 mt-1">Business Arms</p></div>
          <div className="text-center"><div className="font-serif text-3xl font-black text-white"><span className="text-green-500">#</span>1</div><p className="text-[10px] uppercase tracking-wider text-white/70 mt-1">Holding Vision</p></div>
          <div className="text-center"><div className="font-serif text-3xl font-black text-white">2035</div><p className="text-[10px] uppercase tracking-wider text-white/70 mt-1">Empire Target</p></div>
        </div>

        {/* Typography */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4">
          Empowering Kenya.<br />
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">One Venture</span><br />
          At A Time.
        </h1>
        <p className="max-w-lg text-white/80 text-sm md:text-base leading-relaxed mb-8">
          A premier multi-service brand driving sustainable growth across Kenya through integrated financial literacy, strategic corporate consultancy, and innovative commerce. We are powered by vision and executed with excellence.
        </p>

        {/* Modern Glass Cards for Arms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl w-full mb-8">
          {[
            { icon: GraduationCap, title: "InvestorMind Academy", desc: "Financial Literacy & Investing" },
            { icon: Briefcase, title: "VTEC Consultancy Services", desc: "Strategy & Business Growth" },
            { icon: ShoppingBag, title: "VTEC Retail Services", desc: "Quality. Style. Value." },
            { icon: Smartphone, title: "MILIKI App", desc: "Your Wealth Co-Pilot", tag: "Live Now" },
          ].map((arm, idx) => (
            <div key={idx} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-green-500/50 hover:bg-white/10">
              <arm.icon className="h-6 w-6 text-green-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-bold text-white">{arm.title}</p>
                <p className="text-[11px] text-white/60">{arm.desc}</p>
                {arm.tag && (
                  <span className="mt-1 inline-block rounded bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
                    {arm.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="rounded-full bg-green-600 hover:bg-green-500 px-8 py-6 text-base font-bold shadow-lg shadow-green-900/40">
            <a href="#services">Explore Our Services</a>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base">
            <a href="#/our-story">Our Story</a>
          </Button>
        </div>
      </div>
    </section>
  );
}