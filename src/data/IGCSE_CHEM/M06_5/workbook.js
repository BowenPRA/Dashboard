// src/data/IGCSE_CHEM/M06_5/workbook.js
// Reveal-solution practice for 6.5 The Periodic Table.
// 12 questions: 4 Focus · 5 Practice · 3 Challenge. English-only.
//
// Every question uses an ANSWERABLE widget (multiple choice, dropdown sentences,
// or drag-to-bucket) — no free-typed answers. Element Hunt stages finding
// groups, periods and metals on the table, so this set carries what that
// engine cannot ask: reading the key, electron arrangement → period and group,
// the charge on an ion, similar elements, the noble gases, and (Practice and
// Challenge) the Extended trends — Period 3 oxides, density down a group,
// reactivity and shells, and the tellurium / iodine swap.
//
// Focus stays on Core content, so a shaky student has somewhere to stand.
// Every element and number here is fresh: none is the book's worked example.
// See docs/workbook-tasks.md.

export const workbook = [
  {
    tier: 'Focus',
    questions: [
      {
        id: 'f1', type: 'mcq',
        prompt: 'In the Periodic Table, the box for **aluminium** shows 13 above the symbol Al and 27 below the name. What does the **13** tell you?',
        options: [
          { val: 'a', text: 'The relative atomic mass of aluminium' },
          { val: 'b', text: 'The number of neutrons in an aluminium atom' },
          { val: 'c', text: 'The proton number: an aluminium atom has 13 protons' },
          { val: 'd', text: 'The group number of aluminium' },
        ],
        correct: 'c',
        solution: [
          'The key: the **top** number is the proton number, the **bottom** number is the relative atomic mass.',
          'So an aluminium atom has **13 protons** — and so 13 electrons.',
          '27 is the relative atomic mass. The box does not show the group: you read that from the column (aluminium is in Group III).',
        ],
        answer: 'The proton number: 13 protons',
      },
      {
        id: 'f2', type: 'inline',
        prompt: 'A calcium atom has the electron arrangement 2,8,8,2. Complete the sentence.',
        textParts: [
          'Calcium is in Period ',
          ' and Group ',
          '.',
        ],
        blanks: {
          1: { correct: '4', options: [{ val: '2', text: '2' }, { val: '4', text: '4' }, { val: '8', text: '8' }] },
          2: { correct: 'II', options: [{ val: 'II', text: 'II' }, { val: 'IV', text: 'IV' }, { val: 'VIII', text: 'VIII' }] },
        },
        solution: [
          'Count the shells: 2,8,8,2 is **four** numbers, so four shells — **Period 4**.',
          'The last number is the outer shell: **2** electrons — **Group II**.',
        ],
        answer: 'Period 4, Group II',
      },
      {
        id: 'f3', type: 'dnd',
        prompt: 'Use the zig-zag line. Drag each element to the right side of it.',
        bank: [
          { val: 'li', text: 'lithium' },
          { val: 'n', text: 'nitrogen' },
          { val: 'ca', text: 'calcium' },
          { val: 's', text: 'sulfur' },
          { val: 'al', text: 'aluminium' },
          { val: 'ne', text: 'neon' },
        ],
        targets: [
          { id: 'metal', title: 'Metal (left of the line)' },
          { id: 'non', title: 'Non-metal (right of the line)' },
        ],
        correctSets: { metal: ['li', 'ca', 'al'], non: ['n', 's', 'ne'] },
        solution: [
          'Lithium (Group I) and calcium (Group II) are on the far left: **metals**.',
          'The line runs between aluminium and silicon, so **aluminium** is a metal.',
          'Nitrogen, sulfur and neon are right of the line: **non-metals**.',
        ],
        answer: 'Metals: lithium, calcium, aluminium · non-metals: nitrogen, sulfur, neon',
      },
      {
        id: 'f4', type: 'mcq',
        prompt: 'Helium is used to fill party balloons. Why does helium not react with anything?',
        options: [
          { val: 'a', text: 'Its atoms have a full outer shell of electrons' },
          { val: 'b', text: 'Its atoms have no electrons' },
          { val: 'c', text: 'It is a very light gas' },
          { val: 'd', text: 'Its atoms have eight outer-shell electrons' },
        ],
        correct: 'a',
        solution: [
          'Helium is a noble gas, in **Group VIII**.',
          'Its only shell holds **2** electrons, and 2 is full for the first shell.',
          'A full outer shell is **stable**, so helium does not need to lose, gain or share electrons: it is unreactive.',
        ],
        answer: 'Its atoms have a full outer shell',
      },
    ],
  },
  {
    tier: 'Practice',
    questions: [
      {
        id: 'p1', type: 'inline',
        prompt: 'Use the group number to give the charge on each ion.',
        textParts: [
          'Barium (Group II) forms ions with a charge of ',
          '. Selenium (Group VI) forms ',
          ' ions. Iodine (Group VII) forms ',
          ' ions.',
        ],
        blanks: {
          1: { correct: '2+', options: [{ val: '2+', text: '2+' }, { val: '2−', text: '2−' }, { val: '6+', text: '6+' }] },
          2: { correct: '2−', options: [{ val: '6+', text: '6+' }, { val: '2−', text: '2−' }, { val: '6−', text: '6−' }] },
          3: { correct: '1−', options: [{ val: '7+', text: '7+' }, { val: '1+', text: '1+' }, { val: '1−', text: '1−' }] },
        },
        solution: [
          'Barium has **2** outer electrons. It loses them to reach a full shell, so it forms **2+** ions.',
          'Selenium has **6** outer electrons. It gains **2** more to fill the shell, so it forms **2−** ions.',
          'Iodine has **7** outer electrons. It gains **1**, so it forms **1−** ions.',
        ],
        answer: '2+ · 2− · 1−',
      },
      {
        id: 'p2', type: 'mcq',
        prompt: 'An element\'s atoms have **two** electron shells, with **six** electrons in the outer shell. Which element is it?',
        options: [
          { val: 'a', text: 'Sulfur' },
          { val: 'b', text: 'Carbon' },
          { val: 'c', text: 'Neon' },
          { val: 'd', text: 'Oxygen' },
        ],
        correct: 'd',
        solution: [
          'Two shells → **Period 2**.',
          'Six outer electrons → **Group VI**.',
          'Period 2, Group VI is **oxygen**, 2,6. (Sulfur is also in Group VI, but it has three shells.)',
        ],
        answer: 'Oxygen',
      },
      {
        id: 'p3', type: 'mcq',
        prompt: 'Which pair of elements would you expect to have the most **similar chemical properties**?',
        options: [
          { val: 'a', text: 'Nitrogen and oxygen' },
          { val: 'b', text: 'Nitrogen and phosphorus' },
          { val: 'c', text: 'Sodium and magnesium' },
          { val: 'd', text: 'Phosphorus and chlorine' },
        ],
        correct: 'b',
        solution: [
          'Elements in the same **group** react in a similar way, because their atoms have the same number of outer-shell electrons.',
          'Nitrogen (2,5) and phosphorus (2,8,5) are both in **Group V**.',
          'The other pairs are next to each other in the same **period** — they have different numbers of outer electrons.',
        ],
        answer: 'Nitrogen and phosphorus',
      },
      {
        id: 'p4', type: 'dnd',
        prompt: 'Extended. Sort the oxides of these Period 3 elements.',
        bank: [
          { val: 'na2o', text: 'sodium oxide' },
          { val: 'mgo', text: 'magnesium oxide' },
          { val: 'al2o3', text: 'aluminium oxide' },
          { val: 'sio2', text: 'silicon dioxide' },
          { val: 'so2', text: 'sulfur dioxide' },
        ],
        targets: [
          { id: 'basic', title: 'Basic' },
          { id: 'amph', title: 'Amphoteric' },
          { id: 'acidic', title: 'Acidic' },
        ],
        correctSets: { basic: ['na2o', 'mgo'], amph: ['al2o3'], acidic: ['sio2', 'so2'] },
        solution: [
          'Across Period 3 the oxides change from **basic** to **amphoteric** to **acidic**, as the elements change from metal to non-metal.',
          'The metals sodium and magnesium give **basic** oxides.',
          '**Aluminium oxide** is amphoteric: it reacts with acids and with bases.',
          'Silicon (the metalloid) and sulfur give **acidic** oxides.',
        ],
        answer: 'Basic: sodium oxide, magnesium oxide · amphoteric: aluminium oxide · acidic: silicon dioxide, sulfur dioxide',
      },
      {
        id: 'p5', type: 'mcq',
        prompt: 'Extended. At the same temperature and pressure, the densities of four noble gases in g/dm³ are: helium 0.18, neon 0.90, argon 1.78, krypton 3.75. Xenon is next, below krypton. Which is the best prediction for the density of **xenon**?',
        options: [
          { val: 'a', text: '0.40 g/dm³' },
          { val: 'b', text: '2.10 g/dm³' },
          { val: 'c', text: '3.75 g/dm³' },
          { val: 'd', text: '5.9 g/dm³' },
        ],
        correct: 'd',
        solution: [
          'Going down Group VIII the atoms get heavier, and the density **increases** every time.',
          'So xenon must be **more** than krypton\'s 3.75 g/dm³. That rules out a, b and c.',
          'The only value above 3.75 is **5.9 g/dm³** — and it is xenon\'s real density.',
        ],
        answer: '5.9 g/dm³',
      },
    ],
  },
  {
    tier: 'Challenge',
    questions: [
      {
        id: 'c1', type: 'mcq',
        prompt: 'Extended. Caesium (2,8,18,18,8,1) is much more reactive than sodium (2,8,1). Which statement explains this?',
        options: [
          { val: 'a', text: 'Caesium has more outer-shell electrons to lose' },
          { val: 'b', text: 'Caesium\'s outer electron is further from the nucleus, so it is pulled less strongly and lost more easily' },
          { val: 'c', text: 'Caesium\'s nucleus has more protons, so it holds its outer electron more tightly' },
          { val: 'd', text: 'Caesium is a transition element' },
        ],
        correct: 'b',
        solution: [
          'Both have **one** outer electron — they are both in Group I — so (a) is wrong.',
          'Caesium has **six** shells; sodium has three. Caesium\'s outer electron is much **further** from the nucleus.',
          'The inner shells come between, so the pull on that outer electron is **weaker**.',
          'The electron is lost more easily, so caesium reacts more readily.',
        ],
        answer: 'Its outer electron is further away, so it is lost more easily',
      },
      {
        id: 'c2', type: 'mcq',
        prompt: 'Extended. Magnesium (2,8,2) and aluminium (2,8,3) are side by side in Period 3. Which is more reactive, and why?',
        options: [
          { val: 'a', text: 'Aluminium, because it has more outer electrons to lose' },
          { val: 'b', text: 'Aluminium, because it has a higher proton number' },
          { val: 'c', text: 'Magnesium, because it must lose only two electrons, not three' },
          { val: 'd', text: 'Neither: elements in the same period are equally reactive' },
        ],
        correct: 'c',
        solution: [
          'Both atoms have **three** shells, so the distance to the nucleus is similar.',
          'Magnesium must lose **2** electrons to reach a full shell; aluminium must lose **3**.',
          'Losing fewer electrons takes **less energy**, so **magnesium** is more reactive.',
        ],
        answer: 'Magnesium — it loses two electrons, not three',
      },
      {
        id: 'c3', type: 'mcq',
        prompt: 'Tellurium has a relative atomic mass of 127.6 and proton number 52. Iodine has a relative atomic mass of 126.9 and proton number 53. Iodine behaves like chlorine and bromine. Why does today\'s table put **tellurium before iodine**?',
        options: [
          { val: 'a', text: 'Because tellurium is heavier' },
          { val: 'b', text: 'Because the table is in order of proton number, and that puts iodine in Group VII' },
          { val: 'c', text: 'Because tellurium was discovered first' },
          { val: 'd', text: 'It is a mistake: iodine should come first' },
        ],
        correct: 'b',
        solution: [
          'In order of atomic weight, iodine (126.9) would come **before** tellurium (127.6).',
          'That would put iodine in Group VI and tellurium in Group VII — but iodine behaves like the **Group VII** halogens.',
          'The table is in order of **proton number**: tellurium 52, then iodine 53. That puts iodine where its properties belong.',
        ],
        answer: 'The table is in order of proton number (52, then 53)',
      },
    ],
  },
];
