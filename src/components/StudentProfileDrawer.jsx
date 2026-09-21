import React, { useState, useEffect } from 'react';
import { getStudentDetail, updateStudent, setProgress, assignStudents, clearStrikes } from '../utils/adminApi';
import { getTrack } from '../data/index';
import { TRACK_IDS, TRACK_REGISTRY, ARCADE_TRACK_ID, getTrackConfig } from './trackRegistry';
import { TASKS, resolveUnitTasks, unitXPOf, isUnitComplete } from '../tasks/taskRegistry';
import { isUnitKey, ARCADE_KEYS } from '../utils/progressSchema';
import { essaysOf, ESSAYS_KEY } from '../utils/essayArchive';
import { sectionsOf, unitNumberOf, unitLastTouched } from '../utils/trackSections';
import { relTime, weekActivity } from './teacher/teacherStats';
import ActivityStrip from './teacher/ActivityStrip';
import SafetyPanel from './teacher/SafetyPanel';
import WrittenWork from './teacher/WrittenWork';
import EssayReviewPanel from './essay/EssayReviewPanel';
import {
  X, Loader2, Edit2, Check, XCircle, Gamepad2, BookOpen, Settings2, UserCog,
  Eraser, Rocket, Save, ChevronDown, ShieldAlert,
} from 'lucide-react';

// Derived from the task registry — the one place a task/dbKey is defined — so a
// new task (e.g. p13 GRAMMAR_EDIT) shows up here automatically.
const TASK_MAP = Object.fromEntries(
  TASKS.map((t) => [t.dbKey, { label: t.label, bg: t.color.bg, border: t.color.border, text: t.color.text }])
);

// Registry-resolved tasks (with real maxXP) for a unit, for bulk clear/advance.
const declaredTasks = (trackId, unitId) => {
  const unit = getTrack(trackId).data?.[unitId];
  return unit ? resolveUnitTasks(unit) : [];
};

// XP for a unit the content library no longer has (archived, or an unknown
// track): the sum of its task records, capped like any other unit.
const rawUnitXP = (unitData = {}) =>
  Math.min(100, Object.entries(unitData).reduce((sum, [k, v]) => sum + (/^p\d+$/.test(k) ? Number(v?.current) || 0 : 0), 0));

const unitKeysOf = (trackData) => Object.keys(trackData || {}).filter(isUnitKey);

/**
 * One student, in depth. `student` is their roster row (for the name and the
 * activity strip while the full record loads); `focusTrack` / `focusUnit` open
 * the drawer AT a unit — how a gradebook cell hands a teacher straight to the
 * thing they clicked.
 *
 * Progress is shown a track at a time, in course order, under the same
 * coursebook sections the student sees. Units start folded: the header line
 * (number, title, XP, last touched) is what a teacher reads; the task chips and
 * the clear/advance buttons are one click in.
 */
