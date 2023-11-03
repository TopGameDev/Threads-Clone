import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Get rid of the CORS Error
    proxy: {
      "/api": {
        target: "https://threads-backend-5s2k.onrender.com",
        changeOrigin: true,
        secure: false,
        AccessControlAllowOrigin: true
      },
    },
  },
});
