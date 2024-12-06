import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import { resolve } from "path";

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
        target:
          process.env.VITE_MODE === "production"
            ? process.env.VITE_PASSTHESALT_SERVER
            : "http://localhost:9000", // Local development URL
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
