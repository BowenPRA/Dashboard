import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Dashboard/',
  build: {
    rollupOptions: {
      output: {
        // This splits your heavy libraries into a separate file called 'vendor'
        // Browsers can cache this file, making your app load faster for students!
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Optional: Increases the limit slightly just to be safe
    chunkSizeWarningLimit: 800,
  },
})