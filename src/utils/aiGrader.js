// Pointing to your live Vercel Production deployment!
const API_BASE_URL = 'https://y8-science-backend.vercel.app/api';

/**
 * One POST to the grading backend.
 *
 * Two failures used to slip through as if they were fine:
 *   - a request that never settles (a stalled connection on school Wi-Fi) left
 *     the student on the "grading" spinner forever, because the callers' retry
 *     only runs once this rejects — so every call now has a deadline;
 *   - a 200 whose body is `{ error: … }` (or not an object at all) was handed
 *     back as a grade and scored as zero with no error shown — so that throws.
 *
 * AbortController rather than AbortSignal.timeout(): older classroom iPads
 * do not have the latter.
 */
async function postToGrader(endpoint, payload, { label, timeoutMs }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || typeof data !== 'object' || data.error) {
      throw new Error(`Bad grader response${data?.error ? `: ${data.error}` : ''}`);
    }
    return data;
  } catch (error) {
    const failure = error?.name === 'AbortError'
      ? new Error(`The grader took longer than ${Math.round(timeoutMs / 1000)}s to answer`)
      : error;
    console.error(`Failed to grade ${label}:`, failure);
    throw failure; // Re-throw to handle it in the component
  } finally {
    clearTimeout(timer);
  }
}

export const gradeShortAnswer = (payload) =>
  postToGrader('gradeShortQA', payload, { label: 'short answer', timeoutMs: 60000 });

export const gradeDiagram = (payload) =>
  postToGrader('gradeDiagram', payload, { label: 'diagram', timeoutMs: 60000 });

// An essay is the longest job the backend does (a score, then a revision plan).
export const gradeEssay = (payload) =>
  postToGrader('gradeEssay', payload, { label: 'essay', timeoutMs: 120000 });
