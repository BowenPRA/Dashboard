// src/utils/appSim.js
//
// The simulator behind the SIM task ("Try It") and the AppSim notes widget. A
// fake computer the student operates, and an assertion about the state it ends
// up in — which is the only way to assess "can use a computer" honestly. A
// student who can pick "the address bar" out of four options on Monday will
// still type an address into a search box on Tuesday
// (docs/digital-skills-course.md §1).
//
// PURE, NO REACT. The skins render it and the validator replays it, so nothing
// here may touch the DOM, the clock or randomness.
//
// THE FOUR RULES this module exists to enforce (§4.1 of the course doc):
//
//   1. ASSERT ON STATE, NEVER ON CLICKS. A goal is a list of predicates over the
//      fake machine's state, so right-click ▸ Save, Ctrl+S and File ▸ Save all
//      pass. Multiple correct routes passing IS the skill — a student who learns
//      one path has not learned to use a computer.
//   2. NO DEAD ENDS. Every session is an append-only action log, so undo is
//      "drop the last action and replay". Nothing is unrecoverable, including
//      deletion, which goes to the Recycle Bin and comes back.
//   3. NUDGE, DON'T FAIL. Nothing in here ends a task. Scoring belongs to the
//      screen; this module only ever reports what is true of the state.
//   4. PAR MOVES ARE A BONUS. The action log gives the move count for free.
//
// THE ACTION LOG is the whole design. Replay, undo and the solvability
// self-check all fall out of "state is a fold of actions over an initial state",
// which is why every gesture becomes an action rather than a setState.

/** The folders the `files` skin models. Order is the order they are drawn. */
export const FOLDERS = ['Documents', 'Downloads', 'Desktop', 'Recycle Bin'];
export const BIN = 'Recycle Bin';

/** Skins the engine knows how to build a state for. */
export const SKINS = ['files'];

/* ------------------------------------------------------------------ *
 * State
 * ------------------------------------------------------------------ */

/**
 * Build the starting state for an item.
 *
 * `item.initial` is deliberately terse for the author — `{ files: [{ name, in }],
 * editor: { name } }` — and is expanded here into the full shape the reducer
 * works with, so unit data never has to spell out fields it does not care about.
 */
export function initialState(item) {
  const init = item?.initial || {};
  return {
    skin: item?.skin || 'files',
    cwd: init.cwd || 'Documents',
    files: (init.files || []).map((f) => ({
      name: f.name,
      folder: f.in || 'Documents',
      kind: f.kind || kindOf(f.name),
      // Where a file came from, so the bin can put it back. Only set on delete.
      from: null,
    })),
    selected: null,
    // The document open in the editor. `folder: null` means it has never been
    // saved anywhere — which is why Save has to become Save As the first time,
    // exactly as it does on a real machine. That IS the lesson of T4.
    // `ext` is what the program the student is "in" saves as, so typing a bare
    // "volcano" produces volcano.docx the way a real editor would. Without it a
    // saved file would have no extension at all, which is a lie about computers
    // and breaks the file-types unit later.
    editor: init.editor
      ? {
        name: init.editor.name || 'Untitled',
        ext: init.editor.ext || '',
        folder: init.editor.in || null,
        saved: false,
      }
      : null,
    dialog: null,
    search: '',
  };
}

/** File kind from the extension, so authors never have to write it out. */
export function kindOf(name = '') {
  const ext = String(name).toLowerCase().split('.').pop();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
  if (['pdf'].includes(ext)) return 'pdf';
  if (['mp4', 'mov', 'avi'].includes(ext)) return 'video';
  if (['mp3', 'wav'].includes(ext)) return 'audio';
  return 'doc';
}

/* ------------------------------------------------------------------ *
 * Actions
 * ------------------------------------------------------------------ */

/** Every action type the `files` skin can produce. */
export const ACTIONS = [
  'openFolder', 'select', 'save', 'saveAs',
  'dialogName', 'dialogFolder', 'dialogConfirm', 'dialogCancel',
  'rename', 'move', 'remove', 'restore', 'search',
];

const withFile = (state, name, fn) => ({
  ...state,
  files: state.files.map((f) => (f.name === name ? { ...f, ...fn(f) } : f)),
});

const has = (state, name) => state.files.some((f) => f.name === name);

/**
 * The reducer. `apply(state, action) -> state`, immutable, and total: an action
 * that makes no sense in the current state returns the state unchanged rather
 * than throwing, because a student mis-tapping must never break the machine
 * (rule 2). `applyStrict` is the authoring-time version that does complain.
 */
