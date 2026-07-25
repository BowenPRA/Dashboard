import React from 'react';

/**
 * The standard surface: white / dark slate, big rounded corners, 2px border.
 * Matches the pattern documented in the polish brief exactly.
 */
export default function Card({ as: Comp = 'div', className = '', children, ...props }) {
  return (
    <Comp
      className={[
        'bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Comp>
  );
}
