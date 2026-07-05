import { ArrowLeft } from "lucide-react";

/**
 * Shared top bar for every standalone "quick link" page (Services, Solutions,
 * Leadership, Vision 2035, About Us, Blog). Mirrors the header used on the
 * existing /business-diagnostic page: brand mark + name on the left, a
 * "Back to Site" pill on the right.
 *
 * Place this file at: src/components/PageHeader.tsx
 * Import in each route file as: import { PageHeader } from "../components/PageHeader";
 */
export function PageHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 px-5 md:px-8 py-3.5 bg-[#0D2149]/95 backdrop-blur border-b border-[#27ae60]/30">
      <a href="/" className="flex items-center gap-2.5 group">
        <span className="w-9 h-9 rounded-full bg-white/5 border-2 border-[#27ae60]/60 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#27ae60] transition-colors">
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
          <span className="block text-[#27ae60] text-[10px] font-semibold tracking-[1.5px] uppercase">
            Business Group
          </span>
        </span>
      </a>

      <a
        href="/"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white/85 text-xs font-semibold hover:border-[#27ae60] hover:text-[#27ae60] hover:bg-[#27ae60]/10 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Site
      </a>
    </header>
  );
}
