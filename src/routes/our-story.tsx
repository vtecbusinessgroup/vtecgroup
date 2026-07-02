import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { storyHtml } from "@/html/story"; 

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | VTEC Business Group" },
      {
        name: "description",
        content: "From a single idea to an empire in motion. Discover how VTEC Business Group was built and explore our 10-year roadmap for the Kenyan economy.",
      },
      { property: "og:title", content: "Our Story | VTEC Business Group" },
      { property: "og:description", content: "From a single idea to an empire in motion. Discover how VTEC Business Group was built." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/our-story" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/our-story" }],
  }),
  component: OurStoryComponent,
});

function OurStoryComponent() {
  return (
    <SiteShell htmlSections={[storyHtml]} />
  );
}
