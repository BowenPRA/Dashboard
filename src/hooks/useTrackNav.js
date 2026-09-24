import { useState } from 'react';

/**
 * Where the student is in a track's list: which unit card is open, which
 * coursebook section's tab is showing, and where to scroll next.
 *
 * It lives in a hook the PAGE calls, not inside <TrackUnits>, because the list
 * unmounts while a task is on screen — and a student who closes a task must
 * come back to the unit they launched it from, not to the top of the track.
 */
export default function useTrackNav(requestedUnit = null) {
  const [expandedUnit, setExpandedUnit] = useState(requestedUnit);
  // The section tab (a registry `sections` prefix). `null` until the student
  // picks one themselves — until then it follows their progress.
  const [section, setSection] = useState(null);
  // `{ id }` of an element to scroll to after the next render (a unit in a tab
  // that has just been switched to is not in the DOM until then). A fresh
  // object per jump, so jumping to the same place twice still scrolls.
  const [scrollTarget, setScrollTarget] = useState(null);
  return { expandedUnit, setExpandedUnit, section, setSection, scrollTarget, setScrollTarget };
}
