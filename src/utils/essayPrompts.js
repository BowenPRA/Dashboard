/**
 * A unit's essay prompt(s), normalised.
 *
 * `unit.essay` used to be a single object. The GED units now carry a BANK — an
 * array of two-source prompts the student picks from each sitting, so a unit
 * revisited on the study-plan rotation is a fresh essay rather than the same
 * one retyped. Everything that reads prompts goes through `essayPrompts()` so a
 * single object and a bank look identical downstream.
 *
 * A prompt's `key` is what the task's resume blob and the essay archive are
 * keyed on: its authored `id`, else its index as a string — which is also what
 * the pre-bank blob used (`{ 0: { text, status } }`), so nothing already saved
 * is orphaned by the change.
 */

export function essayPrompts(essay) {
  const list = Array.isArray(essay) ? essay : essay ? [essay] : [];
  return list
    .filter((p) => p && typeof p === 'object')
    .map((p, i) => ({
      ...p,
      key: p.id != null ? String(p.id) : String(i),
      title: p.title || (p.sources?.[0]?.title ? `${p.sources[0].title} / ${p.sources[1]?.title || ''}`.replace(/ \/ $/, '') : `Prompt ${i + 1}`),
    }));
}

/** Problems with a unit's essay prompt(s), as strings. Empty means clean. */
export function checkEssayPrompts(essay, { ged = false } = {}) {
  const problems = [];
  if (essay === undefined || essay === null) return problems;
  const list = Array.isArray(essay) ? essay : [essay];
  if (Array.isArray(essay) && list.length === 0) return ['essay is an empty array — declare no essay or at least one prompt'];

  const keys = new Set();
  list.forEach((p, i) => {
    const at = `essay ${p?.id || `#${i + 1}`}`;
    if (!p || typeof p !== 'object') { problems.push(`${at}: not an object`); return; }
    if (Array.isArray(essay) && !p.id) problems.push(`${at}: prompts in a bank need an id (it keys the student's saved work)`);
    const key = p.id != null ? String(p.id) : String(i);
    if (keys.has(key)) problems.push(`${at}: duplicate id`);
    keys.add(key);
    if (!p.task) problems.push(`${at}: missing task (the prompt text)`);
    if (p.minutesAllowed !== undefined && !(p.minutesAllowed > 0)) problems.push(`${at}: minutesAllowed must be a positive number`);
    if (ged) {
      const sources = p.sources || [];
      if (sources.length !== 2) problems.push(`${at}: a GED Extended Response needs exactly 2 opposing sources (has ${sources.length})`);
      sources.forEach((s, j) => {
        const words = String(s?.text || '').trim().split(/\s+/).filter(Boolean).length;
        if (words < 60) problems.push(`${at}: source ${j + 1} is only ${words} words — too thin to argue from`);
      });
      if (Array.isArray(essay) && !p.title) problems.push(`${at}: prompts in a bank need a short title for the picker`);
    }
  });
  return problems;
}
