import React from 'react';
import { WifiOff } from 'lucide-react';
import { EmptyState } from './ui';

/**
 * Shown when useStudentProgress could not read the student's record. The view
 * must stop here rather than carry on with empty progress: every save writes the
 * whole record back, so working from a blank one would erase what they have.
 */
export default function ProgressLoadError() {
  return (
    <EmptyState
      icon={<WifiOff className="w-16 h-16" strokeWidth={2} />}
      title="Couldn't load your progress"
      message="Check your internet connection, then try again. Your saved work is safe."
      actionLabel="Try again"
      onAction={() => window.location.reload()}
    />
  );
}
