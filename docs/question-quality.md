# Question Quality Guide — Short Answers, Diagrams & Essays

The standard for every open-response question in the app. Read it before writing a
unit. The **Y8 / MATH_1A "Parallel Lines & Angles" unit is the reference exemplar** —
when in doubt, open `src/data/Y8/MATH_1A/data.js` and match its shape and clarity.

---

## 1. The quality bar

What makes the parallel-lines questions good, and what every question should copy:

- **One idea per question.** Each `shortQA` item tests a single relationship
  (e.g. "how do you identify alternate angles, and what is their relationship?"),
  not a grab-bag of unrelated facts.
- **A mark scheme that is a checklist, not a vibe.** Every mark is one concrete,
  observable thing ("1 mark for stating alternate angles are equal"). A grader —
  human or AI — can tick each line without judgement calls.
- **`scienceMaxMarks` equals the number of mark-scheme lines.** No orphan marks.
- **A model answer that would score full marks and reads like a strong student
  wrote it** — complete sentences, the target vocabulary used naturally, nothing
  more than the mark scheme asks for.
- **Real reasoning, not recall of a number.** The best items (see the `d3`
  four-angles diagram and the essay) make the student *derive* an answer and *state
  the reason*, which is exactly what a good exam does.

If a new question can't be described by a clean 1-mark-per-line scheme, it is
probably two questions, or it is vague. Split it or sharpen it.

---

## 2. Where questions live (schema)

Per unit, in `src/data/<TRACK>/<UNIT>/data.js`:

| Array/obj | Task | Prompt field |
|---|---|---|
| `shortQA[]` | Short Answers | `question` |
| `diagrams[]` | Diagram Analysis | `promptText` (+ `inlineSvg` / `imageFile`) |
| `essay` (single obj) | Essay | `task` (+ `guidelines[]`, `sources[]`) |

Every item shares the same grading fields:

```js
{
  id: "q2",
  question: "…",                 // or promptText / task
  suggestedWords: [["…","…"]],   // synonym groups — see §3 (currently named requiredWords)
  scienceMaxMarks: 2,            // = number of markScheme lines
  markScheme: [ "1 mark for …", "1 mark for …" ],
  modelAnswer: "…"
}
```

> **Naming note.** The field is called `requiredWords` in the data and code today.
> The intent going forward is **suggested** words (§3). Until the code rename lands
> (see *Implementation status*), keep using `requiredWords` as the key but author its
> contents by the suggested-words rules below.

---

## 3. Suggested words (not required, never spoilers)

Suggested words are **vocabulary we invite the student to use**, surfaced as chips
that light up when the word appears in their answer. They are a nudge toward the
right register — **they must never be scored, and they must never give away the
answer.**

**The spoiler test.** If pasting the suggested words into the answer box would earn
marks on the mark scheme, they are spoilers. Rewrite them.

Worked example — real question `q2`:

> *"How do you visually identify alternate angles on a set of parallel lines, and
> what is their mathematical relationship?"*

| | Words | Verdict |
|---|---|---|
| ❌ Today (spoiler) | `z-shape`, `equal` | These **are** the two mark-scheme answers. The chips hand the student full marks. |
| ✅ Suggested | `transversal`, `parallel` | Technical terms a strong answer *uses* while explaining, without stating the relationship for them. |

Rules:
- Prefer **domain vocabulary** (`transversal`, `supplementary`, `cross-section`,
  `photosynthesis`) over answer keywords (`equal`, `180`, `z-shape`).
- Never include the numeric result or the exact relationship word that a mark-scheme
  line awards.
- 2–4 groups is plenty. Each group is a synonym set: `["supplementary", "add to 180"]`.
- Optional per question. A pure-calculation item may have none.

---

## 4. Grading model — two components only

Every open response is scored on exactly **two** things:

1. **English** — up to **3 marks**, for clarity, grammar, capitalisation/punctuation,
   and using full sentences. (This is the app-wide `englishScore`, max 3.)
2. **Content** — up to `scienceMaxMarks`, one mark per `markScheme` line.

**There is no vocabulary score.** Suggested words are a hint, not points. (Today the
code still adds a point per used word — removing that is the first *Implementation
status* item.)

**Naming:** call the content component **"Content Marks"** or just **"Mark Scheme"**
in data, UI, and grader prompts. **Do not call it "Cambridge"** (or any exam board)
anywhere learner-facing.

### Be slightly generous

The grader should reward understanding, not punish phrasing. Bias every borderline
call **toward the student**:

- Award a content mark if the student's meaning is correct, even if the wording
  differs from the model answer or a synonym is used.
- Accept correct answers that skip a step, as long as the conclusion and reason are
  right.
- Reserve zero on a mark-scheme line for answers that are actually wrong or missing —
  not for answers that are merely less polished than the model.
