import React, { useState } from 'react';
import { createStudent } from '../utils/adminApi';
import { TRACK_REGISTRY } from './trackRegistry';
import { Loader2, UserPlus, Check } from 'lucide-react';
import { Modal, Button, Field } from './ui';

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

  const iconBadge = (
    <div className="w-12 h-12 bg-brand-green text-white rounded-2xl flex items-center justify-center border-b-[4px] border-brand-green-edge">
      <UserPlus className="w-6 h-6" strokeWidth={2.5} />
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Student" subtitle="Creates a login instantly" icon={iconBadge} size="md">
        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="First Name" autoFocus value={name}
              onChange={(e) => setName(e.target.value)} placeholder="e.g. Mai"
            />
            <Field
              label="PIN" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              inputMode="numeric" maxLength={6} placeholder="e.g. 042"
              inputClassName="font-black tracking-widest"
            />
          </div>

          <Field
            label="PRA ID (optional)" value={praId}
            onChange={(e) => setPraId(e.target.value)} placeholder="defaults to the PIN"
          />

          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Enrolled Tracks</label>
            <div className="flex flex-wrap gap-2">
              {TRACK_REGISTRY.map((t) => {
                const on = tracks.includes(t.id);
                return (
                  <button
                    type="button" key={t.id} onClick={() => toggleTrack(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wide transition-all active:scale-95 ${on ? 'bg-brand-blue text-white border-brand-blue-edge' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
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

          <Button type="submit" variant="success" size="lg" disabled={!canSubmit} className="w-full">
            {busy ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Create Student'}
          </Button>
        </form>
    </Modal>
  );
}
