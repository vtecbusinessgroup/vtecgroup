import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | VTEC Business Group" },
      {
        name: "description",
        content:
          "Learn how VTEC Business Group is building Kenya's next great multi-service brand. A modern entity connecting education, trade, empowerment, and strategic consultancy.",
      },
      { property: "og:title", content: "About Us | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "VTEC Business Group is a modern, multi-service brand founded in October 2025 in Nairobi, Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/about" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/about" }],
  }),
  component: () => (
    <iframe 
      src="/site.html#about" 
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }} 
      title="About Us | VTEC Business Group"
    />
  ),
});
