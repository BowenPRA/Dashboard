// src/data/Y7_SCI/U03_3/orbitLab.js
// Orbit Lab (ORBIT_LAB, p87) for 3.3 Movement in Space — the book's three
// questions, used on things the student has not met: the pull and the
// no-pull path on a new orbit; a bar graph of new orbit speeds, its pattern
// and why; what acts against a moving thing in space and on a road.
//
// An item is the question only; utils/orbitLab.js derives the picture, the
// eight arrows, the bars, every answer and every named slip, and
// utils/orbitLabCheck.js proves each one in the validator. No imports, so
// scripts can read it alone.
//
// Twelve items, six levels. Levels 1–2 walk every stage; from level 3 a pull
// or coast round is one screen (both answers, one Check), and a wrong answer
// opens the stage where it slipped. The deck's two Orbit Lab items (Mars at
// the top left; the planets' bar graph) are not repeated here.
export const orbitLab = {
  title: 'Orbit Lab',
  titleFr: 'Labo des orbites',
  intro: 'What keeps things going round, how fast they go, and what slows them down. Every picture is new: use the rules from the lesson.',
  introFr: 'Ce qui fait tourner les objets, à quelle vitesse ils vont, et ce qui les ralentit. Chaque image est nouvelle : utilise les règles de la leçon.',
  levels: {
    1: { en: 'One step at a time', fr: 'Une étape à la fois' },
    2: { en: 'What slows it down?', fr: 'Qu’est-ce qui le ralentit ?' },
    3: { en: 'Both arrows at once', fr: 'Les deux flèches d’un coup' },
    4: { en: 'A new scale', fr: 'Une nouvelle échelle' },
    5: { en: 'Read it and predict', fr: 'Lis et prédis' },
    6: { en: 'Not where you expect', fr: 'Pas là où on l’attend' },
  },
  items: [
    // 1 · the Earth at the top of its orbit, every stage walked
    { id: 'p1', level: 1, kind: 'pull', scene: 'sun', orbiter: 'earth', at: 90, dir: 'acw' },
    // 1 · the book's Activity on Jupiter's four big moons (1 big square = 2 km/s)
    { id: 'g1', level: 1, kind: 'graph', set: 'jupiter', ask: ['draw', 'pattern', 'why'] },
    // 2 · in space, nothing acts against it; on a road, two forces do
    { id: 'c1', level: 2, kind: 'coast', scene: 'probe' },
    { id: 'c2', level: 2, kind: 'coast', scene: 'bike' },
    // 3 · quick rounds: the ball going the other way round, and the Moon
    { id: 'p2', level: 3, kind: 'pull', scene: 'string', at: 315, dir: 'cw' },
    { id: 'p3', level: 3, kind: 'pull', scene: 'moon', at: 225, dir: 'acw' },
    // 4 · a new scale (1 big square = 1 km/s), then a prediction from it
    { id: 'g2', level: 4, kind: 'graph', set: 'earth', ask: ['draw', 'pattern', 'predict'] },
    { id: 'c3', level: 4, kind: 'coast', scene: 'plane' },
    // 5 · the graph drawn for you: read it, then predict Hyperion's speed
    { id: 'g3', level: 5, kind: 'graph', set: 'saturn', given: 'all', ask: ['pattern', 'predict'] },
    { id: 'c4', level: 5, kind: 'coast', scene: 'moon' },
    // 6 · the pull points at the Sun, not the middle; Neptune pulls outwards
    { id: 'p4', level: 6, kind: 'pull', scene: 'comet', at: 90, dir: 'acw' },
    { id: 'p5', level: 6, kind: 'pull', scene: 'neptune', at: 135, dir: 'acw' },
  ],
};