- English marks: full marks unless there are clear, repeated errors. A single slip
  should not cost a mark.

This "slightly generous" stance is the intended behaviour of the AI grader. Because
the grading itself runs in the **backend grader service** (the frontend only calls
`/api/gradeShortQA`, `/gradeDiagram`, `/gradeEssay`), making it real means updating
the grader prompts there — see *Implementation status*.

---

## 5. Integrity — no paste, no spell-check, no Grammarly

Open-response answer boxes must be the student's own unaided writing. Every answer
`<textarea>` must:

- **Block paste / copy / cut** — `onPaste`, `onCopy`, `onCut` all `preventDefault()`.
- **Disable the browser's writing aids** — `spellCheck={false}`, `autoCorrect="off"`,
  `autoComplete="off"`, `autoCapitalize="off"` (or `"sentences"` only where natural).
- **Block Grammarly and similar editor extensions** —
  `data-gramm="false"`, `data-gramm_editor="false"`, `data-enable-grammarly="false"`.

The Essay screen already blocks paste and disables spell-check; Diagrams and Short
Answers must match, and the Grammarly attributes need adding everywhere. See
*Implementation status*.

---

## 6. Math questions — avoiding "silly"

Math items drift into "silly" when they test trivia or arithmetic bookkeeping instead
of reasoning. Hold math to the same bar as the parallel-lines unit:

**Do**
- Make the student **derive** a value and **state the geometric/algebraic reason**
  (the `d3` diagram is the model: "x = 60° because it is vertically opposite…").
- Keep numbers clean so the point is the method, not the long division.
- Ask "why" and "how do you know", not just "what is the answer".

**Avoid**
- Questions whose whole answer is a single number with no reasoning to mark.
- Ambiguous prompts where several answers are defensible but the mark scheme accepts
  one.
- Arithmetic so heavy it obscures the concept being tested.
- "Trick" phrasing that tests reading comprehension of the question rather than the math.

A math short-answer/diagram question should still resolve to a clean 1-mark-per-line
mark scheme. If it can't, it isn't ready.

---

## 7. Authoring checklist

Before a unit's open-response questions are done:

- [ ] Each `shortQA`/`diagrams` item tests **one** idea.
- [ ] `scienceMaxMarks` **equals** the number of `markScheme` lines.
- [ ] Every mark-scheme line is one concrete, tickable thing.
- [ ] `modelAnswer` would score full marks and reads naturally.
- [ ] Suggested words pass the **spoiler test** (§3) — domain vocab, no answers.
- [ ] No exam-board name ("Cambridge") in any field.
- [ ] Bilingual counterparts (`vn*`) present where applicable.
- [ ] Math items require **reasoning**, not just a number (§6).

---

## 8. Implementation status

The guide's model is now live in code (2026-07-25). Kept here as the record of what
changed and where.

**Frontend (`src/tasks/`) — done**
- [x] Renamed the field `requiredWords` → `suggestedWords` across all `data.js`
      files and the readers (`ShortAnswers.jsx`, `Diagrams.jsx`, `Essay.jsx`). The
      outbound grader payload key is now `suggestedWords`. `validate-entry.js`
      updated (absence of suggested words is no longer warned).
- [x] Dropped the vocabulary component from scoring everywhere:
      `pointsEarned = scienceScore + englishScore`, `maxPoints = scienceMaxMarks + 3`.
      `usedWordGroups` is still computed — only to highlight the chips.
- [x] Chips relabelled "Suggested Vocabulary · optional hints, not graded", and the
      block is hidden when a question has no suggested words.
- [x] Content-marks heading de-branded: Essay `markSchemeTitle` → "Content Marks",
      Diagrams heading → "Content Marks Breakdown".
- [x] Integrity attributes on all three answer boxes: paste/copy/cut blocked,
      `spellCheck={false}`, `autoCorrect`/`autoCapitalize`/`autoComplete` off, and
      `data-gramm` / `data-gramm_editor` / `data-enable-grammarly` = false.
- [x] English is scored out of **3** consistently (Short Answers previously used 2).

**Backend (`y8-science-backend`) — done, redeploy required to go live**
- [x] `shortAnswerSystemInstruction` (short + diagram) now marks with the "slightly
      generous / benefit of the doubt" stance in §4, English 0-3, and treats KEY
      VOCABULARY as optional hints.
- [x] `gradeShortQA` / `gradeDiagram` return English 0-3; all three graders accept a
      `suggestedWords` payload key (falling back to `requiredWords` for old clients).
- [ ] **Deploy:** `npx vercel --prod --yes` from the backend folder to publish the
      grader changes. (The essay's GED trait rubric is intentionally left calibrated
      to the real test; generosity is applied to short-answer/diagram content marks.)
