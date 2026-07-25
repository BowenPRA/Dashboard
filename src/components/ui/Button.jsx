import React from 'react';

/**
 * Tactile "pressable" button — the core aesthetic. Codifies the border-b + active
 * translate pattern that was copy-pasted across screens.
 *
 * variant: primary (blue) | success (green) | danger (rose) | secondary | ghost
 * size:    sm | md | lg
 * as:      render a different element (e.g. 'a'); defaults to 'button'
 */
const VARIANTS = {
  primary:
    'bg-brand-blue text-white border-brand-blue-edge hover:bg-brand-blue-hover',
  success:
    'bg-brand-green text-white border-brand-green-edge',
  danger:
    'bg-rose-500 text-white border-rose-700 hover:bg-rose-600',
  secondary:
    'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700',
  ghost:
    'bg-transparent text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
};

const SIZES = {
  sm: 'px-4 py-2 text-xs rounded-xl border-b-[3px] active:translate-y-[3px]',
  md: 'px-6 py-3 text-sm rounded-2xl border-b-[4px] active:translate-y-[4px]',
  lg: 'px-6 py-4 text-lg rounded-2xl border-b-[5px] active:translate-y-[5px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  as: Comp = 'button',
  className = '',
  disabled = false,
  children,
  ...props
}) {
  return (
    <Comp
      disabled={Comp === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      className={[
        'inline-flex items-center justify-center gap-2 font-black uppercase tracking-widest border-2',
        'transition-all active:border-b-0 select-none',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:border-b-2',
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Comp>
  );
}
