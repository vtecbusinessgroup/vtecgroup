import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Generates a clean corporate canvas matches your theme color during the SSR stage
    return <div className="min-h-screen bg-[#0D2149]" />;
  }

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
      <iframe 
        src="/site.html" 
        style={{ width: "100%", height: "100%", border: "none", display: "block" }} 
        title="VTEC Business Group"
      />
    </div>
  );
}
