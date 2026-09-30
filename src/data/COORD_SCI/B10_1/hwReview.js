// src/data/COORD_SCI/B10_1/hwReview.js
// Homework Review — Wolsey Hall IGCSE Co-ordinated Sciences, Assignment 10
// ("Coordination, Response and Reproduction"), the questions on chapter B10:
// multiple choice 1–10, and structured questions 22 and 25. The reproduction
// questions are reviewed in B11_1 and B11_2.
//
// Each question is asked again, then worked: the steps, what the examiner
// credits, a model answer to copy, and the trap. A written question is re-asked
// in a form the screen can mark on the spot — typed words, or the marking
// points sorted into "earns a mark" and "does not" — so the mark scheme is the
// thing being practised.
//
// FIGURES. The downloaded assignment had lost most of its pictures (the PDF
// shows a warning triangle where each one was). Q3, Q5 and Q9 are the paper's
// own; Q2, Q6, Q22 and Q25 are REDRAWN here to ask the same thing, and say so
// under the figure, because the letters and the numbers on the student's own
// paper may not match. Item shape: the top of src/tasks/Workbook.jsx.
import { DIAGRAMS } from './diagrams.js';

const A10 = 'Assignment 10 · Question ';
const REDRAWN = 'This figure has been **redrawn** for the review, so the letters may not be in the same places as on your paper. Find the same **part** on yours.';

