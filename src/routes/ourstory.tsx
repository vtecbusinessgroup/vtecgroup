import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { storyHtml } from "@/html/ourstory"; // Updated import

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | VTEC Business Group" },
      {
        name: "description",
        content: "From a single idea to an empire in motion. Discover how VTEC Business Group was built and explore our 10-year roadmap for the Kenyan economy.",
      },
    ],
  }),
  component: OurStoryComponent,
});

function OurStoryComponent() {
  return (
    <SiteShell htmlSections={[storyHtml]} />
  );
}
