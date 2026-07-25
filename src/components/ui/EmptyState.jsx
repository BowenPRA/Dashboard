import React from 'react';
import Button from './Button';

/**
 * Standardized full-screen "nothing here yet" / "coming soon" state. Unifies the
 * ad-hoc versions that were copy-pasted across task screens (drifting root bg,
 * title size/weight, and button styling).
 *
 * icon:     a rendered Lucide element, e.g. <FileEdit className="w-16 h-16" />
 *           (tone it with iconClassName; sizing is applied here if none given)
 * title:    heading text
 * message:  supporting line
 * action:   optional custom action node; if omitted and onAction is set, a
 *           standard primary "Return" button is rendered
 */
export default function EmptyState({
  icon,
  iconClassName = 'text-slate-300 dark:text-slate-600',
  title,
  message,
  actionLabel = 'Return',
  onAction,
  action,
  fullScreen = true,
  className = '',
}) {
  return (
    <div
      className={[
        fullScreen ? 'min-h-screen' : 'py-16',
        'bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center transition-colors',
        className,
      ].join(' ')}
    >
      {icon && (
        <div className={['mb-4', iconClassName].join(' ')}>
          {icon}
        </div>
      )}
      {title && <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{title}</h2>}
      {message && <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-md">{message}</p>}
      {action || (onAction && (
        <Button variant="primary" size="lg" onClick={onAction}>
          {actionLabel}
        </Button>
      ))}
    </div>
  );
}
