import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import { resolve } from "path";
const viteMode = import.meta.env.VITE_MODE;
const apiUrl = import.meta.env.VITE_API_URL;

config();

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  // --- this config enables jsx at js constant
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: viteMode === "production" ? apiUrl : "http://localhost:9000", // Local development URL
        changeOrigin: true,
        secure: false, // Only for self-signed certs in development
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: rewrite the path (if needed)
      },
      "/admin": {
        target: "http://localhost:8081/",
        changeOrigin: true,
      },
    },
  },
});
