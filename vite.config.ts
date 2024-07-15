import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local",
      localsConvention: "camelCase",
    },
  },
  build: {
    target: "es2020",
  },
});
