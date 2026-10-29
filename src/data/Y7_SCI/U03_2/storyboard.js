// src/data/Y7_SCI/U03_2/storyboard.js
// Storyboard (SOLAR_STORY, p84) for 3.2 Formation of the Solar System — the
// book's storyboard Activity (p. 89), marked: the story in order with a reason
// for each step, the evidence, and two models judged.
//
// An item is the question only; utils/solarStory.js derives the frames, the
// scramble, the bank of reasons (the right ones and two misconceptions), every
// answer and every named slip, and utils/solarStoryCheck.js proves each one in
// the validator. The frames are this unit's drawings (DIAGRAMS.FRAME_*), added
// in data.js, so this file has no imports and scripts can read it on its own.
//
// Twelve items, six levels: two short stories, three facts that support the
// hypothesis, a four-frame story, two models, the whole story, and the hard
// evidence — 99.8% of the mass, and the two planets that seem to contradict it.
// The deck asks about Venus and Uranus once (support or contradict?); here the
// next question is asked too: what do scientists do about it?
export const storyboard = {
  title: 'Storyboard',
  titleFr: 'Storyboard',
  intro: 'Nobody was there to watch the Solar System form. Put its story in order, say why each step happens, and decide what the evidence tells us.',
  introFr: 'Personne n’était là pour voir le système solaire se former. Remets son histoire dans l’ordre, dis pourquoi chaque étape arrive, et décide ce que disent les preuves.',
  levels: {
    1: { en: 'Short stories', fr: 'Des histoires courtes' },
    2: { en: 'How do we know?', fr: 'Comment le sait-on ?' },
    3: { en: 'A longer story', fr: 'Une histoire plus longue' },
    4: { en: 'Judge the model', fr: 'Juge le modèle' },
    5: { en: 'The whole story', fr: 'Toute l’histoire' },
    6: { en: 'The hard evidence', fr: 'Les preuves difficiles' },
  },
  items: [
    { id: 's1', level: 1, kind: 'story', from: 'cloud', to: 'disc' },
    { id: 's2', level: 1, kind: 'story', from: 'sun', to: 'planets' },
    { id: 'e1', level: 2, kind: 'evidence', fact: 'hltau' },
    { id: 'e2', level: 2, kind: 'evidence', fact: 'orion' },
    { id: 'e3', level: 2, kind: 'evidence', fact: 'rocky' },
    { id: 's3', level: 3, kind: 'story', from: 'collapse', to: 'clumps' },
    { id: 'm1', level: 4, kind: 'model', model: 'dust' },
    { id: 'm2', level: 4, kind: 'model', model: 'drawing' },
    { id: 's4', level: 5, kind: 'story', from: 'cloud', to: 'today', ask: ['collapse', 'sun', 'today'] },
    { id: 'e4', level: 6, kind: 'evidence', fact: 'sunMass' },
    { id: 'e5', level: 6, kind: 'evidence', fact: 'venus' },
    { id: 'e6', level: 6, kind: 'evidence', fact: 'uranus' },
  ],
};
