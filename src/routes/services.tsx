import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import servicesHtml from "@/html/services.html?raw";
import ecosystemHtml from "@/html/ecosystem.html?raw";
import academyHtml from "@/html/academy.html?raw";

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
          "Four business arms unified under one Kenyan holding company: financial education, strategic consultancy, retail commerce, and intelligent wealth tooling.",
      },
      { property: "og:url", content: "https://vtecgroup.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return <SiteShell htmlSections={[servicesHtml, ecosystemHtml, academyHtml]} />;
}
