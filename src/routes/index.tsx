import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: function HomeRedirect() {
    // If the React router accidentally loads the homepage, 
    // force a hard refresh so Cloudflare serves your static public/index.html instead.
    useEffect(() => {
      window.location.reload();
    }, []);

    return (
      <div style={{ width: "100%", height: "100vh", backgroundColor: "#0D2149" }}></div>
    );
  },
});
