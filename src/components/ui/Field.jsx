import React, { useId } from 'react';

/**
 * Label + input pairing matching the AddStudentModal form styling. Forwards any
 * input props (value, onChange, placeholder, inputMode, maxLength, autoFocus…).
 * Pass `hint` for the small helper line under the field.
 */
export default function Field({ label, hint, className = '', inputClassName = '', id, ...inputProps }) {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl',
          'font-bold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'focus:outline-none focus:border-brand-blue transition-colors',
          inputClassName,
        ].join(' ')}
        {...inputProps}
      />
      {hint && <p className="text-xs font-bold text-slate-400 mt-2">{hint}</p>}
    </div>
  );
}
