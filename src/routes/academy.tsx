import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import academyHtml from "@/html/academy.html?raw";
import servicesHtml from "@/html/services.html?raw";
import milikiHtml from "@/html/miliki.html?raw";

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
      { property: "og:url", content: "https://vtecgroup.lovable.app/academy" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.lovable.app/academy" }],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  return <SiteShell htmlSections={[academyHtml, servicesHtml, milikiHtml]} />;
}
