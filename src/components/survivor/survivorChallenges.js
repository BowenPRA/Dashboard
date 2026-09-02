// src/components/survivor/survivorChallenges.js
//
// The study half of Swarm Survivor.
//
// Tower Defense interrupts play with a "bolt" the student has fifteen seconds to
// answer. That works there because the board keeps running and the pressure IS
// the game. Survivor asks its questions at the one moment the genre already
// stops: the level-up screen. Nothing is chasing you, nothing is on a timer, and
// the question is not a toll — it decides whether you CHOOSE your upgrade or the
// game rolls one for you. Getting it wrong still levels you up.
//
// That inversion matters for a classroom: the student who cannot answer is not
// punished into a death spiral, and the student who can gets the thing that
// actually makes this genre fun, which is agency over the build.
//
// The question bank is the unit's own: the same vocabulary pool the Vocab task
// uses, and the same per-unit arithmetic generator Tower Defense draws its Maths
// Bolts from.

import { mathChallengeFor } from '../towerdefense/mathChallenges';

/** Maths-track units draw maths a little more often than vocabulary. */
const MATH_RATIO = 0.6;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Four plausible options around a numeric answer, including its sign flip.
 * Returns null when the answer is not a number, so the caller falls back.
 */
function numericChoices(answer) {
  const n = Number(answer);
  if (!Number.isFinite(n)) return null;
  const opts = new Set([n]);
  for (const c of [n + 1, n - 1, n + 2, -n, n - 2, n + 3, n + 5, n - 5]) {
    if (opts.size >= 4) break;
    opts.add(c);
  }
  let k = 4;
  while (opts.size < 4) opts.add(n + k++);
  return [...opts].map(String);
}

/** Same loose matching the board uses: case, spaces and any flavour of minus. */
export function normalizeAnswer(s) {
  return String(s ?? '').trim().toLowerCase().replace(/[−–—]/g, '-').replace(/\s+/g, '');
}

/**
 * Builds the question bank for one run.
 *
 * `pool` is the unit's word list exactly as taskRegistry hands it to the arcade;
 * `unitId` selects the arithmetic generator. A unit with neither returns null,
 * and the level-up screen then simply offers a free choice — a track with no
 * question bank should still be playable, not silently harder.
 */
export function makeChallengeBank(pool, unitId) {
  const vocab = (pool || [])
    .filter(w => w?.word && (w.def || w.vnDef))
    .map(w => ({ word: w.word, def: w.def || w.vnDef || '', sent: w.sent || '', vn: w.vn || '' }));
  const mathGen = mathChallengeFor(unitId);

  if (vocab.length === 0 && !mathGen) return null;

  // Every word is asked both ways before any is repeated, so a short list still
  // covers the whole run without feeling like a loop.
  let used = {};

  function nextVocab() {
    let available = [];
    for (const v of vocab) {
      const u = used[v.word] || {};
      if (!u.TYPE) available.push({ item: v, mode: 'TYPE' });
      if (!u.CHOICE) available.push({ item: v, mode: 'CHOICE' });
    }
    if (available.length === 0) {
      used = {};
      for (const v of vocab) {
        available.push({ item: v, mode: 'TYPE' });
        available.push({ item: v, mode: 'CHOICE' });
      }
    }
    const { item, mode } = available[Math.floor(Math.random() * available.length)];
    if (!used[item.word]) used[item.word] = {};
    used[item.word][mode] = true;

    let choices = null;
    if (mode === 'CHOICE') {
      const others = vocab.filter(x => x.word.toLowerCase() !== item.word.toLowerCase());
      choices = shuffle([item.word, ...shuffle(others).slice(0, 3).map(x => x.word)]);
    }
    return {
      kind: 'VOCAB',
      mode,
      prompt: item.def,
      answer: item.word,
      choices,
      reveal: { word: item.word, sent: item.sent, vn: item.vn },
    };
  }

  function nextMath() {
    const q = mathGen();
    let mode, choices = null;
    if (q.choices) {
      mode = 'CHOICE';
      choices = shuffle(q.choices);
    } else {
      mode = Math.random() < 0.5 ? 'TYPE' : 'CHOICE';
      if (mode === 'CHOICE') {
        choices = numericChoices(q.answer);
        if (!choices) mode = 'TYPE';
      }
    }
    return { kind: 'MATH', mode, prompt: q.prompt, answer: String(q.answer), choices, reveal: null };
  }

  return function nextChallenge() {
    const hasVocab = vocab.length > 0;
    const useMath = mathGen && (!hasVocab || Math.random() < MATH_RATIO);
    return useMath ? nextMath() : nextVocab();
  };
}
