import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Standalone TanStack Start + Cloudflare Workers config — no Lovable wrapper.
// Plugin order matters: cloudflare() first, tanstackStart() before viteReact().
export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      // Keep using src/server.ts (your SSR error-capture wrapper) as the
      // server entry, same as the Lovable config's `server: { entry: "server" }`.
      server: {
        entry: "./src/server.ts",
      },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  resolve: {
    // Prevents duplicate React instances when multiple packages resolve React separately.
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3000,
  },
});
