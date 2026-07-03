import { createFileRoute } from "@tanstack/react-router";
// IMPORTANT: Ensure this path correctly points to where your ChatBot.tsx file is located!
// It might be "../components/ChatBot" or just "../ChatBot" depending on your folders.
import { ChatBot } from "../components/ChatBot"; 

export const Route = createFileRoute("/")({
  component: () => (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
      
      {/* 1. This loads your 4,200-line masterpiece */}
      <iframe 
        src="/site.html" 
        style={{ width: "100%", height: "100%", border: "none", display: "block" }} 
        title="VTEC Business Group"
      />

      {/* 2. This loads your original React Chatbot on top of the site */}
      <ChatBot />
      
    </div>
  ),
});
