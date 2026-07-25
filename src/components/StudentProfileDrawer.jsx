import React, { useState, useEffect } from 'react';
import { getStudentDetail, updateStudent, setProgress } from '../utils/adminApi';
import { getTrack } from '../data/index';
import { TRACK_IDS, TRACK_REGISTRY } from './trackRegistry';
import { TASKS, resolveUnitTasks } from '../tasks/taskRegistry';
import {
  X, Loader2, Edit2, Check, XCircle, Gamepad2, BookOpen, Settings2, UserCog,
  Eraser, Rocket, Save
} from 'lucide-react';

// Derived from the task registry — the one place a task/dbKey is defined — so a
// new task (e.g. p13 GRAMMAR_EDIT) shows up here automatically.
const TASK_MAP = Object.fromEntries(
  TASKS.map((t) => [t.dbKey, { label: t.label, bg: t.color.bg, border: t.color.border, text: t.color.text }])
);

const getUnitMeta = (trackId, unitId) =>
  getTrack(trackId).meta.find((u) => u.id === unitId) || { title: 'Unknown Unit', desc: '' };

// Registry-resolved tasks (with real maxXP) for a unit, for bulk clear/advance.
const declaredTasks = (trackId, unitId) => {
  const unit = getTrack(trackId).data?.[unitId];
  return unit ? resolveUnitTasks(unit) : [];
};