export default function StudentProfileDrawer({ isOpen, onClose, student, focusTrack = null, focusUnit = null, classes = [] }) {
  const studentId = student?.id;
  const [detail, setDetail] = useState(null); // { progress, name, pra_id, enrolled_tracks, role, class_id }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [trackTab, setTrackTab] = useState(null);
  // undefined = "whatever the default is"; null = the teacher folded everything.
  const [openUnit, setOpenUnit] = useState(undefined);

  const [editingTask, setEditingTask] = useState(null);
  const [draftXp, setDraftXp] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [busyUnit, setBusyUnit] = useState(null); // `${track}/${unit}` while a bulk op runs

  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ name: '', pin: '', tracks: [], classId: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  const progressData = detail?.progress || null;

  useEffect(() => {
    if (!isOpen || !studentId) return;
    let alive = true;
    (async () => {
      setIsLoading(true);
      // Clear the last student, or their name heads the drawer while this one loads.
      setDetail(null);
      setError('');
      setShowEdit(false);
      setEditingTask(null);
      setTrackTab(null);
      setOpenUnit(undefined);
      try {
        const d = await getStudentDetail(studentId);
        if (!alive) return;
        setDetail(d);
        setForm({ name: d.name || '', pin: '', tracks: d.enrolled_tracks || [], classId: d.class_id || '' });
      } catch (err) {
        if (alive) setError(err.message || 'Could not load this student.');
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [isOpen, studentId]);

  // Opened from a gradebook cell: bring that unit into view once it exists.
  useEffect(() => {
    if (!detail || !focusUnit) return;
    document.getElementById(`drawer-unit-${focusUnit}`)?.scrollIntoView({ block: 'center' });
  }, [detail, focusUnit]);

  // Escape closes the drawer, like every other overlay in the app.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Apply an ops list via the backend, then adopt its authoritative progress.
  const applyOps = async (ops) => {
    const { progress } = await setProgress(studentId, ops);
    setDetail((prev) => ({ ...prev, progress }));
  };

  const handleSaveXp = async (trackId, unitId, taskId) => {
    if (draftXp === '' || isNaN(draftXp)) { setEditingTask(null); return; }
    setIsSaving(true);
    try {
      await applyOps([{ track: trackId, unit: unitId, dbKey: taskId, value: parseInt(draftXp, 10) }]);
    } catch (err) {
      alert(err.message || 'Failed to save XP.');
    } finally {
      setIsSaving(false);
      setEditingTask(null);
    }
  };

  const handleBulk = async (trackId, unitId, mode) => {
    const tasks = declaredTasks(trackId, unitId);
    if (!tasks.length) return;
    const ops = tasks.map((t) => ({
      track: trackId, unit: unitId, dbKey: t.dbKey,
      value: mode === 'clear' ? 0 : t.maxXP,
    }));
    setBusyUnit(`${trackId}/${unitId}`);
    try {
      await applyOps(ops);
    } catch (err) {
      alert(err.message || 'Bulk update failed.');
    } finally {
      setBusyUnit(null);
    }
  };

  // Remove the AI-grader lock on one unit; adopt the server's progress. Throws
  // on failure — SafetyPanel shows the message beside the button.
  const handleClearStrikes = async (trackId, unitId) => {
    const { progress } = await clearStrikes(studentId, trackId, unitId);
    setDetail((prev) => ({ ...prev, progress }));
  };

  // annotateEssay returns the updated archive entry; swap it in place rather
  // than refetching the whole record.
  const handleEssayUpdated = (trackId, essay) => {
    setDetail((prev) => {
      const trackData = prev?.progress?.[trackId];
      if (!trackData) return prev;
      const list = essaysOf(trackData).map((e) => (e.id === essay.id ? { ...e, ...essay } : e));
      return { ...prev, progress: { ...prev.progress, [trackId]: { ...trackData, [ESSAYS_KEY]: list } } };
    });
  };

  const toggleTrack = (id) =>
    setForm((f) => ({ ...f, tracks: f.tracks.includes(id) ? f.tracks.filter((t) => t !== id) : [...f.tracks, id] }));

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      await updateStudent({
        studentId,
        name: form.name.trim() || undefined,
        pin: form.pin.trim() || undefined,
        enrolledTracks: form.tracks,
      });
      // Class membership lives on the students table, not auth metadata, so it
      // is a separate call — only made when it actually changed.
      if ((form.classId || null) !== (detail?.class_id || null)) {
        await assignStudents(form.classId || null, [studentId]);
      }
      setDetail((prev) => ({ ...prev, name: form.name.trim() || prev.name, enrolled_tracks: form.tracks, class_id: form.classId || null }));
      setForm((f) => ({ ...f, pin: '' }));
      setShowEdit(false);
    } catch (err) {
      alert(err.message || 'Failed to update student.');
    } finally {
      setSavingProfile(false);
    }
  };

  if (!isOpen) return null;

  // --- which tracks get a tab --------------------------------------------------
  // Enrolled tracks and anything with progress, in registry order; then any
  // progress key that isn't a registered track, so nothing a student has done
  // can silently vanish from this drawer (the failure mode that hid newer
  // tracks). The Arcade holds scores, not units, and has nothing to edit.
  const enrolled = detail?.enrolled_tracks || [];
  const tabs = progressData ? [
    ...TRACK_IDS.filter((id) => id !== ARCADE_TRACK_ID && (unitKeysOf(progressData[id]).length > 0 || enrolled.includes(id))),
    ...Object.keys(progressData).filter((k) => !TRACK_IDS.includes(k) && unitKeysOf(progressData[k]).length > 0),
  ] : [];

  const trackLastTouched = (id) => unitKeysOf(progressData?.[id])
    .map((u) => unitLastTouched(progressData[id][u]))
    .filter(Boolean).sort().pop() || '';
  const mostRecentTrack = [...tabs].sort((a, b) => (trackLastTouched(a) < trackLastTouched(b) ? 1 : -1))[0];
  const activeTrack = [trackTab, focusTrack, mostRecentTrack].find((t) => t && tabs.includes(t)) || null;

  // --- the active track's units, in course order -------------------------------
  const trackData = (activeTrack && progressData?.[activeTrack]) || {};
  const { meta: trackMeta, data: trackContent } = getTrack(activeTrack);
  const known = new Set(trackMeta.map((m) => m.id));
  const orphans = unitKeysOf(trackData).filter((u) => !known.has(u)).map((id) => ({ id, title: id, desc: '', orphan: true }));
  const sections = activeTrack ? [
    ...sectionsOf(activeTrack, trackMeta).filter((s) => s.units.length),
    ...(orphans.length ? [{ key: '__orphans', label: 'Archived', title: 'Units no longer in the course', units: orphans }] : []),
  ] : [];
  const showSectionHeads = sections.length > 1;

  const xpFor = (unitId) => (trackContent[unitId] ? unitXPOf(trackContent[unitId], trackData[unitId] || {}) : rawUnitXP(trackData[unitId]));
  const allUnits = sections.flatMap((s) => s.units);
  // Finished = 100 XP, or 80+ with the quiz sat; archived units can only go by XP.
  const doneFor = (unitId) => (trackContent[unitId] ? isUnitComplete(trackContent[unitId], trackData[unitId] || {}) : xpFor(unitId) >= 100);
  const trackDone = allUnits.filter((u) => doneFor(u.id)).length;

  const defaultOpen = (focusTrack === activeTrack && focusUnit)
    || allUnits.map((u) => ({ id: u.id, at: unitLastTouched(trackData[u.id]) })).filter((u) => u.at).sort((a, b) => (a.at < b.at ? 1 : -1))[0]?.id
    || null;
  const activeUnit = openUnit === undefined ? defaultOpen : openUnit;

  // Headline numbers from the live record, so they follow edits made here.
  const totals = Object.entries(progressData || {}).reduce((acc, [id, td]) => {
    if (id === ARCADE_TRACK_ID) return acc;
    const content = getTrack(id).data;
    for (const u of unitKeysOf(td)) {
      const xp = content[u] ? unitXPOf(content[u], td[u]) : rawUnitXP(td[u]);
      acc.xp += xp;
      if (content[u] ? isUnitComplete(content[u], td[u]) : xp >= 100) acc.done += 1;
    }
    return acc;
  }, { xp: 0, done: 0 });
  const week = weekActivity(student);
  const cfg = getTrackConfig(activeTrack);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-slate-50 dark:bg-slate-950 h-full shadow-2xl border-l-2 border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right-full duration-200">

        <div className="bg-white dark:bg-slate-900 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b-2 border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl bg-[#1cb0f6] border-b-[4px] border-[#1899d6] flex-shrink-0">
                {(detail?.name || student?.name || '?').charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-tight break-words">
                  {detail?.name || student?.name}
                </h2>
                <p className="text-slate-400 font-bold text-xs">
                  {[classes.find((c) => c.id === (detail?.class_id ?? student?.class_id))?.name, (detail?.pra_id ?? student?.pra_id) ? `PRA ${detail?.pra_id ?? student?.pra_id}` : null].filter(Boolean).join(' · ') || 'Student record'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowEdit((v) => !v)}
                className={`h-10 px-4 flex items-center gap-2 rounded-xl border-2 font-black text-xs uppercase tracking-widest transition-colors active:scale-95 ${showEdit ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-indigo-500'}`}
              >
                <UserCog className="w-4 h-4" strokeWidth={2.5} /> Edit
              </button>
              <button onClick={onClose} aria-label="Close" className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors border-2 border-slate-200 dark:border-slate-700 active:scale-95">
                <X className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* At a glance */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4">
            <Stat label="Total XP" value={progressData ? totals.xp.toLocaleString() : (student?.total_xp || 0).toLocaleString()} />
            <Stat label="Units done" value={progressData ? totals.done : (student?.units_completed || 0)} />
            <Stat label="Last active" value={relTime(student?.last_active)} />
            {week && <Stat label="This week" value={`${week.tasks} ${week.tasks === 1 ? 'task' : 'tasks'}`} />}
            {Array.isArray(student?.recent) && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Last 14 days</p>
                <ActivityStrip recent={student.recent} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-[#1cb0f6] mb-4" strokeWidth={3} />
              <p className="text-xs font-black tracking-widest uppercase text-slate-400">Loading Records...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-rose-500">
              <XCircle className="w-14 h-14 mb-4 opacity-70" strokeWidth={2} />
              <p className="text-center font-bold text-lg max-w-sm">{error}</p>
            </div>
          ) : (
            <>
              {/* Edit panel */}
              {showEdit && (
                <div className="bg-white dark:bg-slate-900 rounded-[1.75rem] border-2 border-indigo-200 dark:border-indigo-900 p-6 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <Settings2 className="w-5 h-5" strokeWidth={2.5} />
                    <h3 className="font-black uppercase tracking-widest text-sm">Edit Student</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Name</label>
                      <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-white focus:outline-none focus:border-indigo-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Reset PIN (optional)</label>
                      <input value={form.pin} onChange={(e) => setForm((f) => ({ ...f, pin: e.target.value.replace(/\D/g, '') }))} inputMode="numeric" maxLength={6} placeholder="leave blank to keep"
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-black tracking-widest text-slate-800 dark:text-white focus:outline-none focus:border-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Enrolled Tracks</label>
                    <div className="flex flex-wrap gap-2">
                      {TRACK_REGISTRY.map((t) => {
                        const on = form.tracks.includes(t.id);
                        return (
                          <button type="button" key={t.id} onClick={() => toggleTrack(t.id)} title={t.id}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-black tracking-wide transition-all active:scale-95 ${on ? 'bg-[#1cb0f6] text-white border-[#1899d6]' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                            {on && <Check className="w-3.5 h-3.5" strokeWidth={3} />}{t.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {classes.length > 0 && (
                    <div>
                      <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Class</label>
                      <select
                        value={form.classId}
                        onChange={(e) => setForm((f) => ({ ...f, classId: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-white focus:outline-none focus:border-indigo-400 appearance-none cursor-pointer"
                      >
                        <option value="">— No class —</option>
                        {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  )}
                  <button onClick={saveProfile} disabled={savingProfile}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest border-b-[4px] border-indigo-800 active:border-b-0 active:translate-y-[4px] disabled:opacity-50 transition-all">
                    {savingProfile ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" strokeWidth={2.5} />}
                    Save Changes
                  </button>
                </div>
              )}

              {progressData && <SafetyPanel progress={progressData} onClear={handleClearStrikes} />}

              {progressData && (
                <EssayReviewPanel studentId={studentId} progress={progressData} onEssayUpdated={handleEssayUpdated} />
              )}

              {/* Track tabs */}
              {tabs.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tabs.map((id) => {
                    const t = getTrackConfig(id);
                    const on = id === activeTrack;
                    const Icon = t?.icon || BookOpen;
                    return (
                      <button
                        key={id}
                        onClick={() => { setTrackTab(id); setOpenUnit(undefined); setEditingTask(null); }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-b-[3px] text-xs font-black tracking-wide transition-all active:border-b-2 active:translate-y-[1px]
                          ${on ? `${t?.theme.bg || 'bg-slate-500'} ${t?.theme.border || 'border-slate-700'} text-white` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                        {t?.title || id}
                      </button>
                    );
                  })}
                </div>
              )}

              {activeTrack && (
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className={`text-lg font-black tracking-tight ${cfg?.theme.text || 'text-slate-700 dark:text-slate-200'}`}>{cfg?.title || activeTrack}</h3>
                    <p className="text-xs font-black tabular-nums text-slate-400">{trackDone}/{allUnits.length} units done</p>
                  </div>

                  {sections.map((section) => (
                    <div key={section.key} className="mb-5">
                      {showSectionHeads && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white ${section.key === '__orphans' ? 'bg-slate-400' : cfg?.theme.bg || 'bg-slate-400'}`}>{section.label}</span>
                          <span className="text-xs font-black text-slate-500 dark:text-slate-400">{section.title}</span>
                          <span className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                        </div>
                      )}

                      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y-2 divide-slate-100 dark:divide-slate-800">
                        {section.units.map((u) => {
                          const unitData = trackData[u.id] || {};
                          const xp = xpFor(u.id);
                          const touched = unitLastTouched(unitData);
                          const isOpenUnit = activeUnit === u.id;
                          const unitKey = `${activeTrack}/${u.id}`;
                          const bulkBusy = busyUnit === unitKey;
                          const arcadeBest = Math.max(0, ...ARCADE_KEYS.map((k) => unitData?.[k]?.current || 0), unitData?.p12?.current || 0);
                          const strikes = Number(unitData.strikes) || 0;
                          const locked = strikes >= 3;
                          const declared = declaredTasks(activeTrack, u.id);
                          const declaredKeys = new Set(declared.map((t) => t.dbKey));
                          // Records under a key the unit no longer declares still show, so they can be zeroed.
                          const strays = Object.keys(unitData).filter((k) => TASK_MAP[k] && !declaredKeys.has(k) && k !== 'p12');
                          const chips = [
                            ...declared.map((t) => ({ key: t.dbKey, label: t.label, max: t.maxXP, color: t.color })),
                            ...strays.map((k) => ({ key: k, label: TASK_MAP[k].label, max: null, color: TASK_MAP[k] })),
                          ];

                          return (
                            <div key={u.id} id={`drawer-unit-${u.id}`}>
                              <button
                                onClick={() => { setOpenUnit(isOpenUnit ? null : u.id); setEditingTask(null); }}
                                aria-expanded={isOpenUnit}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${xp === 0 && !touched ? 'opacity-60' : ''}`}
                              >
                                <span className="w-9 text-xs font-black tabular-nums text-slate-400 flex-shrink-0">{unitNumberOf(u.id) || '—'}</span>
                                <span className="min-w-0 flex-1">
                                  <span className="block font-black text-slate-800 dark:text-white truncate leading-tight">{u.title}</span>
                                  <span className="block text-[11px] font-bold text-slate-400">
                                    {touched ? `Last worked ${relTime(touched).toLowerCase()}` : 'Not started'}
                                  </span>
                                </span>
                                {strikes > 0 && (
                                  <span className={`flex items-center gap-1 text-[11px] font-black flex-shrink-0 ${locked ? 'text-rose-500' : 'text-amber-500'}`} title={locked ? 'AI safety lock engaged' : `${strikes}/3 AI grader strikes`}>
                                    <ShieldAlert className="w-4 h-4" strokeWidth={2.5} />{strikes}/3
                                  </span>
                                )}
                                {arcadeBest > 0 && (
                                  <span className="hidden sm:flex items-center gap-1 text-[11px] font-black text-amber-600 dark:text-amber-400 flex-shrink-0" title="Arcade high score">
                                    <Gamepad2 className="w-3.5 h-3.5" strokeWidth={2.5} />{arcadeBest.toLocaleString()}
                                  </span>
                                )}
                                <span className="hidden sm:block w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                  <span className={`block h-full rounded-full ${doneFor(u.id) ? 'bg-emerald-500' : cfg?.theme.bg || 'bg-slate-400'}`} style={{ width: `${xp}%` }} />
                                </span>
                                <span className={`w-9 text-right text-sm font-black tabular-nums flex-shrink-0 ${doneFor(u.id) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`} title={doneFor(u.id) ? 'Finished' : undefined}>{xp}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpenUnit ? 'rotate-180' : ''}`} strokeWidth={3} />
                              </button>

                              {isOpenUnit && (
                                <div className="px-4 pb-4 pt-1 bg-slate-50/60 dark:bg-slate-800/20 animate-in fade-in duration-150">
                                  {strikes > 0 && (
                                    <p className={`mb-3 text-xs font-bold ${locked ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                      {locked ? 'AI safety lock engaged on this unit (3 strikes) — AI marking is off.' : `${strikes}/3 AI grader strikes on this unit.`}
                                      {' '}What was typed, and the reset, are under "AI grader warnings" above.
                                    </p>
                                  )}
                                  <div className="flex flex-wrap gap-2">
                                    {chips.map((chip) => {
                                      const rec = unitData[chip.key];
                                      const currentXp = rec?.current || 0;
                                      const attempts = rec?.attempts?.length || 0;
                                      const hint = rec
                                        ? `${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}${rec.last != null ? ` · last score ${rec.last}` : ''}${rec.updatedAt ? ` · ${relTime(rec.updatedAt).toLowerCase()}` : ''}`
                                        : 'Not attempted';
                                      const isEditingThis = editingTask?.unitId === u.id && editingTask?.taskId === chip.key;
                                      const c = chip.color;

                                      return isEditingThis ? (
                                        <div key={chip.key} className={`flex items-center p-1 pl-3 rounded-xl border-b-[3px] shadow-sm animate-in zoom-in-95 ${c.bg} ${c.border} ${c.text}`}>
                                          <span className="text-[11px] font-black uppercase tracking-wider mr-2">{chip.label}</span>
                                          <input type="number" autoFocus value={draftXp} onChange={(e) => setDraftXp(e.target.value)}
                                            onFocus={(e) => e.target.select()}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSaveXp(activeTrack, u.id, chip.key); if (e.key === 'Escape') { e.stopPropagation(); setEditingTask(null); } }}
                                            className="w-14 text-center font-black text-slate-800 rounded-lg py-1 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-inner" disabled={isSaving} />
                                          <button onClick={() => handleSaveXp(activeTrack, u.id, chip.key)} disabled={isSaving} aria-label="Save" className="ml-1.5 p-1.5 bg-white/20 hover:bg-white/40 rounded-lg transition-colors active:scale-95">
                                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" strokeWidth={3} />}
                                          </button>
                                          <button onClick={() => setEditingTask(null)} disabled={isSaving} aria-label="Cancel" className="ml-1 p-1.5 bg-white/20 hover:bg-white/40 rounded-lg transition-colors active:scale-95">
                                            <XCircle className="w-4 h-4" strokeWidth={3} />
                                          </button>
                                        </div>
                                      ) : (
                                        <button key={chip.key} title={`${hint} — click to edit`}
                                          onClick={() => { setEditingTask({ unitId: u.id, taskId: chip.key }); setDraftXp(currentXp.toString()); }}
                                          className={`group flex items-center gap-2 px-3 py-2 rounded-xl border-b-[3px] shadow-sm transition-all hover:brightness-110 active:border-b-[1px] active:translate-y-[2px] ${c.bg} ${c.border} ${c.text} ${rec ? '' : 'opacity-50 saturate-50'}`}>
                                          <span className="text-[11px] font-black uppercase tracking-wider">{chip.label}</span>
                                          <span className="text-xs font-black tabular-nums bg-black/15 px-1.5 py-0.5 rounded-md">
                                            {currentXp}{chip.max != null ? `/${chip.max}` : ''}
                                          </span>
                                          <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                                        </button>
                                      );
                                    })}
                                    {chips.length === 0 && <p className="text-xs font-bold text-slate-400">No editable tasks recorded for this unit.</p>}
                                  </div>

                                  {declared.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                      <button onClick={() => handleBulk(activeTrack, u.id, 'clear')} disabled={bulkBusy}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 font-black text-[11px] uppercase tracking-widest hover:bg-rose-100 active:scale-95 transition-all disabled:opacity-50">
                                        {bulkBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eraser className="w-3.5 h-3.5" strokeWidth={2.5} />} Clear Unit
                                      </button>
                                      <button onClick={() => handleBulk(activeTrack, u.id, 'advance')} disabled={bulkBusy}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 font-black text-[11px] uppercase tracking-widest hover:bg-emerald-100 active:scale-95 transition-all disabled:opacity-50">
                                        {bulkBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Rocket className="w-3.5 h-3.5" strokeWidth={2.5} />} Advance to Full
                                      </button>
                                    </div>
                                  )}

                                  <WrittenWork unit={trackContent[u.id]} unitData={unitData} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {progressData && tabs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <BookOpen className="w-16 h-16 mb-4 opacity-20" strokeWidth={2} />
                  <p className="text-center font-bold text-lg max-w-sm">No progress recorded yet, and no tracks enrolled. Use Edit to enrol this student in a track.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-lg font-black tabular-nums text-slate-800 dark:text-white leading-tight">{value}</p>
    </div>
  );
}
