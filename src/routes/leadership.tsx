import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import leadershipHtml from "@/html/leadership.html?raw";
import aboutHtml from "@/html/about.html?raw";
import visionHtml from "@/html/vision.html?raw";

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
      { property: "og:url", content: "https://vtecgroup.lovable.app/leadership" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.lovable.app/leadership" }],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  return <SiteShell htmlSections={[leadershipHtml, aboutHtml, visionHtml]} />;
}
