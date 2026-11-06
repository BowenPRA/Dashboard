// src/data/Y7_SCI/U03_6/assessment.js
// Eight questions, one sitting, ten minutes, English only (the explanations
// are English and French). 1 energy changes whenever something happens,
// 2 a process, 3 read a diagram (transfer: a coconut), 4 a torch's battery,
// 5 a phone ringing — two arrows from one box, 6 the power station's chain,
// 7 a toaster's useful change, 8 a cold can in a hot room (transfer: heat
// moving IN). Every distractor is a misconception the unit names: energy used
// up, a battery as an electrical store, a branch drawn as a chain, the
// windmill, a side effect taken for the job, cold that moves. No item copies a
// deck check or a From… To… item. Correct letters: B C D A A C D B.
export const assessment = {
  timeLimit: 600, // 10 minutes
  passages: [],
  questions: [
    {
      id: 'a1_happens',
      type: 'mcq',
      title: '1. A firework bursts, a kettle boils and a plant grows. What is true about all three?',
      options: [
        { val: 'A', text: 'A. In each one, energy is used up.' },
        { val: 'B', text: 'B. In each one, energy is changed or transferred.' },
        { val: 'C', text: 'C. They are all events.' },
        { val: 'D', text: 'D. They are all processes.' },
      ],
      correct: 'B',
      expEn: 'When something **happens**, energy is **changed or transferred** — that is true of every event and every process. Energy is not used up (A): it changes into other kinds. The firework is an event, but the kettle and the plant are processes, so C and D are both wrong.',
      expFr: 'Quand quelque chose se **passe**, l’énergie est **transformée ou transférée** — c’est vrai pour chaque événement et chaque processus. L’énergie n’est pas épuisée (A) : elle devient d’autres formes. Le feu d’artifice est un événement, mais la bouilloire et la plante sont des processus, donc C et D sont faux.',
    },
    {
      id: 'a2_process',
      type: 'mcq',
      title: '2. Which of these is a process, not an event?',
      options: [
        { val: 'A', text: 'A. A glass breaks.' },
        { val: 'B', text: 'B. A balloon pops.' },
        { val: 'C', text: 'C. Bread bakes in an oven for 30 minutes.' },
        { val: 'D', text: 'D. A door slams.' },
      ],
      correct: 'C',
      expEn: 'A **process** keeps going: the bread bakes for half an hour. A glass breaking, a balloon popping and a door slamming happen once and are over in a moment — they are **events**.',
      expFr: 'Un **processus** continue : le pain cuit pendant une demi-heure. Un verre qui se casse, un ballon qui éclate et une porte qui claque arrivent une fois et sont finis en un instant — ce sont des **événements**.',
    },
    {
      id: 'a3_read',
      type: 'mcq',
      title: '3. An energy-change diagram reads: gravitational potential → kinetic. Which could it show?',
      options: [
        { val: 'A', text: 'A. A bird flying higher' },
        { val: 'B', text: 'B. A drum being hit' },
        { val: 'C', text: 'C. A stretched bow shooting an arrow' },
        { val: 'D', text: 'D. A coconut falling from a tree' },
      ],
      correct: 'D',
      expEn: 'High up, the coconut has **gravitational potential** energy; as it falls it moves faster: **kinetic**. A bird flying higher is the other way round (A). A drum is kinetic → sound (B), and a bow is elastic potential → kinetic (C).',
      expFr: 'En haut, la noix de coco a de l’énergie **potentielle de pesanteur** ; en tombant, elle va plus vite : **cinétique**. Un oiseau qui monte, c’est l’inverse (A). Un tambour, c’est cinétique → sonore (B), et un arc, potentielle élastique → cinétique (C).',
    },
    {
      id: 'a4_torch',
      type: 'mcq',
      title: '4. A torch runs on batteries. When it is switched on, what energy change happens in the batteries?',
      options: [
        { val: 'A', text: 'A. chemical → electrical' },
        { val: 'B', text: 'B. electrical → chemical' },
        { val: 'C', text: 'C. light → chemical' },
        { val: 'D', text: 'D. thermal → electrical' },
      ],
      correct: 'A',
      expEn: 'A battery is a **chemical** store. In use, that chemical energy comes out as **electrical** energy (then the bulb makes light). B is what happens when a battery is CHARGED. C is backwards, and a battery does not start with heat (D).',
      expFr: 'Une pile est une réserve **chimique**. Quand on l’utilise, cette énergie chimique sort sous forme **électrique** (puis l’ampoule fait de la lumière). B, c’est ce qui se passe quand on CHARGE une batterie. C est à l’envers, et une pile ne commence pas par de la chaleur (D).',
    },
    {
      id: 'a5_ring',
      type: 'mcq',
      title: '5. A phone rings and its screen lights up. Its battery’s energy has already become electrical. Which diagram shows what happens next?',
      options: [
        { val: 'A', text: 'A. electrical → sound, and electrical → light (two arrows from one box)' },
        { val: 'B', text: 'B. electrical → sound → light' },
        { val: 'C', text: 'C. sound → electrical → light' },
        { val: 'D', text: 'D. light → sound → electrical' },
      ],
      correct: 'A',
      expEn: 'The phone changes electrical energy into sound AND into light, so **both arrows start at electrical**, like the television. Sound does not change into light (B). C and D start with the wrong energy: the electricity comes first.',
      expFr: 'Le téléphone change l’énergie électrique en son ET en lumière, donc **les deux flèches partent de électrique**, comme pour la télévision. Le son ne devient pas de la lumière (B). C et D commencent par la mauvaise énergie : l’électricité vient d’abord.',
    },
    {
      id: 'a6_power',
      type: 'mcq',
      title: '6. Which energy-change diagram is right for a gas power station?',
      options: [
        { val: 'A', text: 'A. chemical → kinetic → thermal → electrical' },
        { val: 'B', text: 'B. kinetic → thermal → chemical → electrical' },
        { val: 'C', text: 'C. chemical → thermal → kinetic → electrical' },
        { val: 'D', text: 'D. chemical → electrical → thermal → kinetic' },
      ],
      correct: 'C',
      expEn: 'The gas burns (**chemical → thermal**), the hot gas spins the generators (**thermal → kinetic**), and they make electricity (**kinetic → electrical**). In A the generators spin before the gas burns. B starts with wind, as if it were a windmill. D makes the electricity first.',
      expFr: 'Le gaz brûle (**chimique → thermique**), le gaz chaud fait tourner les générateurs (**thermique → cinétique**), et ils font l’électricité (**cinétique → électrique**). En A, les générateurs tournent avant que le gaz brûle. B commence par le vent, comme une éolienne. D fait l’électricité en premier.',
    },
    {
      id: 'a7_toaster',
      type: 'mcq',
      title: '7. Mr Bowen makes toast. Inside the toaster the wires glow red. What is the toaster’s useful energy change?',
      options: [
        { val: 'A', text: 'A. electrical → light' },
        { val: 'B', text: 'B. thermal → electrical' },
        { val: 'C', text: 'C. chemical → thermal' },
        { val: 'D', text: 'D. electrical → thermal' },
      ],
      correct: 'D',
      expEn: 'A useful energy change is the one that does what we want: Mr Bowen wants hot toast, so **electrical → thermal**. The red glow is light (A), but nobody makes toast to see by it. B is backwards, and a toaster runs on electricity, not a fuel (C).',
      expFr: 'Un changement utile est celui qui fait ce que l’on veut : M. Bowen veut du pain grillé chaud, donc **électrique → thermique**. La lueur rouge est de la lumière (A), mais personne ne fait griller du pain pour s’éclairer. B est à l’envers, et un grille-pain marche à l’électricité, pas avec un combustible (C).',
    },
    {
      id: 'a8_can',
      type: 'mcq',
      title: '8. A cold can of drink (5 °C) is left on a table in a hot room (32 °C). Which is true?',
      options: [
        { val: 'A', text: 'A. Cold moves out of the can into the room.' },
        { val: 'B', text: 'B. Thermal energy moves from the room into the can, so the can warms up.' },
        { val: 'C', text: 'C. Thermal energy moves from the can into the room.' },
        { val: 'D', text: 'D. Nothing moves until the can is opened.' },
      ],
      correct: 'B',
      expEn: 'Thermal energy moves from **hotter** things to **colder** things: here the room is hotter, so heat moves INTO the can and it warms up — the freezer the other way round. Cold does not move (A), heat does not go from colder to hotter by itself (C), and the can does not need to be open (D).',
      expFr: 'L’énergie thermique va des choses plus **chaudes** aux choses plus **froides** : ici, la pièce est plus chaude, donc la chaleur ENTRE dans la canette, qui se réchauffe — le congélateur à l’envers. Le froid ne bouge pas (A), la chaleur ne va pas toute seule du plus froid au plus chaud (C), et la canette n’a pas besoin d’être ouverte (D).',
    },
  ],
};
