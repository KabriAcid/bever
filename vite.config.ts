import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    // allow specific ngrok hosts (add yours here) so the dev server accepts proxied requests
    // You can add multiple entries or use a leading dot to allow subdomains, e.g. ".ngrok-free.app"
    allowedHosts: [
      "75c09030ccd2.ngrok-free.app",
      ".ngrok-free.app",
      ".ngrok.io",
    ],
  },
});
