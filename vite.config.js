import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
// https://vitejs.dev/config/#server-open
export default defineConfig({
    plugins: [react()],
    server: { open: true }
});
