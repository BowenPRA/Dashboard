// src/data/OLEVEL_PHYS/C09_2/assessment.js
// The Quiz for C09_2 Currents, Coils and Electromagnets: 10 MCQ, one sitting,
// 12 minutes. Shares Gate 2 with the arcade at 60 XP. English-only.
//
// Maths lives ONLY inside $$…$$ here — a single $ is literal in Assessment.jsx.
// This quiz needs none: symbols are plain Unicode (+, −).
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: drawing a wire's field as spokes or as a bar magnet's, swapping
// thumb and fingers in the grip rule, using electron flow instead of
// conventional current, thinking reversing a current weakens or cancels the
// field, choosing steel (or a non-magnetic metal) for a core, demagnetising
// with d.c., thinking a relay's thin wires carry the big current or that its
// two circuits are joined, treating a circuit breaker as a fuse that melts,
// or putting the iron oxide in the head instead of on the tape. Every item is
// a fresh situation; none copies a notes check. The key is spread
// A/B/C/D 3 · 3 · 2 · 2.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'q1_filings_wire',
      type: 'mcq',
      title: '1. Iron filings are sprinkled on a card. A long straight wire passes upright through a hole in the card and carries a large current. What pattern do the filings make?',
      options: [
        { val: 'A', text: 'A. Straight lines spreading out from the wire, like the spokes of a wheel' },
        { val: 'B', text: 'B. Two loops, like the pattern round a bar magnet' },
        { val: 'C', text: 'C. Circles centred on the wire, closest together near the wire' },
        { val: 'D', text: 'D. No pattern, because only a permanent magnet has a field' },
      ],
      correct: 'C',
      expEn: 'A current in a straight wire makes a field of circles centred on the wire, strongest — so closest together — near it. The lines do not point away from the wire (A), the wire has no poles like a bar magnet (B), and a current does make a magnetic field (D).',
    },
    {
      id: 'q2_thumb_wire',
      type: 'mcq',
      title: '2. In the right-hand grip rule for a straight wire, what does the thumb point along?',
      options: [
        { val: 'A', text: 'A. The conventional current, from + to −' },
        { val: 'B', text: 'B. The magnetic field lines' },
        { val: 'C', text: 'C. The flow of electrons, from − to +' },
        { val: 'D', text: 'D. The force on the wire' },
      ],
      correct: 'A',
      expEn: 'The thumb points along the conventional current; the curled fingers show the field (B swaps them). The rules use conventional current, not the electron flow (C). The force on a wire in a field needs a different rule, met in the next unit (D).',
    },
    {
      id: 'q3_solenoid_like',
      type: 'mcq',
      title: '3. A long coil carries a steady current. Iron filings sprinkled around it make a pattern most like the one around…',
      options: [
        { val: 'A', text: 'A. …a long straight wire: circles, with no poles' },
        { val: 'B', text: 'B. …a bar magnet, with a pole at each end' },
        { val: 'C', text: 'C. …a horseshoe magnet, with both poles at the same end' },
        { val: 'D', text: 'D. …two N poles facing each other, with a neutral point between them' },
      ],
      correct: 'B',
      expEn: 'The field of a solenoid has the same shape as a bar magnet\'s: the lines leave one end, loop round and go back in at the other, with a pole at each end. The circles round each turn add up to this pattern, so it is not just circles (A). The poles are at opposite ends (not C), and the two ends are opposite poles (not D).',
    },
    {
      id: 'q4_two_stronger',
      type: 'mcq',
      title: '4. Which two changes would BOTH make the magnetic field of a coil stronger?',
      options: [
        { val: 'A', text: 'A. Reverse the current, and add more turns' },
        { val: 'B', text: 'B. Use fewer turns, and a bigger current' },
        { val: 'C', text: 'C. Use more turns, and take out the iron core' },
        { val: 'D', text: 'D. Use more turns, and a bigger current' },
      ],
      correct: 'D',
      expEn: 'More turns and more current both make the field stronger. Reversing the current only reverses the field (A), fewer turns makes it weaker (B), and taking out the iron core makes it much weaker (C).',
    },
    {
      id: 'q5_reverse_compass',
      type: 'mcq',
      title: '5. The left-hand end of a solenoid attracts the N pole of a compass. The current in the solenoid is then reversed. What does the left-hand end now do to the N pole of the compass?',
      options: [
        { val: 'A', text: 'A. It repels it, because the left-hand end is now an N pole' },
        { val: 'B', text: 'B. It attracts it more weakly, because reversing weakens the field' },
        { val: 'C', text: 'C. It still attracts it, because the coil has not moved' },
        { val: 'D', text: 'D. Nothing, because reversing the current cancels the field' },
      ],
      correct: 'A',
      expEn: 'The left-hand end attracted an N pole, so it was an S pole. Reversing the current reverses the field and swaps the poles: the left-hand end becomes N, and like poles repel. The strength does not change (not B or D), and the poles are set by the current, not by where the coil is (C).',
    },
    {
      id: 'q6_crane_core',
      type: 'mcq',
      title: '6. A crane in a scrapyard must drop its load of scrap the moment its electromagnet is switched off. Which core should the electromagnet have?',
      options: [
        { val: 'A', text: 'A. Steel, because it makes the strongest permanent magnet' },
        { val: 'B', text: 'B. Soft iron, because it loses its magnetism as soon as the current stops' },
        { val: 'C', text: 'C. Copper, because it is a good conductor of electricity' },
        { val: 'D', text: 'D. Aluminium, because it is light and does not rust' },
      ],
      correct: 'B',
      expEn: 'Soft iron is magnetised strongly by the coil but loses its magnetism at once when the current stops, so the scrap drops. A steel core would stay magnetised and hold on to the load (A). Copper and aluminium are non-magnetic, so they would not strengthen the field at all (C, D).',
    },
    {
      id: 'q7_demagnetise',
      type: 'mcq',
      title: '7. A steel screwdriver has become magnetised and keeps picking up screws. How could a coil be used to demagnetise it?',
      options: [
        { val: 'A', text: 'A. Place it in a coil carrying a large d.c., then switch the current off' },
        { val: 'B', text: 'B. Pull it slowly out of a coil carrying d.c.' },
        { val: 'C', text: 'C. Pull it slowly out of a coil carrying a.c.' },
        { val: 'D', text: 'D. Leave it inside a coil with no current flowing, for a few minutes' },
      ],
      correct: 'C',
      expEn: 'An a.c. field keeps reversing, which throws the atomic magnets out of line as the screwdriver is pulled slowly away. A d.c. field pulls them all the same way, so it magnetises (A, B). A coil with no current makes no field at all (D).',
    },
    {
      id: 'q8_relay_pump',
      type: 'mcq',
      title: '8. A large water pump is switched on by a small switch with thin wires, through a relay. Why is the relay needed?',
      options: [
        { val: 'A', text: 'A. So that the large current of the pump can flow safely through the thin wires' },
        { val: 'B', text: 'B. So that the current from the small switch can flow on into the pump' },
        { val: 'C', text: 'C. So that the circuit switches itself off if the current gets too high' },
        { val: 'D', text: 'D. So that a small current in one circuit can switch on a large current in a separate circuit' },
      ],
      correct: 'D',
      expEn: 'The small switch carries only the small current in the coil of the relay. The relay\'s contacts then close a separate circuit, whose thick wires carry the large current of the pump. The thin wires never carry it (A), the two circuits are not joined (B), and cutting off a current that is too high is the job of a circuit breaker (C).',
    },
    {
      id: 'q9_breaker_trips',
      type: 'mcq',
      title: '9. The circuit breaker protecting the sockets in a workshop trips when an overloaded drill is used. The drill is unplugged. What must be done to get the sockets working again?',
      options: [
        { val: 'A', text: 'A. Press the reset button: nothing needs replacing' },
        { val: 'B', text: 'B. Replace the circuit breaker, because its wire has melted' },
        { val: 'C', text: 'C. Fit a breaker that allows a bigger current, so that it cannot trip again' },
        { val: 'D', text: 'D. Wait for the circuit breaker to switch itself back on' },
      ],
      correct: 'A',
      expEn: 'A circuit breaker switches off with an electromagnet, a catch and a spring — nothing melts — so once the fault is removed it is simply reset. Melting is what a fuse does (B). A breaker that allowed a bigger current would no longer protect the wiring (C), and it does not reset itself (D).',
    },
    {
      id: 'q10_recording_head',
      type: 'mcq',
      title: '10. In a tape recorder, what is the recording head?',
      options: [
        { val: 'A', text: 'A. A permanent magnet that the sound makes vibrate' },
        { val: 'B', text: 'B. A tiny electromagnet whose current varies with the sound' },
        { val: 'C', text: 'C. A tiny electromagnet carrying a steady direct current' },
        { val: 'D', text: 'D. A strip of iron oxide that is magnetised by the tape' },
      ],
      correct: 'B',
      expEn: 'The recording head is a tiny electromagnet. The sound varies the current in its coil, so its field varies and it leaves a track of varying magnetism on the tape. A permanent magnet (A) or a steady current (C) could not make a varying pattern, and the iron oxide is on the tape, not in the head (D).',
    },
  ],
};
