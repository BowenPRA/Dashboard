# UI/UX Polish Refactor — Working Brief

## Mission
Make the app look **more polished, consistent, and professionally made** while
**keeping the current aesthetic**. This is an evolution, not a redesign. The
Duolingo-flavoured, chunky, tactile look stays — we make it tighter, more
uniform, more responsive, and more engaging. No feature should change behaviour.

**Hard guardrails (do not break these):**
- `src/tasks/taskRegistry.js` and `src/components/trackRegistry.js` are the single
  sources of truth for tasks and tracks. Never hardcode a task id, `p*` dbKey, or
  track id elsewhere.
- `npm run validate` must stay green (it gates predeploy). `npx vite build` must
  compile clean.
- Bilingual content (content/contentVn/spoken) and the data files are content, not
  styling — don't touch them except the audio fix noted at the bottom.
- Teacher/admin security model is settled (app_metadata + backend verification) —
  don't alter auth logic.

## The current design language (preserve these tokens exactly)
There is **no design-token layer today** — `tailwind.config.js` has an empty
`theme.extend`, so every colour is an inline magic hex repeated across files. Part
of this refactor is codifying the existing values as named tokens *without
changing how they look*.

- **Brand palette (keep the hex):** blue `#1cb0f6` (border `#1899d6`, hover
  `#159bd9`), green `#58cc02` (`#58a700`), yellow `#ffc800` (`#cca000`), orange
  `#ff9600` (`#cc7800`), red `#ff4b4b` (`#cc3c3c`), purple `#ce82ff` (`#a567cc`),
  teal `#14b8a6` (`#0d9488`), indigo `#2563eb`/`#6366f1`, pink `#ec4899`
  (`#be185d`). These are mirrored in `taskRegistry` task colours and `trackRegistry`
  track themes — reference those, don't re-invent.
- **Neutrals:** slate scale; light bg `slate-50`, dark bg `slate-900`/`slate-950`,
  borders `slate-200`/`slate-800`.
- **Tactile button pattern:** `border-b-[4px]` (or 5/6) + `active:border-b-0
  active:translate-y-[4px]`, `rounded-xl`/`2xl`, `font-black uppercase
  tracking-widest`. This "pressable" feel is core to the aesthetic.
- **Cards:** `bg-white dark:bg-slate-900 rounded-[2rem] border-2
  border-slate-200 dark:border-slate-800 shadow-sm`.
- **Dark mode:** class-based (`darkMode: 'class'`), toggled via `localStorage.theme`
  and `document.documentElement.classList`. Most screens support it; some don't
  (see gaps below).
- **Ambient background blobs** (blurred colour circles) on full-page screens.

## High-leverage work, in priority order

1. **Dead animations — fix first (biggest win per effort).** `animate-in`,
   `zoom-in-95`, `slide-in-from-right-full`, `fade-in`, `slide-in-from-bottom-8`
   are used in ~19 files but **no `tailwindcss-animate` plugin is installed** and
   there are no matching keyframes, so they are silent no-ops. Install
   `tailwindcss-animate` and register it in `tailwind.config.js` `plugins`. This
   alone makes the whole app feel alive. Verify a few entrances actually animate.

2. **Design tokens.** Add the brand palette to `tailwind.config.js`
   `theme.extend.colors` with semantic names (e.g. `brand.blue`, `brand.green`, …)
   using the exact hex above. Optionally expose as CSS variables for theming. Then
   incrementally replace `bg-[#1cb0f6]` style magic strings with the tokens. Keep
   the rendered result pixel-identical.

3. **Shared UI primitives.** The same button/card/badge/modal/field markup is
   copy-pasted with slight drift everywhere — the main source of inconsistency.
   Create a small `src/components/ui/` set that codifies the existing patterns:
   `Button` (variants: primary/secondary/danger/ghost, sizes), `Card`, `Badge`,
   `Modal` (backdrop + panel, reuse the `AddStudentModal` shape), `Field`
   (label+input). `TopBar` already exists — leave it. Migrate screens to these
   incrementally, screen by screen, verifying each. Do **not** big-bang rewrite.

