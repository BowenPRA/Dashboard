// src/data/Y7_SCI/U03_7/notes.js
// 3.7 Where Does Energy Go? — the self-study deck, reduced from the classroom
// lesson y7-science/U03_7 (21 slides, Learner's Book pp. 117–119) to 18
// slides, 13 scored: 5 checks; an estimate, two sorts, three predicts and two
// Where Did It Go? rounds. Plan, with every cut and why:
// docs/y7-science/plans/U03_7.md.
//
// THREE COMMANDS HOLD IT TOGETHER: SORT IT, COUNT IT, CHASE IT.
//   Sort it    how much of the petrol moves the bike? (estimate), where each
//              25 000 đ goes, useful and wasted, Getting started's three
//              processes, the room game's traps as a sort.
//   Count it   two lamps, the same light (predict), the heat camera, lamp A at
//              200 J (the engine's first round), the same light the other way.
//   Chase it   Mr Bowen's bag of heat, the coffee's heat spreading out
//              (predict), dissipated (Question 1), the wood fire (a sort),
//              which can be dissipated (Question 2), 3.6's ball, the fan.
//
// For a student alone: the thumbs, votes, pairs, whiteboards and the standing
// game are predicts, sorts and checks; the projector volunteer is one line to
// try at home; "Draw this" became the engine's round. The copy-down panels are
// Key word cards.
//
// House notes: a slide's `check:` or `activity:` is its LAST key and no slide
// carries both; activity items use name/explain, never text.
import { DIAGRAMS } from './diagrams.js';
import { PetrolStepper, ThreeProcesses, HeatSpread } from './widgets.jsx';
import { BagStory } from './story.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textFr) => ({ tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen', text, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Wind',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · 3.7 · Forces and energy',
    eyebrowFr: 'Unité 3 · 3.7 · Forces et énergie',
    title: 'Where Does Energy Go?',
    titleFr: 'Où va l’énergie ?',
    objective: 'Sort energy into useful and wasted, count it in joules, say which of two lamps wastes more, and explain why wasted energy spreads out and never comes back.',
    objectiveFr: 'Trier l’énergie en utile et gaspillée, la compter en joules, dire laquelle de deux lampes gaspille le plus, et expliquer pourquoi l’énergie gaspillée s’étale et ne revient jamais.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: '**Sort it, count it, chase it.** You will guess, sort, count joules, and follow heat that never comes back. **13 things are scored**: the first is on the next slide.',
      textFr: '**Trie, compte, poursuis.** Tu vas deviner, trier, compter des joules, et suivre une chaleur qui ne revient jamais. **13 activités sont notées** : la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: ESTIMATE — how much of the petrol moves the bike? ───────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Coins',
    eyebrow: 'Start here · estimate',
    eyebrowFr: 'Pour commencer · estime',
    title: 'How Much Moves the Bike?',
    titleFr: 'Combien fait avancer la moto ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.PUMP_PHOTO,
    content: 'Mr Bowen buys **100 000 đồng** of petrol for his motorbike, and rides to school.\n\nHow much of that money **moves** the bike?',
    contentFr: 'M. Bowen achète **100 000 đồng** d’essence pour sa moto, et va à l’école.\n\nCombien de cet argent **fait avancer** la moto ?',
    activity: {
      id: 'act_petrol',
      type: 'estimate',
      prompt: 'Slide to your guess: how many đồng of the petrol move the bike?',
      promptFr: 'Glisse jusqu’à ta réponse : combien de đồng d’essence font avancer la moto ?',
      min: 0,
      max: 100000,
      step: 5000,
      unit: 'đ',
      answer: 25000,
      tolerance: 0.4,
      explain: '**About 25 000 đồng: a quarter, or 25%.** The other **75 000 đ** (75%) heats the engine and the air, and makes noise. Most people guess far more. The next slide shows where each 25 000 đ goes.',
      explainFr: '**Environ 25 000 đồng : un quart, ou 25%.** Les autres **75 000 đ** (75%) chauffent le moteur et l’air, et font du bruit. La plupart des gens pensent beaucoup plus. La diapo suivante montre où va chaque 25 000 đ.',
    },
  },

  // 3 ─ The petrol, a block a press (PetrolStepper) ──────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Coins',
    eyebrow: 'Decide first',
    eyebrowFr: 'Décide d’abord',
    title: 'Mr Bowen’s Petrol',
    titleFr: 'L’essence de M. Bowen',
    widget: PetrolStepper,
    caption: 'Before each press, **decide**: does this 25 000 đ move the bike? Then press **Next 25 000 đ**.',
    captionFr: 'Avant chaque clic, **décide** : ces 25 000 đ font-ils avancer la moto ? Puis appuie sur **25 000 đ suivants**.',
  },

  // 4 ─ Useful and wasted (key words): the book's motorbike, page 118 ────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Key words · page 118',
    eyebrowFr: 'Mots clés · page 118',
    title: 'Useful and Wasted',
    titleFr: 'Utile et gaspillée',
    ratio: 45,
    inlineSvg: DIAGRAMS.MOTO_PUMP,
    content: 'Wasted energy does not **disappear**. It goes where we do not want it: into the engine, the air, and noise.',
    contentFr: 'L’énergie gaspillée ne **disparaît** pas. Elle va là où on ne la veut pas : dans le moteur, dans l’air, et en bruit.',
    notes: [
      keyWord(
        '**Useful energy:** energy changed into the kind we want.\n**Wasted energy:** energy changed into kinds we do not want.',
        '**Énergie utile (useful energy) :** l’énergie transformée en la forme que l’on veut.\n**Énergie gaspillée (wasted energy) :** l’énergie transformée en formes que l’on ne veut pas.',
      ),
    ],
  },

  // 5 ─ Getting started (page 117): three processes + PREDICT ────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Users',
    eyebrow: 'Getting started · predict',
    eyebrowFr: 'Pour démarrer · prédis',
    title: 'Three Processes',
    titleFr: 'Trois processus',
    widget: ThreeProcesses,
    caption: 'Burning wood to cook, walking up stairs, cycling on a flat road. Say each **?** to yourself, then press **Show**.',
    captionFr: 'Brûler du bois pour cuisiner, monter un escalier, rouler à vélo sur du plat. Dis chaque **?** dans ta tête, puis appuie sur **Afficher**.',
    activity: {
      id: 'act_stairs',
      type: 'predict',
      prompt: 'Walking up the stairs: what useful energy do you get?',
      promptFr: 'Monter l’escalier : quelle énergie utile obtiens-tu ?',
      options: [
        { val: 'kinetic', name: 'Kinetic', nameFr: 'Cinétique (kinetic)' },
        { val: 'gpe', name: 'Gravitational potential', nameFr: 'Potentielle de pesanteur (gravitational potential)' },
        { val: 'thermal', name: 'Thermal', nameFr: 'Thermique (thermal)' },
      ],
      correct: 'gpe',
      explain: '**Gravitational potential.** You end up **higher**: that is what we want. (You move a little too, so there is some kinetic energy.) You also get hot and sweaty: thermal energy, **wasted**. Now press **Show** to fill in all three.',
      explainFr: '**Potentielle de pesanteur.** Tu finis **plus haut** : c’est ce qu’on veut. (Tu bouges un peu aussi, donc il y a un peu d’énergie cinétique.) Tu as aussi chaud et tu transpires : énergie thermique, **gaspillée**. Maintenant appuie sur **Afficher** pour tout remplir.',
    },
  },

  // 6 ─ SORT: Useful or Wasted? (the room game's rounds, traps included) ─────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Scale',
    eyebrow: 'Sort it',
    eyebrowFr: 'Trie',
    title: 'Useful or Wasted?',
    titleFr: 'Utile ou gaspillée ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.USEFUL_RULE,
    content: 'Useful means **what we want**.\n\nIs heat always wasted? Is light always useful?',
    contentFr: 'Utile veut dire **ce qu’on veut**.\n\nLa chaleur est-elle toujours gaspillée ? La lumière est-elle toujours utile ?',
    activity: {
      id: 'act_useful_wasted',
      type: 'sort',
      prompt: 'Is each energy useful or wasted?',
      promptFr: 'Chaque énergie est-elle utile ou gaspillée ?',
      bins: [
        { id: 'useful', name: 'Useful (we want it)', nameFr: 'Utile (on la veut)' },
        { id: 'wasted', name: 'Wasted (we do not)', nameFr: 'Gaspillée (on n’en veut pas)' },
      ],
      cards: [
        { id: 'kettle_heat', name: 'A kettle: its heat', nameFr: 'Une bouilloire : sa chaleur', bin: 'useful' },
        { id: 'lamp_heat', name: 'A lamp: its heat', nameFr: 'Une lampe : sa chaleur', bin: 'wasted' },
        { id: 'radio_sound', name: 'A radio: its sound', nameFr: 'Une radio : son son', bin: 'useful' },
        { id: 'kettle_noise', name: 'A kettle: its noise', nameFr: 'Une bouilloire : son bruit', bin: 'wasted' },
        { id: 'toaster_heat', name: 'A toaster: its heat', nameFr: 'Un grille-pain : sa chaleur', bin: 'useful' },
        { id: 'toaster_glow', name: 'A toaster: its red glow', nameFr: 'Un grille-pain : sa lueur rouge', bin: 'wasted' },
        { id: 'phone_warm', name: 'A phone charging: it gets warm', nameFr: 'Un téléphone qui charge : il chauffe', bin: 'wasted' },
        { id: 'fire_light', name: 'A fire for cooking: its light', nameFr: 'Un feu pour cuisiner : sa lumière', bin: 'wasted' },
      ],
      explain: '**Useful means what we want.** Heat is useful in a kettle and a toaster (hot water, hot toast), but wasted by a lamp and a charging phone. Light is wasted by a toaster and a cooking fire. Sound is useful from a radio, but a kettle’s noise is wasted.',
      explainFr: '**Utile veut dire ce qu’on veut.** La chaleur est utile dans une bouilloire et un grille-pain (eau chaude, pain grillé), mais gaspillée par une lampe et un téléphone qui charge. La lumière est gaspillée par un grille-pain et un feu de cuisine. Le son est utile pour une radio, mais le bruit d’une bouilloire est gaspillé.',
    },
  },

  // 7 ─ PREDICT: two lamps, the same light (the book, page 118) ──────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Lightbulb',
    eyebrow: 'Count it · predict',
    eyebrowFr: 'Compte · prédis',
    title: 'Two Lamps',
    titleFr: 'Deux lampes',
    ratio: 45,
    inlineSvg: DIAGRAMS.LAMP_PAIR,
    content: 'Lamps **A** and **B** give the **same light**.\n\nWhich one **wastes** more energy?',
    contentFr: 'Les lampes **A** et **B** donnent la **même lumière**.\n\nLaquelle **gaspille** le plus d’énergie ?',
    activity: {
      id: 'act_two_lamps',
      type: 'predict',
      prompt: 'The same light. Which lamp wastes more energy?',
      promptFr: 'La même lumière. Quelle lampe gaspille le plus d’énergie ?',
      options: [
        { val: 'A', name: 'Lamp A', nameFr: 'La lampe A' },
        { val: 'B', name: 'Lamp B', nameFr: 'La lampe B' },
        { val: 'same', name: 'Neither: the same light, so the same waste', nameFr: 'Aucune : la même lumière, donc le même gaspillage' },
      ],
      correct: 'A',
      explain: '**Lamp A.** The same light does **not** mean the same energy goes in. The next slide shows the two lamps through a camera that sees heat.',
      explainFr: '**La lampe A.** La même lumière ne veut **pas** dire la même énergie qui entre. La diapo suivante montre les deux lampes avec une caméra qui voit la chaleur.',
    },
  },

  // 8 ─ The heat camera (real photos) + CHECK ────────────────────────────────
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Real photos',
    eyebrowFr: 'Vraies photos',
    title: 'What a Heat Camera Sees',
    titleFr: 'Ce que voit une caméra thermique',
    inlineSvg: DIAGRAMS.HEAT_CAMERA,
    caption: 'A heat camera sees heat: **blue** is cool, **red** is hot. Try it at home: hold your hand near a laptop’s air vent. That warm air is **wasted** heat, blown out by a fan.',
    captionFr: 'Une caméra thermique voit la chaleur : le **bleu** est froid, le **rouge** est chaud. Essaie chez toi : mets ta main près de la grille d’aération d’un ordinateur portable. Cet air chaud, c’est de la chaleur **gaspillée**, soufflée par un ventilateur.',
    check: {
      id: 'chk_heat_camera',
      q: 'Both lamps give the same light. What does the heat camera tell you?',
      qFr: 'Les deux lampes donnent la même lumière. Que te dit la caméra thermique ?',
      options: [
        { val: 'A', text: 'Lamp A gives more light, because it is hotter', textFr: 'La lampe A donne plus de lumière, parce qu’elle est plus chaude' },
        { val: 'B', text: 'Lamp A changes more of its energy into thermal energy, so it wastes more', textFr: 'La lampe A transforme plus de son énergie en énergie thermique, donc elle gaspille plus' },
        { val: 'C', text: 'Lamp B wastes more: blue means it has lost its heat', textFr: 'La lampe B gaspille plus : le bleu veut dire qu’elle a perdu sa chaleur' },
      ],
      correct: 'B',
      expEn: '**Lamp A turns more of its energy into heat**, and we did not want heat, so it wastes more. It does not give more light: the light is the same (A). Blue on a heat camera means cool, not "lost heat": lamp B stays cooler because it wastes less (C).',
      expFr: '**La lampe A transforme plus de son énergie en chaleur**, et on ne voulait pas de chaleur, donc elle gaspille plus. Elle ne donne pas plus de lumière : la lumière est la même (A). Le bleu sur une caméra thermique veut dire froid, pas « chaleur perdue » : la lampe B reste plus froide parce qu’elle gaspille moins (C).',
    },
  },

  // 9 ─ Lamp A wastes more (the book's diagrams) + ENERGYSPLIT: count 200 J ───
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Calculator',
    eyebrow: 'Count it · page 118',
    eyebrowFr: 'Compte · page 118',
    title: 'Lamp A Wastes More',
    titleFr: 'La lampe A gaspille plus',
    ratio: 45,
    inlineSvg: DIAGRAMS.LAMPS,
    content: 'A is an old **filament** lamp: only **15%** of its energy becomes light. B is an **energy-saving** lamp: **50%**.',
    contentFr: 'A est une vieille lampe **à filament** : seulement **15%** de son énergie devient de la lumière. B est une lampe **basse consommation** : **50%**.',
    activity: {
      id: 'act_lamp_count',
      type: 'energysplit',
      device: 'lampA',
      total: 200,
      ask: 'both',
      sort: false,
      prompt: 'Lamp A gets 200 J of electrical energy. Count it.',
      promptFr: 'La lampe A reçoit 200 J d’énergie électrique. Compte-la.',
      explain: '**30 J of light, 170 J wasted.** Every 100 J gives 15 J of light, and 200 J is two lots of 100 J: 2 × 15 = 30 J. Wasted = 200 − 30 = **170 J**. Check: 30 + 170 = 200.',
      explainFr: '**30 J de lumière, 170 J gaspillés.** Chaque 100 J donne 15 J de lumière, et 200 J, c’est deux fois 100 J : 2 × 15 = 30 J. Gaspillé = 200 − 30 = **170 J**. Vérifie : 30 + 170 = 200.',
    },
  },

  // 10 ─ The same light, the other way round + CHECK (the whiteboard question) ─
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Count it',
    eyebrowFr: 'Compte',
    title: 'The Same Light',
    titleFr: 'La même lumière',
    text: 'Lamp B gives **15 J** of light. **Half** of its energy becomes light.',
    textFr: 'La lampe B donne **15 J** de lumière. La **moitié** de son énergie devient de la lumière.',
    sub: 'So how many joules go **in**?',
    subFr: 'Alors, combien de joules **entrent** ?',
    check: {
      id: 'chk_same_light',
      q: 'Lamp B gives 15 J of light, and half of the energy that goes in becomes light. How many joules go in?',
      qFr: 'La lampe B donne 15 J de lumière, et la moitié de l’énergie qui entre devient de la lumière. Combien de joules entrent ?',
      options: [
        { val: 'A', text: '7.5 J', textFr: '7.5 J' },
        { val: 'B', text: '15 J', textFr: '15 J' },
        { val: 'C', text: '30 J', textFr: '30 J' },
        { val: 'D', text: '100 J', textFr: '100 J' },
      ],
      correct: 'C',
      expEn: '**30 J.** 15 J is half of what goes in, so what goes in is 2 × 15 = 30 J. 7.5 J (A) is half of 15 J, but 15 J is what comes OUT: more goes in. 15 J (B) is only the light. **Lamp A** needs **100 J** for the same 15 J of light (D): that is why B is called **energy-saving**.',
      expFr: '**30 J.** 15 J, c’est la moitié de ce qui entre, donc il entre 2 × 15 = 30 J. 7.5 J (A), c’est la moitié de 15 J, mais 15 J, c’est ce qui SORT : il en entre plus. 15 J (B), c’est seulement la lumière. **La lampe A** a besoin de **100 J** pour les mêmes 15 J de lumière (D) : c’est pour ça que B s’appelle **basse consommation**.',
    },
  },

  // 11 ─ What happens next? Mr Bowen's bag of heat (BagStory) ───────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Coffee',
    eyebrow: 'Chase it · what happens next?',
    eyebrowFr: 'Poursuis · que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Bag of Heat',
    titleFr: 'Le sac de chaleur de M. Bowen',
    widget: BagStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 12 ─ Watch the heat (HeatSpread) + PREDICT ───────────────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Thermometer',
    eyebrow: 'A model · predict first',
    eyebrowFr: 'Un modèle · prédis d’abord',
    title: 'Watch the Heat',
    titleFr: 'Regarde la chaleur',
    widget: HeatSpread,
    caption: 'Each red dot is some of the coffee’s heat. Predict first, then press **Later**.',
    captionFr: 'Chaque point rouge est un peu de la chaleur du café. Prédis d’abord, puis appuie sur **Plus tard**.',
    activity: {
      id: 'act_heat_back',
      type: 'predict',
      prompt: 'At 5 p.m., where will the coffee’s heat be?',
      promptFr: 'À 17 h, où sera la chaleur du café ?',
      options: [
        { val: 'back', name: 'Back in the coffee', nameFr: 'De retour dans le café' },
        { val: 'spread', name: 'Still spread out through the room', nameFr: 'Toujours étalée dans la pièce' },
        { val: 'gone', name: 'Gone: it was used up', nameFr: 'Disparue : elle a été utilisée' },
      ],
      correct: 'spread',
      explain: '**Still spread out through the room.** Heat moves from hotter to colder, so it left the hot coffee for the cooler room. Once it has spread out, it never gathers back by itself. And it is not used up: it is still there, too thin to feel. Press **Later** to watch.',
      explainFr: '**Toujours étalée dans la pièce.** La chaleur va du plus chaud au plus froid, donc elle a quitté le café chaud pour la pièce plus fraîche. Une fois étalée, elle ne se rassemble jamais toute seule. Et elle n’est pas « utilisée » : elle est toujours là, trop étalée pour qu’on la sente. Appuie sur **Plus tard** pour regarder.',
    },
  },

  // 13 ─ What does dissipated mean? CHECK (the book's Question 1) ────────────
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Question 1 · page 119',
    eyebrowFr: 'Question 1 · page 119',
    title: 'What Does Dissipated Mean?',
    titleFr: 'Que veut dire « dissipée » ?',
    text: 'The heat spread out. Scientists say it is **dissipated**.',
    textFr: 'La chaleur s’est étalée. Les scientifiques disent qu’elle est **dissipée**.',
    sub: 'What does that mean?',
    subFr: 'Qu’est-ce que ça veut dire ?',
    check: {
      id: 'chk_dissipated',
      q: 'Dissipated energy is energy that…',
      qFr: 'L’énergie dissipée, c’est de l’énergie qui…',
      options: [
        { val: 'A', text: '…spreads out and becomes less useful', textFr: '…s’étale et devient moins utile' },
        { val: 'B', text: '…becomes more useful', textFr: '…devient plus utile' },
        { val: 'C', text: '…can be used later', textFr: '…peut servir plus tard' },
        { val: 'D', text: '…is not useful, but can be stored', textFr: '…n’est pas utile, mais peut être stockée' },
      ],
      correct: 'A',
      expEn: '**It spreads out and becomes less useful.** The coffee’s heat spread through the room, too thin to warm anything. It does not become more useful (B). It cannot be used later (C) or stored (D): keeping energy for later is what a **store** does, like the petrol. Spread-out energy cannot be gathered back to store it.',
      expFr: '**Elle s’étale et devient moins utile.** La chaleur du café s’est étalée dans la pièce, trop dispersée pour chauffer quoi que ce soit. Elle ne devient pas plus utile (B). Elle ne peut pas servir plus tard (C) ni être stockée (D) : garder l’énergie pour plus tard, c’est ce que fait une **réserve**, comme l’essence. L’énergie étalée ne peut pas être rassemblée pour être stockée.',
    },
  },

  // 14 ─ Dissipated (key word), and recover ──────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Wind',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Dissipated',
    titleFr: 'Dissipée',
    ratio: 45,
    inlineSvg: DIAGRAMS.SPREAD,
    content: '**Recover** = get back. Mr Bowen lost his phone, then **recovered** it.',
    contentFr: '**Recover** = récupérer. M. Bowen a perdu son téléphone, puis l’a **récupéré**.',
    notes: [
      keyWord(
        '**Dissipated energy:** energy that spreads out, where there is no use for it. It can **never** be **recovered**.',
        '**Énergie dissipée (dissipated) :** énergie qui s’étale, là où elle ne sert à rien. On ne peut **jamais** la **récupérer** (recovered).',
      ),
    ],
  },

  // 15 ─ SORT: cooking on a wood fire (page 119) ─────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Flame',
    eyebrow: 'Page 119 · sort it',
    eyebrowFr: 'Page 119 · trie',
    title: 'Cooking on a Wood Fire',
    titleFr: 'Cuisiner sur un feu de bois',
    ratio: 45,
    inlineSvg: DIAGRAMS.WOOD_FIRE,
    content: 'Here we **want** heat: **chemical → thermal**. Is any of the heat still wasted?',
    contentFr: 'Ici, on **veut** de la chaleur : **chemical → thermal**. Une partie de la chaleur est-elle quand même gaspillée ?',
    activity: {
      id: 'act_wood_fire',
      type: 'sort',
      prompt: 'Where does the fire’s energy go? Useful or wasted?',
      promptFr: 'Où va l’énergie du feu ? Utile ou gaspillée ?',
      bins: [
        { id: 'useful', name: 'Useful', nameFr: 'Utile' },
        { id: 'wasted', name: 'Wasted', nameFr: 'Gaspillée' },
      ],
      cards: [
        { id: 'water', name: 'Heating the water in the pot', nameFr: 'Chauffer l’eau dans la marmite', bin: 'useful' },
        { id: 'pot', name: 'Heating the metal pot', nameFr: 'Chauffer la marmite en métal', bin: 'wasted' },
        { id: 'stands', name: 'Heating the stands and the ground', nameFr: 'Chauffer les supports et le sol', bin: 'wasted' },
        { id: 'air', name: 'Heating the air around', nameFr: 'Chauffer l’air autour', bin: 'wasted' },
        { id: 'steam', name: 'Hot steam rising away', nameFr: 'La vapeur chaude qui s’en va', bin: 'wasted' },
        { id: 'glow', name: 'The fire’s light', nameFr: 'La lumière du feu', bin: 'wasted' },
      ],
      explain: '**Only the water is useful.** The fire also heats the metal pot, the stands, the ground and the air; the steam carries heat away; and the fire makes light. All of that is wasted, and it spreads out for good. Even when we want heat, some of it is wasted.',
      explainFr: '**Seule l’eau est utile.** Le feu chauffe aussi la marmite en métal, les supports, le sol et l’air ; la vapeur emporte de la chaleur ; et le feu fait de la lumière. Tout ça est gaspillé, et s’étale pour de bon. Même quand on veut de la chaleur, une partie est gaspillée.',
    },
  },

  // 16 ─ Which can be dissipated? CHECK (the book's Question 2) ──────────────
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Question 2 · page 119',
    eyebrowFr: 'Question 2 · page 119',
    title: 'Which Can Be Dissipated?',
    titleFr: 'Lesquelles peuvent se dissiper ?',
    text: '**chemical**, **thermal**, **light**, **sound**, **elastic**',
    textFr: '**chemical**, **thermal**, **light**, **sound**, **elastic**',
    sub: 'Some of these spread out. Some stay where they are.',
    subFr: 'Certaines s’étalent. D’autres restent où elles sont.',
    check: {
      id: 'chk_which_two',
      q: 'Which two can NOT be dissipated?',
      qFr: 'Lesquelles NE peuvent PAS se dissiper ?',
      options: [
        { val: 'A', text: 'thermal and light', textFr: 'thermal et light' },
        { val: 'B', text: 'sound and thermal', textFr: 'sound et thermal' },
        { val: 'C', text: 'light and sound', textFr: 'light et sound' },
        { val: 'D', text: 'chemical and elastic', textFr: 'chemical et elastic' },
      ],
      correct: 'D',
      expEn: '**Chemical and elastic** are stores: the energy stays in one place (the petrol, the stretched band) until it is used. **Thermal**, **light** and **sound** spread out from where they start, so they can be dissipated: every other answer has two of those.',
      expFr: '**Chemical et elastic** sont des réserves : l’énergie reste au même endroit (l’essence, l’élastique tendu) jusqu’à ce qu’on l’utilise. **Thermal**, **light** et **sound** s’étalent à partir de leur départ, donc elles peuvent se dissiper : chaque autre réponse en contient deux.',
    },
  },

  // 17 ─ Put it together: 3.6's ball and candle (key word) + CHECK ───────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'Where the Energy Went',
    titleFr: 'Où est partie l’énergie',
    ratio: 45,
    inlineSvg: DIAGRAMS.ALWAYS,
    content: 'Remember 3.6’s **ball** and **candle**? Now you can say where the missing energy went.',
    contentFr: 'Tu te souviens de la **balle** et de la **bougie** de 3.6 ? Maintenant, tu peux dire où est partie l’énergie manquante.',
    notes: [
      keyWord(
        'Every time energy is changed or transferred, some of it is **dissipated**.',
        'Chaque fois que l’énergie est transformée ou transférée, une partie est **dissipée**.',
      ),
    ],
    check: {
      id: 'chk_ball',
      q: 'In 3.6, a ball dropped from 2 m bounced back up to only 1.1 m. Why?',
      qFr: 'En 3.6, une balle lâchée de 2 m n’est remontée qu’à 1.1 m. Pourquoi ?',
      options: [
        { val: 'A', text: 'Gravity got weaker after the bounce', textFr: 'La gravité a faibli après le rebond' },
        { val: 'B', text: 'About 45% of its energy was dissipated as sound and heat at the bounce', textFr: 'Environ 45% de son énergie a été dissipée en son et en chaleur au rebond' },
        { val: 'C', text: 'Its energy was destroyed when it hit the floor', textFr: 'Son énergie a été détruite quand elle a touché le sol' },
      ],
      correct: 'B',
      expEn: '**About 45% was dissipated** as sound (the bang) and heat at the bounce, so only about 55% took it back up. Gravity does not change (A). And energy is not destroyed (C): it spread out into the floor and the air, where it is no use.',
      expFr: '**Environ 45% a été dissipée** en son (le bruit) et en chaleur au rebond, donc seulement environ 55% l’a fait remonter. La gravité ne change pas (A). Et l’énergie n’est pas détruite (C) : elle s’est étalée dans le sol et l’air, où elle ne sert à rien.',
    },
  },

  // 18 ─ Checklist + the exit question (Question 3c) as an ENERGYSPLIT round ──
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 1,
    eyebrow: 'Before you go on',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu le faire ?',
    content: 'Next: the Vocab, then **Where Did It Go?**',
    contentFr: 'Ensuite : le vocabulaire, puis **Où est-elle partie ?**',
    items: [
      { text: 'Sort energy into **useful** and **wasted**.', textFr: 'Trier l’énergie en **utile** et **gaspillée**.' },
      { text: 'Count it: **useful + wasted = what goes in**.', textFr: 'La compter : **utile + gaspillée = ce qui entre**.' },
      { text: 'Say what **dissipated** means, and that it cannot be **recovered**.', textFr: 'Dire ce que veut dire **dissipée**, et qu’on ne peut pas la **récupérer**.' },
      { text: 'Explain why some energy is **always** dissipated.', textFr: 'Expliquer pourquoi une partie de l’énergie est **toujours** dissipée.' },
    ],
    activity: {
      id: 'act_exit_fan',
      type: 'energysplit',
      device: 'fan',
      walk: false,
      picture: DIAGRAMS.DEV_FAN,
      prompt: 'Exit question (Question 3c): an electric fan. Build its energy-change diagram.',
      promptFr: 'Question de sortie (Question 3c) : un ventilateur électrique. Construis son schéma de transformation.',
      explain: '**Electrical → kinetic**: the moving air, which we want. **Thermal and sound**: the warm motor and the hum, which we do not. Even a fan dissipates some energy.',
      explainFr: '**Électrique → kinetic** : l’air qui bouge, ce qu’on veut. **Thermal et sound** : le moteur qui chauffe et le bourdonnement, ce qu’on ne veut pas. Même un ventilateur dissipe de l’énergie.',
    },
  },
];
