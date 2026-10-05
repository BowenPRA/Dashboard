# Year 7 Science 2.3, 2.4, 2.8 — Explain It, Water Journey, pH Lab

The self-study units that close Unit 2: **2.3 Explaining changes of state**,
**2.4 The water cycle** and **2.8 Acids and bases** — the three classroom
lessons (`C:\Users\bowen\lessons\content\y7-science\U02_3`, `U02_4`, `U02_8`)
that had no Dashboard twin. They keep the 2.5–2.7 shape of
[particle-engines.md](particle-engines.md) and [ENGAGEMENT-PLAN.md](ENGAGEMENT-PLAN.md),
and each adds one generative task (never the same twice) and one deck activity
type built on the same engine.

Read first: [../classroom-dashboard-pairing.md](../classroom-dashboard-pairing.md)
(the ten reduction rules), [../y7-science-course.md](../y7-science-course.md)
(the per-file recipe), [particle-engines.md](particle-engines.md) §4 (deck
density), and the newest unit built to this standard, `src/data/Y7_SCI/U02_7`
with its plan [plans/U02_7.md](plans/U02_7.md).

---

## 1. The unit shape (all three)

| Phase | Gate | Task | XP |
|---|---|---|---|
| concept | 0 | NOTES — interactive deck | 20 |
| concept | 0 | WORD_REC — the deck's key words | 15 |
| practice | 25 | WORKBOOK — mixed-type Practice, 10–12 Q | 20 |
| practice | 25 | **EXPLAIN_IT (2.3) / WATER_JOURNEY (2.4) / PH_LAB (2.8)** | 20 |
| practice | 25 | LABEL_IT — 2–3 of the unit's diagrams | 15 |
| practice | 25 | READ_COMP — 3 cloze passages | 15 |
| practice | 25 | SHORT_ANSWERS — 4 reasoning Q, AI-marked | 20 |
| mastery | 80 | ASSESSMENT — 8 MCQ, 10 minutes | 20 |
| mastery | 80 | GAMES | 0 |

145 XP available, capped at 100. Gates 25 of 35 (71%), 80 of 125 (64%) — under
the 80% rule. Keys: `EXPLAIN_IT p73`, `WATER_JOURNEY p74`, `PH_LAB p75`
(**next free dbKey: p76**).

---

## 2. Explain It (`EXPLAIN_IT`, p73) — 2.3

**The skill.** Section 2.3 is one reasoning chain told five ways: *heat energy is
transferred to (or away from) the particles → they vibrate / move more (or less)
→ they overcome the attractive forces (or the forces pull them together) → so
the substance expands / melts / evaporates / boils (or condenses / freezes)*.
The exam marks it link by link, and the misconceptions are well known: *the
particles get bigger*, *the particles melt*, *cold energy goes in*, *the
particles stop moving*, *the particles disappear*. The task makes a student
build the chain, find the broken link, and see the particle picture — with a
fresh scenario every round.

**Engine** `src/utils/stateChain.js` (pure, no React):

- `SCENARIOS` — 30+ everyday situations, bilingual, each tagged with its change:
  `expand` (a metal bridge in summer, railway rails, a jar lid under hot water,
  sagging power lines, a thermometer's liquid rising), `melt` (ice in iced tea,
  chocolate in a pocket, butter in a hot pan, candle wax), `freeze`, `evaporate`
  (a puddle, washing on the line, sweat, a mopped floor), `boil` (a kettle, a
  pot of phở broth), `condense` (the bathroom mirror, a glass of iced coffee, a
  pot lid, dew). Vietnamese contexts where natural. Only changes the deck
  teaches; `contract` only if the deck uses the word.
- `LINKS` — the canonical links, each `{ id, en, vn }`, and `chainFor(change)`
  → the ordered link ids (3 for expand, 4 for the state changes). Word the links
  exactly as the deck's write notes do ("Heat energy is transferred to the
  particles." …), so the task rehearses the sentence the student copied.
- `TRAPS` — misconception links `{ id, en, vn, why, whyVn, fits: [changes] }`:
  the wrong-direction link (heat transferred *away* in a heating change, and
  the reverse), *the particles get bigger / smaller*, *the particles melt*,
  *cold energy is transferred to the particles*, *the particles stop moving*,
  *the particles disappear*, *the attractive forces get stronger when heated*.
  Every trap carries the one sentence that says why it is wrong.
- `stateBoxSvg(state, { spacing, size, seed })` — a drawn box of particles:
  `solid` (regular lattice, touching), `solidHot` (the same lattice, a little
  more spaced, with vibration marks), `liquid` (touching, irregular), `gas`
  (far apart, motion lines). Particles are the **same size** in every state;
  the trap picture draws them **bigger** — that is the point.
