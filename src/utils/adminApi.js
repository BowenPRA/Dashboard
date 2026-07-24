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
