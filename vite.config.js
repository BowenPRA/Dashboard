import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Dashboard/',
  // One dependency cache per checkout. A git worktree shares this repo's
  // node_modules through a junction, and with the one default `.vite` cache two
  // dev servers in two checkouts re-optimise over each other and never become
  // ready (2026-10-06).
  cacheDir: `node_modules/.vite-${path.basename(process.cwd())}`,
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