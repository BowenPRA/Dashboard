// Dev-only harness for navigation and the teacher views.
//
// Both sit behind Supabase auth, and both only look like anything once there is
// progress to show — so this synthesises some and drives the REAL components:
//
//   preview-nav.html?view=track&track=Y7_MATH   the student's unit list
//   preview-nav.html?view=teacher               roster + gradebook + drawer
//   preview-nav.html?view=home&tracks=Y7_MATH,Y7_SCI   the track menu (omit tracks for all)
//
// Not part of the production build.
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import Home from './views/Home';
import TrackUnits from './components/TrackUnits';
import useTrackNav from './hooks/useTrackNav';
import TeacherViews from './components/teacher/TeacherViews';
import StudentProfileDrawer from './components/StudentProfileDrawer';
import { supabase } from './utils/supabaseClient';
import { TRACK_REGISTRY, getTrackConfig } from './components/trackRegistry';
import { getTrack } from './data/index';
import { resolveTask } from './tasks/taskRegistry';

const params = new URLSearchParams(window.location.search);
const hoursAgo = (h) => new Date(Date.now() - h * 3600000).toISOString();

/**
 * Progress for one track: the first `full` units finished, the next one taken
 * to roughly `partialPct` of each task, the rest untouched. `ageHours` dates
 * the work, newest on the partial unit.
 */
function synthTrack(trackId, full, partialPct = 0.5, ageHours = 3) {
  const { meta, data } = getTrack(trackId);
  const out = {};
  meta.forEach((m, i) => {
    if (i > full) return;
    const pct = i < full ? 1 : partialPct;
    if (!pct) return;
    const at = hoursAgo(ageHours + (full - i) * 26);
    const tasks = (data[m.id]?.phases || []).flatMap((p) => p.tasks || []).map(resolveTask).filter(Boolean);
    out[m.id] = {};
    // A half-done unit is the early tasks done, not every task half done.
    const upTo = i < full ? tasks.length : Math.ceil(tasks.length * pct);
    tasks.slice(0, upTo).forEach((t) => {
      if (t.maxXP <= 0) return;
      const score = i < full ? t.maxXP : Math.round(t.maxXP * 0.8);
      out[m.id][t.dbKey] = { current: score, last: score, updatedAt: at, attempts: [{ score, at }] };
    });
  });
  return out;
}

function TrackHarness() {
  const [track, setTrack] = useState(params.get('track') || 'Y7_MATH');
  const [full, setFull] = useState(7);
  const nav = useTrackNav(params.get('unit'));
  const [launched, setLaunched] = useState('');
  const theme = getTrackConfig(track)?.theme || {};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="sticky top-0 z-40 h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 flex items-center gap-3 px-6">
        <h1 className={`text-2xl font-black ${theme.text}`}>{getTrackConfig(track)?.title}</h1>
        <select value={track} onChange={(e) => setTrack(e.target.value)} className="ml-auto border-2 rounded-lg px-2 py-1 text-sm font-bold">
          {TRACK_REGISTRY.map((t) => <option key={t.id} value={t.id}>{t.id}</option>)}
        </select>
        <label className="text-xs font-bold text-slate-500">units done
          <input type="number" min="0" max="20" value={full} onChange={(e) => setFull(Number(e.target.value))} className="ml-2 w-14 border-2 rounded-lg px-2 py-1" />
        </label>
        {launched && <span className="text-xs font-bold text-emerald-600">launched {launched}</span>}
      </div>
      <TrackUnits
        key={track}
        track={track}
        unitScores={synthTrack(track, full)}
        requestedUnit={params.get('unit')}
        startMode={(u, t) => setLaunched(`${u}/${t}`)}
        nav={nav}
      />
    </div>
  );
}

// --- teacher -----------------------------------------------------------------

