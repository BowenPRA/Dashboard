# Math Widgets — Interactive Tools in Lessons & Practice

The small interactive tools that make a lesson move: drag a point along a curve, slide
a number line, split a fraction bar. They embed in `Notes` slides (the `widget` field)
and can appear in workbook cards. This guide covers the **two mechanisms**, the
**house style**, and a **catalog of generic Year 7 widgets** worth building once and
reusing everywhere.

The renderer is [src/components/WidgetRenderer.jsx](../src/components/WidgetRenderer.jsx).
The polish exemplars are the Y8 science widgets in
[src/data/Y8/SCIENCE_1A/widgets.jsx](../src/data/Y8/SCIENCE_1A/widgets.jsx) and the
generic [MathGraph](../src/components/math/MathGraph.jsx).

---

## 1. Two ways to attach a widget

`WidgetRenderer` accepts either:

**A. A config object** (preferred for generic, reusable widgets):

```js
// in a notes slide
{
  type: "concept",
  title: "Exploring the Curve",
  widget: { type: "MathGraph", params: { equation: "x^2", xRange: [-3, 3], yRange: [0, 9] } },
}
```

The renderer maps `type` → a component and spreads `params` as props. **Only
`MathGraph` is registered today** — anything else renders a "Widget Type Not Found"
notice until you add it (§4).

**B. A React component reference** (legacy, unit-specific):

```js
// widgets.jsx in the unit folder
export const NumberLineWidget = () => { /* … */ };

// notes.js
import { NumberLineWidget } from './widgets.jsx';
{ type: "concept", title: "…", widget: NumberLineWidget }
```

`WidgetRenderer` detects a function/element and renders it directly. Use this for a
one-off a single section needs. **If two sections would use it, make it a generic
config widget instead** (§4) so it lives in one place.

Either way, widgets in Notes get a free **error boundary** (a crash shows "Widget
Unavailable", the lesson continues) and an **expand-to-fullscreen** button.

---

## 2. House style (non-negotiable for a consistent feel)

Every widget must look like it came from the same kit. Copy the structure of the
SCIENCE_1A widgets and `MathGraph`:

- **Layout:** a `w-full h-full flex flex-col` root; a **visual stage** on top
  (`flex-1`, `min-h-[220px]`), a **control panel** below in a white/dark card
  (`rounded-2xl border-2 shadow-sm`). `select-none touch-none` on interactive SVGs.
- **Controls:** range sliders with `accent-[#1cb0f6]` (or the concept's colour);
  chunky preset buttons; live read-outs in a bordered pill.
- **Palette:** the [svg-diagrams.md](svg-diagrams.md) set — `#1cb0f6` primary,
  `#f59e0b` tracer/highlight, slate neutrals. Semantic colour, one per concept.
- **Math type:** `font-family="monospace"` for numbers/notation inside the SVG.
- **Responsive & theme-aware:** works on a phone and on the TV; `dark:` variants on
  every surface. No fixed pixel widths that break the stage.
- **Self-contained:** no external libs, images, or network. Pure React + SVG.
- **Derive, don't store duplicate state:** compute everything from one or two state
  values (as `MathGraph` derives the whole plot from `equation` + `sliderX`).

A widget that follows this drops into a slide's right panel and just fits.

---

## 3. Where widgets earn their place

Use a widget when the concept **moves** and a static diagram can't show it:

- Good: a number line you slide, a fraction bar you split, a factor tree you expand,
  a curve you trace. The interaction *is* the explanation.
- Not needed: a fixed labelled diagram (use an `inlineSvg` per
  [svg-diagrams.md](svg-diagrams.md) — cheaper and audit-checked).

One widget per concept slide, max. It's a spotlight, not wallpaper.

---

## 4. Adding a generic widget to the registry

To make a widget usable by config from any unit:

1. Build it at `src/components/math/<Name>.jsx` to the house style (§2), props-driven
   with sensible defaults (like `MathGraph({ equation = 'e^x', … })`).
2. Register it in [WidgetRenderer.jsx](../src/components/WidgetRenderer.jsx):
   ```js
   const NumberLine = lazy(() => import('../components/math/NumberLine'));
   // …inside the Suspense:
   {type === 'NumberLine' && <NumberLine {...params} />}
   ```
3. Document its `params` here in the catalog (§5) so authors can use it blind.

Lazy-load each (as `MathGraph` is) to keep the bundle small.

---

## 5. Generic Y7 widget catalog

The set worth building for Year 7 — each maps to units it serves. `MathGraph` exists;
the rest are proposed (build on demand, register per §4).

| `type` | Does | Key `params` | Serves |
|---|---|---|---|
| `MathGraph` ✅ | Trace `f(x)` on an auto-scaled grid | `equation`, `xRange`, `yRange` | 9.4 functions, sequences |
| `NumberLine` | Draggable marker on a number line; shows jumps for +/− | `min`, `max`, `step`, `marks[]` | 1.1 integers, 4.1 decimals |
| `IntegerChips` | +/− counter chips that cancel in pairs | `positives`, `negatives` | 1.1–1.2 integers |
| `FractionBar` | Bar split into parts; shade/compare two bars | `parts`, `shaded`, `compareTo` | 7.1–7.4 fractions, 10.1 |
| `FactorTree` | Expandable prime-factor tree | `number` | 1.3 LCM, 1.4 HCF, 1.5 |
| `PlaceValueSlider` | Shift digits ×/÷ powers of 10 | `value`, `power` | 3.1 powers of 10, 3.2 |
| `AngleSpinner` | Drag a ray; read the angle; sum-to-360/180 | `mode` | 5.1–5.2 angles |
| `SequenceBuilder` | Term-to-term / nth-term generator with a growing pattern | `rule`, `start`, `n` | 9.1–9.3 sequences |
| `PercentGrid` | 10×10 grid linking fraction ↔ decimal ↔ percent | `value` | 10.1–10.2 percentages |

Keep names and `params` stable once shipped — a lesson references them by string.
Add rows as you build; don't pre-build the whole table.

---

## 6. Existing widgets — the pass

State of the widget system today, and the cleanup this guide implies:

- `MathGraph` ✅ built, registered, house-style compliant. The template to copy.
- `src/widgets/` is **empty** — the earlier "generic widgets" folder. Real widgets
  now live at `src/components/math/` (generic) or a unit's `widgets.jsx` (one-off).
  Treat `src/components/math/` as the home; remove `src/widgets/` if nothing lands
  there.
- SCIENCE_1A's `ReflectionWidget` / `FilterWidget` / `RGBWidget` are the **house-style
  reference** for interaction polish — mirror their structure for math widgets, then
  register the reusable ones per §4 instead of importing per unit.
- **Register-then-use:** any widget referenced by config `type` must be added to
  `WidgetRenderer` first, or it renders the not-found notice. Author lessons against a
  widget only once it's registered (or use the component-reference form for a one-off).

---

## 7. Checklist (per widget)

- [ ] Root `flex flex-col`, stage on top, control card below; `select-none` on SVG.
- [ ] House palette; monospace for in-SVG numbers; `dark:` on every surface.
- [ ] Props-driven with defaults; state minimal, everything else derived.
- [ ] Responsive — usable on a phone and legible on the TV.
- [ ] Self-contained (no external libs/images/network).
- [ ] If generic: at `src/components/math/`, lazy-registered in `WidgetRenderer`,
      `params` documented in §5.
- [ ] Renders inside the Notes error boundary without warnings.
