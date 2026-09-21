import React from 'react';
import { activityDays } from './teacherStats';

const tone = (n) => {
  if (!n) return 'bg-slate-100 dark:bg-slate-800';
  if (n >= 6) return 'bg-emerald-600';
  if (n >= 3) return 'bg-emerald-500';
  return 'bg-emerald-300 dark:bg-emerald-700';
};

const dayLabel = (daysAgo) => {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return 'Yesterday';
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
};

/**
 * Two weeks of work as fourteen squares, oldest on the left, today on the
 * right; the gap splits last week from this one. Darker = more tasks that day.
 * Renders nothing when the backend has not sent a `recent` feed.
 */
export default function ActivityStrip({ recent, days = 14, size = 'w-2.5 h-5' }) {
  if (!Array.isArray(recent)) return null;
  const counts = activityDays(recent, days);
  return (
    <div className="flex items-center gap-[3px]" role="img" aria-label={`${counts.filter(Boolean).length} active days in the last ${days}`}>
      {counts.map((n, i) => {
        const daysAgo = days - 1 - i;
        return (
          <span
            key={i}
            title={`${dayLabel(daysAgo)} — ${n} ${n === 1 ? 'task' : 'tasks'}`}
            className={`${size} rounded-[4px] ${tone(n)} ${daysAgo === 7 ? 'mr-1.5' : ''}`}
          />
        );
      })}
    </div>
  );
}
