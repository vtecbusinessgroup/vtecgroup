import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "InvestorMind Academy | Financial Literacy & Investing | VTEC" },
      {
        name: "description",
        content:
          "Build your investing knowledge with InvestorMind Academy — VTEC's financial literacy and investment education platform for Kenyan investors.",
      },
      { property: "og:title", content: "InvestorMind Academy | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Financial literacy and investment education designed for the modern Kenyan investor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/academy" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/academy" }],
  }),
  component: () => (
    <iframe 
      src="/site.html#services" 
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }} 
      title="InvestorMind Academy | VTEC Business Group"
    />
  ),
});
