import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// https://vitejs.dev/config/#server-open
export default defineConfig({
  plugins: [react()],
  server: { open: true },
});
