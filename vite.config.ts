import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
// GitHub project Pages: relative assets (./) resolve under /motion-tile-prototype/
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "cursor/canvas": path.resolve(dir, "src/ui.tsx"),
    },
  },
});
