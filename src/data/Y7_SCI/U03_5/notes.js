// src/data/Y7_SCI/U03_5/notes.js
// 3.5 Energy — the self-study deck, reduced from the classroom deck
// y7-science/U03_5 (22 slides, Learner's Book pp. 105–110). 19 slides, 12
// scored: 6 checks, 3 predict, 3 sort. Plan, with every cut and why:
// docs/y7-science/plans/U03_5.md.
//
// THREE QUESTIONS HOLD IT TOGETHER: HOW MUCH? WHAT KIND? HOW LONG?
// How much: a guess, Mr Bowen's morning in joules, the kettle's 200 floors,
// energy and the joule. What kind: a still book that has energy, the five
// stores and the three transfers, the bus going uphill, a rocket launch. How
// long: Mr Bowen's coffee goes cold, the banana keeps its energy, six things
// that do or do not last a year. Mr Bowen's coffee runs through all three.
//
// For a student alone: the two hand votes are `predict`s, the whiteboard and
// exit questions are checks, "find one of each in the room" and "list every
// store and transfer" are sorts, the stand-up game and its actions are gone
// (the game is the Name That Energy task), and the copy-down panels are Key
// word cards. Nothing here draws an energy-change diagram (3.6) or says wasted
// or efficiency (3.7).
//
// House notes: a slide's `check:` or `activity:` is its LAST key and no slide
// carries both; activity items use name/explain, never text. No $ in prose.
import { DIAGRAMS } from './diagrams.js';
import { MorningJoules } from './morning.jsx';
import { BusEnergies } from './bus.jsx';
import { CoffeeStory } from './story.jsx';
import { SixPhotos, RocketFilm } from './lasting.jsx';

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';
const RED = '#c8102e';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textFr) => ({ tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen', text, textFr });
const info = (text, textFr) => ({ tone: 'info', badge: false, text, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: RED,
    icon: 'Zap',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · 3.5 · Forces and energy',
    eyebrowFr: 'Unité 3 · 3.5 · Forces et énergie',
    title: 'Energy',
    titleFr: 'L’énergie',
    objective: 'Measure energy in joules; name the five energy stores and the three transfers in things around you, with the clue for each; and say which stores last a long time.',
    objectiveFr: 'Mesurer l’énergie en joules ; nommer les cinq réserves d’énergie et les trois transferts dans les choses autour de toi, avec l’indice de chacun ; et dire quelles réserves durent longtemps.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: 'Three questions: **how much** energy? **What kind**? **How long** does it last? You will guess, sort and predict. **12 things are scored**: the first is on the next slide.',
      textFr: 'Trois questions : **combien** d’énergie ? **Quel type** ? **Combien de temps** dure-t-elle ? Tu vas deviner, trier et prédire. **12 activités sont notées** : la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: PREDICT (not marked) — one kettle, how many floors? ─────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Start here · guess',
    eyebrowFr: 'Pour commencer · devine',
    title: 'One Kettle of Water',
    titleFr: 'Une bouilloire d’eau',
    ratio: 50,
    inlineSvg: DIAGRAMS.KETTLE_STAIRS,
    content: 'Mr Bowen boils **1 litre** of water for his coffee. With the **same energy**, he could climb stairs instead.',
    contentFr: 'M. Bowen fait bouillir **1 litre** d’eau pour son café. Avec la **même énergie**, il pourrait plutôt monter des escaliers.',
    activity: {
      id: 'act_kettle_guess',
      type: 'predict',
      prompt: 'With the energy of one kettle, how many floors of stairs could Mr Bowen climb? Guess.',
      promptFr: 'Avec l’énergie d’une bouilloire, combien d’étages M. Bowen pourrait-il monter ? Devine.',
      options: [
        { val: '2', name: 'About 2 floors', nameFr: 'Environ 2 étages' },
        { val: '20', name: 'About 20 floors', nameFr: 'Environ 20 étages' },
        { val: '200', name: 'About 200 floors', nameFr: 'Environ 200 étages' },
        { val: '2000', name: 'About 2 000 floors', nameFr: 'Environ 2 000 étages' },
      ],
      explain: '**Hold on to your guess.** A guess is not marked. On the next slide you see Mr Bowen’s morning in **joules**, and two slides on you work out the real answer.',
      explainFr: '**Garde ta réponse en tête.** Une supposition n’est pas notée. Sur la diapo suivante, tu vois la matinée de M. Bowen en **joules**, et deux diapos plus loin, tu calcules la vraie réponse.',
    },
  },

  // 3 ─ Mr Bowen's morning in joules (the stepper) ─────────────────────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Gauge',
    eyebrow: 'Work it out first',
    eyebrowFr: 'Calcule d’abord',
    title: 'Mr Bowen’s Morning',
    titleFr: 'La matinée de M. Bowen',
    widget: MorningJoules,
    caption: 'Energy is measured in **joules (J)**. Use the three numbers at the top: work out each step **before** you press **Show the joules**.',
    captionFr: 'L’énergie se mesure en **joules (J)**. Utilise les trois nombres en haut : calcule chaque étape **avant** d’appuyer sur **Voir les joules**.',
  },

  // 4 ─ Back to the starter + CHECK: 400 000 ÷ 2 000 ──────────────────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Building2',
    eyebrow: 'Back to your guess',
    eyebrowFr: 'Retour à ta supposition',
    title: 'How Many Floors?',
    titleFr: 'Combien d’étages ?',
    text: '**One kettle** of water: how many **floors** of stairs?',
    textFr: '**Une bouilloire** d’eau : combien d’**étages** ?',
    sub: 'Boil 1 litre: 400 000 J. One floor of stairs: 2 000 J.',
    subFr: 'Bouillir 1 litre : 400 000 J. Un étage : 2 000 J.',
    check: {
      id: 'chk_floors',
      q: 'How many floors could Mr Bowen climb with the energy of one kettle? (400 000 J ÷ 2 000 J)',
      qFr: 'Combien d’étages M. Bowen pourrait-il monter avec l’énergie d’une bouilloire ? (400 000 J ÷ 2 000 J)',
      options: [
        { val: 'A', text: '20 floors', textFr: '20 étages' },
        { val: 'B', text: '200 floors', textFr: '200 étages' },
        { val: 'C', text: '2 000 floors', textFr: '2 000 étages' },
        { val: 'D', text: '398 000 floors', textFr: '398 000 étages' },
      ],
      correct: 'B',
      expEn: '**200 floors:** 400 000 ÷ 2 000 = 400 ÷ 2 = 200. The tallest building in Vietnam, Landmark 81, has 81. Most people guess 1 to 20: boiling water takes a lot of energy. 20 (A) and 2 000 (C) lose or add a zero; 398 000 (D) is a subtraction.',
      expFr: '**200 étages :** 400 000 ÷ 2 000 = 400 ÷ 2 = 200. Le plus haut immeuble du Vietnam, le Landmark 81, en a 81. La plupart des gens devinent 1 à 20 : faire bouillir de l’eau demande beaucoup d’énergie. 20 (A) et 2 000 (C) perdent ou ajoutent un zéro ; 398 000 (D) est une soustraction.',
    },
  },

  // 5 ─ What is energy? (key word) beside the runners ────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'What Is Energy?',
    titleFr: 'Qu’est-ce que l’énergie ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.RUNNERS,
    content: 'Climbing, running, boiling water: they all need **energy**.',
    contentFr: 'Monter, courir, faire bouillir de l’eau : tout cela demande de l’**énergie**.',
    notes: [
      keyWord(
        '**Energy:** something that must be changed or **transferred** to make anything happen.',
        '**Énergie (energy) :** ce qui doit être transformé ou **transféré** pour que quelque chose se passe.',
      ),
      info('These runners have **kinetic** energy: they are moving.', 'Ces coureurs ont de l’énergie **cinétique** (kinetic) : ils bougent.'),
    ],
  },

  // 6 ─ The joule (key word) + CHECK: J, not N ───────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'The Joule',
    titleFr: 'Le joule',
    ratio: 45,
    inlineSvg: DIAGRAMS.JOULES,
    content: '**metres** for length · **kilograms** for mass · **joules** for energy',
    contentFr: 'les **mètres** pour la longueur · les **kilogrammes** pour la masse · les **joules** pour l’énergie',
    notes: [
      keyWord('**Joule (J):** the unit for measuring energy. It is named after **James Joule** (1818–1889).', '**Joule (J) :** l’unité qui sert à mesurer l’énergie. Son nom vient de **James Joule** (1818–1889).'),
    ],
    check: {
      id: 'chk_unit',
      q: 'Mr Bowen climbs one floor of stairs. Which is the right way to write the energy he needs?',
      qFr: 'M. Bowen monte un étage. Quelle est la bonne façon d’écrire l’énergie qu’il lui faut ?',
      options: [
        { val: 'A', text: '2 000 N', textFr: '2 000 N' },
        { val: 'B', text: '2 000 kg', textFr: '2 000 kg' },
        { val: 'C', text: '2 000 m', textFr: '2 000 m' },
        { val: 'D', text: '2 000 J', textFr: '2 000 J' },
      ],
      correct: 'D',
      expEn: '**2 000 J:** energy is measured in **joules**. N (A) is the newton, the unit of **force** and weight from 3.1. kg (B) measures mass and m (C) measures length.',
      expFr: '**2 000 J :** l’énergie se mesure en **joules**. N (A) est le newton, l’unité de **force** et de poids vue en 3.1. Les kg (B) mesurent la masse et les m (C) la longueur.',
    },
  },

  // 7 ─ PREDICT: a book on a high shelf — does it have energy? ───────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Predict',
    eyebrowFr: 'Prédis',
    title: 'A Book on a Shelf',
    titleFr: 'Un livre sur une étagère',
    ratio: 45,
    inlineSvg: DIAGRAMS.BOOK_HIGH,
    content: 'Mr Bowen’s book is on a **high shelf**. It is **not moving**.',
    contentFr: 'Le livre de M. Bowen est sur une **étagère haute**. Il **ne bouge pas**.',
    activity: {
      id: 'act_book_energy',
      type: 'predict',
      prompt: 'Does the book have energy?',
      promptFr: 'Le livre a-t-il de l’énergie ?',
      options: [
        { val: 'no', name: 'No: it is not moving', nameFr: 'Non : il ne bouge pas' },
        { val: 'yes', name: 'Yes: it was lifted up there', nameFr: 'Oui : on l’a soulevé jusque-là' },
        { val: 'falls', name: 'Only when it falls', nameFr: 'Seulement quand il tombe' },
      ],
      correct: 'yes',
      explain: '**Yes.** Mr Bowen used energy to lift it, and the book **keeps** that energy while it sits there. Not moving does not mean no energy. And it does not get its energy only when it falls: it already has it — that is why it can fall and crash.',
      explainFr: '**Oui.** M. Bowen a utilisé de l’énergie pour le soulever, et le livre **garde** cette énergie tant qu’il reste là. Ne pas bouger ne veut pas dire ne pas avoir d’énergie. Et il ne reçoit pas son énergie seulement quand il tombe : il l’a déjà — c’est pour ça qu’il peut tomber et s’écraser.',
    },
  },

  // 8 ─ Energy store (key word): the answer, before and after ─────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Energy Store',
    titleFr: 'La réserve d’énergie',
    ratio: 45,
    inlineSvg: DIAGRAMS.SHELF,
    content: 'Try it: push a book off the edge of a desk. It falls and crashes, so it **had** energy all along.',
    contentFr: 'Essaie : pousse un livre au bord d’un bureau. Il tombe et s’écrase, donc il **avait** de l’énergie depuis le début.',
    notes: [
      keyWord('**Energy store:** a way that energy is kept until it is used.', '**Réserve d’énergie (energy store) :** une façon de garder l’énergie jusqu’à ce qu’on l’utilise.'),
      info('The book has a **gravitational potential** store: it was lifted up high.', 'Le livre a une réserve **potentielle de pesanteur** (gravitational potential) : on l’a soulevé en hauteur.'),
    ],
  },

  // 9 ─ Five energy stores (the book's table) + SORT: one of each where you are
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'The book’s table · page 107',
    eyebrowFr: 'Le tableau du livre · page 107',
    title: 'Five Energy Stores',
    titleFr: 'Cinq réserves d’énergie',
    inlineSvg: DIAGRAMS.STORES,
    caption: 'Say the five names out loud. Then find **one of each** around you.',
    captionFr: 'Dis les cinq noms à voix haute. Puis trouve **un exemple de chacune** autour de toi.',
    activity: {
      id: 'act_stores_room',
      type: 'sort',
      prompt: 'Which energy store does each one show?',
      promptFr: 'Quelle réserve d’énergie chacun montre-t-il ?',
      bins: [
        { id: 'kinetic', name: 'Kinetic', nameFr: 'Cinétique' },
        { id: 'chemical', name: 'Chemical', nameFr: 'Chimique' },
        { id: 'thermal', name: 'Thermal', nameFr: 'Thermique' },
        { id: 'elastic', name: 'Elastic potential', nameFr: 'Élastique' },
        { id: 'gravitational', name: 'Gravitational potential', nameFr: 'De pesanteur' },
      ],
      cards: [
        { id: 'bike', name: 'A bike, rolling', nameFr: 'Un vélo qui roule', bin: 'kinetic' },
        { id: 'sandwich', name: 'A sandwich', nameFr: 'Un sandwich', bin: 'chemical' },
        { id: 'tea', name: 'Hot tea', nameFr: 'Du thé chaud', bin: 'thermal' },
        { id: 'band', name: 'A stretched rubber band', nameFr: 'Un élastique étiré', bin: 'elastic' },
        { id: 'bag', name: 'A bag on a high shelf', nameFr: 'Un sac en hauteur', bin: 'gravitational' },
        { id: 'battery', name: 'A battery', nameFr: 'Une pile', bin: 'chemical' },
      ],
      explain: 'Each clue names its store. **Moving** (the bike): kinetic. **Food, fuel or a battery** (the sandwich, the battery): chemical. **Hot** (the tea): thermal. **Stretched or squashed** (the rubber band): elastic potential. **Lifted up high** (the bag): gravitational potential.',
      explainFr: 'Chaque indice donne sa réserve. **En mouvement** (le vélo) : cinétique. **Nourriture, combustible ou pile** (le sandwich, la pile) : chimique. **Chaud** (le thé) : thermique. **Étiré ou écrasé** (l’élastique) : potentielle élastique. **Soulevé en hauteur** (le sac) : potentielle de pesanteur.',
    },
  },

  // 10 ─ Energy transfer (key word) + CHECK: the book's Question 1, asked ─────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ArrowRight',
    eyebrow: 'Key word · Question 1',
    eyebrowFr: 'Mot clé · Question 1',
    title: 'Energy Transfer',
    titleFr: 'Le transfert d’énergie',
    ratio: 45,
    inlineSvg: DIAGRAMS.CIRCUIT_ASK,
    content: 'How does energy get from the **battery** to the **bulb**?',
    contentFr: 'Comment l’énergie va-t-elle de la **pile** à l’**ampoule** ?',
    notes: [
      keyWord('**Energy transfer:** a way that energy moves from one place to another.', '**Transfert d’énergie (energy transfer) :** une façon dont l’énergie passe d’un endroit à un autre.'),
    ],
    check: {
      id: 'chk_circuit',
      q: 'Which energy is stored in the battery, and which energy is transferred in the wires?',
      qFr: 'Quelle énergie est stockée dans la pile, et quelle énergie est transférée dans les fils ?',
      options: [
        { val: 'A', text: 'Stored: chemical. Transferred: electrical.', textFr: 'Stockée : chimique. Transférée : électrique.' },
        { val: 'B', text: 'Stored: electrical. Transferred: chemical.', textFr: 'Stockée : électrique. Transférée : chimique.' },
        { val: 'C', text: 'Stored: electrical. Transferred: light.', textFr: 'Stockée : électrique. Transférée : lumineuse.' },
        { val: 'D', text: 'Stored: chemical. Transferred: sound.', textFr: 'Stockée : chimique. Transférée : sonore.' },
      ],
      correct: 'A',
      expEn: '**A battery stores chemical energy.** A current in the wires transfers it: **electrical**. Then the bulb transfers **light**. Many people say a battery stores electricity (B, C), but electrical energy only moves: it is a transfer, never a store. The wires make no sound (D).',
      expFr: '**Une pile stocke de l’énergie chimique.** Un courant dans les fils la transfère : **électrique**. Puis l’ampoule transfère de la **lumière**. Beaucoup de gens disent qu’une pile stocke de l’électricité (B, C), mais l’énergie électrique ne fait que passer : c’est un transfert, jamais une réserve. Les fils ne font pas de bruit (D).',
    },
  },

  // 11 ─ Three transfers (the book's table) + CHECK: which is not luminous? ───
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ArrowRight',
    eyebrow: 'The book’s table · page 107',
    eyebrowFr: 'Le tableau du livre · page 107',
    title: 'Three Energy Transfers',
    titleFr: 'Trois transferts d’énergie',
    inlineSvg: DIAGRAMS.TRANSFERS,
    caption: '**Thermal** is on both lists: a hot drink **stores** heat, and **transfers** it to the air. **Luminous** things give out their own light.',
    captionFr: 'Le **thermique** est sur les deux listes : une boisson chaude **stocke** la chaleur et la **transfère** à l’air. Les objets **lumineux** produisent leur propre lumière.',
    check: {
      id: 'chk_luminous',
      q: 'Light is transferred from luminous things. Which one is NOT luminous?',
      qFr: 'La lumière vient des objets lumineux. Lequel n’est PAS lumineux ?',
      options: [
        { val: 'A', text: 'The Sun', textFr: 'Le Soleil' },
        { val: 'B', text: 'A torch that is switched on', textFr: 'Une lampe de poche allumée' },
        { val: 'C', text: 'The Moon', textFr: 'La Lune' },
        { val: 'D', text: 'A phone screen that is on', textFr: 'Un écran de téléphone allumé' },
      ],
      correct: 'C',
      expEn: '**The Moon** is not luminous: it gives out no light of its own. It shines because it **reflects** the Sun’s light. The Sun (A), a torch (B) and a phone screen (D) make their own light.',
      expFr: '**La Lune** n’est pas lumineuse : elle ne produit pas de lumière. Elle brille parce qu’elle **réfléchit** la lumière du Soleil. Le Soleil (A), une lampe de poche (B) et un écran de téléphone (D) produisent leur propre lumière.',
    },
  },

  // 12 ─ The bus going uphill (worked example) + CHECK: which store has gone? ─
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Search',
    eyebrow: 'Name it, then press · page 107',
    eyebrowFr: 'Nomme-la, puis appuie · page 107',
    title: 'The Bus Going Uphill',
    titleFr: 'Le bus qui monte',
    widget: BusEnergies,
    caption: 'Say the energy at each **?** out loud **before** you press. Teal labels are stores; purple labels are transfers.',
    captionFr: 'Dis l’énergie de chaque **?** à voix haute **avant** d’appuyer. Les légendes bleu-vert sont des réserves ; les violettes, des transferts.',
    check: {
      id: 'chk_bus_stops',
      q: 'The bus stops at the top of the hill and the engine is switched off. Which store has it lost?',
      qFr: 'Le bus s’arrête en haut de la colline et on coupe le moteur. Quelle réserve a-t-il perdue ?',
      options: [
        { val: 'A', text: 'Gravitational potential', textFr: 'Potentielle de pesanteur' },
        { val: 'B', text: 'Chemical', textFr: 'Chimique' },
        { val: 'C', text: 'Elastic potential', textFr: 'Potentielle élastique' },
        { val: 'D', text: 'Kinetic', textFr: 'Cinétique' },
      ],
      correct: 'D',
      expEn: '**Kinetic:** it has stopped moving. The others are all still there, each with its clue: it is still **high up** on the hill (A), there is still **fuel** in the tank (B), and its tyres are still **squashed** by its weight (C).',
      expFr: '**Cinétique :** il ne bouge plus. Les autres sont toutes encore là, chacune avec son indice : il est encore **en hauteur** sur la colline (A), il reste du **carburant** dans le réservoir (B), et ses pneus sont encore **écrasés** par son poids (C).',
    },
  },

  // 13 ─ A rocket launch (NASA film) + SORT: store or transfer? ───────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Rocket',
    eyebrow: 'Watch and listen',
    eyebrowFr: 'Regarde et écoute',
    title: 'How Many Can You Find?',
    titleFr: 'Combien en trouves-tu ?',
    widget: RocketFilm,
    caption: 'A real launch (NASA), with sound. Watch it once, then sort what you saw and heard.',
    captionFr: 'Un vrai lancement (NASA), avec le son. Regarde-le une fois, puis trie ce que tu as vu et entendu.',
    activity: {
      id: 'act_rocket',
      type: 'sort',
      prompt: 'Is each one a store, or a transfer?',
      promptFr: 'Réserve ou transfert ?',
      bins: [
        { id: 'store', name: 'A store (energy kept)', nameFr: 'Une réserve (gardée)' },
        { id: 'transfer', name: 'A transfer (energy moving)', nameFr: 'Un transfert (qui passe)' },
      ],
      cards: [
        { id: 'fuel', name: 'The fuel in its tanks', nameFr: 'Le carburant', bin: 'store' },
        { id: 'flames', name: 'The light of the flames', nameFr: 'La lumière des flammes', bin: 'transfer' },
        { id: 'moving', name: 'The rocket, moving faster', nameFr: 'La fusée qui accélère', bin: 'store' },
        { id: 'roar', name: 'The roar of the engines', nameFr: 'Le bruit des moteurs', bin: 'transfer' },
        { id: 'higher', name: 'The rocket, higher and higher', nameFr: 'La fusée qui monte', bin: 'store' },
      ],
      explain: 'Stores: the fuel (**chemical**), the moving rocket (**kinetic**) and the rocket high up (**gravitational potential**). Transfers: the flames’ **light** and the engines’ **sound**. The hot gas is **thermal**, which is both.',
      explainFr: 'Réserves : le carburant (**chimique**), la fusée qui bouge (**cinétique**) et la fusée en hauteur (**potentielle de pesanteur**). Transferts : la **lumière** des flammes et le **son** des moteurs. Le gaz brûlant est **thermique**, qui est les deux.',
    },
  },

  // 14 ─ Mr Bowen's coffee: what happens next? (the strip) ────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Coffee',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Coffee',
    titleFr: 'Le café de M. Bowen',
    widget: CoffeeStory,
    caption: 'Before each press, **predict**: what happens next?',
    captionFr: 'Avant chaque appui, **prédis** : que se passe-t-il ensuite ?',
  },

  // 15 ─ PREDICT: a hot coffee or a banana? ───────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Predict',
    eyebrowFr: 'Prédis',
    title: 'Coffee or Banana?',
    titleFr: 'Café ou banane ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.COFFEE_BANANA,
    content: 'A **hot coffee** or a **banana**: which has more **energy**?',
    contentFr: 'Un **café chaud** ou une **banane** : lequel a le plus d’**énergie** ?',
    activity: {
      id: 'act_coffee_banana',
      type: 'predict',
      prompt: 'Which has more energy?',
      promptFr: 'Lequel a le plus d’énergie ?',
      options: [
        { val: 'coffee', name: 'The hot coffee', nameFr: 'Le café chaud' },
        { val: 'banana', name: 'The banana', nameFr: 'La banane' },
        { val: 'same', name: 'About the same', nameFr: 'À peu près autant' },
      ],
      correct: 'banana',
      explain: '**The banana**, by far: about 400 000 J in its **chemical** store, the same as boiling a kettle. The hot coffee gives out only about 60 000 J as it cools. Hot does not mean a lot of energy.',
      explainFr: '**La banane**, de loin : environ 400 000 J dans sa réserve **chimique**, autant que pour faire bouillir une bouilloire. Le café chaud ne donne qu’environ 60 000 J en refroidissant. Chaud ne veut pas dire beaucoup d’énergie.',
    },
  },

  // 16 ─ The banana wins, and keeps it ────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'The answer',
    eyebrowFr: 'La réponse',
    title: 'The Banana Wins',
    titleFr: 'La banane gagne',
    ratio: 45,
    inlineSvg: DIAGRAMS.BANANA,
    content: 'The coffee’s **thermal** store goes into the room in an hour. The banana’s **chemical** store lasts for days.',
    contentFr: 'La réserve **thermique** du café part dans la pièce en une heure. La réserve **chimique** de la banane dure des jours.',
    reveal: {
      label: 'And the caffeine?',
      labelFr: 'Et la caféine ?',
      answer: 'Caffeine gives you almost **no** energy. It only stops you feeling tired.',
      answerFr: 'La caféine ne donne presque **pas** d’énergie. Elle t’empêche seulement de te sentir fatigué.',
    },
  },

  // 17 ─ Will it last a year? Six photos + SORT ───────────────────────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Timer',
    eyebrow: 'Storing energy · page 108',
    eyebrowFr: 'Stocker l’énergie · page 108',
    title: 'Will It Last a Year?',
    titleFr: 'Ça dure un an ?',
    widget: SixPhotos,
    caption: 'Think of each one’s **store** first. Then decide: will it still have its energy in a year?',
    captionFr: 'Pense d’abord à la **réserve** de chacun. Puis décide : aura-t-il encore son énergie dans un an ?',
    activity: {
      id: 'act_last_year',
      type: 'sort',
      prompt: 'Will it still have its energy a year from now?',
      promptFr: 'Aura-t-il encore son énergie dans un an ?',
      bins: [
        { id: 'lasts', name: 'Still there in a year', nameFr: 'Encore là dans un an' },
        { id: 'gone', name: 'Gone long before', nameFr: 'Partie bien avant' },
      ],
      cards: [
        { id: 'rice', name: 'Rice', nameFr: 'Du riz', bin: 'lasts' },
        { id: 'coffee', name: 'A hot coffee', nameFr: 'Un café chaud', bin: 'gone' },
        { id: 'coal', name: 'Coal', nameFr: 'Du charbon', bin: 'lasts' },
        { id: 'dam', name: 'Water behind a dam', nameFr: 'L’eau d’un barrage', bin: 'lasts' },
        { id: 'ball', name: 'A bouncing ball', nameFr: 'Une balle qui rebondit', bin: 'gone' },
        { id: 'batteries', name: 'Batteries', nameFr: 'Des piles', bin: 'lasts' },
      ],
      explain: 'Still there: rice, coal and batteries (**chemical** — rice keeps for years, coal for millions) and water behind a dam (**gravitational potential**, while it stays up). Gone: the hot coffee (**thermal**, in about an hour) and the bouncing ball (**kinetic**, in a few seconds).',
      explainFr: 'Encore là : le riz, le charbon et les piles (**chimique** — le riz se garde des années, le charbon des millions) et l’eau du barrage (**potentielle de pesanteur**, tant qu’elle reste en haut). Partie : le café chaud (**thermique**, en une heure environ) et la balle (**cinétique**, en quelques secondes).',
    },
  },

  // 18 ─ Which stores last (key word panel) ───────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Timer',
    eyebrow: 'Storing energy · page 108',
    eyebrowFr: 'Stocker l’énergie · page 108',
    title: 'Which Stores Last?',
    titleFr: 'Quelles réserves durent ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.LASTING,
    notes: [
      keyWord(
        '**Chemical** and **gravitational potential** stores can last a long time. **Thermal** and **kinetic** stores do not.',
        'Les réserves **chimiques** et **potentielles de pesanteur** peuvent durer longtemps. Les réserves **thermiques** et **cinétiques**, non.',
      ),
      info('Coal and oil formed **millions of years** ago, and still hold their energy.', 'Le charbon et le pétrole se sont formés il y a des **millions d’années**, et gardent encore leur énergie.'),
    ],
  },

  // 19 ─ Checklist + the exit question as a CHECK ────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu le faire ?',
    content: 'Next: the Vocab, then **Name That Energy**.',
    contentFr: 'Ensuite : le vocabulaire, puis **Quelle énergie ?**',
    items: [
      { text: 'Say what **energy** is, and measure it in **joules**.', textFr: 'Dire ce qu’est l’**énergie**, et la mesurer en **joules**.' },
      { text: 'Name the 5 energy **stores** and the 3 **transfers**.', textFr: 'Nommer les 5 **réserves** d’énergie et les 3 **transferts**.' },
      { text: 'Find the **clue** for each one in a new picture.', textFr: 'Trouver l’**indice** de chacune dans une nouvelle image.' },
      { text: 'Say which **stores** last a long time, and which do not.', textFr: 'Dire quelles **réserves** durent longtemps, et lesquelles non.' },
    ],
    check: {
      id: 'chk_exit_rock',
      q: 'Exit question: a rock is falling off a cliff. Which two energy stores does it have?',
      qFr: 'Question de sortie : un rocher tombe d’une falaise. Quelles sont ses deux réserves d’énergie ?',
      options: [
        { val: 'A', text: 'Sound and kinetic', textFr: 'Sonore et cinétique' },
        { val: 'B', text: 'Kinetic and gravitational potential', textFr: 'Cinétique et potentielle de pesanteur' },
        { val: 'C', text: 'Gravitational potential only', textFr: 'Potentielle de pesanteur seulement' },
        { val: 'D', text: 'Thermal and light', textFr: 'Thermique et lumineuse' },
      ],
      correct: 'B',
      expEn: '**Kinetic:** it is moving. **Gravitational potential:** it is still high up. Sound (A) is a transfer, not a store, and the rock only makes a noise when it lands. It is moving, so not only gravitational potential (C). It is not hot and gives out no light (D).',
      expFr: '**Cinétique :** il bouge. **Potentielle de pesanteur :** il est encore en hauteur. Le son (A) est un transfert, pas une réserve, et le rocher ne fait du bruit qu’en touchant le sol. Il bouge, donc pas seulement potentielle de pesanteur (C). Il n’est pas chaud et ne produit pas de lumière (D).',
    },
  },
];
