import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/miliki")({
  head: () => ({
    meta: [
      { title: "MILIKI App | Your Wealth Co-Pilot | VTEC Business Group" },
      {
        name: "description",
        content:
          "Join the waitlist for MILIKI App — the intelligent wealth-management co-pilot built for Kenyan investors. Personalized guidance, not generic advice.",
      },
      { property: "og:title", content: "MILIKI App | Your Wealth Co-Pilot" },
      {
        property: "og:description",
        content:
          "An intelligent wealth co-pilot for everyday Kenyan investors. Join the founding waitlist.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/miliki" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/miliki" }],
  }),
  component: () => (
    <iframe 
      src="/site.html#services" 
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }} 
      title="MILIKI App | VTEC Business Group"
    />
  ),
});
