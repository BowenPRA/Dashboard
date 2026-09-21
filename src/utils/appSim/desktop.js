// src/utils/appSim/desktop.js
//
// The `desktop` skin of the simulator: the machine itself. Power, the login
// screen, windows, the menu, and the four ways to stop — the job at the centre
// of T1 · Starting and Stopping (docs/primary-tech/UPGRADE-PLAN.md §3.1).
//
// PURE, NO REACT, like the rest of the engine: the skin renders it and the
// validator replays it. Every rule below is a rule of real machines, simplified
// but never falsified — because the student is rehearsing for a real one:
//
//   · A short press of the power button is not "off". Off → it starts up; on → it
//     sleeps; asleep → it wakes.
//   · HOLDING the button is the emergency brake. It works from anything, even a
//     frozen machine, and it throws away every unsaved piece of work. The view
//     counts it (`forced`), so an ordinary "shut it down" job can refuse it.
//   · Log out, Restart and Shut down close every window. A window with unsaved
//     work stops them and asks — "Shut down anyway" is there, and it loses the
//     work, which the view reports (`lost`). Save first is not a rule we invented.
//   · A frozen machine answers nothing but the held button.

/** The programs on the menu, and the title a fresh window of each gets. */
export const APPS = {
  notes: 'Notes',
  paint: 'Paint',
  browser: 'Browser',
  files: 'Files',
  calculator: 'Calculator',
};

export const POWER = ['off', 'login', 'on', 'sleep'];
export const WINDOW_STATES = ['normal', 'max', 'min'];
export const STOPS = ['sleep', 'logout', 'restart', 'shutdown'];

export const ACTIONS = [
  'pressPower', 'holdPower', 'wake', 'typePassword', 'submitLogin',
  'openMenu', 'openPowerMenu', 'closeMenu', 'openApp',
  'minimise', 'maximise', 'restore', 'close', 'edit', 'save',
  'sleep', 'logout', 'restart', 'shutdown',
  'dialogSave', 'dialogDiscard', 'dialogAnyway', 'dialogCancel',
];

/** Actions that carry what is typed so far; consecutive ones are one move. */
export const TEXT_ACTIONS = ['typePassword'];

const DEFAULT_USER = 'Ha Vi';
const DEFAULT_PASSWORD = 'sunflower';

export function initial(item) {
  const i = item?.initial || {};
  const power = POWER.includes(i.power) ? i.power : 'on';
  const running = power === 'on' || power === 'sleep';
  const account = i.user || DEFAULT_USER;
  const windows = running
    ? (i.windows || []).map((w) => ({
      app: APPS[w.app] ? w.app : 'notes',
      title: w.title || APPS[w.app] || 'Notes',
      state: WINDOW_STATES.includes(w.state) ? w.state : 'normal',
      // What a minimised window returns to. A maximised window that is hidden
      // comes back maximised, as it does on a real machine.
      was: w.state === 'max' ? 'max' : 'normal',
      saved: w.saved !== false,
    }))
    : [];
  return {
    skin: 'desktop',
    power,
    sleptFrom: power === 'sleep' ? 'on' : null,
    account,
    password: i.password ?? DEFAULT_PASSWORD,
    user: running ? account : null,
    typed: '',
    loginError: false,
    frozen: running && !!i.frozen,
    menu: false,
    windows,
    focus: topTitle(windows),
    dialog: null,
    lost: [],
    counts: { forced: 0, shutdowns: 0, restarts: 0, logouts: 0, sleeps: 0 },
    lastStop: null,
  };
}

/** The window on top: the last one in the list that is not minimised. */
function topTitle(windows) {
  const shown = windows.filter((w) => w.state !== 'min');
  return shown.length ? shown[shown.length - 1].title : null;
}

const findWin = (s, title) => s.windows.find((w) => w.title === title);

/** Bring a window to the top of the pile (the end of the list) and focus it. */
function raise(s, title) {
  const w = findWin(s, title);
  if (!w) return s;
  const windows = [...s.windows.filter((x) => x.title !== title), w];
  return { ...s, windows, focus: title };
}

function withWin(s, title, patch) {
  const windows = s.windows.map((w) => (w.title === title ? { ...w, ...patch } : w));
  return { ...s, windows, focus: topTitle(windows) };
}

/** Everything unsaved on screen, thrown away — the price of stopping anyway. */
const loseUnsaved = (s) => [...s.lost, ...s.windows.filter((w) => !w.saved).map((w) => w.title)];