export const hwReview = [
  {
    tier: 'Multiple choice · Questions 1–10',
    theme: 'Practice',
    questions: [
      {
        id: 'q1', type: 'mcq', source: A10 + '1', marks: 1,
        prompt: 'Which type of cells do **all** sense organs contain?',
        options: [
          { val: 'A', text: 'A  Ciliated' },
          { val: 'B', text: 'B  Effector' },
          { val: 'C', text: 'C  Mesophyll' },
          { val: 'D', text: 'D  Receptor' },
        ],
        correct: 'D',
        solution: [
          'A sense organ is a **group of receptor cells** that detect one kind of stimulus — light in the eye, sound in the ear.',
          '**Effectors** are muscles and glands. They carry out the response; they do not detect anything.',
          '**Ciliated** cells line the airways and **mesophyll** cells are in a leaf. They are real cells, but from other chapters.',
        ],
        tip: 'Receptor = **receives** the stimulus. Effector = has an **effect**.',
        answer: 'D — Receptor',
      },
      {
        id: 'q2', type: 'mcq', source: A10 + '2', marks: 1,
        prompt: 'The diagram shows a cell. What type of cell is shown?',
        inlineSvg: DIAGRAMS.MOTOR_NEURONE_PLAIN, wide: true,
        figureNote: 'The picture on your paper was missing from the file, so this one has been **drawn for the review**. Use the same test on yours: find the **cell body**.',
        options: [
          { val: 'A', text: 'A  Ciliated cell' },
          { val: 'B', text: 'B  Motor neurone' },
          { val: 'C', text: 'C  Relay neurone' },
          { val: 'D', text: 'D  Sensory neurone' },
        ],
        correct: 'B',
        solution: [
          'Long and thin with branching ends, so it is a **neurone** — not a ciliated cell, which is short with tiny hairs on top.',
          'Now find the **cell body** (the part with the nucleus). Here it is at **one end**, with the dendrites round it and one long axon leading away.',
          'Cell body at the end + long axon = **motor neurone**. A **sensory** neurone has its cell body off to the side, part-way along. A **relay** neurone is short.',
        ],
        tip: 'If the cell body on YOUR paper sits part-way along the fibre, on a little side branch, that cell is a sensory neurone.',
        answer: 'B — Motor neurone',
      },
      {
        id: 'q3', type: 'mcq', source: A10 + '3', marks: 1,
        prompt: 'What happens when the body temperature rises **above** normal?',
        inlineSvg: DIAGRAMS.TABLE_Q3, wide: true,
        options: [
          { val: 'A', text: 'A' },
          { val: 'B', text: 'B' },
          { val: 'C', text: 'C' },
          { val: 'D', text: 'D' },
        ],
        correct: 'D',
        solution: [
          'Too hot, so the body must **lose** heat. Test each column against that.',
          '**Blood vessels dilate** (get wider): more blood flows near the skin surface, so more heat is lost to the air.',
          '**Sweat production increases**: the water in sweat evaporates and takes heat from the skin.',
          'Both changes point the same way — dilate **and** increases. Rows B and C each mix one "hot" response with one "cold" one.',
        ],
        tip: 'Too **hot** → vaso**dilation**. Too **cold** → vaso**constriction**. The vessels never move; they only change width.',
        answer: 'D — dilate, increases',
      },
      {
        id: 'q4', type: 'mcq', source: A10 + '4', marks: 1,
        prompt: 'After a meal, the concentration of blood glucose increases. What then causes the concentration of blood glucose to return to normal?',
        options: [
          { val: 'A', text: 'A  Adrenalin' },
          { val: 'B', text: 'B  Blood cells' },
          { val: 'C', text: 'C  Insulin' },
          { val: 'D', text: 'D  Platelets' },
        ],
        correct: 'C',
        solution: [
          'The glucose is too **high**, so you need the hormone that **lowers** it.',
          '**Insulin**, secreted by the pancreas, makes the liver take glucose out of the blood and store it as glycogen.',
          '**Adrenaline** does the opposite — it makes the liver release glucose. Blood cells and platelets are not hormones at all.',
        ],
        answer: 'C — Insulin',
      },
      {
        id: 'q5', type: 'mcq', source: A10 + '5', marks: 1,
        prompt: 'When a person is frightened, adrenalin is released by the adrenal glands. What are the effects of the adrenalin?',
        inlineSvg: DIAGRAMS.TABLE_Q5, wide: true,
        options: [
          { val: 'A', text: 'A' },
          { val: 'B', text: 'B' },
          { val: 'C', text: 'C' },
          { val: 'D', text: 'D' },
        ],
        correct: 'D',
        solution: [
          'Adrenaline gets the body ready for "fight or flight", so everything that supplies the muscles speeds **up**.',
          '**Breathing rate increases** — more oxygen enters the blood.',
          '**Heart beat rate increases** — that oxygen (and glucose) reaches the muscles faster.',
          'Nothing slows down, so the answer is the row with two "increased".',
        ],
        tip: 'The three effects to learn: increased **breathing rate**, increased **heart rate**, increased **pupil diameter**.',
        answer: 'D — increased, increased',
      },
      {
        id: 'q6', type: 'mcq', source: A10 + '6', marks: 1,
        prompt: 'The diagram shows the human nervous system. Which letter indicates a part of the **central** nervous system?',
        image: 'images/COORD_SCI/B10_1/hw-q6-nervous-system.jpg',
        imageAlt: 'An outline of a person with the brain, spinal cord and nerves drawn in blue. A points to a nerve in the arm, B to the brain, C to a nerve in the other arm, D to a nerve in the leg.',
        figureNote: REDRAWN,
        options: [
          { val: 'A', text: 'A' },
          { val: 'B', text: 'B' },
          { val: 'C', text: 'C' },
          { val: 'D', text: 'D' },
        ],
        correct: 'B',
        solution: [
          'The **central** nervous system is only two things: the **brain** and the **spinal cord**.',
          'Here **B** points at the brain. A, C and D all point at **nerves** in the arms and the leg.',
          'Nerves are outside the brain and spinal cord, so they belong to the **peripheral** nervous system.',
        ],
        tip: 'On your own paper, the right letter is whichever one points at the **brain** or the **spinal cord** (the line down the middle of the back).',
        answer: 'B — the brain (on this drawing)',
      },
      {
        id: 'q7', type: 'mcq', source: A10 + '7', marks: 1,
        prompt: 'What is an example of homeostasis?',
        options: [
          { val: 'A', text: 'A  Breathing in oxygen.' },
          { val: 'B', text: 'B  Regulating blood glucose.' },
          { val: 'C', text: 'C  Removing undigested food through the anus.' },
          { val: 'D', text: 'D  Urinating to empty the bladder.' },
        ],
        correct: 'B',
        solution: [
          'Homeostasis is **keeping the internal environment constant**. Look for the option that holds something steady.',
          '**Regulating** blood glucose means keeping its concentration at the set point — that is homeostasis.',
          'Breathing in, egestion and emptying the bladder are all things the body does, but none of them is about holding a value constant.',
        ],
        tip: 'The words "regulate", "control" and "maintain" usually signal homeostasis.',
        answer: 'B — Regulating blood glucose',
      },
      {
        id: 'q8', type: 'mcq', source: A10 + '8', marks: 1,
        prompt: 'Which organ produces a hormone?',
        options: [
          { val: 'A', text: 'A  Heart' },
          { val: 'B', text: 'B  Lung' },
          { val: 'C', text: 'C  Ovary' },
          { val: 'D', text: 'D  Spinal cord' },
        ],
        correct: 'C',
        solution: [
          'Run through the four glands you have to know: **adrenal glands**, **pancreas**, **testes**, **ovaries**.',
          'The **ovary** is on the list — it secretes **oestrogen**.',
          'The heart pumps blood, the lungs exchange gases, and the spinal cord carries nerve impulses.',
        ],
        answer: 'C — Ovary',
      },
      {
        id: 'q9', type: 'mcq', source: A10 + '9', marks: 1,
        prompt: 'The diagram shows the structures involved in a reflex action. What is the sequence in which impulses pass through these structures?',
        image: 'images/COORD_SCI/B10_1/hw-q9-reflex.jpg', wide: true,
        imageAlt: 'A hand touching a hot pan. Q is at the fingers, R is on the nerve running up the arm, S is in the spinal cord, P is the muscle in the upper arm.',
        options: [
          { val: 'A', text: 'A  P → S → R → Q' },
          { val: 'B', text: 'B  Q → R → S → P' },
          { val: 'C', text: 'C  Q → P → R → S' },
          { val: 'D', text: 'D  S → P → Q → R' },
        ],
        correct: 'B',
        solution: [
          'Name each letter first. **Q** is in the fingers on the hot pan: the **receptor**. **R** is the nerve up the arm: the **sensory neurone**. **S** is in the spinal cord: the **relay neurone**. **P** is the arm muscle: the **effector**.',
          'A reflex arc always runs receptor → sensory neurone → relay neurone → motor neurone → effector.',
          'So the impulse starts at Q, goes up R, across S and ends at P: **Q → R → S → P**.',
        ],
        tip: 'Always start at the **stimulus** (here, the hot pan) and end at the **muscle**.',
        answer: 'B — Q → R → S → P',
      },
      {
        id: 'q10', type: 'mcq', source: A10 + '10', marks: 1,
        prompt: 'Which target organ releases glucose into the bloodstream as a result of the action of adrenaline?',
        options: [
          { val: 'A', text: 'A  Adrenal gland' },
          { val: 'B', text: 'B  Kidney' },
          { val: 'C', text: 'C  Liver' },
          { val: 'D', text: 'D  Pancreas' },
        ],
        correct: 'C',
        solution: [
          'Ask: which organ **stores** glucose? The **liver** — it keeps it as glycogen.',
          'Adrenaline makes the liver break that glycogen down and release glucose into the blood, to fuel the muscles.',
          'The **adrenal gland** is where adrenaline is MADE. The question asks for the **target** organ — the one it acts on.',
        ],
        tip: 'Gland = where a hormone is made. Target organ = where it acts. Do not swap them.',
        answer: 'C — Liver',
      },
    ],
  },
  {
    tier: 'Structured questions · 22 and 25',
    theme: 'Challenge',
    questions: [
      {
        id: 'q22a', type: 'dnd', source: A10 + '22(a)', marks: 2,
        prompt: 'The control of blood glucose concentration is an **involuntary** action by the body. The paper asks you to tick **two other** involuntary actions. Sort all five.',
        bank: [
          { val: 'cough', text: 'coughing' },
          { val: 'cycle', text: 'cycling' },
          { val: 'read', text: 'reading' },
          { val: 'sneeze', text: 'sneezing' },
          { val: 'talk', text: 'talking' },
        ],
        targets: [
          { id: 'inv', title: 'Involuntary — tick it' },
          { id: 'vol', title: 'Voluntary — leave it blank' },
        ],
        correctSets: { inv: ['cough', 'sneeze'], vol: ['cycle', 'read', 'talk'] },
        solution: [
          'An **involuntary** action happens without you deciding to do it.',
          'Nobody chooses to **cough** or **sneeze** — they are reflexes that clear the airways.',
          'You **decide** to cycle, read or talk, and you can stop whenever you like. Those are voluntary.',
        ],
        markScheme: ['coughing', 'sneezing'],
        tip: 'The question says **two**. Tick exactly two — a third tick can lose you a mark.',
        answer: 'coughing and sneezing',
      },
      {
        id: 'q22b', type: 'fill_blank', source: A10 + '22(b)', marks: 1,
        prompt: 'State the characteristic of living things that is defined as the ability to respond to a stimulus. Type the one word.',
        textParts: ['The characteristic is ', '.'],
        blanks: { 1: { correct: 'sensitivity', accept: ['Sensitivity'], width: 13 } },
        solution: [
          'This is one of the seven characteristics of living things: movement, respiration, **sensitivity**, growth, reproduction, excretion, nutrition.',
          '**Sensitivity** is the ability to detect and respond to changes in the environment (stimuli).',
        ],
        tip: '"State" means one word or one short phrase. Do not write a sentence.',
        answer: 'sensitivity',
      },
      {
        id: 'q22ci', type: 'fill_blank', source: A10 + '22(c)(i)', marks: 1,
        prompt: 'The graph shows the blood glucose concentration after eating a meal. Calculate the length of time it takes for the concentration to return to its **starting** concentration from its **maximum**.',
        inlineSvg: DIAGRAMS.HW_GLUCOSE_GRAPH, wide: true,
        figureNote: 'The graph on your paper was missing from the file, so this one has been **drawn for the review** with the same axes. Your numbers may be different — the **method** is the same.',
        textParts: ['The maximum is at ', ' minutes. The concentration is back at its starting value at ', ' minutes. So the time taken is ', ' minutes.'],
        blanks: {
          1: { correct: '20', width: 4 },
          2: { correct: '70', width: 4 },
          3: { correct: '50', width: 4 },
        },
        solution: [
          'Find the **maximum**: the highest point of the line. Read straight down to the time axis — **20 minutes**.',
          'Find the **starting concentration**: where the line begins, at 0 minutes — 5 mmol/dm³.',
          'Follow the line after the peak until it is back down at 5. Read down — **70 minutes**.',
          'Subtract: 70 − 20 = **50 minutes**.',
        ],
        tip: 'It asks for the time **from the maximum**, not from 0. The commonest wrong answer is the second reading on its own (70).',
        answer: '50 minutes',
      },
      {
        id: 'q22cii', type: 'dnd', source: A10 + '22(c)(ii)', marks: 3,
        prompt: '**Explain** the results between 20 and 30 minutes. Sort the six statements: which three would earn a mark?',
        inlineSvg: DIAGRAMS.HW_GLUCOSE_GRAPH, wide: true,
        bank: [
          { val: 'falls', text: 'The blood glucose concentration falls.' },
          { val: 'insulin', text: 'Insulin is secreted by the pancreas.' },
          { val: 'liver', text: 'The liver takes in glucose and stores it as glycogen.' },
          { val: 'glucagon', text: 'Glucagon is secreted by the pancreas.' },
          { val: 'absorb', text: 'Glucose is absorbed into the blood from the small intestine.' },
          { val: 'wrongGland', text: 'Insulin is secreted by the liver.' },
        ],
        targets: [
          { id: 'yes', title: 'Earns a mark' },
          { id: 'no', title: 'Does not earn a mark' },
        ],
        correctSets: { yes: ['falls', 'insulin', 'liver'], no: ['glucagon', 'absorb', 'wrongGland'] },
        solution: [
          'Start with what the line **does**: from 20 to 30 minutes it goes **down**.',
          'A fall in blood glucose is caused by **insulin**, and insulin comes from the **pancreas** — never from the liver.',
          'Then say what insulin makes happen: the **liver** takes glucose out of the blood and converts it to **glycogen**.',
          '**Glucagon** raises blood glucose, so it explains a rise, not a fall. **Absorption** from the small intestine explains the rise from 0 to 20 minutes.',
        ],
        markScheme: [
          'the blood glucose concentration decreases',
          'insulin is secreted / released (by the pancreas)',
          'glucose is converted to glycogen / stored in the liver (or: more glucose is taken up by cells)',
        ],
        modelAnswer: 'Between 20 and 30 minutes the blood glucose concentration falls. The pancreas has detected that it is too high and secreted insulin. Insulin makes the liver take glucose out of the blood and convert it to glycogen, which is stored.',
        tip: 'If the line on **your** graph is still rising between 20 and 30 minutes, the explanation is the other one: starch is digested to glucose, which is absorbed into the blood from the small intestine.',
        answer: 'falls · insulin from the pancreas · liver stores glucose as glycogen',
      },
      {
        id: 'q22ciii', type: 'mcq', source: A10 + '22(c)(iii)', marks: 1,
        prompt: 'State the type of response shown by the control of blood glucose concentration.',
        options: [
          { val: 'A', text: 'Positive feedback' },
          { val: 'B', text: 'A voluntary response' },
          { val: 'C', text: 'Negative feedback' },
          { val: 'D', text: 'A reflex arc' },
        ],
        correct: 'C',
        solution: [
          'When the glucose goes **up**, the response brings it **down**. When it goes down, the response brings it up.',
          'A response that **reverses** the change and returns the value to its set point is **negative feedback**.',
          'It is not a reflex arc — that is a pathway of neurones, and this control is done by hormones.',
        ],
        markScheme: ['negative feedback'],
        answer: 'Negative feedback',
      },
      {
        id: 'q22d', type: 'dnd', source: A10 + '22(d)', marks: 2,
        prompt: 'State the names of **two** hormones that can **increase** the blood glucose concentration. Sort the five hormones.',
        bank: [
          { val: 'glucagon', text: 'glucagon' },
          { val: 'adrenaline', text: 'adrenaline' },
          { val: 'insulin', text: 'insulin' },
          { val: 'oestrogen', text: 'oestrogen' },
          { val: 'testosterone', text: 'testosterone' },
        ],
        targets: [
          { id: 'up', title: 'Increases blood glucose' },
          { id: 'down', title: 'Decreases blood glucose' },
          { id: 'none', title: 'Does not control blood glucose' },
        ],
        correctSets: { up: ['glucagon', 'adrenaline'], down: ['insulin'], none: ['oestrogen', 'testosterone'] },
        solution: [
          '**Glucagon** (from the pancreas) makes the liver break down glycogen to glucose when the concentration is too low.',
          '**Adrenaline** (from the adrenal glands) also makes the liver release glucose, to fuel "fight or flight".',
          '**Insulin** is the only one that lowers it. Oestrogen and testosterone are sex hormones.',
        ],
        markScheme: ['glucagon', 'adrenaline'],
        tip: 'Spell it gluca**gon** — "glycogen" is the storage carbohydrate, not a hormone, and would not get the mark.',
        answer: 'glucagon and adrenaline',
      },
      {
        id: 'q25a', type: 'fill_blank', source: A10 + '25(a)', marks: 1,
        prompt: 'The diagram shows a finger touching a hot object. Neurones **A**, **B** and **C** pass impulses from the touch receptor to the muscle. Neurones **D** and **E** pass impulses to and from the brain. Name the neurone labelled **A**.',
        inlineSvg: DIAGRAMS.REFLEX_FINGER, wide: true,
        figureNote: 'The diagram on your paper was missing from the file, so this one has been **drawn for the review**: A runs from the receptor to the spinal cord, B is inside the spinal cord, C runs to the muscle, D goes up to the brain and E comes down from it.',
        textParts: ['Neurone A is a ', ' neurone.'],
        blanks: { 1: { correct: 'sensory', accept: ['Sensory'], width: 10 } },
        solution: [
          'Neurone A starts at the **receptor** and carries the impulse **to** the spinal cord.',
          'A neurone that carries impulses from a receptor to the CNS is a **sensory** neurone.',
          'B (inside the spinal cord) is the relay neurone, and C (out to the muscle) is the motor neurone.',
        ],
        markScheme: ['sensory (neurone)'],
        answer: 'sensory neurone',
      },
      {
        id: 'q25b', type: 'fill_blank', source: A10 + '25(b)', marks: 1,
        prompt: 'What name is given to the pathway of electrical impulses along neurones **A**, **B** and **C**?',
        inlineSvg: DIAGRAMS.REFLEX_FINGER, wide: true,
        textParts: ['The pathway is called a ', '.'],
        blanks: { 1: { correct: 'reflex arc', accept: ['Reflex arc', 'a reflex arc', 'the reflex arc'], width: 12 } },
        solution: [
          'Receptor → sensory neurone → relay neurone → motor neurone → effector is a **reflex arc**.',
          'Be exact: the **arc** is the pathway. The **reflex action** is the response it produces (the finger pulling away).',
        ],
        markScheme: ['reflex arc'],
        tip: 'The question asks for the **pathway**, so write "reflex arc", not "reflex action".',
        answer: 'reflex arc',
      },
      {
        id: 'q25c', type: 'mcq', source: A10 + '25(c)', marks: 1,
        prompt: 'Neurones **D** and **E** are not involved in the response of the muscle effectors. What is the advantage of this?',
        inlineSvg: DIAGRAMS.REFLEX_FINGER, wide: true,
        options: [
          { val: 'A', text: 'The brain never finds out that the finger has touched something hot.' },
          { val: 'B', text: 'The response is faster, because the impulse does not have to go to the brain and back — so there is less damage.' },
          { val: 'C', text: 'The muscle contracts more strongly, because it gets two impulses.' },
          { val: 'D', text: 'The person can decide whether or not to move the finger.' },
        ],
        correct: 'B',
        solution: [
          'D and E are the route to and from the **brain**. Leaving them out makes the pathway **shorter**.',
          'A shorter pathway means a **faster** response — no time is spent thinking.',
          'Faster means the finger is on the hot object for less time, so there is **less damage** (less burning).',
          'The brain does still find out (through D), just after the finger has already moved.',
        ],
        markScheme: ['the response is faster / quicker / automatic', '(so) less damage / harm to the finger'],
        modelAnswer: 'The response is faster because the impulse does not have to travel to the brain and back, so the finger is pulled away sooner and is damaged less.',
        answer: 'B — a faster response, so less damage',
      },
      {
        id: 'q25d', type: 'inline', source: A10 + '25(d)', marks: 3,
        prompt: 'If one of the neurones is cut, it may affect the ability to **respond** if you touch a hot object, or the ability to **know** that you have touched it. Choose the letter for each box. (On this drawing, use A, C, D or E.)',
        inlineSvg: DIAGRAMS.REFLEX_FINGER, wide: true,
        textParts: [
          'If this neurone is cut, you can remove your finger, but you will not know that you have touched the object: ',
          '. If this neurone is cut, you cannot remove your finger, even though you know you have touched it: ',
          '. If this neurone is cut, you cannot remove your finger, and you will not know that you have touched it: ',
          '.',
        ],
        blanks: {
          1: { correct: 'D', options: [{ val: 'A', text: 'A' }, { val: 'C', text: 'C' }, { val: 'D', text: 'D' }, { val: 'E', text: 'E' }] },
          2: { correct: 'C', options: [{ val: 'A', text: 'A' }, { val: 'C', text: 'C' }, { val: 'D', text: 'D' }, { val: 'E', text: 'E' }] },
          3: { correct: 'A', options: [{ val: 'A', text: 'A' }, { val: 'C', text: 'C' }, { val: 'D', text: 'D' }, { val: 'E', text: 'E' }] },
        },
        solution: [
          'Ask two questions about each cut: can the impulse still reach the **muscle**, and can it still reach the **brain**?',
          '**D** carries the impulse up to the brain. Cut it and the reflex arc A → B → C still works, so the finger moves — but the brain is never told.',
          '**C** is the motor neurone to the muscle. Cut it and the muscle gets no impulse, so the finger stays — but A and D still work, so you know.',
          '**A** is the sensory neurone from the receptor. Cut it and nothing gets in at all: no impulse to the muscle, and none to the brain.',
        ],
        markScheme: ['D — the neurone taking impulses TO the brain', 'C — the motor neurone', 'A — the sensory neurone'],
        tip: 'On your paper, work out which of D and E goes **to** the brain (it comes off the sensory side). That one is the answer to the first box.',
        answer: 'D, then C, then A',
      },
    ],
  },
];
