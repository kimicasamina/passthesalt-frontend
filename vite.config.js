import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv"; // Import dotenv
import { resolve } from "path";

// Manually load .env file (optional, since Vite handles it)
config();

const apiUrl = process.env.VITE_API_URL;
const viteMode = process.env.VITE_MODE; // Ensure the variables are accessed via process.env

console.log(process.env); // You can check if the env variables are loaded correctly

export default defineConfig({
  define: {
    // Allow process.env to be accessed in the app
    "process.env": process.env,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: viteMode === "production" ? apiUrl : "http://localhost:9000",
        changeOrigin: true,
        secure: false, // Use true for https if needed
        rewrite: (path) => path.replace(/^\/api/, ""), // Optionally rewrite the path if needed
      },
    },
  },
});
