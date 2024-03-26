import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const port = process.env.NODE_ENV === 'production' ? 8080 : 5173;

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: port,
    strictPort: true,
  },
  server: {
    port: port,
    strictPort: true,
    host: true,
    origin: `http://0.0.0.0:${port}`,
  }
});
