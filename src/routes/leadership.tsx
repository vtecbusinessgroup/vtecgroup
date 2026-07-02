import { createFileRoute } from "@tanstack/react-router";

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
  component: () => (
    <iframe 
      src="/site.html#leadership" 
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }} 
      title="Leadership Team | VTEC Business Group"
    />
  ),
});
