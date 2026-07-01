import { useEffect, type ReactNode } from "react";
import "@/styles/site.css";

// Updated imports pointing to the new TypeScript files
import { navHtml } from "@/html/nav";
import { floatingHtml } from "@/html/floating";
import { footerHtml } from "@/html/footer";

type Props = {
  children?: ReactNode;
  /** Extra HTML chunks (sections) to inject between nav and footer, in order. */
  htmlSections?: string[];
};

/**
 * Shared site shell: injects the original site.html nav, floating buttons,
 * and footer verbatim so every route preserves the existing design pixel-for-pixel.
 * Loads /site-scripts.js once for menu toggle, reveal animations, ecosystem modal, etc.
 */
export function SiteShell({ children, htmlSections = [] }: Props) {
  useEffect(() => {
    // Rewrite legacy in-page anchor links to real route URLs so the navbar
    // works on every standalone route.
    const map: Record<string, string> = {
      "#about": "/about",
      "#services": "/services",
      "#ecosystem": "/services",
      "#leadership": "/leadership",
      "#vision": "/vision",
      "#contact": "/contact",
      "#why": "/about",
    };
    document
      .querySelectorAll<HTMLAnchorElement>("nav a[href^='#'], .mobile-menu a[href^='#']")
      .forEach((a) => {
        const href = a.getAttribute("href") || "";
        if (map[href]) a.setAttribute("href", map[href]);
      });

    if (document.getElementById("vtec-site-scripts")) return;
    const s = document.createElement("script");
    s.id = "vtec-site-scripts";
    s.src = "/site-scripts.js";
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: floatingHtml }} />
      <div dangerouslySetInnerHTML={{ __html: navHtml }} />
      {htmlSections.map((html, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
      {children}
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
