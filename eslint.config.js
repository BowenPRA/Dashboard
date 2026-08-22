import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        // Vite substitutes `process.env` at build time and the two readers of it
        // (supabaseClient.js) guard with `typeof process !== 'undefined'` so the
        // bare dev server doesn't throw. It is a real global here, not a typo.
        process: 'readonly',
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // The automatic JSX runtime means `React` never needs to be in scope, but
      // an unused *destructured* binding is still worth flagging.
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^React$',
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
      }],
    },
  },
  {
    // Node scripts: the validator and the SVG audit run outside the browser.
    files: ['scripts/**/*.{js,mjs}', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    // Dev-only harnesses (preview-*.html entry points), excluded from the
    // production build — only index.html is a build input.
    //
    // They call createRoot rather than exporting a component, so fast refresh
    // does not apply; and the benchmark harness deliberately reads mutable refs
    // and a frame clock while rendering, because reporting live frame timings is
    // the entire point of it. Neither concern applies to shipped code.
    files: ['src/preview-*.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/purity': 'off',
    },
  },
])
