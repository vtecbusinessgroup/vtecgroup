import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Standalone TanStack Start + Cloudflare Workers config.
// Plugin order matters: cloudflare() first, tanstackStart() before viteReact().
export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
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
