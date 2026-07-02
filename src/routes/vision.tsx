import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

import { visionHtml } from "@/html/vision";
import { aboutHtml } from "@/html/about";
import { leadershipHtml } from "@/html/leadership";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Vision 2035 | Our Roadmap | VTEC Business Group" },
      {
        name: "description",
        content:
          "Where VTEC Business Group is headed. A purposeful 10-year roadmap building Kenya's next great multi-service brand by 2035.",
      },
      { property: "og:title", content: "Vision 2035 | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Every great empire begins with a clear destination. VTEC's 10-year roadmap to 2035.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/vision" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/vision" }],
  }),
  component: VisionPage,
});

function VisionPage() {
  return <SiteShell htmlSections={[visionHtml, aboutHtml, leadershipHtml]} />;
}
