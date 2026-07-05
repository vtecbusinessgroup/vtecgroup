import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  TrendingUp,
  Landmark,
  Newspaper,
  Lightbulb,
  Clock,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog | VTEC Business Group Insights" },
      {
        name: "description",
        content:
          "The VTEC Business Group blog — practical financial literacy, NSE investing insights, business strategy, and company news for Kenyan entrepreneurs and everyday investors. Launching soon.",
      },
      {
        name: "keywords",
        content:
          "VTEC blog, financial literacy blog Kenya, NSE investing tips, Money Market Funds Kenya, business strategy blog Kenya, SACCO investing Kenya, VTEC Business Group news, Kenyan investor education",
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

const categoryMeta: Record<
  string,
  { icon: typeof TrendingUp; color: string }
> = {
  "Market Insights": { icon: TrendingUp, color: "#27ae60" },
  "Financial Literacy": { icon: Landmark, color: "#d4af37" },
  "Business Strategy": { icon: Lightbulb, color: "#5b9bd5" },
  "VTEC News": { icon: Newspaper, color: "#27ae60" },
};

const articles = [
  {
    category: "Market Insights",
    title: "Understanding the NSE: A Beginner's Guide for Kenyan Investors",
    excerpt:
      "What the Nairobi Securities Exchange actually is, how shares are bought and sold, and the first three things to check before you invest a single shilling.",
    readTime: "6 min read",
  },
  {
    category: "Market Insights",
    title: "Money Market Funds vs SACCOs: Which Grows Your Money Faster?",
    excerpt:
      "A side-by-side look at returns, liquidity, and risk — so you can decide where your next KES 5,000 should actually go.",
    readTime: "5 min read",
  },
  {
    category: "Financial Literacy",
    title: "Why Most Kenyans Never Start Investing (And How to Fix It)",
    excerpt:
      "It's rarely about income. It's about three specific mental blocks — and a simple first step that gets you past all of them.",
    readTime: "4 min read",
  },
  {
    category: "Financial Literacy",
    title: "The 50/30/20 Rule, Adapted for a Kenyan Salary",
    excerpt:
      "The classic budgeting formula doesn't quite work with rent, transport, and family obligations. Here's a version that does.",
    readTime: "5 min read",
  },
  {
    category: "Business Strategy",
    title: "Five Branding Mistakes That Cost Kenyan SMEs Clients",
    excerpt:
      "From inconsistent messaging to invisible online presence — the branding gaps VTEC Consultancy sees most often, and how to close them.",
    readTime: "7 min read",
  },
  {
    category: "VTEC News",
    title: "Inside VTEC: How MILIKI App Is Redefining Asset Ownership",
    excerpt:
      "A look at the thinking behind MILIKI's single-dashboard approach to NSE equities, Money Market Funds, and bonds.",
    readTime: "4 min read",
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
      <PageHeader />
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <span className="inline-block text-[#27ae60] text-xs font-semibold tracking-[2px] uppercase mb-3">
            Insights
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">
            The VTEC Blog
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-xl mx-auto">
            Practical insights on financial literacy, business strategy, and
            wealth building — written for the modern Kenyan investor.
          </p>
          <span className="inline-block mt-5 text-[11px] font-semibold uppercase tracking-wide bg-white/10 px-4 py-2 rounded-full">
            Launching Soon
          </span>
        </div>

        <div className="mb-4 text-white/40 text-xs font-semibold uppercase tracking-wide">
          Up Next On The Blog
        </div>
        <div className="space-y-4 mb-16">
          {articles.map((a) => {
            const meta = categoryMeta[a.category];
            return (
              <article
                key={a.title}
                className="bg-[#0f2444]/60 border border-white/10 hover:border-[#27ae60]/40 rounded-2xl p-6 md:p-7 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${meta.color}26` }}
                  >
                    <meta.icon
                      className="w-3.5 h-3.5"
                      style={{ color: meta.color }}
                    />
                  </span>
                  <span
                    className="text-[10.5px] font-semibold uppercase tracking-wide"
                    style={{ color: meta.color }}
                  >
                    {a.category}
                  </span>
                </div>
                <h2 className="font-serif text-lg md:text-xl font-bold mb-2 leading-snug">
                  {a.title}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {a.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-white/40 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {a.readTime}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-white/30 border border-white/15 px-2.5 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </article>
            );
          })}
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
              Thanks — we'll let you know the moment we publish.
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