export default function StudentProfileDrawer({ isOpen, onClose, studentId, studentName }) {
  const [detail, setDetail] = useState(null); // { progress, name, pra_id, enrolled_tracks, role }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [editingTask, setEditingTask] = useState(null);
  const [draftXp, setDraftXp] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [busyUnit, setBusyUnit] = useState(null); // `${track}/${unit}` while a bulk op runs

  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ name: '', pin: '', tracks: [] });
  const [savingProfile, setSavingProfile] = useState(false);

  const progressData = detail?.progress || null;

  useEffect(() => {
    if (!isOpen || !studentId) return;
    let alive = true;
    (async () => {
      setIsLoading(true);
      setError('');
      setShowEdit(false);
      setEditingTask(null);
      try {
        const d = await getStudentDetail(studentId);
        if (!alive) return;
        setDetail(d);
        setForm({ name: d.name || '', pin: '', tracks: d.enrolled_tracks || [] });
      } catch (err) {
        if (alive) setError(err.message || 'Could not load this student.');
      } finally {
        if (alive) setIsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [isOpen, studentId]);

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
      setDetail((prev) => ({ ...prev, name: form.name.trim() || prev.name, enrolled_tracks: form.tracks }));
      setForm((f) => ({ ...f, pin: '' }));
      setShowEdit(false);
    } catch (err) {
      alert(err.message || 'Failed to update student.');
    } finally {
      setSavingProfile(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-slate-50 dark:bg-slate-950 h-full shadow-2xl border-l-2 border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right-full duration-300">

        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 border-b-2 border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-1 break-words">
              {detail?.name || studentName}'s Profile
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Detailed Academic Record</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowEdit((v) => !v)}
              className={`h-10 px-4 flex items-center gap-2 rounded-xl border-2 font-black text-xs uppercase tracking-widest transition-colors active:scale-95 ${showEdit ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-indigo-500'}`}
            >
              <UserCog className="w-4 h-4" strokeWidth={2.5} /> Edit
            </button>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors border-2 border-slate-200 dark:border-slate-700 active:scale-95">
              <X className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-[#1cb0f6] mb-4" strokeWidth={3} />
              <p className="text-sm font-black tracking-widest uppercase text-slate-400">Loading Records...</p>
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
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-indigo-200 dark:border-indigo-900 p-6 shadow-sm space-y-5">
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
                          <button type="button" key={t.id} onClick={() => toggleTrack(t.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wide transition-all active:scale-95 ${on ? 'bg-[#1cb0f6] text-white border-[#1899d6]' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                            {on && <Check className="w-3.5 h-3.5" strokeWidth={3} />}{t.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button onClick={saveProfile} disabled={savingProfile}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest border-b-[4px] border-indigo-800 active:border-b-0 active:translate-y-[4px] disabled:opacity-50 transition-all">
                    {savingProfile ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" strokeWidth={2.5} />}
                    Save Changes
                  </button>
                </div>
              )}

              {progressData && TRACK_IDS.map((trackId) => {
                const trackData = progressData[trackId];
                if (!trackData || Object.keys(trackData).length === 0) return null;

                return (
                  <div key={trackId} className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white border-b-4 border-slate-200 dark:border-slate-800 pb-3 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3 text-indigo-500" strokeWidth={3} />
                      Track: {trackId}
                    </h3>

                    {Object.entries(trackData).map(([unitId, unitData]) => {
                      const unitMeta = getUnitMeta(trackId, unitId);
                      const p12Score = unitData?.p12?.current || 0;
                      const gamesScore = unitData?.GAMES?.current || 0;
                      const gamesLowerScore = unitData?.games?.current || 0;
                      const unitArcadeScore = Math.max(p12Score, gamesScore, gamesLowerScore);
                      const unitKey = `${trackId}/${unitId}`;
                      const bulkBusy = busyUnit === unitKey;

                      return (
                        <div key={unitId} className="bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden">

                          <div className="mb-6 border-b-2 border-slate-100 dark:border-slate-800/50 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1.5">
                                <h4 className="font-black text-slate-800 dark:text-white text-xl md:text-2xl tracking-tight">{unitMeta.title}</h4>
                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-inner">{unitId}</span>
                              </div>
                              {unitMeta.desc && <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide">{unitMeta.desc}</p>}
                            </div>

                            <div className="flex items-center gap-4">
                              {unitArcadeScore > 0 && (
                                <div className="flex flex-col sm:items-end">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Arcade High</span>
                                  <div className="flex items-center text-sm font-black tracking-widest uppercase bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3.5 py-1.5 rounded-xl border-b-[3px] border-orange-700 shadow-sm">
                                    <Gamepad2 className="w-4 h-4 mr-2 drop-shadow-sm" strokeWidth={2.5} />{unitArcadeScore.toLocaleString()}
                                  </div>
                                </div>
                              )}
                              {(unitData.strikes || 0) >= 3 && (
                                <div className="flex flex-col sm:items-end">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">Safety Lock</span>
                                  <span className="text-xs font-black uppercase tracking-widest bg-rose-100 text-rose-600 px-3 py-1.5 rounded-xl border border-rose-200">Engaged</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {Object.entries(unitData)
                              .filter(([taskId]) => taskId !== 'strikes' && TASK_MAP[taskId])
                              .map(([taskId, taskData]) => {
                                const config = TASK_MAP[taskId];
                                const currentXp = taskData?.current || 0;
                                const isEditingThis = editingTask?.unitId === unitId && editingTask?.taskId === taskId && editingTask?.trackId === trackId;

                                return isEditingThis ? (
                                  <div key={taskId} className={`flex items-center p-1.5 pl-4 rounded-xl border-b-[4px] shadow-sm animate-in zoom-in-95 ${config.bg} ${config.border} ${config.text}`}>
                                    <span className="text-xs font-black uppercase tracking-wider mr-3">{config.label}:</span>
                                    <input type="number" autoFocus value={draftXp} onChange={(e) => setDraftXp(e.target.value)}
                                      className="w-16 text-center font-black text-slate-800 rounded-lg py-1 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-inner" disabled={isSaving} />
                                    <button onClick={() => handleSaveXp(trackId, unitId, taskId)} disabled={isSaving} className="ml-2 p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-colors active:scale-95">
                                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" strokeWidth={3} />}
                                    </button>
                                    <button onClick={() => setEditingTask(null)} disabled={isSaving} className="ml-1 p-2 bg-white/20 hover:bg-white/40 hover:text-rose-200 rounded-lg transition-colors mr-1 active:scale-95">
                                      <XCircle className="w-4 h-4" strokeWidth={3} />
                                    </button>
                                  </div>
                                ) : (
                                  <button key={taskId} onClick={() => { setEditingTask({ trackId, unitId, taskId }); setDraftXp(currentXp.toString()); }}
                                    className={`group relative flex items-center px-4 py-2.5 rounded-xl border-b-[4px] shadow-sm transition-all hover:scale-[1.03] active:scale-95 active:border-b-[2px] active:translate-y-[2px] ${config.bg} ${config.border} ${config.text}`}>
                                    <span className="text-xs font-black uppercase tracking-wider mr-2">{config.label}:</span>
                                    <span className="text-sm font-black bg-black/10 px-2 py-0.5 rounded-md">{currentXp} XP</span>
                                    <div className="absolute inset-0 bg-black/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-3">
                                      <Edit2 className="w-4 h-4 text-white drop-shadow-md" strokeWidth={3} />
                                    </div>
                                  </button>
                                );
                              })}
                          </div>

                          {/* Bulk unit actions */}
                          <div className="mt-5 pt-5 border-t-2 border-slate-100 dark:border-slate-800/50 flex flex-wrap gap-3">
                            <button onClick={() => handleBulk(trackId, unitId, 'clear')} disabled={bulkBusy}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 font-black text-xs uppercase tracking-widest hover:bg-rose-100 active:scale-95 transition-all disabled:opacity-50">
                              {bulkBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eraser className="w-4 h-4" strokeWidth={2.5} />} Clear Unit
                            </button>
                            <button onClick={() => handleBulk(trackId, unitId, 'advance')} disabled={bulkBusy}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 font-black text-xs uppercase tracking-widest hover:bg-emerald-100 active:scale-95 transition-all disabled:opacity-50">
                              {bulkBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" strokeWidth={2.5} />} Advance to Full
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {progressData && !TRACK_IDS.some((t) => progressData[t] && Object.keys(progressData[t]).length) && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <BookOpen className="w-16 h-16 mb-4 opacity-20" strokeWidth={2} />
                  <p className="text-center font-bold text-lg">No progress recorded yet. Use the buttons above once the student starts a unit.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
