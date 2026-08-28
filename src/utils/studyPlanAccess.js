// Who gets the daily study plan. The plan (the "Today's Plan" card on Home and
// the /today screen) is a per-student review cycle built for the two GED-sprint
// students only — QB and Vi Khoi. Every other account, including the preview/QA
// accounts, must never see it.
//
// Students are created by teachers with a login name that becomes
// `<name lowercased, whitespace removed>@science.local` (see AddStudentModal /
// Login), so the email is the stable per-student key — same approach as
// previewAccount.js. Names with internal spaces collapse ("Vi Khoi" ->
// vikhoi@science.local), which is why the allowlist is keyed on the collapsed form.
//
// A teacher can also turn a plan on for an account without a code change by
// setting Supabase app_metadata `study_plan: true` on it.
const STUDY_PLAN_EMAILS = new Set([
  'qb@science.local',
  'vikhoi@science.local',
]);

export function hasStudyPlan(user) {
  if (!user) return false;
  if (user.app_metadata?.study_plan === true) return true;
  const email = (user.email || '').toLowerCase();
  return STUDY_PLAN_EMAILS.has(email);
}
