/**
 * Content validator. Run with `npm run validate`.
 *
 * Built as an SSR bundle so it loads the REAL module graph (import.meta.glob and
 * all) while still having fs access for the asset checks. Exits non-zero on
 * failure so it can gate a commit or a deploy.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { getTrack, contentProblems } from '../src/data/index.js';
import { TRACK_REGISTRY, TRACK_IDS } from '../src/components/trackRegistry.js';
import { TASKS, getTask, resolveUnitTasks, normalizeScore } from '../src/tasks/taskRegistry.js';
import { parseEquation, applyMove, suggestMove, isSolved, sameSolution, solutionOf, frText } from '../src/utils/linearEquation.js';
import { rootsOf, vertexOf, yAt } from '../src/utils/parabola.js';
import { componentsOf, resultantOf, gridFor, closeEnough, ANGLE_TOL } from '../src/utils/vectors.js';

const ROOT = process.cwd();
const DATA = path.join(ROOT, 'src/data');
const AUDIO = path.join(ROOT, 'public/audio');

const errors = [];
const warnings = [];
const info = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---------------------------------------------------------------- registries
{
  const ids = TASKS.map((t) => t.id);
  const keys = TASKS.map((t) => t.dbKey);
  if (new Set(ids).size !== ids.length) err('taskRegistry: duplicate task id');
  if (new Set(keys).size !== keys.length) err('taskRegistry: duplicate dbKey');
  for (const t of TASKS) {
    for (const k of ['id', 'dbKey', 'label', 'icon', 'color', 'defaultMaxXP', 'hasContent', 'buildPool', 'props']) {
      if (t[k] === undefined) err(`taskRegistry: ${t.id} missing "${k}"`);
    }
    if (t.nativeMax !== null && !(t.nativeMax > 0)) err(`taskRegistry: ${t.id} has invalid nativeMax`);
  }

  const trackIds = TRACK_REGISTRY.map((t) => t.id);
  if (new Set(trackIds).size !== trackIds.length) err('trackRegistry: duplicate track id');
  for (const t of TRACK_REGISTRY) {
    for (const k of ['title', 'desc', 'icon', 'theme', 'group']) if (!t[k]) err(`trackRegistry: ${t.id} missing "${k}"`);
    if (!fs.existsSync(path.join(DATA, t.id))) warn(`trackRegistry: ${t.id} has no src/data/${t.id} folder yet`);
  }
}

// --------------------------------------------------- score scaling regression
{
  const cases = [
    ['SHORT_ANSWERS', 20, 10, 10, 'a genuine half-mark must not inflate'],
    ['SHORT_ANSWERS', 20, 20, 20, 'full marks'],
    ['WORD_REC', 20, 10, 20, 'native-10 task scales up'],
    ['ESSAY', 20, 10, 20, 'essay is native-10'],
    ['GAMES', 15, 9999, 15, 'raw game score clamps'],
    ['ASSESSMENT', 20, 0, 0, 'zero stays zero'],
  ];
  for (const [id, maxXP, raw, expected, why] of cases) {
    const got = normalizeScore({ ...getTask(id), maxXP }, raw);
    if (got !== expected) err(`normalizeScore(${id}, maxXP=${maxXP}, raw=${raw}) = ${got}, expected ${expected} — ${why}`);
  }
}

// -------------------------------------------------------------------- content
const seenHashes = new Map();
let unitCount = 0;
let taskCount = 0;

for (const trackId of TRACK_IDS) {
  const { meta, data } = getTrack(trackId);
  info.push(`  ${trackId.padEnd(13)} ${String(meta.length).padStart(2)} units  ${meta.map((m) => m.id).join(', ') || '(empty)'}`);

  for (const m of meta) {
    unitCount++;
    const unit = data[m.id];
    const label = `${trackId}/${m.id}`;
    const dir = path.join(DATA, trackId, m.id);

    // -- meta
    for (const k of ['id', 'title', 'desc', 'track']) if (!unit.meta?.[k]) err(`${label}: meta.${k} is missing`);
    if (unit.meta.track !== trackId) err(`${label}: meta.track "${unit.meta.track}" != folder "${trackId}"`);

    // -- phases and XP
    const resolved = resolveUnitTasks(unit, 0);
    taskCount += resolved.length;
    const declared = (unit.phases || []).flatMap((p) => p.tasks || []);
    if (!declared.length) err(`${label}: no tasks declared`);
    for (const d of declared) if (!getTask(d.id)) err(`${label}: unknown task id "${d.id}"`);

    // unitXPOf caps a unit's payout at 100, so a unit may over-provision: six
    // tasks at 20 XP total 120, and the student can drop a whole task and still
    // finish at 100. Keep the LOWER bound as an error — a unit that cannot reach
    // 100 is a real bug — but allow anything above it, warning once the overflow
    // gets large enough that the gates stop meaning much.
    const total = resolved.reduce((s, t) => s + t.maxXP, 0);
    if (total < 100) err(`${label}: tasks total ${total} XP — 100 is unreachable`);
    else if (total > 150) warn(`${label}: ${total} XP available for a 100 XP unit — gates lose meaning`);
    for (const t of resolved) {
      // A graded task worth nothing is a mistake; a `reward` task worth nothing
      // is the point — it is unlocked by the unit rather than paid for by it.
      if (t.maxXP < 0 || (t.maxXP === 0 && !t.reward)) {
        err(`${label}: task ${t.id} is worth ${t.maxXP} XP`);
      }
      if (!t.hasContent(unit)) err(`${label}: declares ${t.id} but has no ${t.id} content`);
      try {
        t.buildPool(unit, { track: trackId, unitId: m.id });
      } catch (e) {
        err(`${label}: ${t.id} buildPool threw — ${e.message}`);
      }
    }
    let cumulative = 0;
    const declaredEarlier = new Set();
    for (const p of unit.phases || []) {
      if (typeof p.threshold !== 'number') err(`${label}: phase "${p.id}" has a non-numeric threshold`);
      if (p.threshold > cumulative) err(`${label}: phase "${p.id}" needs ${p.threshold} XP but only ${cumulative} is reachable before it`);

      // An attempt-gate (`requires: '<TASK_ID>'`) must name a task the unit
      // declares in an EARLIER phase — otherwise the gated phase (the arcade)
      // can never unlock, and it fails silently, which is this repo's signature
      // failure. resolveUnitTasks reads the required task's dbKey, so an unknown
      // id would just never have a progress record and stay locked forever.
      if (p.requires !== undefined) {
        if (!getTask(p.requires)) {
          err(`${label}: phase "${p.id}" requires unknown task "${p.requires}"`);
        } else if (!declaredEarlier.has(p.requires)) {
          err(`${label}: phase "${p.id}" requires "${p.requires}", which is not declared in an earlier phase — it can never unlock`);
        }
      }

      const phaseXP = (p.tasks || []).reduce((s, t) => s + (getTask(t.id) ? (t.maxXP ?? getTask(t.id).defaultMaxXP) : 0), 0);

      /*
       * A gate that is merely *reachable* is not the same as a gate that is
       * passable. "Reachable" means a flawless student can clear it; a gate at
       * 82% of everything before it locks out anyone who drops a few marks, and
       * it does so silently — the check above stays green.
       *
       * This bit us for real: making short answers mark-scheme-only removed
       * three near-automatic English points per question, and three GED English
       * units went from "tight" to genuinely impassable without near-perfect
       * work. Nothing failed; the units just quietly stopped opening.
       *
       * So progression gates cap at 80% of the XP available before them.
       * Reward-only phases are exempt: the 80-of-100 arcade gate is a deliberate
       * design decision, and locking a student out of a game costs them nothing
       * they need.
       */
      const isReward = phaseXP === 0;
      if (!isReward && cumulative > 0 && p.threshold > cumulative * 0.8) {
        err(
          `${label}: phase "${p.id}" gates at ${p.threshold} of ${cumulative} XP available before it ` +
          `(${Math.round((p.threshold / cumulative) * 100)}%) — a student who drops a few marks can never open it. ` +
          `Cap progression gates at 80%: ${Math.floor(cumulative * 0.8)} or lower.`
        );
      }

      cumulative += phaseXP;
      for (const t of p.tasks || []) declaredEarlier.add(t.id);
    }

    // -- assessment answer keys
    for (const q of unit.assessment?.questions || []) {
      const at = `${label} ${q.id}`;
      if (!q.expEn || !q.expVn) err(`${at}: missing bilingual explanation`);
      if (q.type === 'mcq') {
        if (!q.options?.some((o) => o.val === q.correct)) err(`${at}: correct "${q.correct}" is not one of the options`);
      } else if (q.type === 'inline' || q.type === 'fill_blank') {
        const nb = Object.keys(q.blanks || {}).length;
        if (q.textParts && q.textParts.length !== nb + 1) err(`${at}: ${q.textParts.length} textParts for ${nb} blanks`);
        for (const [k, b] of Object.entries(q.blanks || {})) {
          if (b.options && !b.options.some((o) => o.val === b.correct)) err(`${at}: blank ${k} answer is not among its options`);
        }
      } else if (q.type === 'dnd' || q.type === 'order') {
        const vals = (q.bank || []).map((b) => b.val);
        for (const [tid, set] of Object.entries(q.correctSets || {})) {
          if (!(q.targets || []).some((t) => t.id === tid)) err(`${at}: correctSet "${tid}" has no matching target`);
          for (const v of set) if (!vals.includes(v)) err(`${at}: answer "${v}" is not in the bank`);
        }
      }
    }

    // -- slide types Notes.jsx can actually render; anything else shows a blank
    //    slide AND is skipped by generate_all_audio.py, so it fails silently twice.
    {
      const RENDERABLE = ['intro', 'warmup', 'concept', 'summary'];
      // Flexible lesson layouts (src/components/notes/layouts). A slide is valid
      // if it declares a known `layout` OR a legacy `type`; checks may sit on any
      // layout slide since Notes.jsx renders the check gate beneath the layout.
      const LAYOUTS = ['hero', 'statement', 'split', 'showcase', 'compare', 'stack', 'steps', 'callout', 'gallery'];
      (unit.notes || []).forEach((slide, i) => {
        const hasLayout = typeof slide.layout === 'string';
        if (hasLayout) {
          if (!LAYOUTS.includes(slide.layout)) {
            err(`${label}: notes slide ${i + 1} has layout "${slide.layout}" — not one of ${LAYOUTS.join('/')}`);
          }
        } else if (!RENDERABLE.includes(slide.type)) {
          err(`${label}: notes slide ${i + 1} has type "${slide.type}" and no layout — Notes.jsx only renders ${RENDERABLE.join('/')} or a layout, so it would render blank`);
        }
        // A concept slide needs a body of some kind: prose, an interactive widget,
        // a diagram or an image. Otherwise it renders as an empty card.
        const hasBody = slide.content || slide.widget || slide.inlineSvg || slide.image;
        if (!hasLayout && slide.type === 'concept' && !hasBody) {
          err(`${label}: notes slide ${i + 1} ("${slide.title || '?'}") is a concept slide with no content, widget, diagram or image`);
        }

        // -- check questions: what the NOTES task is now scored on. A malformed
        //    one silently costs the student XP they cannot get back, so these
        //    are errors, not warnings.
        if (slide.check) {
          const at = `${label}: notes slide ${i + 1} check`;
          if (!hasLayout && !['concept', 'warmup'].includes(slide.type)) {
            err(`${at} sits on a "${slide.type}" slide — Notes.jsx only renders checks on concept/warmup or layout slides`);
          }
          if (!slide.check.q || !slide.check.qVn) err(`${at} is missing a bilingual question (q/qVn)`);
          if (!slide.check.expEn || !slide.check.expVn) err(`${at} is missing a bilingual explanation (expEn/expVn)`);
          const opts = slide.check.options || [];
          if (opts.length < 2) err(`${at} has ${opts.length} option(s) — needs at least 2`);
          if (!opts.some((o) => o.val === slide.check.correct)) {
            err(`${at}: correct "${slide.check.correct}" is not one of the options`);
          }
          for (const o of opts) {
            if (!o.text || !o.textVn) err(`${at}: option "${o.val}" is missing a bilingual label (text/textVn)`);
          }
        }
      });

      // NOTES pays out of the check questions in the deck. Zero is allowed —
      // decks written before checks existed still pay on completion — but it
      // means the task is unearned, so say so once per unit.
      const checkCount = (unit.notes || []).filter((s) => s.check).length;
      const notesTask = (unit.phases || []).flatMap((p) => p.tasks || []).some((t) => t.id === 'NOTES');
      if (notesTask && (unit.notes || []).length && checkCount === 0) {
        warn(`${label}: notes deck has no check questions — NOTES pays full XP for reaching the last slide`);
      } else if (notesTask && checkCount > 0 && checkCount < 2) {
        warn(`${label}: notes deck has only ${checkCount} check question — one item decides the whole NOTES score`);
      }
    }

    // -- answer-key distribution: a lopsided key is guessable
    {
      const mcq = (unit.assessment?.questions || []).filter((q) => q.type === 'mcq' && q.correct);
      if (mcq.length >= 6) {
        const tally = {};
        for (const q of mcq) tally[q.correct] = (tally[q.correct] || 0) + 1;
        const [letter, count] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
        if (count / mcq.length > 0.5) {
          warn(`${label}: ${count}/${mcq.length} MCQ answers are "${letter}" — guessing that letter scores ${Math.round((count / mcq.length) * 100)}%`);
        }
        const unused = ['A', 'B', 'C', 'D'].filter((L) => !tally[L] && mcq.some((q) => q.options?.some((o) => o.val === L)));
        if (unused.length) warn(`${label}: option ${unused.join('/')} is never the correct answer`);
      }
    }

    // -- bilingual coverage
    for (const w of unit.realWords || []) {
      for (const k of ['word', 'vn', 'def', 'vnDef', 'sent', 'vnSent']) {
        if (!w[k]) err(`${label}: vocab "${w.word || '?'}" missing ${k}`);
      }
    }
    // ShortAnswers.jsx reads modelAnswer (falling back to sampleAnswer) and sends
    // scienceMaxMarks / markScheme to the AI grader. Without the latter two it
    // falls back to a generic placeholder mark scheme, which grades noticeably
    // worse — so those are warnings, not silent defaults. suggestedWords are
    // optional vocabulary hints (never scored), so their absence is fine.
    for (const qa of unit.shortQA || []) {
      if (!qa.modelAnswer && !qa.sampleAnswer) err(`${label}: shortQA ${qa.id} has no modelAnswer for the grader`);
      if (!(qa.markScheme || []).length) warn(`${label}: shortQA ${qa.id} has no markScheme — the AI will grade against a generic default`);
      else if (qa.scienceMaxMarks !== qa.markScheme.length) {
        err(`${label}: shortQA ${qa.id} scienceMaxMarks ${qa.scienceMaxMarks} != ${qa.markScheme.length} markScheme rows`);
      }
    }
    // Source Analysis items come in two shapes. `written` is the default, so an
    // item authored before mixed types is validated exactly as it always was.
    for (const d of unit.diagrams || []) {
      const at = `${label}: diagram ${d.id}`;
      if (d.type === 'mcq') {
        const opts = d.options || [];
        if (opts.length < 2) err(`${at} is an MCQ with ${opts.length} option(s) — needs at least 2`);
        if (!opts.some((o) => o.val === d.correct)) err(`${at}: correct "${d.correct}" is not one of the options`);
        for (const o of opts) if (!o.text) err(`${at}: option "${o.val}" has no text`);
        if (!d.expEn || !d.expVn) err(`${at} is missing a bilingual explanation (expEn/expVn)`);
        if (d.marks !== undefined && !(d.marks > 0)) err(`${at}: marks must be a positive number`);
        if (d.markScheme || d.modelAnswer) warn(`${at} is an MCQ but also carries modelAnswer/markScheme — those are ignored`);
      } else {
        if (!d.modelAnswer) err(`${at} has no modelAnswer`);
        if (!(d.markScheme || []).length) err(`${at} has no markScheme`);
        if (d.scienceMaxMarks !== (d.markScheme || []).length) {
          err(`${at} maxMarks ${d.scienceMaxMarks} != ${(d.markScheme || []).length} markScheme rows`);
        }
      }
      // Source material that is a real document or photograph must say where it
      // came from — the house rule, and the only defence of its licence.
      if (d.imageFile && !d.credit) warn(`${at} shows ${d.imageFile} with no credit`);
    }

    // -- Balance equations: every one must parse, be solvable by the strategy
    //    the unit teaches, and not quietly change its own answer. A broken
    //    equation here is a task the student cannot finish.
    if ((unit.balance || []).length) {
      const seenIds = new Set();
      for (const b of unit.balance) {
        const at = `${label}: balance ${b.id}`;
        if (seenIds.has(b.id)) err(`${at}: duplicate id`);
        seenIds.add(b.id);
        if (!b.prompt || !b.promptVn) err(`${at} is missing a bilingual prompt`);
        let eq;
        try {
          eq = parseEquation(b.equation);
        } catch (e) {
          err(`${at}: cannot parse "${b.equation}" — ${e.message}`);
          continue;
        }
        let cur = eq, n = 0;
        while (!isSolved(cur) && n < 12) {
          const mv = suggestMove(cur);
          if (!mv) break;
          cur = applyMove(cur, mv);
          n++;
        }
        if (!isSolved(cur)) err(`${at}: "${b.equation}" is not solvable by the taught strategy`);
        else if (!sameSolution(eq, cur)) err(`${at}: solving "${b.equation}" changes its answer`);
        else if (solutionOf(cur).d !== 1) {
          // The engine does exact fractions, so a stray "4x = 15" does not break
          // — it quietly answers 15/4 and the student, told all course that the
          // answer is a whole number, assumes they have made a mistake. Catching
          // it here is the only place it shows up at all.
          err(`${at}: "${b.equation}" solves to ${eq.v} = ${frText(solutionOf(cur))}, not a whole number`);
        }
      }
    }

    // -- Graph It items: the task DERIVES the vertex and the zeros from `curve`,
    //    so the risk is not a wrong answer key but an unanswerable question —
    //    a target that is off the grid or lands between the lattice points the
    //    student is allowed to click. Both look fine in the data and are
    //    impossible on screen.
    if ((unit.graphPlot || []).length) {
      const seenIds = new Set();
      const KINDS = ['vertex', 'zeros', 'point'];
      const DEFAULT_GRID = { xMin: -7, xMax: 7, yMin: -6, yMax: 8 };
      for (const g of unit.graphPlot) {
        const at = `${label}: graphPlot ${g.id}`;
        if (!g.id) err(`${label}: a graphPlot item has no id`);
        if (seenIds.has(g.id)) err(`${at}: duplicate id`);
        seenIds.add(g.id);
        if (!g.equation) err(`${at} has no equation to read`);
        const c = g.curve || {};
        if (![c.a, c.h, c.k].every((v) => typeof v === 'number')) {
          err(`${at}: curve must be { a, h, k } numbers`);
          continue;
        }
        if (!c.a) err(`${at}: a = 0 is a straight line, not a parabola`);
        const grid = { ...DEFAULT_GRID, ...(g.grid || {}) };
        const onGrid = ([x, y]) =>
          x >= grid.xMin && x <= grid.xMax && y >= grid.yMin && y <= grid.yMax;
        const isLattice = ([x, y]) => Number.isInteger(x) && Number.isInteger(y);
        if (!(g.steps || []).length) err(`${at} has no steps`);
        for (const st of g.steps || []) {
          if (!KINDS.includes(st.kind)) { err(`${at}: unknown step kind "${st.kind}"`); continue; }
          let targets;
          if (st.kind === 'vertex') targets = [vertexOf(c)];
          else if (st.kind === 'zeros') targets = rootsOf(c).map((x) => [x, 0]);
          else {
            if (!Array.isArray(st.at) || st.at.length !== 2) { err(`${at}: a point step needs at: [x, y]`); continue; }
            if (!st.label || !st.labelVn) err(`${at}: a point step needs a bilingual label`);
            if (Math.abs(yAt(c, st.at[0]) - st.at[1]) > 1e-9) {
              err(`${at}: point (${st.at.join(', ')}) is not on the curve — the curve gives y = ${yAt(c, st.at[0])}`);
            }
            targets = [st.at];
          }
          for (const tp of targets) {
            if (!isLattice(tp)) err(`${at}: ${st.kind} target (${tp.join(', ')}) is not a whole-number point, so it cannot be clicked`);
            if (!onGrid(tp)) err(`${at}: ${st.kind} target (${tp.join(', ')}) is outside the grid ${JSON.stringify(grid)}`);
          }
          // A "no zeros" step is legitimate and is answered with the button, but
          // only if the curve really does miss the axis.
          if (st.kind === 'zeros' && targets.length === 0 && -c.k / c.a >= 0) {
            err(`${at}: zeros step has no targets but the curve does cross the axis`);
          }
        }
      }
    }

    // -- Vectors items: like Graph It, the task DERIVES every answer from the
    //    forces, so the risk is not a wrong key but an unanswerable or
    //    untellable question — a resultant of zero (whose direction does not
    //    exist), two forces that lie on top of each other (no triangle to see),
    //    or a pair whose components are so close that the sin/cos diagnosis
    //    would call a correct answer a mistake. All three look fine in the data
    //    and only fall over in front of the student.
    if ((unit.vectorAdd || []).length) {
      const seenIds = new Set();
      for (const v of unit.vectorAdd) {
        const at = `${label}: vectorAdd ${v.id || '(no id)'}`;
        if (!v.id) err(`${label}: a vectorAdd item has no id`);
        if (seenIds.has(v.id)) err(`${at}: duplicate id`);
        seenIds.add(v.id);
        if (!v.prompt || !v.promptVn) err(`${at} is missing a bilingual prompt`);

        const forces = v.vectors || [];
        if (forces.length < 2) { err(`${at} has ${forces.length} force(s) — needs at least 2 to add`); continue; }

        let bad = false;
        const names = new Set();
        for (const f of forces) {
          const which = `${at}: force ${f.name || '(unnamed)'}`;
          if (!f.name) { err(`${at} has a force with no name`); bad = true; }
          if (names.has(f.name)) { err(`${which} shares its name with another force`); bad = true; }
          names.add(f.name);
          if (!(typeof f.mag === 'number') || !(f.mag > 0)) { err(`${which} has mag ${f.mag} — must be a positive number`); bad = true; }
          if (typeof f.angle !== 'number' || !Number.isFinite(f.angle)) { err(`${which} has angle ${f.angle} — must be a number of degrees`); bad = true; }
          if (!f.label || !f.labelVn) warn(`${which} has no bilingual label`);
        }
        if (bad) continue;

        // Two forces along the same line draw one arrow on top of another: the
        // triangle the whole task is teaching never appears.
        for (let i = 0; i < forces.length; i++) {
          for (let j = i + 1; j < forces.length; j++) {
            const gap = Math.abs(((forces[i].angle - forces[j].angle) % 360 + 360) % 360);
            if (Math.min(gap, 360 - gap) < 5) {
              err(`${at}: ${forces[i].name} and ${forces[j].name} point within 5° of each other — they draw as one arrow, so there is no triangle to read`);
            }
          }
        }

        const r = resultantOf(forces);
        if (r.mag < 1) {
          err(`${at}: the forces very nearly cancel (|R| = ${r.mag.toFixed(2)}) — a resultant of about zero has no direction to ask for`);
        }

        // The task names the sin/cos swap when a wrong entry matches the OTHER
        // component. If a force's two components are within tolerance of each
        // other, the swap is undetectable and — worse — a student who does swap
        // them scores full marks.
        for (const f of forces) {
          const c = componentsOf(f);
          if (closeEnough(c.x, c.y, 'linear')) {
            err(`${at}: force ${f.name} at ${f.angle}° has Fx ≈ Fy (${c.x.toFixed(2)} vs ${c.y.toFixed(2)}) — swapping sin and cos would still be marked right. Move it off 45°.`);
          }
        }

        // Same problem one level up: an angle the student could reach by
        // measuring from the wrong axis.
        const fromY = ((90 - r.angle) % 360 + 360) % 360;
        if (Math.abs(fromY - r.angle) <= ANGLE_TOL) {
          err(`${at}: the resultant at ${r.angle.toFixed(1)}° reads the same from the x-axis and the y-axis, so that mistake cannot be caught`);
        }

        // A grid that cannot hold the arrows draws them off the canvas.
        const g = v.grid || gridFor(forces);
        if (!(g.step > 0) || !(g.xMax > g.xMin) || !(g.yMax > g.yMin)) {
          err(`${at}: grid ${JSON.stringify(g)} is not a usable window`);
        } else {
          const pts = [{ x: r.x, y: r.y }, ...forces.map(componentsOf)];
          for (const p of pts) {
            if (p.x < g.xMin || p.x > g.xMax || p.y < g.yMin || p.y > g.yMax) {
              err(`${at}: an arrow reaches (${p.x.toFixed(1)}, ${p.y.toFixed(1)}), outside the grid ${JSON.stringify(g)}`);
            }
          }
        }
      }
    }

    // -- Number Gym drill: operands only, every intermediate cell derived by
    //    NumberDrill.jsx. The risk is an item the component cannot build a grid
    //    for (a mode it does not implement, or operands out of range), which
    //    renders blank in front of the student. Modes are added to this list as
    //    NumberDrill.jsx grows to support them.
    if (unit.drill) {
      const at = `${label}: drill`;
      const DRILL_MODES = ['long-mult', 'column-add-sub', 'times-sprint'];
      const d = unit.drill;
      if (!DRILL_MODES.includes(d.mode)) {
        err(`${at}: mode "${d.mode}" — NumberDrill.jsx implements ${DRILL_MODES.join('/')}`);
      }
      if (!d.title || !d.titleVn) err(`${at} is missing a bilingual title`);
      const ladder = d.ladder || [];
      if (!ladder.length) err(`${at} has an empty ladder`);
      const inRange = (n) => Number.isInteger(n) && n >= 2 && n <= 9999;
      ladder.forEach((rung, ri) => {
        const rat = `${at} rung ${ri + 1}`;
        if (!rung.level || !rung.levelVn) err(`${rat} is missing a bilingual level name (level/levelVn)`);
        const items = rung.items || [];
        if (!items.length) err(`${rat} has no items`);
        items.forEach((it, ii) => {
          const iat = `${rat} item ${ii + 1}`;
          if (!Array.isArray(it)) { err(`${iat}: an item must be an array of operands`); return; }
          if (d.mode === 'long-mult') {
            // [a, b] operand pair, both in range, at least one multi-digit — a
            // 1×1 fact is a times-table drill, not a column multiplication.
            if (it.length !== 2) { err(`${iat}: long-mult items are [a, b] operand pairs`); return; }
            for (const n of it) if (!inRange(n)) err(`${iat}: operand ${n} must be a whole number from 2 to 9999`);
            if (it.every((n) => n < 10)) err(`${iat}: (${it.join(', ')}) is a single-digit fact, not a column multiplication`);
          } else if (d.mode === 'times-sprint') {
            // [a, b] single times-table fact — small operands, timed for recall.
            if (it.length !== 2) { err(`${iat}: times-sprint items are [a, b] fact pairs`); return; }
            for (const n of it) if (!Number.isInteger(n) || n < 2 || n > 12) err(`${iat}: fact operand ${n} must be a whole number from 2 to 12`);
          } else {
            // column-add-sub: [a, b, op]; op is + or -; at least one multi-digit;
            // subtraction must not go negative (the drill teaches the algorithm,
            // not signed answers — the sign work lives in the deck).
            const [a, b, op] = it;
            if (it.length !== 3 || (op !== '+' && op !== '-')) {
              err(`${iat}: column-add-sub items are [a, b, '+'|'-']`); return;
            }
            if (!inRange(a) || !inRange(b)) err(`${iat}: operands ${a},${b} must be whole numbers from 2 to 9999`);
            if (a < 10 && b < 10) err(`${iat}: (${a}, ${b}) is single-digit, not a column sum`);
            if (op === '-' && a < b) err(`${iat}: ${a} - ${b} is negative — put the larger number first`);
          }
        });
      });
    }

    // -- diagram references resolve
    if (fs.existsSync(dir)) {
      const dg = path.join(dir, 'diagrams.js');
      const defined = fs.existsSync(dg)
        ? [...fs.readFileSync(dg, 'utf8').matchAll(/^ {2}([A-Z_0-9]+):/gm)].map((x) => x[1])
        : [];
      for (const f of fs.readdirSync(dir)) {
        if (f === 'diagrams.js' || !f.endsWith('.js')) continue;
        const src = fs.readFileSync(path.join(dir, f), 'utf8');
        for (const r of new Set([...src.matchAll(/DIAGRAMS\.([A-Z_0-9]+)/g)].map((x) => x[1]))) {
          if (!defined.includes(r)) err(`${label}: ${f} references DIAGRAMS.${r}, which diagrams.js does not define`);
        }
      }
      // cross-unit copy-paste
      for (const f of fs.readdirSync(dir)) {
        if (!/\.(js|jsx)$/.test(f) || f === 'games.js') continue;
        const buf = fs.readFileSync(path.join(dir, f));
        if (buf.length < 400) continue;
        const h = crypto.createHash('sha1').update(buf).digest('hex');
        const prev = seenHashes.get(h);
        if (prev) err(`${label}/${f} is byte-identical to ${prev} — content copied between units`);
        else seenHashes.set(h, `${label}/${f}`);
      }
    }

    // -- referenced images must exist. A missing PNG renders as a broken image
    //    inside a task that asks the student to analyse it. `imageFile` went
    //    unchecked here for a long time, which is how Y8/MATH_1A shipped three
    //    diagram items pointing at files that were never in the repo.
    for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
      if (!f.endsWith('.js')) continue;
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      for (const m of src.matchAll(/(?:imageUrl|image):\s*["']([^"']+)["']/g)) {
        const rel = m[1].replace(/^\/+/, '');
        if (!fs.existsSync(path.join(ROOT, 'public', rel))) {
          err(`${label}: ${f} references ${m[1]}, which does not exist in public/`);
        }
      }
      // imageFile is a bare filename resolved against public/images/<TRACK>/<UNIT>/
      // by assetPaths.unitImageUrl — the same shape as the audio folders.
      for (const mm of src.matchAll(/imageFile:\s*["']([^"']+)["']/g)) {
        const file = mm[1].replace(/^.*[\\/]/, '');
        if (!fs.existsSync(path.join(ROOT, 'public', 'images', trackId, m.id, file))) {
          err(`${label}: ${f} references imageFile "${mm[1]}", expected at public/images/${trackId}/${m.id}/${file}`);
        }
      }
    }

    // -- audio the app will actually request
    const adir = path.join(AUDIO, trackId, m.id);
    if (!fs.existsSync(adir)) {
      warn(`${label}: no audio folder (public/audio/${trackId}/${m.id}) — run npm run sync-audio`);
    } else {
      const missing = [];
      for (const w of unit.realWords || []) {
        for (const kind of ['word', 'def', 'sentence']) {
          const file = `${kind}_${String(w.word).toLowerCase()}.mp3`;
          if (!fs.existsSync(path.join(adir, file))) missing.push(file);
        }
      }
      if (missing.length) warn(`${label}: ${missing.length} audio file(s) not generated yet, e.g. ${missing[0]}`);
    }

    // -- slide narration is derived from slide position (see slideAudioUrl), so
    //    every slide needs a matching slide_<unit>_<n>.mp3. A missing file means
    //    that slide plays silently. Checking by position also catches an off-by-one
    //    between the deck and the generated files.
    if ((unit.notes || []).length && fs.existsSync(adir)) {
      const missingSlides = [];
      for (let i = 1; i <= unit.notes.length; i++) {
        const file = `slide_${m.id}_${i}.mp3`;
        if (!fs.existsSync(path.join(adir, file))) missingSlides.push(file);
      }
      if (missingSlides.length) {
        err(`${label}: ${missingSlides.length} slide audio file(s) missing, e.g. ${missingSlides[0]} — run npm run sync-audio`);
      }
    }
  }
}

// ------------------------------------------------------------------- report
console.log(info.join('\n'));
if (contentProblems.length) {
  console.log('\nLoader problems:');
  contentProblems.forEach((p) => console.log('  ! ' + p));
  contentProblems.forEach((p) => err('loader: ' + p));
}
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log('  ~ ' + w));
}
if (errors.length) {
  console.log(`\n${errors.length} ERROR(S):`);
  errors.forEach((e) => console.log('  x ' + e));
  console.log('\nFAILED');
  process.exit(1);
}
console.log(`\nPASS: ${TRACK_REGISTRY.length} tracks, ${unitCount} units, ${taskCount} task instances`);
