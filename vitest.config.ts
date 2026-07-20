import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "happy-dom",
    include: ["**/*.test.ts", "**/*.test.tsx"],
    globals: true,
    setupFiles: [],
  },
});
