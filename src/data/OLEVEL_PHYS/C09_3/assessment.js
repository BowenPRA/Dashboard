// src/data/OLEVEL_PHYS/C09_3/assessment.js
// The Quiz for C09_3 Motors and Electromagnetic Induction: 10 MCQ, one sitting,
// 12 minutes. Shares Gate 2 with the arcade at 60 XP. English-only.
//
// No maths here, so there is no $$…$$ anywhere; symbols are Unicode (+ → −).
//
// Every distractor is a diagnosis — the answer you reach by making one nameable
// mistake: swapping Fleming's fingers or the field's direction, expecting a
// force on a current that runs along the field, "attracting" the wire to a pole,
// counting a change that does nothing (a thicker wire with the same current),
// mixing up the brushes and the commutator, counting only one of two reversals,
// stating Faraday's law with the field strength instead of the RATE of cutting,
// and expecting an e.m.f. from a magnet that is not moving. Every situation is
// fresh: no item copies a notes check, a Question or a Source Analysis item.
// The key is spread A 3 · B 3 · C 2 · D 2.
//
// Every direction below is worked out with F = I × B (Fleming's left hand):
// item 2 — current along the field, so I × B = 0: no force.
export const assessment = {
  timeLimit: 720, // 12 minutes
  passages: [],
  questions: [
    {
      id: 'a1_first_finger',
      type: 'mcq',
      title: '1. In Fleming\'s left-hand rule, what does the first finger point along?',
      options: [
        { val: 'A', text: 'A. The current, from + to −' },
        { val: 'B', text: 'B. The magnetic field, from N to S' },
        { val: 'C', text: 'C. The force on the wire' },
        { val: 'D', text: 'D. The magnetic field, from S to N' },
      ],
      correct: 'B',
      expEn: 'First finger = Field, and the field runs from N to S. The current is the seCond finger (A), the force is the thuMb (C), and pointing the field from S to N (D) would give the force the wrong way round.',
    },
    {
      id: 'a2_parallel_north_south',
      type: 'mcq',
      title: '2. A wire carrying a current runs from north to south, inside a magnetic field whose lines also run from north to south. What force acts on the wire?',
      options: [
        { val: 'A', text: 'A. A force towards the east, at right angles to the wire' },
        { val: 'B', text: 'B. A force along the wire, in the direction of the current' },
        { val: 'C', text: 'C. A force pulling the wire towards the S pole' },
        { val: 'D', text: 'D. No force, because the current and the field are parallel' },
      ],
      correct: 'D',
      expEn: 'The current and the field point the same way, so there is no force at all. There is only a force when the wire crosses the field lines (A assumes there is always one). The force is never along the wire (B), and the wire is not attracted to a pole (C).',
    },
    {
      id: 'a3_force_direction',
      type: 'mcq',
      title: '3. A wire carrying a current lies at right angles to a magnetic field. In which direction does the force on the wire act?',
      options: [
        { val: 'A', text: 'A. At right angles to both the field and the current' },
        { val: 'B', text: 'B. Along the field lines, from N towards S' },
        { val: 'C', text: 'C. Along the wire, in the direction of the current' },
        { val: 'D', text: 'D. Towards whichever pole is nearer to the wire' },
      ],
      correct: 'A',
      expEn: 'The force is at right angles to BOTH the field and the current — that is why Fleming\'s thumb is at right angles to both fingers. It does not follow the field lines (B) or the current (C), and the wire is pushed across the gap, not attracted to a pole (D).',
    },
    {
      id: 'a4_no_bigger_force',
      type: 'mcq',
      title: '4. A wire in a magnetic field carries a current and feels a force. Which change would NOT make the force bigger?',
      options: [
        { val: 'A', text: 'A. Increasing the current in the wire' },
        { val: 'B', text: 'B. Using a stronger magnet' },
        { val: 'C', text: 'C. Making the wire thicker, but keeping the same current' },
        { val: 'D', text: 'D. Putting a longer length of the wire inside the field' },
      ],
      correct: 'C',
      expEn: 'The force depends on the current, the strength of the field and the length of wire in the field. A thicker wire carrying the SAME current, in the same length of field, feels the same force. The other three are the three factors that increase it.',
    },
    {
      id: 'a5_coil_opposite',
      type: 'mcq',
      title: '5. A flat rectangular coil carrying a current lies between the poles of a magnet. Its two long sides are pushed in opposite directions. Why?',
      options: [
        { val: 'A', text: 'A. The current flows in opposite directions along the two sides' },
        { val: 'B', text: 'B. One side is nearer the N pole and the other is nearer the S pole' },
        { val: 'C', text: 'C. The magnetic field reverses halfway across the gap' },
        { val: 'D', text: 'D. The commutator reverses the current in one side only' },
      ],
      correct: 'A',
      expEn: 'The current goes along one side and comes back along the other, so by the left-hand rule the two forces are opposite. The sides are not attracted to the poles (B), the field runs the same way, N to S, right across the gap (C), and the commutator reverses the current in the whole coil, not one side (D).',
    },
    {
      id: 'a6_worn_brushes',
      type: 'mcq',
      title: '6. The brushes in a simple motor wear away until they no longer touch the commutator. What happens?',
      options: [
        { val: 'A', text: 'A. The motor turns the other way, because the current is reversed' },
        { val: 'B', text: 'B. The motor stops, because the coil is no longer connected to the supply' },
        { val: 'C', text: 'C. The motor keeps running, because the commutator still reverses the current' },
        { val: 'D', text: 'D. The motor slows down, because the magnet loses its field' },
      ],
      correct: 'B',
      expEn: 'The brushes are the contacts that keep the turning coil connected to the battery. With no contact there is no current in the coil, so no force and no turning. Reversing the current is the commutator\'s job (A, C), and the brushes have nothing to do with the magnet (D).',
    },
    {
      id: 'a7_which_part_reverses',
      type: 'mcq',
      title: '7. Which part of a simple d.c. motor reverses the current in the coil every half turn?',
      options: [
        { val: 'A', text: 'A. The brushes' },
        { val: 'B', text: 'B. The battery' },
        { val: 'C', text: 'C. The commutator (split ring)' },
        { val: 'D', text: 'D. The iron armature' },
      ],
      correct: 'C',
      expEn: 'The commutator is a split ring that turns with the coil; each half turn its gaps pass the brushes and the coil\'s connections swap over. The brushes only keep the coil connected (A), a battery gives a one-way current (B), and the armature strengthens the field (D).',
    },
    {
      id: 'a8_double_reverse',
      type: 'mcq',
      title: '8. A simple motor turns clockwise. The battery is turned round AND the magnet is turned round, so its poles swap. Which way does the motor turn now?',
      options: [
        { val: 'A', text: 'A. Anticlockwise, because the battery was reversed' },
        { val: 'B', text: 'B. It does not turn at all, because the two changes cancel out' },
        { val: 'C', text: 'C. Anticlockwise, and twice as fast' },
        { val: 'D', text: 'D. Clockwise, the same as before' },
      ],
      correct: 'D',
      expEn: 'Reversing the current reverses the forces; reversing the field reverses them again. Two reversals bring the forces back to where they were, so the motor still turns clockwise. (A) counts only one change; the changes "cancel" by restoring the direction, not by stopping the motor (B); and nothing here changes the speed (C).',
    },
    {
      id: 'a9_faraday_statement',
      type: 'mcq',
      title: '9. Which of these is a statement of Faraday\'s law of electromagnetic induction?',
      options: [
        { val: 'A', text: 'A. The e.m.f. induced in a conductor is proportional to the rate at which it cuts magnetic field lines' },
        { val: 'B', text: 'B. The e.m.f. induced in a conductor is proportional to the strength of the magnetic field' },
        { val: 'C', text: 'C. The force on a conductor in a magnetic field is proportional to the current in it' },
        { val: 'D', text: 'D. An e.m.f. is induced in any conductor that lies in a magnetic field' },
      ],
      correct: 'A',
      expEn: 'Faraday\'s law is about the RATE of cutting field lines. A stronger field is only one way to cut lines faster (B) — speed and length matter too. (C) is about the motor effect, not induction, and a conductor lying still in a field cuts no lines, so nothing is induced (D).',
    },
    {
      id: 'a10_magnet_at_rest',
      type: 'mcq',
      title: '10. A strong bar magnet rests, not moving, inside a coil that is joined to a galvanometer. What does the galvanometer read?',
      options: [
        { val: 'A', text: 'A. A large, steady current, because the field is strong' },
        { val: 'B', text: 'B. Zero, because no field lines are being cut' },
        { val: 'C', text: 'C. A current that keeps reversing, because the magnet has two poles' },
        { val: 'D', text: 'D. A small, steady current, because the coil is in a magnetic field' },
      ],
      correct: 'B',
      expEn: 'An e.m.f. is induced only while field lines are being cut, and a magnet at rest cuts none, however strong it is. So there is no e.m.f. and no current. Strength alone (A), having two poles (C) or simply sitting in a field (D) induces nothing.',
    },
  ],
};
