# GED build — handoff (2026-09-17)

Work in progress in the working tree, **uncommitted**. Goal: full GED tracks, two new
English tasks, a rebuilt essay task, and saved essays with progress for student + teacher.
Authoring rules for units: the brief at the bottom of this file ("Unit brief").

## Done (code, written but NOT yet built, linted or run)

- `src/utils/proofread.js`, `src/tasks/Proofread.jsx` — **Find & Fix** (`PROOFREAD`, p33).
- `src/utils/sequence.js`, `src/tasks/Sequence.jsx` — **Order It** (`SEQUENCE`, p34).
- `src/tasks/taskRegistry.js` — both registered; ESSAY props now pass `unitId`, `essayArchive`, `onProgress`.
- `scripts/validate-entry.js` — checks `proofread`, `sequence`, essay prompt banks.
- `src/utils/essayPrompts.js` (essay may be an ARRAY = prompt bank), `essayFrames.js`
  (sentence frames + planner fields), `essayArchive.js` (`progress[track].__essays`).
- `src/utils/progressSchema.js` (`ESSAYS_KEY` reserved), `supabaseClient.js` (`meta.essay`
  upsert in `saveScore`), `views/YearDashboard.jsx` (passes `essayArchive`).
- `src/tasks/Essay.jsx` rewritten: start screen (prompt picker, practice/exam mode,
  watch-list), planner, frames pane, drafts, archive entry on score + after revision.
  Legacy (non-GED) path kept. New: `src/tasks/essay/{EssayStart,EssayPlanner,FramesPane}.jsx`,
  `src/components/essay/{EssayReport,EssayTrend}.jsx`.
- Backend (`C:\Users\bowen\Documents\Y8Science-Backend`): `api/admin/_handlers/annotateEssay.js`
  + registered in `api/admin/[action].js`; frontend `adminApi.annotateEssay`.

## Remaining — in order

1. **Registry conflict check.** Another session added tasks p35–p38 since this began.
   Confirm `taskRegistry.js` has no duplicate ids/dbKeys and p33/p34 are still free.
2. **Finish partial units** (agents were cut off by usage limits):
   - `HIST_2B`, `SCI_1B`, `SCI_2B`, `ENG_10`: missing `assessment.js` and/or `notes.js`
     (ENG_10 deliberately has no assessment). Check each `data.js` imports only files that exist.
   - Every new unit: re-read for truncation, then validate.
   - Retrofit of `ENG_0A/0B/1A/1B/1C` (PROOFREAD added, essay → 2-prompt array) is
     modified but unverified — check each has `proofread` content.
3. **Student Writing page** — `src/views/Writing.jsx` at `/writing`: list essays
   (`allEssays`), `EssayTrend`, `essayStats`, `kindTotals`, per-essay `EssayReport showText`.
   Add route in `App.jsx`, a "My Writing" card on `Home.jsx` for GED students.
4. **Teacher review** — an Essays section in `components/StudentProfileDrawer.jsx`
   (same `EssayReport` with `teacherView`) plus a note box calling `annotateEssay`.
5. **Harness** — update `src/preview-essay.jsx` (response box is now
   `textarea[data-role="response"]`; pass `unitId`, `essayArchive`, `onProgress`); add
   harnesses for Proofread / Sequence / Writing. Drive them in the browser pane.
6. `npm run lint`, `npm run validate`, `npm run build` — fix everything.
7. `npm run sync-audio` for the new units (long; run in background).
8. Docs + memory: update `docs/ged-english-lessons.md`, `docs/GED-SPRINT.md` §6 statuses,
   `docs/README.md`; write memory notes (essay archive, Find & Fix / Order It).
9. Commit, deploy backend (`npx vercel --prod --yes`) then frontend (`npm run deploy`),
   push `main`. See the deploy memory notes for the credential env vars.

## Unit brief

Same rules the agents used: `docs/GED-SPRINT.md` §4/§9, `docs/ged-unit-shape.md`,
`docs/question-quality.md`. Shapes — HIST/SCI: NOTES 10 · WORD_REC 10 | READ_COMP 20 ·
DIAGRAMS 20 | SHORT_ANSWERS 20 · ASSESSMENT 20 (gates 0/15/45). MATH: NOTES 10 ·
WORD_REC 10 | WORKBOOK 40 (or 25 + BALANCE 15) | DIAGRAMS 20 (all MCQ) · ASSESSMENT 20.
ENG editing: NOTES 10 · WORD_REC 10 | GRAMMAR_EDIT 25 · PROOFREAD 15 | SHORT_ANSWERS 10 ·
ASSESSMENT 30. Authored SVG only, everything bilingual, layout-system notes with ≥3
checks, balanced A–D keys. `proofread` / `sequence` item shapes are documented at the
top of `src/utils/proofread.js` and `src/utils/sequence.js`. Use Write/Edit, never Bash
heredocs, for content files.
