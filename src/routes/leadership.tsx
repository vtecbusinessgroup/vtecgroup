import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { teamHtml } from "@/html/team";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership Team | VTEC Business Group" },
      {
        name: "description",
        content: "Meet the executive committee driving VTEC's multi-service business growth and Vision 2035 execution.",
      },
    ],
  }),
  component: LeadershipComponent,
});

function LeadershipComponent() {
  return (
    <SiteShell htmlSections={[teamHtml]} />
  );
}
