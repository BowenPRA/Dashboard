# Content Archive

Files here are **outside `src/`**, so Vite's `import.meta.glob` and the bundler never
see them. Nothing in this folder ships to students.

## `unmigrated-lessons/`

16 complete lessons written in the older authoring format. Each has 10 bilingual
vocabulary words with phonetics, ~5 short-answer questions, 3 passages, 10 dictation
lines and an essay prompt. They are invisible to the app because they lack a `meta`
block (so the loader skips them) and use quoted JSON-style keys.

To bring one back, it needs:

1. a `meta` block — `{ id, title, desc, track, icon }`
2. a `phases` array — see any unit in `src/data/*/*/data.js`
3. an `assessment.js` — none of these have one; this is the real authoring work
4. unquoted keys, to match current house style

| File | Topic | Note |
|---|---|---|
| `Y8_1A.js` | Respiratory System | |
| `Y8_1B.js` | Cellular Respiration | |
| `Y8_2A.js` | Dissolving & Solutions | |
| `Y8_3A.js` | Forces & Friction | no essay |
| `Y9_1A.js` | Photosynthesis | |
| `Y9_1B.js` | Carbon Cycle | |
| `Y9_4A.js` | Root Hair & Transport | no essay |
| `StudyGuide1_RenalSystem.js` | Renal System | |
| `StudyGuide2_Genetics.js` | Genetics | |
| `GED_1A.js` | Colonies & Taxation | overlaps live `GED_HISTORY/HIST_1A` — merge, don't migrate |
| `GED_1B.js` | Constitution & Government | |
| `GED_1C.js` | Continental Congress | |
| `GED_2A.js` | Civil War | |
| `GED_2B.js` | Emancipation & Generals | |
| `ESL_1A.js` | Basic vocab (Plant, Sun) | beginner unit |
| `ESL_1B.js` | Scientific Method | overlaps live `ESL/CAMP_1A` — merge, don't migrate |

Audio for the `GED_1A`–`GED_2B` history units already exists at
`public/audio/_staging_history/` (254 files). It was generated before those lessons
were shelved, and moves into `public/audio/GED_HISTORY/<UNIT_ID>/` when they migrate.
