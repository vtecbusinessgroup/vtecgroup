import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense, useState, useEffect } from "react";

// 1. DYNAMIC IMPORT: The server is now blind to this file. It will not crash.
const ChatBot = React.lazy(() => 
  import("../components/ChatBot").then((module) => ({ default: module.ChatBot }))
);

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [isClient, setIsClient] = useState(false);

  // 2. CLIENT GATE: Forces React to wait until it is safely in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Renders the institutional VTEC blue during the millisecond server load
    return <div style={{ width: "100%", height: "100vh", backgroundColor: "#0D2149" }} />;
  }

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
      <iframe 
        src="/site.html" 
        style={{ width: "100%", height: "100%", border: "none", display: "block" }} 
        title="VTEC Business Group"
      />
      
      {/* 3. SUSPENSE: Safely resolves the lazy import */}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
}
