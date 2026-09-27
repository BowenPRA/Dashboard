# IGCSE Chemistry — the task engines

The three production tasks built for the `IGCSE_CHEM` track, what each is for, and the
data each reads. All three follow the rule every engine in the app follows:

> **The item states the chemistry. The engine derives the answer.**

An item never carries an answer key. It names the molecules, or gives the plotted
results, or gives the balanced equation with its state symbols; a module in `src/utils/`
works out every count, total, reading and ion from that; and `npm run validate` runs the
module's `check…Items` over every unit, so an item that contradicts itself cannot ship.

Some items carry one line that *looks* like an answer (`deltaH: -818`,
`ionic: 'H⁺ + OH⁻ → H₂O'`). It is a **check**, not a key: the validator compares it with
what the engine derives and errors if they differ. It is there so that an author who
changes a coefficient is told what else changed.

| Task | id · dbKey | Component | Derivation | Unit field |
|---|---|---|---|---|
| Bond Ledger | `BOND_ENERGY` · p49 | `src/tasks/BondLedger.jsx` | `src/utils/bondEnergy.js` | `bondEnergy` |
| Rate Reader | `RATE_GRAPH` · p50 | `src/tasks/RateReader.jsx` | `src/utils/rateCurve.js` | `rateGraph` |
| Spectator Strike | `IONIC_EQ` · p51 | `src/tasks/SpectatorStrike.jsx` | `src/utils/ionicEquation.js` | `ionicEq` |

Each unit field is `{ title, items: [...] }`. **p52 is the next free dbKey.**

The track also uses three engines that already existed: Equations (`SYMBOL_EQ`, p19),
Formulae (`FORMULA_WRITE`, p20) and Energy Diagrams (`ENERGY_PROFILE`, p23). For this
track only, the validator now also runs `chemFormula.checkItem` over `symbolEq`.

### What the three share

- **Two tries, then the answer is filled in.** A wrong answer gets a sentence that names
  the slip, not a red cross. A second wrong answer fills the step in so the student can go
  on — and the item is then worth ½.
- **"Show me"** does the same on request.
- **Resume.** The blob is `{ itemId: score }`. A finished item stays finished; the task
  reopens on the first item not yet done. Progress is saved after every item
  (`onProgress`) and the X saves on the way out.
- **Scoring.** XP is the mean item score, scaled from `nativeMax` 10 to the unit's
  `maxXP`.

---

## 1. Bond Ledger (`BOND_ENERGY`)

**For:** calculating an enthalpy change from bond energies (coursebook 8.3).

**The method, in the book's order:**

| Step | The student | The slip it is built around |
|---|---|---|
| 1 | counts each kind of bond **broken** in the reactants | counting from the formula, so the coefficient is forgotten: 2NH₃ is *six* N–H |
| 2 | multiplies by the bond energy and totals **energy in** | adding the bond energies without multiplying |
| 3 | counts each kind of bond **made** in the products | |
| 4 | totals **energy out** | |
| 5 | finds **ΔH = energy in − energy out**, its sign, and the word for it | out − in; adding; dropping the sign |

The equation is **drawn with every bond showing**. A wrong count lights up the bonds it
should have found, and the message says which number in front was missed. When the item is
finished the book's energy diagram is drawn **to scale** from the two totals: reactants,
up to "bonds broken", down to products.

### Item

```js
{
  id: 'be_methane',
  name: 'Methane burning (natural gas)',
  wordEquation: 'methane + oxygen → carbon dioxide + water',
  reactants: [{ mol: 'CH4', coeff: 1 }, { mol: 'O2', coeff: 2 }],
  products:  [{ mol: 'CO2', coeff: 1 }, { mol: 'H2O', coeff: 2 }],
  deltaH: -818,            // optional CHECK
  energies: { 'C=O': 743 },// optional: bond energies that differ from the table
  note: 'shown when the item is finished',
}
```

`mol` must be a key of `MOLECULES` in `bondEnergy.js`. Each molecule is a **drawn
structure** — atoms on a grid and the bonds between them — and the bond counts are read
off the drawing. So adding a molecule means drawing it:

```js
NH3: {
  name: 'ammonia',
  atoms: [['N', 1, 1], ['H', 0, 1], ['H', 2, 1], ['H', 1, 0]],   // [element, x, y]
  bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],                      // [atom, atom, order]
},
```

`checkMolecules` proves every drawing against its own formula (a hydrogen left off
`C2H6` is an error), and that every bond in it has an energy in `BOND_ENERGY`.

