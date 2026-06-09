import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import milikiHtml from "@/html/miliki.html?raw";
import academyHtml from "@/html/academy.html?raw";
import servicesHtml from "@/html/services.html?raw";

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
      { property: "og:url", content: "https://vtecgroup.lovable.app/miliki" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.lovable.app/miliki" }],
  }),
  component: MilikiPage,
});

function MilikiPage() {
  return <SiteShell htmlSections={[milikiHtml, academyHtml, servicesHtml]} />;
}
