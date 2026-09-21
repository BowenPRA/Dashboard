import { defineConfig } from 'vite';

// Builds scripts/validate-entry.js as a node bundle so the validator can load the
// real content graph (import.meta.glob) and still use fs. See `npm run validate`.
//
// VALIDATE_OUT moves the bundle: git worktrees share one node_modules through a
// junction, so two worktrees validating at once would overwrite each other's
// bundle and each validate the OTHER's content. Give each its own:
//   VALIDATE_OUT=.validate-t01 npx vite build --config vite.validate.config.js
//   node .validate-t01/validate.mjs
// The validator reads public/ from the working tree (process.cwd()), never from
// the bundle, so copying public/ into the bundle was only ever wasted time.
export default defineConfig({
  logLevel: 'error',
  build: {
    ssr: true,
    minify: false,
    emptyOutDir: false,
    outDir: process.env.VALIDATE_OUT || 'node_modules/.validate',
    copyPublicDir: false,
    rollupOptions: {
      input: 'scripts/validate-entry.js',
      output: { entryFileNames: 'validate.mjs' },
    },
  },
});