**The library today:** H₂ F₂ Cl₂ Br₂ I₂ O₂ N₂ · HF HCl HBr HI · H₂O CO₂ H₂O₂ NH₃ CH₄
CH₃Cl CH₃OH N₂H₄ · C₂H₄ C₂H₆ C₃H₆ C₃H₈.

**Bond energies** are the table on page 96 of the coursebook to the digit, plus standard
values for C=O, Br–Br, H–Br, I–I, H–I, N–N, F–F, H–F, O–O and C–Cl.

### What is checked

Every molecule is in the library · coefficients are whole numbers 1–9 · the equation
balances · every bond has an energy · at most four kinds of bond a side · ΔH is not zero ·
a stated `deltaH` or `type` agrees with the derivation.

### Authoring notes

- The book's two worked examples (H₂ + Cl₂, and 2NH₃ → N₂ + 3H₂) belong to the **deck**.
  Do not set them as items.
- Climb: one bond of each kind → a coefficient → a double bond → two kinds of bond in one
  molecule → an endothermic answer.
- Include at least one endothermic item, and one where the answer is *small* (HI: +9 kJ),
  so the sign cannot be guessed from the size.

---

## 2. Rate Reader (`RATE_GRAPH`)

**For:** reading the rate of a reaction off a graph of results (coursebook 9.2, and every
graph in 9.3, 9.4 and 10.3 after it).

The screen is a graph with a **ruler**. Dragging along the graph moves it; it draws the
two dashed lines a careful student draws on paper — up to the curve, across to the axis —
and **never prints the number**. Reading the scale is the skill, so the scale is what the
student reads. When an answer is settled, the lines are drawn at the right place with the
values on them.

### Item

```js
{
  id: 'rg_marble',
  name: 'Marble chips and hydrochloric acid',
  context: 'What was reacted, what was measured, and how often.',
  equation: { reactants: 'CaCO3(s) + 2HCl(aq)', products: 'CaCl2(aq) + H2O(l) + CO2(g)' },
  quantity: 'carbon dioxide',          // what the y-axis is an amount OF
  limiting: 'hydrochloric acid',       // needed by a `why` ask
  excess: 'marble',
  x: { label: 'Time', unit: 's', max: 120, step: 20, minor: 2 },
  y: { label: 'Volume of carbon dioxide', unit: 'cm³', max: 70, step: 10, minor: 5 },
  curves: [{ id: 'A', points: [[0, 0], [20, 24], [40, 40], [60, 50], [80, 56], [100, 60], [120, 60]] }],
  asks: [
    { id: 'i1', kind: 'interval', from: 0, to: 20 },
    { id: 't1', kind: 'timeFor', value: 56 },
    { id: 'a1', kind: 'average' },
    { id: 'w1', kind: 'why' },
  ],
  note: 'shown when the graph is finished',
}
```

`step` is the gap between numbered lines; `minor` is the number of small squares in each.
One or two curves; with two, each needs a `label` and every ask but `compare` names its
`curve`.

### The asks

| `kind` | Asks | Answer derived as | Needs |
|---|---|---|---|
| `read` | the amount at a time | the result at that time | `at` |
| `timeFor` | the time to reach an amount | the time of that result | `value` |
| `interval` | the rate during an interval | (end − start) ÷ width — three boxes and a unit | `from`, `to` |
| `end` | when the reaction was over | the first result at the final amount | |
| `total` | how much was made | the final amount | |
| `average` | the average rate | total ÷ end time — three boxes and a unit | |
| `steepest` | the fastest interval | the interval with the greatest rise | `width` (optional) |
| `compare` | which of two was faster / made more | initial rate, or final amount | `what: 'faster' \| 'amount'` |
| `why` | why the curve goes flat | the limiting reactant ran out | item `limiting`, `excess` |

### Marking

- A **reading** is right to **half a small square**, as a mark scheme marks it.
- A **rate** is right if it matches the curve to 1%, **or** if it follows correctly from
  the student's own two readings when those readings were themselves accepted. A reading
  one small square out is not punished twice.
- The **unit** of a rate is chosen from four: the right one, the same upside down, the
  amount alone, the time alone.

### What is checked

Axes have a label, a unit and a whole number of steps · every curve starts at (0, 0), only
rises, **only slows down**, and its last two results are equal (the reaction is shown
finishing) · every asked-for time or amount is a plotted result · a rate or an average
comes out to two decimal places · `steepest` has no tie · `why` has its two reactants.

### Authoring notes

- **Choose the numbers for the average.** Total ÷ end time must come out clean: 50 cm³ in
  5 min, not 50 cm³ in 6.
- The curve is drawn with a **monotone** interpolation, so a flat run stays flat. Do not
  add extra points to "smooth" it.
