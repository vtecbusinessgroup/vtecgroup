import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

// Updated imports pointing to the new TypeScript files
import { servicesHtml } from "@/html/services";
import { ecosystemHtml } from "@/html/ecosystem";
import { academyHtml } from "@/html/academy";

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
      { property: "og:url", content: "https://vtecgroup.co.ke/services" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return <SiteShell htmlSections={[servicesHtml, ecosystemHtml, academyHtml]} />;
}
