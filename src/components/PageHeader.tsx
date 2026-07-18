import { ArrowLeft, Menu } from "lucide-react";

/**
 * Shared top bar for every standalone "quick link" page (Services, Solutions,
 * Leadership, Vision 2035, About Us, Blog). Mirrors the header used on the
 * existing /business-diagnostic page: brand mark + name on the left, a
 * sibling-page nav menu + "Back to Site" pill on the right.
 *
 * Place this file at: src/components/PageHeader.tsx
 * Import in each route file as: import { PageHeader } from "../components/PageHeader";
 */

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/leadership", label: "Leadership" },
  { href: "/vision-2035", label: "Vision 2035" },
  { href: "/miliki", label: "MILIKI App" },
  { href: "/blog", label: "Blog" },
];

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 px-5 md:px-8 py-3.5 bg-[#0a1628]/[0.92] backdrop-blur-[10px] border-b border-white/[0.08]">
      <a href="/" className="flex items-center gap-2.5 group">
        <span className="w-9 h-9 rounded-full bg-white/5 border-2 border-[#22c55e]/60 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#22c55e] transition-colors">
          <img
            src="/vtec-logo.png"
            alt="VTEC Business Group logo"
            className="w-full h-full object-cover"
          />
        </span>
        <span className="leading-tight">
          <span className="block text-white font-bold text-sm tracking-wide">
            VTEC
          </span>
          <span className="block text-[#22c55e] text-[10px] font-semibold tracking-[1.5px] uppercase">
            Business Group
          </span>
        </span>
      </a>

      {/* Sibling-page navigation. Plain <a> tags inside <details> so every
          link is present in the DOM (crawlable) regardless of open/closed
          state, with zero extra client-side JS/state required. */}
      <div className="flex items-center gap-2">
        <details className="relative">
          <summary
            className="list-none inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white/85 text-xs font-semibold hover:border-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10 transition cursor-pointer select-none"
          >
            <Menu className="w-3.5 h-3.5" />
            Menu
          </summary>
          <nav
            aria-label="Site pages"
            className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[#0D2149] shadow-xl overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-sm text-white/80 hover:bg-[#22c55e]/15 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </details>

        <a
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white/85 text-xs font-semibold hover:border-[#22c55e] hover:text-[#22c55e] hover:bg-[#22c55e]/10 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Site
        </a>
      </div>
    </header>
  );
}
