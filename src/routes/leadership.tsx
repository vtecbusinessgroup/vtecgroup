import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

// Updated imports pointing to the new TypeScript files
import { leadershipHtml } from "@/html/leadership";
import { aboutHtml } from "@/html/about";
import { visionHtml } from "@/html/vision";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership | VTEC Business Group" },
      {
        name: "description",
        content:
          "Meet the leadership team driving VTEC Business Group's 10-year vision — built by visionaries, led by purpose.",
      },
      { property: "og:title", content: "Leadership | VTEC Business Group" },
      {
        property: "og:description",
        content: "Built by visionaries. Led by purpose.",
      },
      { property: "og:url", content: "https://vtecgroup.co.ke/leadership" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/leadership" }],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  return <SiteShell htmlSections={[leadershipHtml, aboutHtml, visionHtml]} />;
}
