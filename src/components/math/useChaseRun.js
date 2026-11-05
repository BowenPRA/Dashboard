import { useEffect, useRef, useState } from 'react';
import { readyFor, findable, usefulStones, diagnoseFact, diagnoseSize, workingParts } from '../../utils/angleChase';

/**
 * The step runner of Find Every Angle (utils/angleChase.js), one item.
 *
 * Each angle: (pick it) → the FACT → the SIZE. Guided items pick the next
 * letter for the student, in the Workbook's order, and show the sum with its
 * numbers in place; free items let the student choose which letter to find
 * next and show just "a = ▢" until a wrong size opens the sum. A wrong answer
 * is named and tried again; a second wrong (or Show me) fills that stage in
 * and the letter pays half. Hint is free: it lights where to look.
 *
 * When no letter can be found in one step, an unmarked angle is the stepping
 * stone: guided items mark it "?", free items let the student tap one.
 */

const foundOf = (m, known) => Object.fromEntries(known.map((n) => [n, m.vars[n].value]));
const lettersLeft = (m, known) => m.letters.filter((l) => !known.includes(l));

function nextOf(m, s) {
  if (!lettersLeft(m, s.known).length) return { ...s, stage: 'done', target: null, rel: null, wrong: 0, tried: [], hintRel: null };
  const base = { ...s, rel: null, wrong: 0, tried: [], hintRel: null, full: m.guided, helped: false };
  if (m.guided) {
    const n = m.plan.find((x) => !s.known.includes(x));
    const stone = !m.vars[n].letter;
    return { ...base, stage: 'fact', target: n, stones: stone ? [...s.stones, n] : s.stones, msg: stone ? { tone: 'info', code: 'stone' } : null };
  }
  return { ...base, stage: 'pick', target: null, msg: null };
}

export function initialRun(m) {
  return nextOf(m, { known: [], log: [], stones: [], scores: {}, last: null, msg: null, helpedAny: false });
}

/**
 * Which letters stand in the way of `name`: those of its closest fact, and
 * only when every one of them can be found now — "find c first" is never
 * said about a c that is waiting for this letter too.
 */
function blockersOf(m, name, known) {
  const unknownIn = (r) => Object.keys(r.coef).filter((n) => n !== name && !known.has(n));
  const ready = (r) => unknownIn(r).every((n) => m.vars[n].letter && findable(m, n, known));
  const rels = m.rels.filter((r) => r.coef[name] && ready(r));
  rels.sort((a, b) => unknownIn(a).length - unknownIn(b).length);
  return rels.length ? unknownIn(rels[0]).map((n) => m.vars[n].letter) : [];
}

