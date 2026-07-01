import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Standalone TanStack Start + Cloudflare Workers config — no Lovable wrapper.
// Plugin order matters: cloudflare() first, tanstackStart() before viteReact().
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    !isSsrBuild && cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      server: {
        entry: "./src/server.ts",
      },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ].filter(Boolean),
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  // Performance: Splitting large chunks to avoid 500kB+ build warnings
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'vendor-charts';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@tanstack')) return 'vendor-router';
            if (id.includes('@radix-ui')) return 'vendor-radix';
            return 'vendor-core';
          }
          if (id.includes('src/html/')) {
            return 'html-content';
          }
        }
      }
    }
  },
  server: {
    port: 3000,
  },
}));
