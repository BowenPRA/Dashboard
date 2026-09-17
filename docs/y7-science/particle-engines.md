# Year 7 Science 2.5–2.7 — Element Hunt, Particle Lab, and the particle activities

The self-study units for **2.5 Atoms, elements and the Periodic Table**, **2.6 Compounds
and formulae** and **2.7 Compounds and mixtures**. They keep the shape of
[ENGAGEMENT-PLAN.md](ENGAGEMENT-PLAN.md) and add two generative tasks and three deck
activities that let a student *tap* the Periodic Table, *count* the atoms in a formula,
*build* a particle and *sort* boxes of particles — with every picture and every mark
derived, and a fresh set of questions on every attempt.

The data lives in `src/utils/elements.js` (the book's first-20 table plus Fe, Cu, Zn,
Ag, Au, Pb, Br, I, Co) and `src/utils/particles.js` (a catalogue of substances: name,
formula, drawing; `classifyBox`, `countsOf`, `diagnoseFormula`). The validator runs both.

---

## 1. The unit shape (2.5 onward)

| Phase | Gate | Task | XP |
|---|---|---|---|
| concept | 0 | NOTES — interactive deck | 20 |
| concept | 0 | WORD_REC — the book's key words | 15 |
| practice | 25 | WORKBOOK — mixed-type Practice, 10–12 Q | 20 |
| practice | 25 | ELEMENT_HUNT (2.5) / PARTICLE_LAB (2.6, 2.7) | 20 |
| practice | 25 | LABEL_IT — 2–3 diagrams (or DIAGRAMS, AI-marked) | 15 |
| practice | 25 | READ_COMP — 3 cloze passages | 15 |
| practice | 25 | SHORT_ANSWERS — 4 reasoning Q | 20 |
| mastery | 80 | ASSESSMENT — 8 MCQ | 20 |
| mastery | 80 | GAMES | 0 |

145 XP available, capped at 100. Gates 25 of 35, 80 of 125. Keys: `ELEMENT_HUNT p43`,
`PARTICLE_LAB p44`.

---

## 2. Task configs (unit data keys)

```js
// 2.5 — rounds cycle through the modes, drawn fresh from a seed
elementHunt: {
  title: 'Element Hunt', titleVn: 'Truy tìm nguyên tố',
  modes: ['find', 'symbol', 'name', 'place', 'metal', 'mass'],
  rounds: 12,
}
```

| mode | the round |
|---|---|
| `find` | a name is given; tap its tile — the tiles show symbols only |
| `symbol` | type the symbol; capitals are marked (`na`, `NA`, and `CO` = two elements), a Latin symbol guessed from English is explained (S for sodium) |
| `name` | a symbol; choose its name from four look-alikes |
| `place` | tap by period and group — one tile, a whole row or column, the others in the same group as helium |
| `metal` | tap every metal (or non-metal) in a period, or decide one element |
| `mass` | which of two has the heavier atoms (reading order; argon/potassium never asked) |

```js
// 2.6 and 2.7
particleLab: {
  title: 'Particle Lab', titleVn: 'Phòng thí nghiệm hạt',
  modes: ['count', 'formula', 'build', 'name', 'classify'],   // 2.6
  // modes: ['classify', 'pure', 'magnet', 'formula', 'count'], // 2.7
  mixtures: false,        // 2.6: classify is element / compound only
  rounds: 10,
}
```

| mode | the round |
|---|---|
| `count` | a formula (H₂O … CaCO₃, Ca(NO₃)₂, C₆H₁₂O₆): how many elements, how many atoms of each, how many in total |
| `formula` | a drawn particle with its colour key; type the formula (capitals and "the small number goes after" marked; order not marked) |
| `build` | a formula; add atoms to the tray until the particle matches |
| `name` | a compound's name; tap the elements in it (-ide, -ate adds oxygen, hydroxide, mono/di) |
| `classify` | a box of particles; element, compound or (when `mixtures`) mixture |
| `pure` | a box; pure or a mixture — and how many different substances |
| `magnet` | iron and sulfur stirred, or heated into iron sulfide: would a magnet pull the iron out? |

---

## 3. Deck activities (Notes `activity:` blocks)

Alongside `sort · order · predict · estimate · hotspot`. All carry `id, type, prompt,
promptVn, explain, explainVn`, and sit last on their slide.

```js
// Tap tiles on the first-20 table. The query picks out the answer set.
activity: { id: 'act_mg', type: 'periodic', query: { name: 'magnesium' }, names: false, … }
//   query: { sym } | { name } | { period } | { group } | { period, group } |
//          { period, metal: true|false } | { sameGroupAs: 'He' } | { samePeriodAs: 'Mg' } | { metal }
//   names: false hides the element names on the tiles (default true)

// Boxes of particles, drawn from formulae. Every formula must be drawable:
//   He Ne Ar Fe S Cu Mg · H2 O2 N2 Cl2 · H2O CO2 CO CH4 NH3 HCl SO2 H2S NaCl MgO CaO FeS KCl CaCl2 MgCl2 CuO
activity: { id: 'act_boxes', type: 'particles', ask: 'kind',
  boxes: [['O2','O2','O2','O2'], ['H2O','H2O','H2O','H2O','H2O'], ['N2','N2','O2','O2','CO2']],
  choices: ['element', 'compound', 'mixture'],     // omit 'mixture' in 2.6
  … }
//   ask: 'kind'   choose element / compound / mixture under every box
//        'pure'   choose pure / mixture under every box
//        'magnet' would a magnet pull iron out of each box? (boxes with Fe / FeS)
//        'find'   tap every box that is `find`: 'element' | 'compound' | 'mixture' | 'pure'

// Count the atoms, or write the formula of the drawn particle.
activity: { id: 'act_caco3', type: 'formula', ask: 'count', formula: 'CaCO3', … }
activity: { id: 'act_co2', type: 'formula', ask: 'write', formula: 'CO2', … }
```

---

## 4. The deck

The classroom deck (`C:\Users\bowen\lessons\content\y7-science\U02_N`) is the source;
[../classroom-dashboard-pairing.md](../classroom-dashboard-pairing.md) §3 has the
reduction rules and ENGAGEMENT-PLAN §1 the principles. The density the maths decks
proved applies here too:

- **22–28 slides, 14–18 scored items**: 7–9 `check`s and 7–9 `activity` blocks, spread
  through the deck; at least five activity types, including this unit's new ones.
- **The starter is an interaction** on slide 2 (ENGAGEMENT-PLAN §1).
- **Every classroom vote becomes a `predict`** ("Would you eat it?", "Can a magnet still
  pull the iron out?") with the answer on the next slide.
- **The book's question slides** become checks and activities (one or two per slide), the
  rest of their questions kept in the `reveal`.
- **Room games become activities**: Symbol Snap → `periodic` / `sort`; Element or
  Compound? → `particles`; Mixture or Compound? → `particles` / `sort`.
- **Ported widgets** (periodic table modes, halving counter, formula reader, naming
  practice, the iron-and-sulfur clip) sit on showcase slides — they take `lang`.
- A `hotspot` strips a diagram's printed text; do not use it on a diagram whose text is
  the content.

Checklist: bilingual everywhere · `check`/`activity` last · no "partner / hands up / on
paper / whiteboard" · no Learner's Book scan · photos copied to
`public/images/Y7_SCI/<UNIT>/` with credits · `npm run audit:svg Y7_SCI` clean · walked in
`preview-y7sci.html?unit=<UNIT>`.
