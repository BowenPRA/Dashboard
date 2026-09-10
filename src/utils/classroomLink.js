/**
 * The bridge to the classroom app (BowenPRA/classroom, the projected decks).
 *
 * The two apps teach the same Cambridge sections: the classroom deck is the
 * lesson as taught in the room, the Dashboard unit is its self-study version.
 * A unit that has a classroom twin declares it in `meta.classroom`:
 *
 *   classroom: [{ course: 'y7-math', slug: 'U02_1', title: 'Constructing Expressions' }]
 *
 * (an array, because one Dashboard unit can cover two classroom lessons — the
 * Science 2.1 unit is the a+b pair). The UnitCard turns each entry into a link
 * to the live deck, so a student who missed the lesson, or wants it again, can
 * watch the projected version before the self-study tasks.
 *
 * The classroom app carries the reverse pointer (`meta.dashboard`) — see
 * docs/classroom-dashboard-pairing.md for the pairing rules.
 */
export const CLASSROOM_BASE = 'https://bowenpra.github.io/classroom/';

/** URL of one classroom lesson deck, or null for a malformed entry. */
export const classroomLessonUrl = (entry) => {
  if (!entry?.course || !entry?.slug) return null;
  return `${CLASSROOM_BASE}#/lesson/${encodeURIComponent(entry.course)}/${encodeURIComponent(entry.slug)}`;
};

/** The unit's classroom lessons, normalised to an array of well-formed entries. */
export const classroomLessonsOf = (meta) => {
  const raw = meta?.classroom;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.filter((e) => classroomLessonUrl(e));
};
