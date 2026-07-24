import React, { useState } from 'react';
import { createStudent } from '../utils/adminApi';
import { TRACK_REGISTRY } from './trackRegistry';
import { X, Loader2, UserPlus, Check } from 'lucide-react';

const GED_DEFAULT = TRACK_REGISTRY.filter((t) => t.group === 'GED').map((t) => t.id);

export default function AddStudentModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [praId, setPraId] = useState('');
  const [tracks, setTracks] = useState(GED_DEFAULT);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const reset = () => {
    setName(''); setPin(''); setPraId(''); setTracks(GED_DEFAULT); setError('');
  };

  const toggleTrack = (id) =>
    setTracks((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const canSubmit = name.trim() && /^\d{1,6}$/.test(pin.trim()) && !busy;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setError('');
    try {
      const { student } = await createStudent({
        name: name.trim(),
        pin: pin.trim(),
        praId: praId.trim() || undefined,
        enrolledTracks: tracks,
      });
      reset();
      onCreated?.(student);
      onClose();
    } catch (err) {
      setError(err.message || 'Could not create the student.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#58cc02] text-white rounded-2xl flex items-center justify-center border-b-[4px] border-[#58a700]">
              <UserPlus className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Add Student</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Creates a login instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 border-2 border-slate-200 dark:border-slate-700 active:scale-95">
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">First Name</label>
              <input
                autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mai"
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#1cb0f6]"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">PIN</label>
              <input
                value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} inputMode="numeric" maxLength={6} placeholder="e.g. 042"
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-black tracking-widest text-slate-800 dark:text-white focus:outline-none focus:border-[#1cb0f6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">PRA ID (optional)</label>
            <input
              value={praId} onChange={(e) => setPraId(e.target.value)} placeholder="defaults to the PIN"
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#1cb0f6]"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Enrolled Tracks</label>
            <div className="flex flex-wrap gap-2">
              {TRACK_REGISTRY.map((t) => {
                const on = tracks.includes(t.id);
                return (
                  <button
                    type="button" key={t.id} onClick={() => toggleTrack(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wide transition-all active:scale-95 ${on ? 'bg-[#1cb0f6] text-white border-[#1899d6]' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
                  >
                    {on && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                    {t.id}
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-bold text-slate-400 mt-2">Login will be <span className="text-slate-600 dark:text-slate-300">{(name.trim().toLowerCase().replace(/\s/g, '') || 'name')}@science.local</span></p>
          </div>

          {error && (
            <div className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 px-4 py-3 rounded-xl border-2 border-rose-200 dark:border-rose-800 font-bold text-sm">
              {error}
            </div>
          )}

          <button
            type="submit" disabled={!canSubmit}
            className="w-full flex items-center justify-center px-6 py-4 bg-[#58cc02] text-white rounded-2xl font-black text-lg uppercase tracking-widest border-b-[5px] border-[#58a700] active:border-b-0 active:translate-y-[5px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {busy ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Create Student'}
          </button>
        </form>
      </div>
    </div>
  );
}
