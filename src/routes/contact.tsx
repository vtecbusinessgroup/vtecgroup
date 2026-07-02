import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | VTEC Business Group" },
      {
        name: "description",
        content:
          "Get in touch with VTEC Business Group. Whether you're a student, entrepreneur, business, or potential partner — we're ready to connect and build.",
      },
      { property: "og:title", content: "Contact Us | VTEC Business Group" },
      {
        property: "og:description",
        content:
          "Reach VTEC Business Group in Nairobi, Kenya. Let's build together.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vtecgroup.co.ke/contact" },
    ],
    links: [{ rel: "canonical", href: "https://vtecgroup.co.ke/contact" }],
  }),
  component: () => (
    <iframe 
      src="/site.html#contact" 
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }} 
      title="Contact Us | VTEC Business Group"
    />
  ),
});
