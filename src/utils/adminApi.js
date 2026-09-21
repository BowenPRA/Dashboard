import { supabase } from './supabaseClient';

// Client for the teacher-only admin endpoints on the Vercel backend. Every call
// carries the caller's Supabase access token; the backend verifies it belongs to
// a teacher (app_metadata.role) before doing anything.
const API_BASE_URL = 'https://y8-science-backend.vercel.app/api/admin';

async function post(path, body) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not signed in.');

  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(body || {}),
  });

  let payload = null;
  try { payload = await res.json(); } catch { /* non-JSON error body */ }

  if (!res.ok) {
    throw new Error(payload?.error || `Request failed (${res.status})`);
  }
  return payload;
}

export const getRoster = () => post('getRoster', {});
export const getStudentDetail = (studentId) => post('getStudentDetail', { studentId });
export const createStudent = (student) => post('createStudent', student);
export const updateStudent = (patch) => post('updateStudent', patch);
export const setProgress = (studentId, ops) => post('setProgress', { studentId, ops });

// A teacher's comment on one saved essay (see utils/essayArchive.js). The note
// lands on the archive entry itself, so the student sees it on their Writing
// page next to the examiner's report.
export const annotateEssay = (studentId, track, essayId, note) =>
  post('annotateEssay', { studentId, track, essayId, note });

// Classes: teacher-managed groups of students. A class carries the courses
// (enrolled tracks) and study-plan flag a teacher wants applied to everyone in
// it; `bulkEnroll` is the deliberate step that pushes those onto each member.
export const listClasses = () => post('listClasses', {});
export const createClass = (cls) => post('createClass', cls);
export const updateClass = (patch) => post('updateClass', patch);
export const deleteClass = (classId) => post('deleteClass', { classId });
export const assignStudents = (classId, studentIds) => post('assignStudents', { classId, studentIds });
export const bulkEnroll = (classId, overrides = {}) => post('bulkEnroll', { classId, ...overrides });

// Remove the AI-grader lock: reset the strikes on one unit, or (no track/unit)
// on every unit with a strike. The flagged-answer log is kept, stamped cleared.
export const clearStrikes = (studentId, track = null, unit = null) =>
  post('clearStrikes', track && unit ? { studentId, track, unit } : { studentId, all: true });
