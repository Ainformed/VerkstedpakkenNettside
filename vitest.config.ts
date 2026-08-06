import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    // jsdom for alt, også ren logikk. Task 4 trenger det for komponenten,
    // og ett miljø for hele suiten er mindre å holde i hodet enn
    // per-fil-matching (som dessuten er deprecated i nyere vitest).
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
