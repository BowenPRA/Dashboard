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

import { TRACKS, getTrack, contentProblems } from '../src/data/index.js';
import { TRACK_REGISTRY, TRACK_IDS } from '../src/components/trackRegistry.js';
import { TASKS, getTask, resolveUnitTasks, unitXPOf, normalizeScore } from '../src/tasks/taskRegistry.js';

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

    const total = resolved.reduce((s, t) => s + t.maxXP, 0);
    if (total !== 100) err(`${label}: tasks total ${total} XP, must be exactly 100`);
    for (const t of resolved) {
      if (t.maxXP <= 0) err(`${label}: task ${t.id} is worth ${t.maxXP} XP`);
      if (!t.hasContent(unit)) err(`${label}: declares ${t.id} but has no ${t.id} content`);
      try {
        t.buildPool(unit, { track: trackId, unitId: m.id });
      } catch (e) {
        err(`${label}: ${t.id} buildPool threw — ${e.message}`);
      }
    }
    let cumulative = 0;
    for (const p of unit.phases || []) {
      if (typeof p.threshold !== 'number') err(`${label}: phase "${p.id}" has a non-numeric threshold`);
      if (p.threshold > cumulative) err(`${label}: phase "${p.id}" needs ${p.threshold} XP but only ${cumulative} is reachable before it`);
      cumulative += (p.tasks || []).reduce((s, t) => s + (getTask(t.id) ? (t.maxXP ?? getTask(t.id).defaultMaxXP) : 0), 0);
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
      const RENDERABLE = ['intro', 'concept', 'summary'];
      (unit.notes || []).forEach((slide, i) => {
        if (!RENDERABLE.includes(slide.type)) {
          err(`${label}: notes slide ${i + 1} has type "${slide.type}" — Notes.jsx only renders ${RENDERABLE.join('/')}, so it would render blank`);
        }
        // A concept slide needs a body of some kind: prose, an interactive widget,
        // a diagram or an image. Otherwise it renders as an empty card.
        const hasBody = slide.content || slide.widget || slide.inlineSvg || slide.image;
        if (slide.type === 'concept' && !hasBody) {
          err(`${label}: notes slide ${i + 1} ("${slide.title || '?'}") is a concept slide with no content, widget, diagram or image`);
        }
      });
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
    // requiredWords / scienceMaxMarks / markScheme to the AI grader. Without the
    // latter three it falls back to a generic placeholder mark scheme, which
    // grades noticeably worse — so those are warnings, not silent defaults.
    for (const qa of unit.shortQA || []) {
      if (!qa.modelAnswer && !qa.sampleAnswer) err(`${label}: shortQA ${qa.id} has no modelAnswer for the grader`);
      if (!(qa.markScheme || []).length) warn(`${label}: shortQA ${qa.id} has no markScheme — the AI will grade against a generic default`);
      else if (qa.scienceMaxMarks !== qa.markScheme.length) {
        err(`${label}: shortQA ${qa.id} scienceMaxMarks ${qa.scienceMaxMarks} != ${qa.markScheme.length} markScheme rows`);
      }
      if (!(qa.requiredWords || []).length) warn(`${label}: shortQA ${qa.id} has no requiredWords — no vocabulary is enforced`);
    }
    for (const d of unit.diagrams || []) {
      if (!d.modelAnswer) err(`${label}: diagram ${d.id} has no modelAnswer`);
      if (!(d.markScheme || []).length) err(`${label}: diagram ${d.id} has no markScheme`);
      if (d.scienceMaxMarks !== (d.markScheme || []).length) {
        err(`${label}: diagram ${d.id} maxMarks ${d.scienceMaxMarks} != ${(d.markScheme || []).length} markScheme rows`);
      }
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
    //    inside a task that asks the student to analyse it.
    for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
      if (!f.endsWith('.js')) continue;
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      for (const m of src.matchAll(/(?:imageUrl|image):\s*["']([^"']+)["']/g)) {
        const rel = m[1].replace(/^\/+/, '');
        if (!fs.existsSync(path.join(ROOT, 'public', rel))) {
          err(`${label}: ${f} references ${m[1]}, which does not exist in public/`);
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
