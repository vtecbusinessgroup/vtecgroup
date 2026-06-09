import { useEffect, type ReactNode } from "react";
import "@/styles/site.css";
import navHtml from "@/html/nav.html?raw";
import floatingHtml from "@/html/floating.html?raw";
import footerHtml from "@/html/footer.html?raw";

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
    // Avoid loading twice on client-side navigations.
    if (document.getElementById("vtec-site-scripts")) {
      // Re-run reveal observers on route change if helper exists.
      // @ts-expect-error - global helper from site-scripts.js
      if (typeof window.__vtecInit === "function") window.__vtecInit();
      return;
    }
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