const NAMES = ['Vi Khoi', 'Minh Anh', 'Gia Bao', 'Thao Nguyen', 'Duc Huy', 'Khanh Linh', 'Quoc Bao', 'Ngoc Han', 'Tuan Kiet'];
const CLASSES = [
  { id: 'c7', name: 'Year 7', enrolled_tracks: ['Y7_MATH', 'Y7_SCI'], student_count: 6 },
  { id: 'cg', name: 'GED Sprint', enrolled_tracks: ['GED_MATH', 'GED_ENG', 'GED_SCIENCE', 'GED_HISTORY'], student_count: 2 },
];

// Full progress blobs by student id, for the stubbed getStudentDetail below.
const BLOBS = {};

/** Mirrors the backend's computeStats + computeDetail, from a synthetic blob. */
function rosterRow(id, name, classId, progress, pra) {
  BLOBS[id] = progress;
  const units = {};
  const flags = [];
  const recent = [];
  let total = 0; let completed = 0; let lastActive = null; let locked = false;
  for (const [track, td] of Object.entries(progress)) {
    for (const [unit, ud] of Object.entries(td)) {
      let xp = 0; let last = null;
      if (ud.strikes > 0) flags.push({ track, unit, strikes: ud.strikes });
      if (ud.strikes >= 3) locked = true;
      for (const [key, rec] of Object.entries(ud)) {
        if (!/^p\d+$/.test(key)) continue;
        xp += rec.current;
        if (!last || rec.updatedAt > last) last = rec.updatedAt;
        rec.attempts.forEach((a) => recent.push({ at: a.at, track, unit, key, score: a.score }));
      }
      xp = Math.min(xp, 100);
      (units[track] ||= {})[unit] = [xp, last];
      total += xp; if (xp >= 100) completed += 1;
      if (last && (!lastActive || last > lastActive)) lastActive = last;
    }
  }
  const cutoff = hoursAgo(14 * 24);
  return {
    id, name, pra_id: pra, class_id: classId, current_track: Object.keys(progress)[0] || null,
    total_xp: total, units_completed: completed, is_locked: locked, last_active: lastActive,
    units, flags, recent: recent.filter((r) => r.at >= cutoff).sort((a, b) => (a.at < b.at ? 1 : -1)),
  };
}

const ROSTER = NAMES.map((name, i) => {
  const id = `s${i}`;
  if (i >= 7) {
    return rosterRow(id, name, 'cg', { GED_MATH: synthTrack('GED_MATH', i - 4, 0.5, 5), GED_ENG: synthTrack('GED_ENG', i - 5, 0.4, 30) }, 1000 + i);
  }
  if (i === 6) return rosterRow(id, name, null, {}, null);
  // Spread the Year 7s out: a leader, a pack, and one who stopped three weeks ago.
  const age = i === 5 ? 24 * 21 : 2 + i * 20;
  const progress = {
    Y7_MATH: synthTrack('Y7_MATH', 8 - i, 0.3 + i * 0.1, age),
    Y7_SCI: synthTrack('Y7_SCI', Math.max(0, 5 - i), 0.5, age + 10),
  };
  // One locked student (two of the three strikes logged — the first predates
  // the log) and one with a single warning, plus some saved writing to read.
  if (i === 4) {
    const u = progress.Y7_MATH.U01_3;
    u.strikes = 3;
    u.strikeLog = [
      { at: hoursAgo(50), task: 'SHORT_ANSWERS', reason: 'garbage', question: 'Explain why the LCM of 4 and 6 is 12 and not 24.', text: 'asdfgh jkl idk lol' },
      { at: hoursAgo(49), task: 'SHORT_ANSWERS', reason: 'harmful', question: 'Explain why the LCM of 4 and 6 is 12 and not 24.', text: 'this is stupid and so are you' },
    ];
    u.p6.answers = {
      0: { text: '12 is the first number in both lists: 4, 8, 12 and 6, 12. 24 is a common multiple too but it is not the lowest one.', status: 'perfect' },
      1: { text: 'because you times them', status: 'attempted', score: 1, maxMarks: 2 },
    };
  }
  if (i === 2) {
    const u = progress.Y7_MATH.U01_1;
    u.strikes = 1;
    u.strikeLog = [{ at: hoursAgo(30), task: 'SHORT_ANSWERS', reason: 'garbage', question: 'Why is −3 − (−5) equal to 2?', text: 'jjjjjjjjjjjj' }];
  }
  return rosterRow(id, name, 'c7', progress, 1000 + i);
});

