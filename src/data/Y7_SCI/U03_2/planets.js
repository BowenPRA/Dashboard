// src/data/Y7_SCI/U03_2/planets.js
// The planet colours and names the Formation model draws with, and its seeded
// random numbers — the part of the classroom Models deck's data.js
// (content/y7-science/U03_models/data.js) that Formation reads. The orbital
// elements, sizes and moons belong to the Solar System model, which stays in
// the classroom (it is 3.3's: real positions and speeds).

// Every "random" field (stars, dust) is drawn from a seeded stream, so the
// scene is identical every time the slide opens and React renders stay pure.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const PLANETS = [
  { key: 'mercury', en: 'Mercury', fr: 'Mercure', kind: 'rocky', color: '#a8a39d', light: '#d9d4cc', dark: '#5f5a55' },
  { key: 'venus', en: 'Venus', fr: 'Vénus', kind: 'rocky', color: '#e3c58c', light: '#fbecc7', dark: '#9c7a45' },
  { key: 'earth', en: 'Earth', fr: 'la Terre', short: 'Terre', kind: 'rocky', color: '#3b7dd8', light: '#9fd0ff', dark: '#163a6b' },
  { key: 'mars', en: 'Mars', fr: 'Mars', kind: 'rocky', color: '#c8623a', light: '#f0a07a', dark: '#6e2a14' },
  { key: 'jupiter', en: 'Jupiter', fr: 'Jupiter', kind: 'gas', color: '#d9b28a', light: '#f6e2c6', dark: '#7a5233' },
  { key: 'saturn', en: 'Saturn', fr: 'Saturne', kind: 'gas', color: '#e2cc94', light: '#f8ecc8', dark: '#8a7243' },
  { key: 'uranus', en: 'Uranus', fr: 'Uranus', kind: 'ice', color: '#9ad7df', light: '#d6f4f6', dark: '#3f8790' },
  { key: 'neptune', en: 'Neptune', fr: 'Neptune', kind: 'ice', color: '#4b6fe0', light: '#9db6ff', dark: '#1d2f7a' },
];
