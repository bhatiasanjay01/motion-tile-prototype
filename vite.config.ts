import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
// Project Pages URL: https://<user>.github.io/motion-tile-prototype/
const base =
  process.env.VITE_BASE_PATH ??
  (process.env.CI === "true" ? "/motion-tile-prototype/" : "/");

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "cursor/canvas": path.resolve(dir, "src/ui.tsx"),
    },
  },
});
