import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VTEC Business Group | Visionary Trade, Empowerment & Consultancy" },
      {
        name: "description",
        content:
          "Kenya's dynamic holding entity powering financial education, strategic consultancy, and commerce. Empowering Kenya. One Venture at a Time.",
      },
      { property: "og:title", content: "VTEC Business Group" },
      { property: "og:description", content: "Empowering Kenya. One Venture at a Time." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    fetch("/site.html")
      .then((r) => r.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Inject styles
        doc.querySelectorAll("style, link[rel='stylesheet']").forEach((el) => {
          document.head.appendChild(el.cloneNode(true));
        });

        // Set body content
        container.innerHTML = doc.body.innerHTML;

        // Re-execute scripts
        container.querySelectorAll("script").forEach((oldScript) => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = false;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
          oldScript.remove();
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: "100vh", width: "100%" }}
    />
  );
}
