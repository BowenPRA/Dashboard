import { defineConfig } from 'vite';

// Builds scripts/validate-entry.js as a node bundle so the validator can load the
// real content graph (import.meta.glob) and still use fs. See `npm run validate`.
export default defineConfig({
  logLevel: 'error',
  build: {
    ssr: true,
    minify: false,
    emptyOutDir: false,
    outDir: 'node_modules/.validate',
    rollupOptions: {
      input: 'scripts/validate-entry.js',
      output: { entryFileNames: 'validate.mjs' },
    },
  },
});
