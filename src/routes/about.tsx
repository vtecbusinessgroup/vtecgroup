import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import aboutHtml from "@/html/about.html?raw";
import visionHtml from "@/html/vision.html?raw";
import leadershipHtml from "@/html/leadership.html?raw";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | VTEC Business Group" },
      {
        name: "description",
        content:
          "Learn how VTEC Business Group is building Kenya's next great holding company — established October 2025, Nairobi. A modern, multi-service entity connecting education, trade, empowerment and consultancy.",
      },
      { property: "og:title", content: "About Us | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "VTEC Business Group is a modern, multi-service holding entity founded in October 2025 in Nairobi, Kenya.",
      },
      { property: "og:url", content: "https://vtecgroup.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <SiteShell htmlSections={[aboutHtml, visionHtml, leadershipHtml]} />;
}