/** Log out / restart / shut down with nothing unsaved in the way. */
function stop(s, how) {
  const base = {
    ...s,
    windows: [],
    focus: null,
    user: null,
    menu: false,
    dialog: null,
    typed: '',
    loginError: false,
    lastStop: how,
  };
  if (how === 'shutdown') return { ...base, power: 'off', counts: { ...s.counts, shutdowns: s.counts.shutdowns + 1 } };
  if (how === 'restart') return { ...base, power: 'login', counts: { ...s.counts, restarts: s.counts.restarts + 1 } };
  return { ...base, power: 'login', counts: { ...s.counts, logouts: s.counts.logouts + 1 } };
}

function goToSleep(s, from) {
  return {
    ...s,
    power: 'sleep',
    sleptFrom: from,
    menu: false,
    lastStop: 'sleep',
    counts: { ...s.counts, sleeps: s.counts.sleeps + 1 },
  };
}

/**
 * The reducer. Total: an action that makes no sense in the current state leaves
 * it unchanged, because a mis-tap must never break the machine (rule 2).
 */
export function apply(s, a) {
  // A frozen machine answers one thing. That is the lesson of the held button.
  if (s.frozen && a.type !== 'holdPower') return s;
  // A dialog is modal: until it is answered, only the dialog (and the power
  // button — you can always pull the emergency brake) does anything.
  if (s.dialog && !String(a.type).startsWith('dialog') && a.type !== 'holdPower') return s;

  switch (a.type) {
    case 'pressPower':
      if (s.power === 'off') return { ...s, power: 'login', typed: '', loginError: false };
      if (s.power === 'sleep') return { ...s, power: s.sleptFrom || 'on', sleptFrom: null };
      if (s.power === 'on') return goToSleep(s, 'on');
      if (s.power === 'login') return goToSleep(s, 'login');
      return s;

    case 'holdPower':
      return {
        ...s,
        power: 'off',
        sleptFrom: null,
        user: null,
        typed: '',
        loginError: false,
        frozen: false,
        menu: false,
        dialog: null,
        lost: loseUnsaved(s),
        windows: [],
        focus: null,
        lastStop: 'forced',
        counts: { ...s.counts, forced: s.counts.forced + 1 },
      };

    case 'wake':
      return s.power === 'sleep' ? { ...s, power: s.sleptFrom || 'on', sleptFrom: null } : s;

    case 'typePassword':
      return s.power === 'login' ? { ...s, typed: String(a.text ?? ''), loginError: false } : s;

    case 'submitLogin':
      if (s.power !== 'login') return s;
      if (s.typed === s.password) {
        return { ...s, power: 'on', user: s.account, typed: '', loginError: false };
      }
      return { ...s, typed: '', loginError: true };

    case 'openMenu':
      return s.power === 'on' ? { ...s, menu: s.menu ? false : 'apps' } : s;

    case 'openPowerMenu':
      return s.power === 'on' ? { ...s, menu: 'power' } : s;

    case 'closeMenu':
      return s.menu ? { ...s, menu: false } : s;

    case 'openApp': {
      if (s.power !== 'on' || !APPS[a.app]) return s;
      const existing = s.windows.find((w) => w.app === a.app);
      if (existing) {
        const back = existing.state === 'min' ? { state: existing.was || 'normal' } : {};
        return raise({ ...withWin(s, existing.title, back), menu: false }, existing.title);
      }
      const title = uniqueTitle(s, APPS[a.app]);
      return {
        ...s,
        menu: false,
        windows: [...s.windows, { app: a.app, title, state: 'normal', was: 'normal', saved: true }],
        focus: title,
      };
    }

    case 'minimise': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w || w.state === 'min') return s;
      return withWin(s, a.title, { state: 'min', was: w.state });
    }

    case 'maximise': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w) return s;
      return raise(withWin(s, a.title, { state: w.state === 'max' ? 'normal' : 'max' }), a.title);
    }

    case 'restore': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w) return s;
      if (w.state === 'min') return raise(withWin(s, a.title, { state: w.was || 'normal' }), a.title);
      return raise(s, a.title);
    }

    case 'close': {
      const w = s.power === 'on' && findWin(s, a.title);
      if (!w) return s;
      if (!w.saved) return { ...s, dialog: { kind: 'close', title: a.title }, menu: false };
      const windows = s.windows.filter((x) => x.title !== a.title);
      return { ...s, windows, focus: topTitle(windows) };
    }

    case 'edit': {
      const w = s.power === 'on' && findWin(s, a.title);
      return w ? withWin(s, a.title, { saved: false }) : s;
    }

    case 'save': {
      const w = s.power === 'on' && findWin(s, a.title);
      return w ? withWin(s, a.title, { saved: true }) : s;
    }

    case 'sleep':
      return s.power === 'on' ? goToSleep(s, 'on') : s;

    case 'logout':
    case 'restart':
    case 'shutdown': {
      if (s.power !== 'on') return s;
      const unsaved = s.windows.filter((w) => !w.saved);
      if (unsaved.length) return { ...s, menu: false, dialog: { kind: 'stop', then: a.type, titles: unsaved.map((w) => w.title) } };
      return stop(s, a.type);
    }

    case 'dialogSave': {
      if (s.dialog?.kind !== 'close') return s;
      const windows = s.windows.filter((w) => w.title !== s.dialog.title);
      return { ...s, windows, focus: topTitle(windows), dialog: null };
    }

    case 'dialogDiscard': {
      if (s.dialog?.kind !== 'close') return s;
      const windows = s.windows.filter((w) => w.title !== s.dialog.title);
      return { ...s, windows, focus: topTitle(windows), lost: [...s.lost, s.dialog.title], dialog: null };
    }

    case 'dialogAnyway':
      if (s.dialog?.kind !== 'stop') return s;
      return stop({ ...s, lost: loseUnsaved(s) }, s.dialog.then);

    case 'dialogCancel':
      return s.dialog ? { ...s, dialog: null } : s;

    default:
      return s;
  }
}

