import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
      <iframe 
        src="/site.html" 
        style={{ width: "100%", height: "100%", border: "none", display: "block" }} 
        title="VTEC Business Group"
      />
    </div>
  ),
});