export function apply(state, action) {
  if (!state || !action) return state;
  const a = action;
  switch (a.type) {
    case 'openFolder':
      return FOLDERS.includes(a.folder) ? { ...state, cwd: a.folder, selected: null } : state;

    case 'select':
      return has(state, a.name) ? { ...state, selected: a.name } : state;

    case 'search':
      return { ...state, search: String(a.query ?? '') };

    // Save on a document that has never been saved cannot silently pick a name
    // and a folder for the student — so it opens the same dialog Save As does.
    case 'save':
      if (!state.editor) return state;
      if (!state.editor.folder) return apply(state, { type: 'saveAs' });
      return { ...state, editor: { ...state.editor, saved: true } };

    case 'saveAs':
      if (!state.editor) return state;
      return {
        ...state,
        dialog: {
          kind: 'saveAs',
          name: state.editor.name === 'Untitled' ? '' : state.editor.name,
          folder: state.editor.folder || state.cwd,
        },
      };

    case 'dialogName':
      return state.dialog ? { ...state, dialog: { ...state.dialog, name: String(a.name ?? '') } } : state;

    case 'dialogFolder':
      return state.dialog && FOLDERS.includes(a.folder)
        ? { ...state, dialog: { ...state.dialog, folder: a.folder } }
        : state;

    case 'dialogCancel':
      return { ...state, dialog: null };

    case 'dialogConfirm': {
      const d = state.dialog;
      // A nameless save is refused by the dialog itself, not by silence.
      if (!d || !d.name.trim()) return state;
      const name = ensureExt(d.name.trim(), state.editor?.name, state.editor?.ext);
      const rest = state.files.filter((f) => !(f.name === name && f.folder === d.folder));
      return {
        ...state,
        files: [...rest, { name, folder: d.folder, kind: kindOf(name), from: null }],
        // Spread rather than rebuild: the editor's `ext` has to survive a save,
        // or a second Save As would produce a file with no extension.
        editor: { ...state.editor, name, folder: d.folder, saved: true },
        dialog: null,
        cwd: d.folder,
        selected: name,
      };
    }

    case 'rename': {
      if (!has(state, a.name) || !String(a.to || '').trim()) return state;
      const to = ensureExt(String(a.to).trim(), a.name);
      return {
        ...withFile(state, a.name, () => ({ name: to, kind: kindOf(to) })),
        selected: state.selected === a.name ? to : state.selected,
        editor: state.editor?.name === a.name ? { ...state.editor, name: to } : state.editor,
      };
    }

    case 'move':
      if (!has(state, a.name) || !FOLDERS.includes(a.to)) return state;
      return withFile(state, a.name, () => ({ folder: a.to, from: null }));

    // Deleting is a MOVE to the bin, never a removal. "You can almost always
    // undo it" is one of the most valuable things this course teaches, and the
    // simulator should teach it by being true (§4.1).
    case 'remove':
      if (!has(state, a.name)) return state;
      return withFile(state, a.name, (f) => (f.folder === BIN ? {} : { folder: BIN, from: f.folder }));

    case 'restore':
      if (!has(state, a.name)) return state;
      return withFile(state, a.name, (f) => (f.folder === BIN ? { folder: f.from || 'Documents', from: null } : {}));

    default:
      return state;
  }
}

/**
 * Keep the extension the document already had when the student types a bare
 * name. A nine-year-old asked to "name it so you will know it next week" types
 * "volcano", not "volcano.docx", and failing them for that would be testing
 * typing rather than filing.
 */
function ensureExt(name, modelName = '', fallbackExt = '') {
  if (name.includes('.')) return name;
  const ext = String(modelName).includes('.') ? modelName.split('.').pop() : fallbackExt;
  return ext ? `${name}.${ext}` : name;
}

/** Fold a list of actions over a starting state. Replay, undo and solve all use this. */
export function replay(state, actions = []) {
  return actions.reduce((s, a) => apply(s, a), state);
}

/** Undo = drop the last action and replay from the beginning. No dead ends. */
export function undo(item, actions = []) {
  return { actions: actions.slice(0, -1), state: replay(initialState(item), actions.slice(0, -1)) };
}

/* ------------------------------------------------------------------ *
 * Goals
 * ------------------------------------------------------------------ */

/**
 * The read model a goal is written against.
 *
 * Goals path into THIS, not into the raw state, so an author writes what they
 * mean — "there is a file called volcano.docx in Documents" — instead of
 * `files[3].folder`, which depends on an ordering nothing guarantees.
 */
export function view(state) {
  const at = Object.fromEntries(
    FOLDERS.map((f) => [f, state.files.filter((x) => x.folder === f).map((x) => x.name)])
  );
  return {
    ...state,
    at,
    names: state.files.map((f) => f.name),
    count: state.files.length,
    bin: at[BIN],
    // `editor.saved` is the answer to "did they actually save it", and
    // `editor.folder` to "did they know where it went".
    savedName: state.editor?.saved ? state.editor.name : null,
    savedIn: state.editor?.saved ? state.editor.folder : null,
  };
}