- The book's magnesium experiment (40 cm³ in five minutes) belongs to the **deck**.
- The same engine reads **any** curve of results against time or pressure: loss of mass
  on a balance (`y.unit: 'g'`), the yield curves of the Haber process, a trend down a
  group.

---

## 3. Spectator Strike (`IONIC_EQ`)

**For:** writing an ionic equation (coursebook 11.4; then precipitation in 11.7 and
displacement in 12.3).

**The method — the book's three steps, and one more:**

| Step | The student | The slip it is built around |
|---|---|---|
| 1 Split | decides, for every substance, whether it **splits into ions** or **stays whole** | writing water as H⁺ and OH⁻; splitting a solid or a gas |
| 2 Strike | strikes out the **spectator ions**, on both sides | striking an ion that changed; striking it on one side only |
| 3 Tidy | writes what is left in its **simplest whole numbers** | leaving 2H⁺ + 2OH⁻ → 2H₂O |
| 4 Name | says what **kind of reaction** it turned out to be | calling acid + metal a neutralisation |

Step 4 is there because the ionic equation is the *answer* to "is this a neutralisation?":
acid + metal leaves no water behind, and the equation shows it. A running count of the
charge on each side sits under step 3.

### Item

```js
{
  id: 'ie_naoh_h2so4',
  name: 'Sulfuric acid and sodium hydroxide',
  wordEquation: 'sulfuric acid + sodium hydroxide → sodium sulfate + water',
  reactants: [{ formula: 'H2SO4', state: 'aq' }, { formula: 'NaOH', state: 'aq', coeff: 2 }],
  products:  [{ formula: 'Na2SO4', state: 'aq' }, { formula: 'H2O', state: 'l', coeff: 2 }],
  ionic: 'H⁺ + OH⁻ → H₂O',     // optional CHECK, written without state symbols
  note: 'shown when the item is finished',
}
```

### How the ions are found

A substance splits when it is **(aq)** and is an ionic compound or an acid. Which ions it
gives is found by trial: every cation × anion pair in the library, in the smallest
electrically neutral numbers, is tested against the formula's own atom count. That is how
iron is found to be Fe²⁺ in FeSO₄ and Fe³⁺ in FeCl₃ without being told.

| Cations | Anions |
|---|---|
| H⁺ Li⁺ Na⁺ K⁺ Ag⁺ NH₄⁺ · Mg²⁺ Ca²⁺ Ba²⁺ Zn²⁺ Cu²⁺ Fe²⁺ Pb²⁺ · Fe³⁺ Al³⁺ | Cl⁻ Br⁻ I⁻ OH⁻ NO₃⁻ · SO₄²⁻ CO₃²⁻ O²⁻ |

Everything else stays whole, and the reason is the sentence the student is given when they
decide wrongly: water is molecules; a gas is molecules; a solid metal is atoms; a solid's
ions are held together.

### The insoluble base — following the book

The coursebook (page 135) writes the neutralisation of an acid by an insoluble base as

> 2H⁺ (aq) + O²⁻ (s) → H₂O (l)

— the oxide does not dissolve, but the acid reacts with its oxide ions. Mark the solid
`split: true` and the engine writes its ions out, with `(s)`:

```js
reactants: [{ formula: 'CuO', state: 's', split: true }, { formula: 'H2SO4', state: 'aq' }],
```

Use it **only** for a metal oxide or hydroxide reacting with an acid, and only because
the student's book does. Many mark schemes write `CuO + 2H⁺ → Cu²⁺ + H₂O` instead;
leave `split` off and the engine gives that form. **Do not set solid carbonates** until
the course has said which form it wants.

### What is checked

Every formula parses and has a state symbol · the full equation balances · something
splits, and there is at least one spectator · no ion is a spectator in part (on both
sides in different numbers) · the ionic equation balances for **atoms and charge** · it is
a kind of reaction the task can name · a stated `ionic` agrees · at most ten ions and
substances, so the full equation fits the screen.

### The kinds of reaction

`neutralisation` (H⁺ with OH⁻ or O²⁻, giving water) · `metal` (a solid and H⁺ giving H₂)
· `carbonate` (H⁺ and carbonate giving CO₂) · `precipitation` (ions only on the left, one
solid on the right) · `displacement` (an element on each side). A reaction that is none of
these is a validator error; add the kind to `kindOf` and `REACTION_KINDS` first.

### Authoring notes

- The book's HCl + NaOH and MgO + HCl belong to the **deck**.
- Include a pair that comes to the **same** ionic equation from different acids and
  alkalis — that is the point of the whole spread.
- Include at least one item where step 3 has something to divide out.
- **Avoid nitric acid with a metal**: it does not give hydrogen.
