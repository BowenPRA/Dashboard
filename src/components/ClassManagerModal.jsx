import React, { useEffect, useState } from 'react';
import {
  listClasses, createClass, updateClass, deleteClass, bulkEnroll,
} from '../utils/adminApi';
import { TRACK_REGISTRY } from './trackRegistry';
import {
  Loader2, Layers, Plus, Check, Trash2, Users, Rocket, CalendarDays, Pencil, AlertTriangle,
} from 'lucide-react';
import { Modal, Button } from './ui';

const GED_DEFAULT = TRACK_REGISTRY.filter((t) => t.group === 'GED').map((t) => t.id);
const blankDraft = () => ({ id: null, name: '', description: '', enrolled_tracks: GED_DEFAULT, study_plan: false });

// Track picker shared by the create and edit forms.
function TrackPicker({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TRACK_REGISTRY.map((t) => {
        const on = selected.includes(t.id);
        return (
          <button
            type="button" key={t.id} onClick={() => onToggle(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wide transition-all active:scale-95 ${on ? 'bg-brand-blue text-white border-brand-blue-edge' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
          >
            {on && <Check className="w-3.5 h-3.5" strokeWidth={3} />}{t.id}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Create, edit and delete classes; set each one's courses (enrolled tracks) and
 * study-plan flag; and apply those to every student in the class in one action.
 *
 * onChanged fires after any mutation so the dashboard can refresh its roster
 * (class counts, and — after an Apply — the students' tracks/plan).
 */
export default function ClassManagerModal({ isOpen, onClose, onChanged }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState(null); // null = list view; object = editing/creating
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null); // class id while an Apply/Delete runs
  const [notice, setNotice] = useState('');

  // Refresh the class list without touching the draft — used after a mutation.
  const load = async () => {
    try {
      const { classes: list } = await listClasses();
      setClasses(list || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Could not load classes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    (async () => {
      setLoading(true);
      setDraft(null);
      setNotice('');
      try {
        const { classes: list } = await listClasses();
        if (!alive) return;
        setClasses(list || []);
        setError('');
      } catch (err) {
        if (alive) setError(err.message || 'Could not load classes.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [isOpen]);

  const toggleTrack = (id) =>
    setDraft((d) => ({ ...d, enrolled_tracks: d.enrolled_tracks.includes(id) ? d.enrolled_tracks.filter((t) => t !== id) : [...d.enrolled_tracks, id] }));

  const saveDraft = async () => {
    if (!draft.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        name: draft.name.trim(),
        description: draft.description.trim(),
        enrolledTracks: draft.enrolled_tracks,
        studyPlan: draft.study_plan,
      };
      if (draft.id) await updateClass({ classId: draft.id, ...payload });
      else await createClass(payload);
      setDraft(null);
      await load();
      onChanged?.();
    } catch (err) {
      setError(err.message || 'Could not save the class.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (cls) => {
    if (!window.confirm(`Delete "${cls.name}"? Its ${cls.student_count} student(s) stay in the app but become unassigned.`)) return;
    setBusyId(cls.id);
    try {
      await deleteClass(cls.id);
      await load();
      onChanged?.();
    } catch (err) {
      setError(err.message || 'Could not delete the class.');
    } finally {
      setBusyId(null);
    }
  };

  const apply = async (cls) => {
    if (cls.student_count === 0) { setNotice(`"${cls.name}" has no students yet — assign some from the roster first.`); return; }
    const plan = cls.study_plan ? ' and turn the daily study plan ON' : '';
    if (!window.confirm(`Set ${cls.student_count} student(s) in "${cls.name}" to these courses (${cls.enrolled_tracks.join(', ') || 'none'})${plan}? This replaces each student's current enrolment.`)) return;
    setBusyId(cls.id);
    setNotice('');
    try {
      const { updated, failed } = await bulkEnroll(cls.id);
      setNotice(`Applied to ${updated} student(s)${failed?.length ? `, ${failed.length} failed` : ''}. They must log out and back in for study-plan access to take effect.`);
      onChanged?.();
    } catch (err) {
      setError(err.message || 'Could not apply to the class.');
    } finally {
      setBusyId(null);
    }
  };

  if (!isOpen) return null;

  const iconBadge = (
    <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center border-b-[4px] border-indigo-700">
      <Layers className="w-6 h-6" strokeWidth={2.5} />
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Classes" subtitle="Group students & assign courses" icon={iconBadge} size="xl">
      {error && (
        <div className="mb-4 flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-4 py-3 rounded-xl font-bold text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={2.5} /> {error}
        </div>
      )}
      {notice && (
        <div className="mb-4 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-xl font-bold text-sm">
          <Check className="w-4 h-4 shrink-0" strokeWidth={2.5} /> {notice}
        </div>
      )}

      {draft ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Class Name</label>
            <input autoFocus value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="e.g. GED Evening Cohort"
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Description (optional)</label>
            <input value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              placeholder="e.g. Mon/Wed/Fri 6pm"
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Courses (enrolled tracks)</label>
            <TrackPicker selected={draft.enrolled_tracks} onToggle={toggleTrack} />
          </div>
          <button type="button" onClick={() => setDraft((d) => ({ ...d, study_plan: !d.study_plan }))}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 font-black text-sm uppercase tracking-widest transition-all active:scale-[0.99] ${draft.study_plan ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`}>
            <CalendarDays className="w-5 h-5" strokeWidth={2.5} />
            Daily study plan {draft.study_plan ? 'ON' : 'OFF'}
            {draft.study_plan && <Check className="w-5 h-5 ml-auto" strokeWidth={3} />}
          </button>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" size="md" onClick={() => setDraft(null)} disabled={saving}>Cancel</Button>
            <Button variant="primary" size="md" onClick={saveDraft} disabled={saving || !draft.name.trim()} className="flex-1">
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" strokeWidth={2.5} />}
              {draft.id ? 'Save Class' : 'Create Class'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Button variant="success" size="md" onClick={() => setDraft(blankDraft())} className="w-full">
            <Plus className="w-5 h-5" strokeWidth={3} /> New Class
          </Button>

          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-brand-blue" strokeWidth={3} /></div>
          ) : classes.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-bold">No classes yet. Create one to group students and assign courses.</div>
          ) : (
            classes.map((cls) => (
              <div key={cls.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-black text-lg text-slate-800 dark:text-white truncate">{cls.name}</h3>
                      <span className="flex items-center gap-1 text-xs font-black text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                        <Users className="w-3.5 h-3.5" strokeWidth={2.5} /> {cls.student_count}
                      </span>
                      {cls.study_plan && (
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/40 px-2 py-1 rounded-lg">
                          <CalendarDays className="w-3 h-3" strokeWidth={3} /> Plan
                        </span>
                      )}
                    </div>
                    {cls.description && <p className="text-xs font-bold text-slate-400 mt-1">{cls.description}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cls.enrolled_tracks.length ? cls.enrolled_tracks.map((t) => (
                        <span key={t} className="text-[10px] font-black uppercase tracking-wide text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">{t}</span>
                      )) : <span className="text-[10px] font-bold text-slate-400 italic">No courses set</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => setDraft({ ...cls, description: cls.description || '' })} title="Edit"
                      className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-500 border-2 border-slate-200 dark:border-slate-700 active:scale-95">
                      <Pencil className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    <button onClick={() => remove(cls)} disabled={busyId === cls.id} title="Delete"
                      className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 border-2 border-slate-200 dark:border-slate-700 active:scale-95 disabled:opacity-50">
                      <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => apply(cls)} disabled={busyId === cls.id} className="w-full">
                  {busyId === cls.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" strokeWidth={2.5} />}
                  Apply courses{cls.study_plan ? ' + plan' : ''} to {cls.student_count} student{cls.student_count === 1 ? '' : 's'}
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </Modal>
  );
}
