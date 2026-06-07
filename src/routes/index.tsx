import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VTEC Business Group | Visionary Trade, Empowerment & Consultancy" },
      {
        name: "description",
        content:
          "Kenya's dynamic holding entity powering financial education, strategic consultancy, and commerce. Empowering Kenya. One Venture at a Time.",
      },
      { property: "og:title", content: "VTEC Business Group" },
      { property: "og:description", content: "Empowering Kenya. One Venture at a Time." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}