/** `a.b[0].c` -> value, or undefined. Bracket and dot forms both work. */
export function resolvePath(obj, path) {
  return String(path)
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
    .reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/** The operators a goal clause may use. Exactly one per clause. */
export const OPERATORS = ['equals', 'matches', 'gte', 'contains', 'excludes', 'someMatches'];

function testClause(v, clause) {
  if ('equals' in clause) return v === clause.equals;
  if ('gte' in clause) return Number(v) >= Number(clause.gte);
  if ('matches' in clause) return typeof v === 'string' && new RegExp(clause.matches).test(v);
  if ('contains' in clause) return Array.isArray(v) ? v.includes(clause.contains) : String(v ?? '').includes(clause.contains);
  if ('excludes' in clause) return Array.isArray(v) ? !v.includes(clause.excludes) : !String(v ?? '').includes(clause.excludes);
  if ('someMatches' in clause) {
    const re = new RegExp(clause.someMatches);
    return Array.isArray(v) && v.some((x) => re.test(String(x)));
  }
  return false;
}

/**
 * Is the job done? Returns every clause that is not yet satisfied, so the screen
 * can nudge toward the specific thing still missing rather than saying "no".
 */
export function evaluate(state, goal = []) {
  const v = view(state);
  const failed = goal.filter((c) => !testClause(resolvePath(v, c.path), c));
  return { met: goal.length > 0 && failed.length === 0, failed };
}

/* ------------------------------------------------------------------ *
 * Author-time checks
 * ------------------------------------------------------------------ */

/**
 * Run an item's authored solution and report what happened. This is the whole
 * point of step 3d: an unsolvable sim item is this track's version of a wrong
 * answer key, and it is invisible from reading the data.
 */
export function solve(item) {
  const start = initialState(item);
  const end = replay(start, item?.solution || []);
  return {
    start,
    end,
    moves: (item?.solution || []).length,
    before: evaluate(start, item?.goal || []),
    after: evaluate(end, item?.goal || []),
  };
}

/**
 * Validate one authored SIM item. Returns problem strings (empty = OK).
 *
 * Two of these catch bugs nothing else can:
 *   · the solution does not reach the goal — the item cannot be completed;
 *   · the goal is ALREADY met before the student touches anything — the item
 *     pays full marks for doing nothing, which reads as fine in the data.
 */
export function checkItem(item) {
  const problems = [];
  const id = item?.id || '(no id)';
  if (!item?.id) problems.push(`${id}: item has no id`);
  if (!SKINS.includes(item?.skin)) problems.push(`${id}: skin "${item?.skin}" is not one of ${SKINS.join(', ')}`);
  if (!item?.brief) problems.push(`${id}: no brief — the student is not told what the job is`);
  if (!item?.briefVn) problems.push(`${id}: no Vietnamese brief (briefVn)`);

  for (const f of item?.initial?.files || []) {
    if (!f.name) problems.push(`${id}: a starting file has no name`);
    if (f.in && !FOLDERS.includes(f.in)) problems.push(`${id}: file "${f.name}" starts in "${f.in}", which is not a folder`);
  }

  const goal = item?.goal || [];
  if (!goal.length) problems.push(`${id}: no goal — nothing decides whether the job got done`);
  for (const c of goal) {
    if (!c?.path) problems.push(`${id}: a goal clause has no path`);
    const ops = OPERATORS.filter((o) => o in (c || {}));
    if (ops.length !== 1) {
      problems.push(`${id}: goal clause "${c?.path}" has ${ops.length} operators (${ops.join(', ') || 'none'}) — needs exactly one of ${OPERATORS.join('/')}`);
    }
  }

  const solution = item?.solution || [];
  if (!solution.length) problems.push(`${id}: no solution — nothing proves the job can be done`);
  for (const a of solution) {
    if (!ACTIONS.includes(a?.type)) problems.push(`${id}: solution step "${a?.type}" is not one of ${ACTIONS.join(', ')}`);
  }

  // Everything below needs a well-formed item to say anything useful about.
  if (problems.length) return problems;

  const run = solve(item);
  if (run.before.met) {
    problems.push(`${id}: the goal is already met before the student does anything — the item awards full marks for nothing`);
  }
  if (!run.after.met) {
    problems.push(
      `${id}: the authored solution does not reach the goal. Still failing: ` +
      run.after.failed.map((c) => c.path).join(', ')
    );
  }
  const par = Number(item.parMoves);
  if (Number.isFinite(par) && par < run.moves) {
    problems.push(`${id}: parMoves ${par} is below the ${run.moves}-step solution, so the bonus can never be earned`);
  }
  if (item.hintAfter !== undefined && !(item.hintAfter > 0)) {
    problems.push(`${id}: hintAfter must be a positive number of wrong moves`);
  }

  return problems;
}

/** Every problem across a unit's `sim` array. */
export function checkAll(items) {
  return (items || []).flatMap(checkItem);
}