- `makeExplainSession(cfg, seed)` → rounds; `markRound(round, answer)` →
  `{ correct, perPart, explain }`; `checkExplainConfig(cfg)` → string[]
  (validator: unknown modes, rounds out of range, and draw ≥ 50 rounds per mode
  proving each round's own correct answer is accepted and each trap rejected);
  `checkChainActivity(activity)` → string[].

**Modes** (config `explainIt: { title, titleVn, modes, rounds: 10 }`):

| mode | the round |
|---|---|
| `build` | a scenario; fill the 3–4 slots in order from a bank of the right links (shuffled) plus 2 traps. Right when every slot is right. The verdict shows the full chain and names each trap chosen |
| `fix` | a whole chain with one link swapped for a trap (or for the wrong-direction link); tap the broken link, then choose its replacement from three. Right when both are |
| `name` | a scenario; two parts — heat energy *to* or *away from* the particles, and which change (expansion · melting · freezing · evaporation · boiling · condensation) |
| `picture` | a scenario and the *before* box; choose the *after* box from three drawn boxes — the right one, the "particles got bigger" trap, and a wrong state |

**Deck activity** `chain` (in `src/components/notes/ChainActivity.jsx`): one
`build` (or `fix`) round on a slide, fixed by the activity —
`{ id, type: 'chain', ask: 'build' | 'fix', scenario: '<SCENARIOS id>', trap?: '<TRAPS id>', prompt, promptVn, explain, explainVn }`.
The bank's order is seeded by the activity id so the slide looks the same on
every visit.

---

## 3. Water Journey (`WATER_JOURNEY`, p74) — 2.4

**The skill.** The book's eight words (atmosphere, water vapour, transpiration,
precipitation, open water, surface run-off, groundwater, the water cycle) plus
evaporation and condensation from 2.2 — *where* the water is, *which process*
moves it, and *what the particles do* on the way. The classroom game
WhichStage (everyday sentence → evaporation / transpiration / condensation /
precipitation) already proved the traps: mist and breath are *condensation*
(you can see them, so they are liquid); a rice field losing water through its
plants is *transpiration*.

**Engine** `src/utils/waterCycle.js`:

- `PLACES` — the stores, bilingual: open water (sea, lakes, rivers), the
  atmosphere (water vapour), clouds (tiny drops), the land surface, groundwater,
  plants. Use the deck's wording.
- `PROCESSES` — the arrows, each `{ id, from, to, en, vn, state: { from, to } | null, heat: 'in' | 'out' | null, why, whyVn }`:
  evaporation (open water → atmosphere; liquid → gas; heat in), transpiration
  (plants → atmosphere), condensation (atmosphere → clouds; gas → liquid; heat
  out), precipitation (clouds → open water / land), surface run-off (land →
  open water), soaking in to groundwater (land → groundwater), groundwater back
  to open water / up to plants — **only the arrows the deck draws**, named as the
  deck names them. Precipitation is not itself a change of state (rain falls as
  liquid); say so carefully for snow and hail.
- `cycleSvg({ highlight, hit, labels })` — the engine's own cycle diagram
  (sea, land, cloud, a plant, groundwater, the Sun) with every arrow drawn as a
  path whose midpoint is a tap target. It is the picture for every round, so it
  must read at 375 px wide.
- `EVERYDAY` — 20+ sentences, the WhichStage cards and more, each with its
  process and a one-line why.
- `makeJourneySession`, `markRound`, `checkJourneyConfig` (draw ≥ 50 rounds per
  mode; every `journey` set has at least one valid order and the marker accepts
  every valid order), `checkCycleActivity`.

**Modes** (config `waterJourney: { title, titleVn, modes, rounds: 10 }`):

