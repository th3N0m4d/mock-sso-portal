/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = "/mock-sso-portal/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
  test: {
    globals: true,
    environment: "jsdom",
  },
});