export default function useChaseRun(model, { onFinish } = {}) {
  const m = model;
  const [s, setS] = useState(() => initialRun(m));
  const known = new Set(s.known);
  const found = foundOf(m, s.known);
  const reported = useRef(false);
  useEffect(() => {
    if (s.stage !== 'done' || reported.current) return;
    reported.current = true;
    const score = m.letters.reduce((t, l) => t + (s.scores[l] ?? 0), 0) / m.letters.length;
    onFinish?.({ score: Math.round(score * 100) / 100, helped: s.helpedAny, slipped: !!s.slipped });
  }, [s, m, onFinish]);

  const complete = (prev, rel, helped, msg = null) => {
    const name = prev.target;
    const parts = workingParts(m, name, rel, new Set(prev.known), foundOf(m, prev.known)).done;
    const entry = { name, letter: m.vars[name].letter, kind: rel.kind, parts, helped: helped || prev.helped };
    const scores = entry.letter ? { ...prev.scores, [entry.letter]: entry.helped ? 0.5 : 1 } : prev.scores;
    const next = nextOf(m, { ...prev, known: [...prev.known, name], log: [...prev.log, entry], scores, last: entry, helpedAny: prev.helpedAny || entry.helped });
    if (msg) next.msg = msg;
    return next;
  };
  const firstReady = (prev) => {
    const rs = readyFor(m, prev.target, new Set(prev.known));
    return rs.sort((a, b) => Object.keys(a.coef).length - Object.keys(b.coef).length)[0];
  };

  const act = {
    pick(name) {
      setS((prev) => {
        if (prev.stage !== 'pick' || prev.known.includes(name)) return prev;
        const k = new Set(prev.known);
        if (!m.vars[name].letter) {
          if (!usefulStones(m, k).includes(name)) return { ...prev, msg: { tone: 'bad', code: 'stoneNo' } };
          return { ...prev, stage: 'fact', target: name, stones: [...prev.stones, name], msg: null, wrong: 0, tried: [] };
        }
        if (findable(m, name, k)) return { ...prev, stage: 'fact', target: name, msg: null, wrong: 0, tried: [] };
        return { ...prev, msg: { tone: 'bad', code: 'blocked', letter: name, need: blockersOf(m, name, k) }, slipped: true };
      });
    },
    chooseFact(kind) {
      setS((prev) => {
        if (prev.stage !== 'fact') return prev;
        const d = diagnoseFact(m, prev.target, kind, new Set(prev.known));
        if (d.ok) return { ...prev, stage: 'size', rel: d.rel, wrong: 0, msg: null, hintRel: null };
        const wrong = prev.wrong + 1;
        if (wrong >= 2) {
          const rel = firstReady(prev);
          return { ...prev, stage: 'size', rel, wrong: 0, helped: true, hintRel: null, slipped: true, msg: { tone: 'shown', en: d.en, fr: d.fr, code: 'factShown', kind: rel.kind } };
        }
        return { ...prev, wrong, tried: [...prev.tried, kind], slipped: true, msg: { tone: 'bad', en: d.en, fr: d.fr } };
      });
    },
    submit(typed) {
      setS((prev) => {
        if (prev.stage !== 'size') return prev;
        const d = diagnoseSize(m, prev.target, prev.rel, typed, new Set(prev.known), foundOf(m, prev.known));
        if (d.soft) return { ...prev, msg: { tone: 'soft', en: d.en, fr: d.fr } };
        if (d.ok) return complete(prev, prev.rel, false);
        const wrong = prev.wrong + 1;
        if (wrong >= 2) return complete({ ...prev, slipped: true }, prev.rel, true, { tone: 'shown', en: d.en, fr: d.fr, code: 'sizeShown' });
        return { ...prev, wrong, full: true, slipped: true, msg: { tone: 'bad', en: d.en, fr: d.fr } };
      });
    },
    hint() {
      setS((prev) => {
        if (prev.stage === 'fact') return { ...prev, hintRel: firstReady(prev), msg: { tone: 'info', code: 'hintFact' } };
        if (prev.stage === 'size' && !prev.full) return { ...prev, full: true };
        if (prev.stage === 'size') return { ...prev, msg: { tone: 'info', code: 'hintSum' } };
        if (prev.stage === 'pick') return { ...prev, msg: { tone: 'info', code: 'hintPick' } };
        return prev;
      });
    },
    showMe() {
      setS((prev) => {
        if (prev.stage === 'fact') {
          const rel = firstReady(prev);
          return { ...prev, stage: 'size', rel, wrong: 0, helped: true, hintRel: null, msg: { tone: 'shown', code: 'factShown', kind: rel.kind } };
        }
        if (prev.stage === 'size') return complete(prev, prev.rel, true, { tone: 'shown', code: 'sizeShown' });
        return prev;
      });
    },
  };

  // What can be tapped now: in a free item, the letters left (or, when none
  // can be found yet, the stepping stones worth finding).
  let tappable = [];
  let needStone = false;
  if (s.stage === 'pick') {
    const left = lettersLeft(m, s.known);
    needStone = !left.some((l) => findable(m, l, known));
    tappable = needStone ? usefulStones(m, known) : left;
  }
  return { s, act, known, found, tappable, needStone };
}