4. **Dark-mode coverage gaps.** `src/tasks/Essay.jsx` is essentially light-only
   (`bg-white`, `text-slate-800`, no `dark:` variants) except the timer — bring it
   to parity. Audit every task screen and view for missing `dark:` variants.

5. **Responsiveness audit.** Check every screen at mobile (375px), tablet, and
   desktop. Known dense spots: `TeacherDashboard` grid, `StudentProfileDrawer`
   (max-w-4xl drawer on small screens), `Essay` two-column layout, `Notes`
   split-panel. Ensure no horizontal overflow; tables/wide content scroll inside
   their own container.

6. **Consistency pass.** Uniform radii, spacing scale, shadow usage, font weights,
   uppercase/tracking usage, icon sizes/stroke widths. Consistent **loading** and
   **empty** states (there are several ad-hoc spinners and "no content" tiles —
   unify them). Consistent focus rings for accessibility.

## Screen checklist (audit + polish each, light + dark + mobile)
- `pages/Login.jsx`
- `views/Home.jsx` (track picker)
- `views/YearDashboard.jsx` (unit/phase cards, XP, locks)
- `views/TeacherDashboard.jsx` + `components/AddStudentModal.jsx`
- `components/StudentProfileDrawer.jsx`
- Task screens in `src/tasks/`: `Notes`, `Recognition` (Vocab), `Spell`,
  `Dictation`, `Reading`, `ShortAnswers`, `Diagrams`, `Essay`, `Assessment`,
  `Games`, `GrammarEdit`, `Workbook` placeholder.
- Shared: `components/TopBar.jsx`, `components/Feedback.jsx`.

## Architecture & process
- Work in small, verifiable increments. After each screen/primitive: `npx vite
  build` clean, and eyeball it in the browser in **both themes and at mobile
  width** (use the preview-harness approach below — the app itself sits behind
  Supabase login, so mounting a screen in isolation is often faster than logging
  in).
- Keep `npm run validate` green before any deploy.
- Reuse existing utilities; don't add heavy dependencies beyond
  `tailwindcss-animate` without a clear reason.

## Verifying visuals without a login
The real app requires Supabase auth. To see a component quickly, mount it in a
throwaway Vite entry (this pattern worked well before):
1. Create `preview-x.html` at repo root + `src/preview-x.jsx` that imports
   `./index.css` and renders the target component with mock props.
2. `preview_start` the `dashboard` launch config (it auto-picks a free port; the
   real Vite port prints in `preview_logs` — navigate there at
   `/Dashboard/preview-x.html`).
3. Toggle dark by adding `dark` to `<html>`; test at 375px via `resize_window`.
4. **Delete the harness files when done** so they never bundle.

## Slide-audio off-by-one — ALREADY FIXED (do not redo)
This was fixed from the ground up on 2026-07-24. **Slide audio is now derived from
slide position** by `slideAudioUrl` (`src/utils/assetPaths.js`), applied in the
NOTES `buildPool` in `taskRegistry.js` — the one place the mapping lives. Do NOT
hardcode `audio:` in `notes.js` anymore; the 153 old hardcoded (and off-by-one)
fields were stripped from all 16 notes files. The generator narrates the title as
a fallback so no slide is ever silent, and `validate-entry.js` now checks one
`slide_<unit>_<n>.mp3` per slide position. If you add/remove/reorder slides, just
run `PYTHONIOENCODING=utf-8 npm run sync-audio` — numbering takes care of itself.

## Deploy (when the user approves shipping)
- Frontend: `npm run deploy` then `git push origin main`. Pushing/gh-pages needs
  the credential workaround: prefix with `$env:GCM_INTERACTIVE="auto";
  $env:GIT_TERMINAL_PROMPT="1";` and run with the sandbox disabled.
- No backend changes are expected in this refactor.
