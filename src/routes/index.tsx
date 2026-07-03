import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: function HomeRedirect() {
    // If React accidentally loads, force a refresh so Cloudflare 
    // natively serves your public/index.html static file instead.
    useEffect(() => {
      window.location.reload();
    }, []);

    return (
      <div style={{ width: "100%", height: "100vh", backgroundColor: "#0D2149" }}></div>
    );
  },
});