function uniqueTitle(s, base) {
  if (!findWin(s, base)) return base;
  let n = 2;
  while (findWin(s, `${base} ${n}`)) n += 1;
  return `${base} ${n}`;
}

/** The read model goals are written against (UPGRADE-PLAN §3.1). */
export function view(s) {
  const titles = (pred) => s.windows.filter(pred).map((w) => w.title);
  return {
    ...s,
    loggedIn: s.power === 'on' && !!s.user,
    open: titles(() => true),
    minimised: titles((w) => w.state === 'min'),
    maximised: titles((w) => w.state === 'max'),
    unsaved: titles((w) => !w.saved),
    lostCount: s.lost.length,
    forced: s.counts.forced,
    shutdowns: s.counts.shutdowns,
    restarts: s.counts.restarts,
    logouts: s.counts.logouts,
    sleeps: s.counts.sleeps,
  };
}

/**
 * Where the default nudge points for a failing clause. Items usually author
 * their own hints; this is the fallback, and it reads the machine's STATE, not
 * just the clause — because the wrong glow teaches the wrong thing. Glowing the
 * power button on a working machine would invite a student to hold it.
 */
export function regionFor(path = '', s = null) {
  if (s?.dialog) return 'dialog';
  if (s?.frozen) return 'power';
  if (s?.power === 'off') return 'power';
  if (s?.power === 'sleep') return 'screen';
  if (s?.power === 'login') return 'password';
  const unsaved = s?.windows?.find((w) => !w.saved);
  const stopping = ['power', 'shutdowns', 'restarts', 'logouts', 'sleeps', 'lastStop', 'lostCount', 'lost', 'unsaved'];
  if (stopping.includes(path)) {
    if (unsaved) return `save:${unsaved.title}`;
    return s?.menu === 'apps' ? 'powerMenu' : 'menu';
  }
  if (path === 'loggedIn') return 'password';
  if (['open', 'minimised', 'maximised'].includes(path)) return 'taskbar';
  return 'screen';
}

/** Problems with an item's authored starting state. */
export function checkInitial(item) {
  const id = item?.id || '(no id)';
  const i = item?.initial || {};
  const out = [];
  if (i.power !== undefined && !POWER.includes(i.power)) out.push(`${id}: power "${i.power}" is not one of ${POWER.join(', ')}`);
  if (i.password !== undefined && (typeof i.password !== 'string' || !i.password)) out.push(`${id}: password must be a non-empty string`);
  const running = !i.power || i.power === 'on' || i.power === 'sleep';
  if (i.frozen && (i.power && i.power !== 'on')) out.push(`${id}: only a machine that is on can be frozen`);
  if (!running && (i.windows || []).length) out.push(`${id}: windows are open on a machine whose power is "${i.power}"`);
  const seen = new Set();
  for (const w of i.windows || []) {
    if (!APPS[w.app]) out.push(`${id}: window app "${w.app}" is not one of ${Object.keys(APPS).join(', ')}`);
    const t = w.title || APPS[w.app];
    if (seen.has(t)) out.push(`${id}: two windows are titled "${t}" — titles address windows, so they must differ`);
    seen.add(t);
    if (w.state !== undefined && !WINDOW_STATES.includes(w.state)) out.push(`${id}: window "${t}" state "${w.state}"`);
  }
  return out;
}
