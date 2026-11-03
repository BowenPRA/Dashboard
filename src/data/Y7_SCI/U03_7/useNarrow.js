// src/data/Y7_SCI/U03_7/useNarrow.js
// True when a widget's own box is narrower than `limit` px (a phone, or a
// narrow column). The classroom widgets are drawn 1500 px wide for a
// projector; at 375 px their words shrink to about 6 px, so below the limit
// each one shows its words as HTML and crops its drawing (widgets.jsx,
// story.jsx).
// It measures once before the first paint (so a phone never flashes the wide
// drawing, and a page that is not painting still gets it right), then follows
// resizes.
import { useLayoutEffect, useRef, useState } from 'react'

// `short` is a box under `minHeight` px tall: a phone slide with an activity
// under the widget leaves it about 130 px, so the optional lines go.
export default function useNarrow(limit = 560, minHeight = 260) {
  const ref = useRef(null)
  const [size, setSize] = useState({ narrow: false, short: false })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const set = (w, h) => setSize((s) => {
      const next = { narrow: w < limit, short: h < minHeight }
      return next.narrow === s.narrow && next.short === s.short ? s : next
    })
    const r = el.getBoundingClientRect()
    set(r.width, r.height)
    if (typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(([entry]) => set(entry.contentRect.width, entry.contentRect.height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [limit, minHeight])
  return [ref, size.narrow, size.short]
}
