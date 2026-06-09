import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import visionHtml from "@/html/vision.html?raw";
import aboutHtml from "@/html/about.html?raw";
import leadershipHtml from "@/html/leadership.html?raw";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Vision 2035 | Our Roadmap | VTEC Business Group" },
      {
        name: "description",
        content:
          "Where VTEC Business Group is headed. A purposeful 10-year roadmap building Kenya's next great diversified holding company by 2035.",
      },
      { property: "og:title", content: "Vision 2035 | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Every great empire begins with a clear destination. VTEC's 10-year roadmap to 2035.",
      },
      { property: "og:url", content: "https://vtecgroup.lovable.app/vision" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.lovable.app/vision" }],
  }),
  component: VisionPage,
});

function VisionPage() {
  return <SiteShell htmlSections={[visionHtml, aboutHtml, leadershipHtml]} />;
}
