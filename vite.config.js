import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv"; // Import dotenv
import { resolve } from "path";

// Manually load .env file (optional, since Vite handles it)
config();

const apiUrl = process.env.VITE_API_URL; // This should be 'https://passthesalt-backend-api.onrender.com'
const viteMode = process.env.VITE_MODE; // This can be 'development' or 'production'

console.log(process.env); // You can check if the env variables are loaded correctly

export default defineConfig({
  define: {
    "process.env": process.env, // Allows process.env to be accessed within the app
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
        target: viteMode === "production" ? apiUrl : "http://localhost:9000", // Use actual backend URL for production or localhost for dev
        changeOrigin: true, // Ensures the host header is updated to the target's host
        secure: false, // Set to true if using https for localhost or backend
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes /api prefix before forwarding
      },
    },
  },
});
