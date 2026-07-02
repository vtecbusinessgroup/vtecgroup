import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

import { contactHtml } from "@/html/contact";
import { aboutHtml } from "@/html/about";
import { servicesHtml } from "@/html/services";

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
  component: ContactPage,
});

function ContactPage() {
  return <SiteShell htmlSections={[contactHtml, aboutHtml, servicesHtml]} />;
}
