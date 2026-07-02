import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services | VTEC Business Group" },
      {
        name: "description",
        content:
          "Explore VTEC Business Group's four business arms — InvestorMind Academy, VTEC Consultancy, VTEC Retail, and MILIKI App — driving sustainable growth across Kenya.",
      },
      { property: "og:title", content: "Our Services | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Four business arms unified under one Kenyan multi-service brand: financial education, strategic consultancy, retail commerce, and intelligent wealth tooling.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/services" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/services" }],
  }),
  component: () => (
    <iframe 
      src="/site.html#services" 
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }} 
      title="Our Services | VTEC Business Group"
    />
  ),
});
