# STEP_PRACTICE build — progress

Branch `feat/step-practice`, worktree `C:\Users\sbowe\code\wt-steps` (node_modules is a
junction to `C:\Users\sbowe\Dashboard\node_modules`; remove it with
`[System.IO.Directory]::Delete('C:\Users\sbowe\code\wt-steps\node_modules')`, never a
recursive delete).

dbKey taken: **p93** (no branch or worktree held p93+ on 2026-11-05). p94 is next.

## Done
- [x] Portable core `src/stepPractice/` (model, run, progress, check, words, text, parts,
      inputs, ItemRunner, StepPracticeSet; one outside import via equivalence.js)
- [x] Dashboard wrapper `src/tasks/StepPractice.jsx`, registry entry (p93), validator rules
      (unit pools + the sample sets)
- [x] Samples: Year 5 Maths negative numbers (12, the pilot set), Year 5 Science fair
      tests / tables (8), Year 5 English past tense (6)
- [x] Harness `preview-steps.html` + `src/preview-steps.jsx`
- [x] `docs/step-practice.md`
- [x] validate PASS, lint clean, build OK; screenshots 1280x720 + 390x844 of all three
      sets and levels incl. wrong answers, Show me, done card, VN, big, dark

## Left
- [ ] Bowen / Mr. David to try the maths set; Vietnamese read by staff
- [ ] Put `stepPractice` into a real unit (needs a Year 5 track on the Dashboard or PRA Learn)
- [ ] Merge to main and deploy (Bowen)
