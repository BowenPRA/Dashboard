# French on the Year 7 tracks

`Y7_MATH` and `Y7_SCI` offer **EN / VN / FR**. A track opts in with
`french: true` in `src/components/trackRegistry.js`; every other bilingual
track stays EN / VN, and a `bilingual: false` track stays English. This matches
the classroom decks (`../lessons`, commit `fc72bb0`), which put an FR button on
every Year 7 lesson — and whose French the scripts below reuse.

## How a screen knows

- `src/utils/lang.js` — `langsFor(cfg)`, `tr(lang, en, vn, fr)`, `field(obj, key, lang)`,
  `frKeyOf(vnKey)`, `pickTable(table, lang)`, `nextLang`, `resolveLangs`.
  A missing twin falls back to **English**, never to the other translation.
- `src/tasks/taskRegistry.js` exports `langsOf(track)`. The host passes it to
  **every** task as the `langs` prop — `YearDashboard.jsx` and the Y7 preview
  harnesses — so no registry entry has to.
- `src/hooks/useLang.js` — `const { lang, setLang, langs, toggleLang } = useLang({ langs, bilingual })`.
  The screen opens in English (this is a CLIL app; English first, every time),
  and `toggleLang` steps EN → VN → FR → EN. Pass it straight to
  `TopBar onLangToggle` — it is `undefined` when there is nothing to switch to.

## Naming the French twin

The French sits beside the Vietnamese it mirrors, named mechanically by
`frKeyOf`:

| Vietnamese | French |
|---|---|
| `titleVn`, `textVn`, `promptVn`, `expVn` … (suffix) | `titleFr`, `textFr`, `promptFr`, `expFr` |
| `vn`, `vnDef`, `vnSent`, `vnTitle`, `vnText`, `vnTranslation` (prefix) | `fr`, `frDef`, `frSent`, `frTitle`, `frText`, `frTranslation` |
| `{ en, vn }` tables | `{ en, vn, fr }` |
| `pick(lang, 'English', 'Tiếng Việt')` | `pick(lang, 'English', 'Tiếng Việt', 'Français')` (pick = `tr`) |

Arrays (`solutionVn`, `textPartsVn`) get an array of the same length.

## Writing the French

- **Maths is identical.** Every `$…$` / `$$…$$` span is copied character for
  character from the English; only words inside `\text{…}` may be translated.
  Numbers, decimal POINTS (not commas — the course and its exams use points),
  units and symbols stay as the English has them. The validator and
  `apply.mjs` refuse French whose maths differs.
- Translate the **English**; the Vietnamese is a cross-check, not the source.
- Year 7 register: short sentences, `tu` for instructions to the student
  ("Clique", "Écris", "Trouve"), the standard French school term for each
  concept (entier, multiple, diviseur, nombre premier, expression, formule,
  équation, cellule, noyau, membrane, particule, état de la matière, fusion,
  ébullition, évaporation, condensation, solidification…).
- Where the Vietnamese keeps an English key word in brackets — "chu kì (period)"
  — do the same in French: "une période (period)". The English word is what
  the exam uses.
- Keep `**bold**`, `\n`, `{blank}` markers, emoji and arrows exactly where the
  English has them.
- French runs ~15–25% longer than English. On buttons, chips, badges, tier
  names and table headers, prefer the shorter wording ("Vérifier", not
  "Vérifier ma réponse").
- When the classroom deck already translated the same English sentence, reuse
  its French (`tm` in the extract output) unless it does not fit here.

## Filling a unit — `scripts/french/`

```bash
node scripts/french/extract.mjs Y7_SCI/U02_5 --count            # what is left
node scripts/french/extract.mjs Y7_SCI/U02_5 --out todo.json     # the work list
node scripts/french/apply.mjs fr.json                             # write it in
```

`extract` lists every Vietnamese twin (and every `pick(lang, en, vn)` call)
with no French: `{ id, line, key, en, vn, tm? }`. Write `fr.json` as
`{ "<file>": { "<id>": "French" | ["…", "…"] | { "js": "<source>" } } }` —
**with the Write tool, never a shell heredoc** (the shell halves backslashes, and
`\frac` becomes a form feed). `apply` inserts `keyFr: '…'` after the Vietnamese
line (or a fourth argument into the call), never touching English or
Vietnamese, and refuses wrong shapes and changed maths. Ids are stable, so a
unit can be done file by file.

Done when `extract --count` says 0 **and** the unit's own code has no
two-language branch left:

- a widget's `const pick = (lang, en, vn) => …` becomes
  `import { tr as pick } from '../../../utils/lang';`
- `lang === 'vn' ? 'a' : 'b'` becomes `tr(lang, 'b', 'a', 'c')`
- a helper that builds objects from shorthand (`const keyWord = (text, textVn) => ({ …, text, textVn })`)
  takes a `textFr` too, and each call passes it.

## What checks it

`npm run validate` runs `src/utils/langCheck.js` on every unit of a
`french: true` track: a missing or empty French twin, an array of the wrong
length, French maths that differs from the English, and any `=== 'vn'` test or
two-language picker left in the unit's own files are all errors.

Narration is English only — the audio generator reads `title`, `content` …
by exact name, so `…Fr` fields never reach it, and adding French needs no
`sync-audio`.
