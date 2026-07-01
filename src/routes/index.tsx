import { createFileRoute } from "@tanstack/react-router";

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
    <iframe
      src="/site.html"
      title="VTEC Business Group"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
