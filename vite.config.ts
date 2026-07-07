import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    !isSsrBuild && cloudflare({
  configPath: "./wrangler.jsonc",
  viteEnvironment: { name: "ssr" },
}),
    tanstackStart({
      server: {
        entry: "./src/server.ts",
      },
    }),
    viteReact(),
  ].filter(Boolean),
  resolve: {
    dedupe: ["react", "react-dom"],
  }
}));