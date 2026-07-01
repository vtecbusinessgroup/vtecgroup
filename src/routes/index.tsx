import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/SiteShell"; // Pulling in your shared layout
import { homeHtml } from "@/html/home"; // Pulling in the clean code above

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VTEC Business Group | Visionary Trade, Empowerment & Consultancy" },
      {
        name: "description",
        content:
          "Kenya's dynamic multi-service brand driving financial education, strategic consultancy, and commercial innovation. Empowering Kenya, one venture at a time.",
      },
      { property: "og:title", content: "VTEC Business Group | Visionary Trade, Empowerment & Consultancy" },
      { 
        property: "og:description", 
        content: "Kenya's dynamic multi-service brand driving financial education, strategic consultancy, and commercial innovation." 
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell htmlSections={[homeHtml]} />
  );
}
