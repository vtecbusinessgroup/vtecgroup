import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

// Updated imports pointing to the new TypeScript files
import { aboutHtml } from "@/html/about";
import { visionHtml } from "@/html/vision";
import { leadershipHtml } from "@/html/leadership";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | VTEC Business Group" },
      {
        name: "description",
        content:
          "Learn how VTEC Business Group is building Kenya's next great multi-service brand — established October 2025, Nairobi. A modern entity connecting education, trade, empowerment and consultancy.",
      },
      { property: "og:title", content: "About Us | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "VTEC Business Group is a modern, multi-service brand founded in October 2025 in Nairobi, Kenya.",
      },
      { property: "og:url", content: "https://vtecgroup.co.ke/about" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <SiteShell htmlSections={[aboutHtml, visionHtml, leadershipHtml]} />;
}
