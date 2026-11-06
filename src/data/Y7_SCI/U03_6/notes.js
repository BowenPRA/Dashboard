// src/data/Y7_SCI/U03_6/notes.js
// 3.6 Changes in Energy — the self-study deck, reduced from the classroom deck
// y7-science/U03_6 (20 slides, Learner's Book pp. 111–116). 19 slides, 15
// scored: 5 checks, 4 predict, 2 sort, 1 estimate, 3 builds (the From… To…
// engine on a slide). Plan, with every cut and why: docs/y7-science/plans/U03_6.md.
//
// THE CLASSROOM'S THREE COMMANDS ARE THE SPINE: change it (a bouncing ball, one
// press one change; an event or a process), draw it (energy-change diagrams:
// a box for each kind, an arrow for each change), follow it (useful or
// dangerous; the candle's heat; heat moves from hotter to colder). 3.5's
// stores and transfers are used, not taught again; useful-versus-WASTED and
// energy spreading out are 3.7's.
//
// For a student alone: the paper starter is an estimate, the two hand votes
// are predictions (the hands are out of the vote cards), whiteboards are a
// sort and the builds, the From… To… game is the task, and the copy-down
// panels are Key word cards.
//
// House notes: a slide's `check:` or `activity:` is its LAST key and no slide
// carries both; activity items use name/explain, never text.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS as DIAGRAMS_B } from './diagramsB.js';
import { BouncingBall, BallFilm } from './widgets.jsx';
import { CandleStory } from './story.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const BLUE = '#1a5fa8';
const GREEN = '#4a8b23';

