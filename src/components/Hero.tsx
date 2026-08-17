import { GraduationCap, Briefcase, ShoppingBag, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-slate-900 pt-24">
      {/* Abstract Grid/Overlay Background */}
      <div className="absolute inset-0 bg-[url('/1000100227.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/80 to-slate-900" />
      
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 pt-16 text-center text-white">
        <Badge variant="outline" className="mb-6 border-green-500/50 bg-green-500/10 text-green-400">
          Est. October 2025 — Nairobi, Kenya
        </Badge>

        {/* Stats */}
        <div className="mb-8 flex flex-wrap justify-center gap-8 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
          <div className="text-center"><div className="text-3xl font-bold">4<span className="text-green-500">+</span></div><p className="text-[10px] uppercase text-white/60">Business Arms</p></div>
          <div className="text-center"><div className="text-3xl font-bold text-green-500">#1</div><p className="text-[10px] uppercase text-white/60">Holding Vision</p></div>
          <div className="text-center"><div className="text-3xl font-bold text-green-500">2035</div><p className="text-[10px] uppercase text-white/60">Empire Target</p></div>
        </div>

        {/* Typography */}
        <h1 className="max-w-4xl font-serif text-4xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl">
          Empowering Kenya.<br />
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">One Venture</span><br />
          At A Time.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-white/70 sm:text-xl">
          A premier multi-service brand driving sustainable growth across Kenya through financial literacy, strategic consultancy, and innovative commerce.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild className="rounded-full bg-green-600 px-8 py-6 text-base font-bold shadow-lg shadow-green-600/20 hover:bg-green-500 hover:shadow-green-500/40">
            <a href="#services">Explore Our Services</a>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-white/30 px-8 py-6 text-base text-white hover:bg-white/10">
            <a href="#/our-story">Our Story</a>
          </Button>
        </div>

        {/* Modern Glass Cards for Arms */}
        <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { icon: GraduationCap, title: "InvestorMind Academy", desc: "Financial Literacy & Investing", tag: null },
            { icon: Briefcase, title: "VTEC Consultancy", desc: "Strategy & Business Growth", tag: null },
            { icon: ShoppingBag, title: "VTEC Retail Services", desc: "Quality. Style. Value.", tag: "Coming Soon" },
            { icon: Smartphone, title: "MILIKI App", desc: "Your Wealth Co-Pilot", tag: "Live Now" },
          ].map((arm, idx) => (
            <div key={idx} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-green-500/50 hover:bg-white/10">
              <arm.icon className="h-8 w-8 text-green-400" />
              <div className="text-left">
                <p className="text-sm font-bold text-white">{arm.title}</p>
                <p className="text-xs text-white/60">{arm.desc}</p>
                {arm.tag && (
                  <span className="mt-1 inline-block rounded bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
                    {arm.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}