import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { TrendingUp, Landmark, Newspaper, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog | VTEC Business Group Insights" },
      {
        name: "description",
        content:
          "The VTEC Business Group blog — practical financial literacy, investment insights, business strategy, and company news for Kenyan entrepreneurs and everyday investors. Launching soon.",
      },
      {
        name: "keywords",
        content:
          "VTEC blog, financial literacy blog Kenya, investment insights Kenya, NSE investing tips, business strategy Kenya, VTEC Business Group news",
      },
      { property: "og:title", content: "Blog | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Practical insights on financial literacy, business strategy, and wealth building for the modern Kenyan investor.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const categories = [
  {
    icon: TrendingUp,
    name: "Market Insights",
    desc: "NSE trends, Money Market Funds, and what they mean for your money.",
  },
  {
    icon: Landmark,
    name: "Financial Literacy",
    desc: "Practical, jargon-free lessons on saving, investing, and building wealth.",
  },
  {
    icon: Lightbulb,
    name: "Business Strategy",
    desc: "Growth, branding, and operations lessons for Kenyan founders and SMEs.",
  },
  {
    icon: Newspaper,
    name: "VTEC News",
    desc: "Announcements, milestones, and updates from across the VTEC ecosystem.",
  },
];

function BlogPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to your email provider / Web3Forms endpoint.
    setStatus("sent");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0D2149] to-[#0a1628] text-white font-sans">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <span className="inline-block text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase mb-3">
            Insights
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">
            The VTEC Blog
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-xl mx-auto">
            Practical insights on financial literacy, business strategy, and
            wealth building — written for the modern Kenyan investor. Our
            first articles are being prepared now.
          </p>
          <span className="inline-block mt-5 text-[11px] font-semibold uppercase tracking-wide bg-white/10 px-4 py-2 rounded-full">
            Launching Soon
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {categories.map((c) => (
            <div
              key={c.name}
              className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-6"
            >
              <span className="w-11 h-11 rounded-xl bg-[#27ae60]/15 border border-[#27ae60]/30 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-[#27ae60]" />
              </span>
              <h2 className="font-semibold text-lg mb-1">{c.name}</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#0f2444]/60 border border-white/10 rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">
            Be first to read it
          </h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Leave your email and we'll notify you the moment our first
            articles go live — no spam, ever.
          </p>

          {status === "sent" ? (
            <p className="text-[#27ae60] font-semibold">
              Thanks — we'll let you know the moment we publish. 🎉
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 outline-none focus:border-[#27ae60] transition"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#27ae60] hover:bg-[#2ecc71] transition font-semibold"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