// The drawer talks to the admin API. Stand in for it: a fake session so
// adminApi sends a request, and a fetch that answers the two calls the drawer
// makes. Edits apply to the in-memory blob, so the chips really change.
function stubAdminApi() {
  supabase.auth.getSession = async () => ({ data: { session: { access_token: 'harness' } } });
  const realFetch = window.fetch.bind(window);
  window.fetch = async (url, opts) => {
    if (!String(url).includes('/api/admin/')) return realFetch(url, opts);
    const action = String(url).split('/').pop();
    const body = JSON.parse(opts?.body || '{}');
    const row = ROSTER.find((r) => r.id === body.studentId);
    let payload = { ok: true };
    if (action === 'getStudentDetail') {
      payload = { id: row.id, name: row.name, pra_id: row.pra_id, class_id: row.class_id, role: 'student', progress: BLOBS[row.id],
        enrolled_tracks: CLASSES.find((c) => c.id === row.class_id)?.enrolled_tracks || [] };
    } else if (action === 'setProgress') {
      for (const op of body.ops) {
        const unit = ((BLOBS[row.id][op.track] ||= {})[op.unit] ||= {});
        unit[op.dbKey] = { ...(unit[op.dbKey] || {}), current: op.value };
      }
      payload = { ok: true, progress: JSON.parse(JSON.stringify(BLOBS[row.id])) };
    } else if (action === 'clearStrikes') {
      const unit = BLOBS[row.id][body.track][body.unit];
      unit.strikes = 0;
      unit.strikeLog = (unit.strikeLog || []).map((e) => ({ ...e, clearedAt: new Date().toISOString() }));
      payload = { ok: true, cleared: 1, progress: JSON.parse(JSON.stringify(BLOBS[row.id])) };
    }
    return new Response(JSON.stringify(payload), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
}

function TeacherHarness() {
  const [opened, setOpened] = useState('');
  const [selected, setSelected] = useState(null);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {opened && <p className="mb-4 text-xs font-bold text-emerald-600">opened {opened}</p>}
        <TeacherViews
          roster={ROSTER}
          classes={CLASSES}
          onOpenStudent={(s, where = {}) => { setOpened(`${s.name} ${JSON.stringify(where)}`); setSelected({ student: s, ...where }); }}
          onAssign={async () => {}}
        />
      </div>
      <StudentProfileDrawer
        isOpen={selected !== null}
        student={selected?.student}
        focusTrack={selected?.track}
        focusUnit={selected?.unitId}
        classes={CLASSES}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

// Home reads the session for enrolment and the students row for progress.
function stubHome() {
  const enrolled = (params.get('tracks') || TRACK_REGISTRY.map((t) => t.id).join(',')).split(',');
  const progress = Object.fromEntries(enrolled.map((id, i) => [id, synthTrack(id, (i * 2) % 5, 0.5, 4 + i * 30)]));
  supabase.auth.getSession = async () => ({ data: { session: { user: { id: 'harness', app_metadata: { enrolled_tracks: enrolled }, user_metadata: {} } } } });
  supabase.from = () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: { progress }, error: null }) }) }) });
}

const view = params.get('view') || 'track';
if (view === 'home') stubHome();
if (view === 'teacher') stubAdminApi();
const VIEWS = { teacher: <TeacherHarness />, home: <HashRouter><Home /></HashRouter>, track: <TrackHarness /> };
createRoot(document.getElementById('root')).render(VIEWS[view] || VIEWS.track);
