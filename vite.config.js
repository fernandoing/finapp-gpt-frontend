import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define the port based on NODE_ENV
const port = process.env.NODE_ENV === 'production' ? 8080 : 5173;

// Construct configuration conditionally
const config = {
  plugins: [react()],
  ...(process.env.NODE_ENV === 'production' && {
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
  }),
};

export default defineConfig(config);