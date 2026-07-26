// A preview / QA account sees every activity unlocked across every track, so the
// whole curriculum can be walked without grinding XP to clear phase thresholds.
//
// This is a UI convenience ONLY. It bypasses the phase XP-gating in the dashboard;
// it does not touch grading, progress saving, or any security/auth check. Students
// cannot self-register (teachers create accounts), so a code allowlist is a safe
// way to designate these accounts.
//
// An account qualifies if EITHER:
//   1. its Supabase app_metadata has `preview_all: true` (a teacher can set this
//      per-account for a permanent, data-driven flag), or
//   2. its email is in the allowlist below — zero-config: just create a student
//      named e.g. "Preview" (→ preview@science.local) via Add Student.
const PREVIEW_EMAILS = new Set([
  'preview@science.local',
  'demo@science.local',
]);

export function isPreviewAccount(user) {
  if (!user) return false;
  if (user.app_metadata?.preview_all === true) return true;
  const email = (user.email || '').toLowerCase();
  return PREVIEW_EMAILS.has(email);
}
