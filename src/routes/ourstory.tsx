import { createFileRoute } from "@tanstack/react-router";

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
  component: () => (
    <iframe 
      src="/site.html" 
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }} 
      title="Our Story | VTEC Business Group"
    />
  ),
});
