import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import autoprefixerPlugin from "autoprefixer";
import tailwindcssPlugin from "tailwindcss";

export default defineConfig(() => ({
  base: "",
  build: {
    outDir: "./dist",
  },
  root: "./src/ui",
  plugins: [react()],
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixerPlugin, tailwindcssPlugin],
    },
  },
}));