| mode | the round |
|---|---|
| `arrow` | one arrow lit on the diagram; choose its process from four |
| `tap` | a process named; tap its arrow |
| `journey` | a water particle starts at A and ends at B; put 3–4 shuffled processes in the order it meets them. **Marked by walking the graph** — any order that is a valid path from A to B using every process is right (derive, don't store) |
| `state` | a process; what happens to the water — liquid → gas, gas → liquid, or no change of state — and is heat energy taken in or given out (or neither) |
| `everyday` | an everyday sentence; which process is it |

**Deck activity** `cycle` (in `src/components/notes/CycleActivity.jsx`):
`{ id, type: 'cycle', ask: 'tap' | 'arrow' | 'journey', process?, from?, to?, steps?, prompt, promptVn, explain, explainVn }`
— the same diagram, one round fixed by the activity.

---

## 4. pH Lab (`PH_LAB`, p75) — 2.8

**The skill.** Sort a liquid into acid, neutral or alkali by an indicator, not by
looking; read litmus both ways; read the pH scale and its universal-indicator
colours; know that the closer to the end, the stronger (and more dangerous —
*both* ends burn); and say what neutralisation does and where it is used. The
classroom PhDipper widget and the Acid Snap game are the starting point.

**Engine** `src/utils/phLab.js`:

- `SCALE` — the universal-indicator colour for every pH **exactly as the
  classroom `PH_SCALE` diagram draws it** (same range, same colours), plus
  `kindOf(pH)` → `acid` | `neutral` | `alkali` and `strengthOf(pH)` (strong /
  weak acid, neutral, weak / strong alkali — use the deck's words).
- `SUBSTANCES` — 25+ everyday liquids, bilingual, each with a pH — **only values
  the deck uses or that are textbook-standard** (lemon juice, vinegar, cola,
  orange juice, coffee, milk, pure water, salt water, sea water, baking soda,
  toothpaste, soap, indigestion tablets, ammonia cleaner, bleach, oven
  cleaner, stomach acid, …). Avoid ones whose pH a textbook would argue about.
- `LITMUS` — blue litmus turns red in an acid; red litmus turns blue in an
  alkali; a neutral liquid changes neither.
- `NEUTRALISE` — the deck's everyday cases (indigestion and an antacid, …): the
  problem, what to add, and which way the pH moves (towards 7). Take them from
  the deck's `NEUTRAL_LIFE` diagram; add nothing the deck would contradict.
- `tubeSvg(pH)`, `stripSvg(...)` — a test tube of indicator, a litmus strip.
- `makePhSession`, `markRound`, `checkPhConfig` (draw ≥ 50 rounds per mode),
  `checkPhActivity`.

**Modes** (config `phLab: { title, titleVn, modes, rounds: 10 }`):

| mode | the round |
|---|---|
| `classify` | a substance and its pH; acid, neutral or alkali |
| `colour` | a pH; tap its universal-indicator colour on the strip — or the reverse: a tube's colour; tap the pH range it could be |
| `litmus` | a substance (named, with its kind or pH); what does blue litmus do, and red litmus — *turns red · turns blue · no change* for each |
| `strength` | two or three substances with their pH; tap the strongest acid (or alkali), or put them in order from most acidic |
| `neutralise` | a beaker of acid (or alkali) with indicator; add drops of the other one at a time and **stop when it is neutral**: the tube walks through the scale colours from the generated start pH; overshooting is wrong. Or an everyday case: what would you add, and which way does the pH go |

**Deck activity** `ph` (in `src/components/notes/PhActivity.jsx`):
`{ id, type: 'ph', ask: 'colour' | 'place' | 'litmus' | 'drops', substance?, pH?, prompt, promptVn, explain, explainVn }`
— `place` drags a substance onto the scale (exact pH, or within ±1 if the
activity says so).

---

## 5. Shared rules for all three

- **Every answer is derived**, by the engine, from the round. The validator calls
  the engine's checker and draws dozens of rounds per mode. Nothing is stored
  that the engine could compute.
- **Every wrong answer is answered by name** — the trap's own *why*, the arrow
  that was meant, the colour that pH really is — before the generic explain.
- **Task screen** (`src/tasks/ExplainIt.jsx`, `WaterJourney.jsx`, `PhLab.jsx`):
  the ParticleLab contract — rounds from a seed cycling through the unit's modes,
  one attempt per round, `ProgressDots`, a `Summary` at the end with a "new
  rounds" button, score = rounds right out of 10, `onComplete(score, null, { items })`
  with the better finished run; quitting saves what was answered. Reuse
  `src/components/science/TaskChrome.jsx`. Bilingual via the `bilingual` prop
  and an EN/VN toggle like ParticleLab's. Fits 1280×720 and 375×812 with no
  page scroll on a round.
- **Deck activity** contract: ActivityBlock passes `{ activity, lang, result,
  onResult, parseText, side, retry }`; call `onResult({ done: true, correct, … })`
  once; render the right answer in place after the check, then `explain`.
  Field names `name`/`explain`, never `text` (the narration reads `text`).
- **Bilingual everywhere**; Vietnamese twins for every learner-facing string.

---

## 6. Who owns what (the parallel build)

Each unit is built in its own worktree by one builder. **Wired already on main**
(do not rename): the registry entry, the validator hook, the activity type and
its dispatch, the arcade row. **Owned by the unit's builder** (rewrite freely):

| | 2.3 | 2.4 | 2.8 |
|---|---|---|---|
| engine | `src/utils/stateChain.js` | `src/utils/waterCycle.js` | `src/utils/phLab.js` |
| must export | `checkExplainConfig`, `checkChainActivity` | `checkJourneyConfig`, `checkCycleActivity` | `checkPhConfig`, `checkPhActivity` |
| task screen | `src/tasks/ExplainIt.jsx` | `src/tasks/WaterJourney.jsx` | `src/tasks/PhLab.jsx` |
| deck activity | `src/components/notes/ChainActivity.jsx` (`ChainActivity`) | `CycleActivity.jsx` (`CycleActivity`) | `PhActivity.jsx` (`PhActivity`) |
| unit data key | `explainIt` | `waterJourney` | `phLab` |
| unit | `src/data/Y7_SCI/U02_3/` | `src/data/Y7_SCI/U02_4/` | `src/data/Y7_SCI/U02_8/` |
| photos | `public/images/Y7_SCI/U02_3/` | `…/U02_4/` | `…/U02_8/` |
| plan | `docs/y7-science/plans/U02_3.md` | `…/U02_4.md` | `…/U02_8.md` |

Shared files (the course map, `docs/credits.md`, the classroom back-links,
narration) are done once at integration, not by a builder.