// The classroom's orange "write" panel is a Key word card, written out in full
// (not through a helper) so the narration reads the definition: the audio
// generator only reads `text:` fields.

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: ORANGE,
    icon: 'Repeat',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · 3.6 · Forces and energy',
    eyebrowFr: 'Unité 3 · 3.6 · Forces et énergie',
    title: 'Changes in Energy',
    titleFr: 'L’énergie change',
    objective: 'Say how energy changes when something happens; draw energy-change diagrams with boxes and arrows; and say which way heat moves.',
    objectiveFr: 'Dire comment l’énergie change quand il se passe quelque chose ; dessiner des schémas de transformation avec des cases et des flèches ; et dire dans quel sens va la chaleur.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: '**Change it**, **draw it**, **follow it**. You will guess, predict, sort and **build** energy-change diagrams. **15 things are scored**: the first is on the next slide.',
      textFr: '**La transformer**, **la dessiner**, **la suivre**. Tu vas deviner, prédire, trier et **construire** des schémas de transformation. **15 activités sont notées** : la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: ESTIMATE — how high will it bounce? ─────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Start here · guess',
    eyebrowFr: 'Pour commencer · devine',
    title: 'How High Will It Bounce?',
    titleFr: 'À quelle hauteur va-t-elle rebondir ?',
    ratio: 50,
    inlineSvg: DIAGRAMS.DROP_Q,
    content: 'Mr Bowen holds a **tennis ball** at the top of a door, **2 m** up, and lets go. It hits the floor and **bounces**.',
    contentFr: 'M. Bowen tient une **balle de tennis** en haut d’une porte, à **2 m**, et la lâche. Elle touche le sol et **rebondit**.',
    activity: {
      id: 'act_bounce_height',
      type: 'estimate',
      prompt: 'How high does it bounce back up? Guess in centimetres.',
      promptFr: 'À quelle hauteur remonte-t-elle ? Devine en centimètres.',
      min: 0,
      max: 300,
      step: 5,
      unit: 'cm',
      answer: 110,
      tolerance: 0.2,
      explain: '**About 110 cm** — just over half. (The rules of tennis say a ball must bounce back to just over half the height it fell from.) Most people guess 150 to 200 cm. So where did the rest of the energy go? The next two slides show you.',
      explainFr: '**Environ 110 cm** — un peu plus de la moitié. (Les règles du tennis disent qu’une balle doit remonter à un peu plus de la moitié de sa hauteur de chute.) La plupart des gens disent 150 à 200 cm. Alors, où est passé le reste de l’énergie ? Les deux diapos suivantes te le montrent.',
    },
  },

  // 3 ─ The bouncing ball + PREDICT: squashed, which store is biggest? ───────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'The Bouncing Ball',
    titleFr: 'La balle qui rebondit',
    widget: BouncingBall,
    caption: 'Read **Next**, say which **store** will be **biggest**, then press. One press, one change.',
    captionFr: 'Lis **Ensuite**, dis quelle **réserve** sera la **plus grande**, puis appuie. Un clic, un changement.',
    activity: {
      id: 'act_squash_store',
      type: 'predict',
      prompt: 'The ball hits the floor and squashes flat. Which store is biggest at that moment?',
      promptFr: 'La balle touche le sol et s’écrase. Quelle réserve est la plus grande à ce moment-là ?',
      options: [
        { val: 'kinetic', name: 'Kinetic — it is moving fast', nameFr: 'Cinétique — elle va vite' },
        { val: 'elastic', name: 'Elastic potential — it is squashed', nameFr: 'Potentielle élastique — elle est écrasée' },
        { val: 'grav', name: 'Gravitational potential — it fell from high up', nameFr: 'Potentielle de pesanteur — elle est tombée de haut' },
      ],
      correct: 'elastic',
      explain: '**Elastic potential.** For a moment the ball stops, squashed like a stretched band: its kinetic energy is stored in the squash, then it springs back up — kinetic again. Press Next to the bang and watch the purple bar. The red bar fills too: some energy leaves the ball.',
      explainFr: '**Potentielle élastique.** Un instant, la balle s’arrête, écrasée comme un élastique tendu : son énergie cinétique est stockée dans l’écrasement, puis elle rebondit — de nouveau cinétique. Appuie sur Suivant jusqu’au « bang » et regarde la barre violette. La barre rouge se remplit aussi : une partie de l’énergie quitte la balle.',
    },
  },

  // 4 ─ Why not 2 m? CHECK ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Why Not 2 m?',
    titleFr: 'Pourquoi pas 2 m ?',
    ratio: 50,
    inlineSvg: DIAGRAMS.PIC_CHANGE_IT,
    content: 'It bounced to about **1.1 m**, and each bounce is lower.\n\nTry it at home: drop a ball from the top of a door and watch the top of the bounce.',
    contentFr: 'Elle a rebondi à environ **1.1 m**, et chaque rebond est plus bas.\n\nEssaie chez toi : lâche une balle du haut d’une porte et regarde le haut du rebond.',
    check: {
      id: 'chk_not_two',
      q: 'Why does the ball not bounce back to 2 m?',
      qFr: 'Pourquoi la balle ne remonte-t-elle pas jusqu’à 2 m ?',
      options: [
        { val: 'A', text: 'It ran out of energy at the bounce', textFr: 'Elle n’avait plus d’énergie au rebond' },
        { val: 'B', text: 'Gravity pulls harder on the way up', textFr: 'La gravité tire plus fort à la montée' },
        { val: 'C', text: 'At the bounce, some energy changed to sound and heat, and left the ball', textFr: 'Au rebond, une partie de l’énergie est devenue du son et de la chaleur, et a quitté la balle' },
        { val: 'D', text: 'The ball got lighter when it squashed', textFr: 'La balle est devenue plus légère en s’écrasant' },
      ],
      correct: 'C',
      expEn: '**Some energy changed to sound and heat** at the bounce — you hear the bang — and it left the ball, so less is left to lift it. It did not run out (A): it still climbed 1.1 m. Gravity is the same going up and coming down (B), and squashing does not change the ball’s mass (D). Where that sound and heat go is the next lesson’s question.',
      expFr: '**Une partie de l’énergie est devenue du son et de la chaleur** au rebond — tu entends le « bang » — et elle a quitté la balle : il en reste moins pour la soulever. Elle ne s’est pas vidée (A) : elle est encore montée à 1.1 m. La gravité est la même à la montée et à la descente (B), et s’écraser ne change pas la masse de la balle (D). Où vont ce son et cette chaleur, c’est la question de la prochaine leçon.',
    },
  },

  // 5 ─ Energy changes: the slow-motion film + key word (the book's Q1) ──────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Key word · the real thing',
    eyebrowFr: 'Mot clé · en vrai',
    title: 'Energy Changes',
    titleFr: 'L’énergie se transforme',
    ratio: 45,
    widget: BallFilm,
    content: 'A big gym ball, slowed down: the bottom goes **flat**, then round again. That is the elastic store.',
    contentFr: 'Un gros ballon de gym, au ralenti : le bas s’**aplatit**, puis redevient rond. C’est la réserve élastique.',
    notes: [
      {
        tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen',
        text: 'When something **happens**, energy is **changed** or **transferred**.',
        textFr: 'Quand quelque chose se **passe**, l’énergie est **transformée** (changed) ou **transférée** (transferred).',
      },
      { tone: 'info', badge: false, text: 'The bounce: **kinetic** → **elastic potential** → **kinetic**.', textFr: 'Le rebond : **cinétique** → **potentielle élastique** → **cinétique**.' },
    ],
  },

  // 6 ─ Event or process + SORT ──────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Flame',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'An Event or a Process',
    titleFr: 'Événement ou processus',
    ratio: 45,
    inlineSvg: DIAGRAMS.EVENT_PROCESS,
    notes: [
      {
        tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen',
        text: '**Event:** something that happens once, like a book falling.\n**Process:** something that keeps going, like burning.',
        textFr: '**Événement (event) :** quelque chose qui arrive une fois, comme un livre qui tombe.\n**Processus (process) :** quelque chose qui continue, comme une combustion.',
      },
    ],
    activity: {
      id: 'act_event_process',
      type: 'sort',
      prompt: 'Event or process? Sort the six.',
      promptFr: 'Événement ou processus ? Trie les six.',
      bins: [
        { id: 'event', name: 'Event (once)', nameFr: 'Événement (une fois)' },
        { id: 'process', name: 'Process (keeps going)', nameFr: 'Processus (continue)' },
      ],
      cards: [
        { id: 'balloon', name: 'A balloon pops', nameFr: 'Un ballon éclate', bin: 'event' },
        { id: 'rice', name: 'Rice cooks', nameFr: 'Le riz cuit', bin: 'process' },
        { id: 'glass', name: 'A glass breaks', nameFr: 'Un verre se casse', bin: 'event' },
        { id: 'phone', name: 'A phone charges', nameFr: 'Un téléphone charge', bin: 'process' },
        { id: 'lightning', name: 'Lightning strikes', nameFr: 'La foudre tombe', bin: 'event' },
        { id: 'plant', name: 'A plant grows', nameFr: 'Une plante pousse', bin: 'process' },
      ],
      explain: '**Events** are over in a moment: a balloon pops, a glass breaks, lightning strikes. **Processes** keep going for minutes, hours or weeks: rice cooking, a phone charging, a plant growing. In both, energy changes.',
      explainFr: 'Les **événements** sont finis en un instant : un ballon éclate, un verre se casse, la foudre tombe. Les **processus** durent des minutes, des heures ou des semaines : le riz qui cuit, un téléphone qui charge, une plante qui pousse. Dans les deux cas, l’énergie change.',
    },
  },

  // 7 ─ Energy-change diagrams (the book's three) + CHECK: the TV ───────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'PenLine',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Energy-Change Diagrams',
    titleFr: 'Les schémas de transformation',
    ratio: 50,
    inlineSvg: DIAGRAMS.BOOK_DIAGRAMS,
    content: 'Read each arrow as **“to”**: chemical **to** thermal. A television has **two** arrows from **one** box.',
    contentFr: 'Lis chaque flèche comme **« vers »** (to) : chemical **to** thermal. Une télévision a **deux** flèches depuis **une** case.',
    notes: [
      {
        tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen',
        text: '**Energy-change diagram:** a box for each kind of energy, and an arrow for each change.',
        textFr: '**Schéma de transformation (energy-change diagram) :** une case pour chaque forme d’énergie, et une flèche pour chaque changement.',
      },
    ],
    check: {
      id: 'chk_tv_chain',
      q: 'Mr Bowen draws a television like this: electrical → sound → light. What is wrong?',
      qFr: 'M. Bowen dessine une télévision comme ceci : electrical → sound → light. Qu’est-ce qui ne va pas ?',
      options: [
        { val: 'A', text: 'Nothing: it shows all three energies', textFr: 'Rien : il montre les trois énergies' },
        { val: 'B', text: 'Sound does not change into light: both arrows start at electrical', textFr: 'Le son ne devient pas de la lumière : les deux flèches partent de electrical' },
        { val: 'C', text: 'The arrows go the wrong way: sound and light make the electricity', textFr: 'Les flèches sont à l’envers : le son et la lumière font l’électricité' },
        { val: 'D', text: 'A television makes only one kind of energy', textFr: 'Une télévision ne donne qu’une forme d’énergie' },
      ],
      correct: 'B',
      expEn: '**Both arrows start at electrical.** The TV changes electrical energy into sound AND into light; the sound does not turn into light. So it is one box with two arrows, as in the book. A line of boxes (A) means each energy becomes the next. The electricity comes in from the wall (C), and a TV gives out two kinds (D).',
      expFr: '**Les deux flèches partent de electrical.** La télé change l’énergie électrique en son ET en lumière ; le son ne devient pas de la lumière. C’est donc une case avec deux flèches, comme dans le livre. Une ligne de cases (A) veut dire que chaque énergie devient la suivante. L’électricité vient de la prise (C), et une télé en donne deux formes (D).',
    },
  },

  // 8 ─ Rub your hands + BUILD: kinetic → thermal ────────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Try it',
    eyebrowFr: 'Essaie',
    title: 'Rub Your Hands',
    titleFr: 'Frotte-toi les mains',
    text: 'Rub your hands together, **fast**, for 10 seconds. What do you **feel**?',
    textFr: 'Frotte-toi les mains, **vite**, pendant 10 secondes. Que **sens**-tu ?',
    activity: {
      id: 'act_rub_hands',
      type: 'energychange',
      kind: 'one',
      scene: 'hands',
      prompt: 'Rubbing your hands: where does the energy start, and what does it change into?',
      promptFr: 'Se frotter les mains : où l’énergie commence-t-elle, et en quoi se transforme-t-elle ?',
      explain: 'Your hands get **warm**. The movement (kinetic) changes into heat (thermal): **kinetic → thermal**.',
      explainFr: 'Tes mains **chauffent**. Le mouvement (cinétique) devient de la chaleur (thermique) : **kinetic → thermal**.',
    },
  },

  // 9 ─ Charging a phone: PREDICT (the vote, hands out of the cards) ─────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Zap',
    eyebrow: 'Predict',
    eyebrowFr: 'Prédis',
    title: 'Charging a Phone',
    titleFr: 'Charger un téléphone',
    text: 'Mr Bowen **charges** his phone. Which energy change?',
    textFr: 'M. Bowen **charge** son téléphone. Quel changement d’énergie ?',
    columns: [
      { heading: 'A', headingFr: 'A', accent: BLUE, icon: 'Zap', inlineSvg: DIAGRAMS.ANS_CHARGE_IN },
      { heading: 'B', headingFr: 'B', accent: ORANGE, icon: 'Zap', inlineSvg: DIAGRAMS.ANS_CHARGE_OUT },
    ],
    activity: {
      id: 'act_charging',
      type: 'predict',
      prompt: 'Charging a phone: A or B?',
      promptFr: 'Charger un téléphone : A ou B ?',
      options: [
        { val: 'A', name: 'A · electrical → chemical', nameFr: 'A · électrique → chimique' },
        { val: 'B', name: 'B · chemical → electrical', nameFr: 'B · chimique → électrique' },
      ],
      correct: 'A',
      explain: '**A: electrical → chemical.** Many people choose B, because a battery seems "electrical". But a phone battery is a **chemical** store: charging puts energy INTO it. B is what happens when you USE the phone.',
      explainFr: '**A : électrique → chimique.** Beaucoup de gens choisissent B, parce qu’une batterie semble « électrique ». Mais une batterie de téléphone est une réserve **chimique** : la charge y FAIT ENTRER l’énergie. B, c’est ce qui se passe quand on UTILISE le téléphone.',
    },
  },

  // 10 ─ Into the battery (the answer, both ways) ────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'The answer: A',
    eyebrowFr: 'La réponse : A',
    title: 'Into the Battery',
    titleFr: 'Dans la batterie',
    ratio: 50,
    inlineSvg: DIAGRAMS.CHARGING,
    content: 'A phone battery is a **chemical** store, not an electrical one.\n\nCharging **fills** it. Using the phone **runs it down**: chemical → electrical → light and sound.',
    contentFr: 'Une batterie de téléphone est une réserve **chimique**, pas électrique.\n\nLa charge la **remplit**. Utiliser le téléphone la **vide** : chimique → électrique → lumière et son.',
  },

  // 11 ─ SORT: match the change (the book's Questions 2–3) ──────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Shuffle',
    eyebrow: 'Questions 2 and 3',
    eyebrowFr: 'Questions 2 et 3',
    title: 'Match the Change',
    titleFr: 'Associe le changement',
    ratio: 45,
    inlineSvg: DIAGRAMS.THREE_THINGS,
    content: 'For each one, ask: where does the energy **start**? What does it change **into**?',
    contentFr: 'Pour chacun, demande-toi : où l’énergie **commence**-t-elle ? En quoi se **transforme**-t-elle ?',
    activity: {
      id: 'act_match_change',
      type: 'sort',
      prompt: 'Put each one under its energy change.',
      promptFr: 'Place chacun sous son changement d’énergie.',
      bins: [
        { id: 'sound', name: 'electrical → sound', nameFr: 'électrique → sonore' },
        { id: 'move', name: 'chemical → kinetic', nameFr: 'chimique → cinétique' },
        { id: 'fall', name: 'gravitational potential → kinetic', nameFr: 'potentielle de pesanteur → cinétique' },
      ],
      cards: [
        { id: 'radio', name: 'A radio plays', nameFr: 'Une radio joue', bin: 'sound' },
        { id: 'bus', name: 'A bus drives along', nameFr: 'Un bus roule', bin: 'move' },
        { id: 'hill', name: 'A ball rolls down a hill', nameFr: 'Une balle descend une pente', bin: 'fall' },
        { id: 'bell', name: 'A doorbell rings', nameFr: 'Une sonnette sonne', bin: 'sound' },
        { id: 'moto', name: 'A motorbike moves', nameFr: 'Une moto avance', bin: 'move' },
        { id: 'book', name: 'A book falls off a shelf', nameFr: 'Un livre tombe d’une étagère', bin: 'fall' },
      ],
      explain: 'The radio and the doorbell use **electricity** to make **sound**. The bus and the motorbike burn fuel (a **chemical** store) to **move**. The ball and the book start **high up** and fall: **gravitational potential → kinetic**.',
      explainFr: 'La radio et la sonnette utilisent l’**électricité** pour faire du **son**. Le bus et la moto brûlent du carburant (une réserve **chimique**) pour **avancer**. La balle et le livre partent **d’en haut** et descendent : **potentielle de pesanteur → cinétique**.',
    },
  },

  // 12 ─ A gas power station + BUILD the chain (the Draw This) ──────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Zap',
    eyebrow: 'A chain of changes · build it',
    eyebrowFr: 'Une chaîne de changements · construis-la',
    title: 'A Gas Power Station',
    titleFr: 'Une centrale à gaz',
    inlineSvg: DIAGRAMS.POWER_PICS,
    caption: 'Four boxes, three arrows. The wheel is the **generator** inside the power station, spun by the hot gas — not a windmill.',
    captionFr: 'Quatre cases, trois flèches. La roue est le **générateur** (generator) dans la centrale, que le gaz chaud fait tourner — pas une éolienne.',
    activity: {
      id: 'act_power_station',
      type: 'energychange',
      kind: 'chain',
      scene: 'powerStation',
      prompt: 'Build the power station’s chain, box by box.',
      promptFr: 'Construis la chaîne de la centrale, case par case.',
      explain: '**chemical → thermal → kinetic → electrical.** The gas burns, the heat spins the generators, and they make electricity. Then the wires take it to homes, where lamps give **light**, televisions **sound and light**, and fans **movement**.',
      explainFr: '**chimique → thermique → cinétique → électrique.** Le gaz brûle, la chaleur fait tourner les générateurs, et ils font de l’électricité. Puis les fils l’emmènent dans les maisons, où les lampes donnent de la **lumière**, les télés du **son et de la lumière**, et les ventilateurs du **mouvement**.',
    },
  },

  // 13 ─ Useful or dangerous? (key word) + CHECK: the candle for light ───────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Wind',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Useful or Dangerous?',
    titleFr: 'Utile ou dangereux ?',
    ratio: 45,
    inlineSvg: DIAGRAMS_B.USEFUL_DANGER,
    content: 'The same moving air can light a city, or knock down a tree. Hà Nội, after **Typhoon Yagi** (a huge storm), September 2024.',
    contentFr: 'Le même air en mouvement peut éclairer une ville, ou abattre un arbre. Hà Nội, après le **typhon Yagi** (une énorme tempête), septembre 2024.',
    notes: [
      {
        tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen',
        text: '**Useful energy change:** a change that does what we want.',
        textFr: '**Changement utile (useful energy change) :** un changement qui fait ce que l’on veut.',
      },
    ],
    check: {
      id: 'chk_candle_light',
      q: 'The power goes off at night. Mr Bowen lights a candle so he can see. What is the candle’s useful energy change?',
      qFr: 'Le courant est coupé, la nuit. M. Bowen allume une bougie pour y voir. Quel est le changement utile de la bougie ?',
      options: [
        { val: 'A', text: 'chemical → light', textFr: 'chimique → lumineuse' },
        { val: 'B', text: 'chemical → thermal', textFr: 'chimique → thermique' },
        { val: 'C', text: 'light → chemical', textFr: 'lumineuse → chimique' },
        { val: 'D', text: 'thermal → light', textFr: 'thermique → lumineuse' },
      ],
      correct: 'A',
      expEn: '**chemical → light**: he wants to SEE, so light is the useful change. The candle does warm the air too (B), but that is not what he wants here — on slide 15 we want heat, and there B is the useful one. Useful means what we want. C is backwards, and the wax is chemical, not thermal (D).',
      expFr: '**chimique → lumineuse** : il veut VOIR, donc la lumière est le changement utile. La bougie chauffe aussi l’air (B), mais ce n’est pas ce qu’il veut ici — à la diapo 15, on veut de la chaleur, et là B est le changement utile. Utile veut dire ce que l’on veut. C est à l’envers, et la cire est chimique, pas thermique (D).',
    },
  },

  // 14 ─ Mr Bowen's candle (the story) + PREDICT ─────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Coffee',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Candle',
    titleFr: 'La bougie de M. Bowen',
    widget: CandleStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
    activity: {
      id: 'act_candle_coffee',
      type: 'predict',
      prompt: 'His kettle is broken, so Mr Bowen heats his coffee with a candle, for an hour. What happens?',
      promptFr: 'Sa bouilloire est cassée, alors M. Bowen chauffe son café avec une bougie, pendant une heure. Que se passe-t-il ?',
      options: [
        { val: 'boils', name: 'The coffee boils', nameFr: 'Le café bout' },
        { val: 'warm', name: 'The coffee is a bit warm — and so is everything around it', nameFr: 'Le café est un peu chaud — et tout ce qui l’entoure aussi' },
        { val: 'cold', name: 'The coffee stays cold: a candle makes light, not heat', nameFr: 'Le café reste froid : une bougie fait de la lumière, pas de la chaleur' },
      ],
      correct: 'warm',
      explain: '**A bit warm — and so is everything else.** The candle’s heat goes into the coffee, but also into the stand, the table and the air. Press **What happens next?** to see the strip. Where did all that energy go? The next slide is the book’s experiment.',
      explainFr: '**Un peu chaud — et tout le reste aussi.** La chaleur de la bougie va dans le café, mais aussi dans le support, la table et l’air. Appuie sur **Et ensuite ?** pour voir l’histoire. Où est partie toute cette énergie ? La diapo suivante est l’expérience du livre.',
    },
  },

  // 15 ─ The candle experiment (the book's, page 115) + CHECK ────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Think like a scientist',
    eyebrowFr: 'Pense comme un scientifique',
    title: 'The Candle Experiment',
    titleFr: 'L’expérience de la bougie',
    ratio: 50,
    inlineSvg: DIAGRAMS_B.CANDLE,
    content: 'A candle heats some cooking oil. This time we want **heat**: **chemical → thermal**.\n\nThe red arrows show heat leaving the flame. Where does it go?',
    contentFr: 'Une bougie chauffe de l’huile. Cette fois, on veut de la **chaleur** : **chimique → thermique**.\n\nLes flèches rouges montrent la chaleur qui quitte la flamme. Où va-t-elle ?',
    check: {
      id: 'chk_candle_where',
      q: 'In 4 minutes the oil got only 10 °C warmer. Where did the rest of the candle’s energy go?',
      qFr: 'En 4 minutes, l’huile n’a chauffé que de 10 °C. Où est parti le reste de l’énergie de la bougie ?',
      options: [
        { val: 'A', text: 'Into the thermometer', textFr: 'Dans le thermomètre' },
        { val: 'B', text: 'Nowhere: it was used up', textFr: 'Nulle part : elle a été épuisée' },
        { val: 'C', text: 'Back into the candle wax', textFr: 'De nouveau dans la cire de la bougie' },
        { val: 'D', text: 'Into the glass, the tripod and the air', textFr: 'Dans le verre, le trépied et l’air' },
      ],
      correct: 'D',
      expEn: '**Into the glass, the tripod and the air.** Some heated the oil; the rest heated everything around it — touch the tripod afterwards (carefully) and it is warm. The thermometer gets only a tiny share (A). Energy does not vanish (B): it went somewhere. And burning wax cannot go back into the candle (C).',
      expFr: '**Dans le verre, le trépied et l’air.** Une partie a chauffé l’huile ; le reste a chauffé tout ce qui l’entoure — touche le trépied après (avec précaution) : il est chaud. Le thermomètre n’en reçoit qu’un tout petit peu (A). L’énergie ne disparaît pas (B) : elle est allée quelque part. Et la cire brûlée ne peut pas revenir dans la bougie (C).',
    },
  },

  // 16 ─ Freezing water: PREDICT (the book's Activity, hands out of the cards) ─
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Snowflake',
    eyebrow: 'Predict',
    eyebrowFr: 'Prédis',
    title: 'Freezing Water',
    titleFr: 'L’eau qui gèle',
    text: 'Water turns to **ice** in the freezer. What moves?',
    textFr: 'L’eau devient de la **glace** au congélateur. Qu’est-ce qui bouge ?',
    columns: [
      { heading: 'A', headingFr: 'A', accent: BLUE, icon: 'Snowflake', inlineSvg: DIAGRAMS_B.ANS_COLD_IN },
      { heading: 'B', headingFr: 'B', accent: ORANGE, icon: 'Flame', inlineSvg: DIAGRAMS_B.ANS_HEAT_OUT },
    ],
    activity: {
      id: 'act_freezing',
      type: 'predict',
      prompt: 'Water freezing: A or B?',
      promptFr: 'L’eau qui gèle : A ou B ?',
      options: [
        { val: 'A', name: 'A · cold goes in', nameFr: 'A · le froid entre' },
        { val: 'B', name: 'B · heat comes out', nameFr: 'B · la chaleur sort' },
      ],
      correct: 'B',
      explain: '**B: heat comes out.** Most people choose A. But cold is not a thing that moves: the water’s **thermal** energy moves out into the colder air of the freezer, and the water gets colder and colder until it freezes.',
      explainFr: '**B : la chaleur sort.** La plupart des gens choisissent A. Mais le froid n’est pas une chose qui bouge : l’énergie **thermique** de l’eau part dans l’air plus froid du congélateur, et l’eau se refroidit jusqu’à geler.',
    },
  },

  // 17 ─ Heat comes out (key word) + CHECK: an ice cube in your hand ─────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Snowflake',
    eyebrow: 'Key word · the answer: B',
    eyebrowFr: 'Mot clé · la réponse : B',
    title: 'Heat Comes Out',
    titleFr: 'La chaleur sort',
    ratio: 50,
    inlineSvg: DIAGRAMS_B.FREEZER,
    content: 'Cold does not move. **Heat** moves. Feel the back of a freezer: it is warm. The freezer **pumps** the heat out there.',
    contentFr: 'Le froid ne bouge pas. La **chaleur** bouge. Touche l’arrière d’un congélateur : c’est chaud. Il y **pompe** la chaleur.',
    notes: [
      {
        tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen',
        text: '**Thermal** energy moves from **hotter** things to **colder** things.',
        textFr: 'L’énergie **thermique** passe des choses plus **chaudes** (hotter) aux choses plus **froides** (colder).',
      },
    ],
    check: {
      id: 'chk_ice_hand',
      q: 'Mr Bowen holds an ice cube. His hand feels cold. What is happening?',
      qFr: 'M. Bowen tient un glaçon. Sa main a froid. Que se passe-t-il ?',
      options: [
        { val: 'A', text: 'Cold moves from the ice into his hand', textFr: 'Le froid passe du glaçon dans sa main' },
        { val: 'B', text: 'Thermal energy moves from his hand into the ice', textFr: 'L’énergie thermique passe de sa main dans le glaçon' },
        { val: 'C', text: 'Thermal energy moves from the ice into his hand', textFr: 'L’énergie thermique passe du glaçon dans sa main' },
        { val: 'D', text: 'Nothing moves: ice is just cold', textFr: 'Rien ne bouge : la glace est froide, c’est tout' },
      ],
      correct: 'B',
      expEn: '**From his hand into the ice**: his hand (about 35 °C) is hotter than the ice (0 °C), and thermal energy moves from hotter to colder. His hand feels cold because it is LOSING heat, and the ice melts because it is gaining it. Cold does not move (A); heat never goes from colder to hotter by itself (C); and something does move (D).',
      expFr: '**De sa main dans le glaçon** : sa main (environ 35 °C) est plus chaude que la glace (0 °C), et l’énergie thermique va du plus chaud au plus froid. Sa main a froid parce qu’elle PERD de la chaleur, et le glaçon fond parce qu’il en gagne. Le froid ne bouge pas (A) ; la chaleur ne va jamais toute seule du plus froid au plus chaud (C) ; et quelque chose bouge bien (D).',
    },
  },

  // 18 ─ Exit: Tết fireworks + BUILD four arrows from one box ─────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Sparkles',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Tết Fireworks',
    titleFr: 'Les feux d’artifice du Têt',
    ratio: 40,
    inlineSvg: DIAGRAMS_B.FIREWORK,
    content: 'A firework bursts: a flash, a **bang**, heat, and sparks flying out. Five boxes, four arrows — like the television’s two arrows from one box.',
    contentFr: 'Un feu d’artifice éclate : un éclair, un **bang**, de la chaleur, et des étincelles qui volent. Cinq cases, quatre flèches — comme les deux flèches de la télévision depuis une case.',
    activity: {
      id: 'act_firework',
      type: 'energychange',
      kind: 'branch',
      scene: 'firework',
      prompt: 'Build the firework’s energy-change diagram.',
      promptFr: 'Construis le schéma de transformation du feu d’artifice.',
      explain: '**chemical → light, sound, thermal and kinetic.** Four arrows from one box: the chemicals in the firework change into all four at once.',
      explainFr: '**chimique → lumineuse, sonore, thermique et cinétique.** Quatre flèches depuis une case : les produits chimiques du feu d’artifice se transforment en ces quatre formes à la fois.',
    },
  },

  // 19 ─ Can you do these? (the classroom checklist) ─────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: GREEN,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ceci ?',
    content: 'Next: the Vocab, then **From… To…**.',
    contentFr: 'Ensuite : le vocabulaire, puis **De… À…**.',
    items: [
      { text: 'Say how energy **changes** in an **event** or a **process**.', textFr: 'Dire comment l’énergie **change** dans un **événement** ou un **processus**.' },
      { text: 'Draw an **energy-change diagram** with boxes and arrows.', textFr: 'Dessiner un **schéma de transformation** avec des cases et des flèches.' },
      { text: 'Give a **useful** energy change, and a dangerous one.', textFr: 'Donner un changement **utile**, et un dangereux.' },
      { text: 'Say where **heat** goes: from **hotter** to **colder**.', textFr: 'Dire où va la **chaleur** : du plus **chaud** au plus **froid**.' },
    ],
  },
];
