// src/data/EXT_MATH/EM_06/diagrams.js
// Teaching diagrams for EM_06 — Sets, Surds and Rationalising.
//
// House rules (docs/svg-diagrams.md, and the classroom decks this unit copies
// the look of):
//  · every diagram opens with a white plate, so it reads on a light OR dark slide;
//  · every <text> is written out literally — helpers draw shapes only, because
//    `npm run audit:svg` cannot see text produced by a `${helper()}` call;
//  · every clipPath id is prefixed `em06-<diagram>-`, because inline SVGs share
//    one document and a repeated id silently borrows another diagram's clip;
//  · a Venn diagram is drawn the way the IGCSE paper draws it: a rectangle for
//    ℰ, italic serif letters, and the region being named shaded pale orange.
//
//   SET_BRACES        A = {2, 4, 6, 8}: braces, elements, ∈, ∉ and n(A)
//   VENN_ANATOMY      ℰ, two sets, and the names of the four regions
//   SHADE_INTERSECT   A ∩ B — AND
//   SHADE_UNION       A ∪ B — OR
//   SHADE_COMPLEMENT  A′ — NOT
//   NEITHER_RIGHT     (A ∪ B)′ — neither
//   NEITHER_WRONG     A′ ∪ B′ — not both
//   VENN_FOOD         the worked example: phở (P) and bánh mì (B), with counts
//   VENN_FILL         the fill-in order: middle, then each "only", then outside
//   ROOTS_LINE        √1 … √16 on a number line: which roots are whole numbers
//   AREA_SQUARE       a square of area 12 is four squares of area 3: √12 = 2√3
//   SQUARE_NUMBERS    the square numbers to look for, up to 144
//   FULLY             √72 = 2√18 is not finished; 6√2 is
//   MULTIPLY_RULE     √a × √b = √(ab), and √a × √a = a
//   SAME_VALUE        1/√2 and √2/2 are the same number
//   GRID_CONJUGATE    (6 − √5)(6 + √5) in a grid: the surds cancel

const INK = '#1e293b';
const MUTED = '#64748b';
const KEY = '#c2410c';
const TEAL = '#0f766e';
const VIOLET = '#7c3aed';
const GREEN = '#15803d';
const RED = '#dc2626';
const SHADE = '#fed7aa';
const PALE = '#f8fafc';

const SANS = "Inter, 'Segoe UI', system-ui, sans-serif";
const MATH = "'Cambria Math', 'Times New Roman', Georgia, serif";

const plate = (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#ffffff"/>
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="15" fill="none" stroke="#e2e8f0" stroke-width="2"/>`;

// A 600 × 400 Venn frame: ℰ rectangle and two circles, outlines only.
const RECT = 'x="40" y="60" width="520" height="310"';
const CA = 'cx="238" cy="215" r="118"';
const CB = 'cx="362" cy="215" r="118"';
const outlines = () => `<rect ${RECT} fill="none" stroke="${INK}" stroke-width="3"/>
    <circle ${CA} fill="none" stroke="${INK}" stroke-width="3"/>
    <circle ${CB} fill="none" stroke="${INK}" stroke-width="3"/>`;

export const DIAGRAMS = {
  SET_BRACES: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <text x="300" y="150" font-family="${MATH}" font-size="62" fill="${INK}" text-anchor="middle">A = { 2, 4, 6, 8 }</text>
    <path d="M 196 170 q 0 22 20 30" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linecap="round"/>
    <text x="150" y="232" font-family="${SANS}" font-size="22" font-weight="bold" fill="${TEAL}" text-anchor="middle">curly brackets</text>
    <path d="M 352 168 q 10 26 -6 44" fill="none" stroke="${KEY}" stroke-width="3" stroke-linecap="round"/>
    <text x="352" y="240" font-family="${SANS}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">each number is an element</text>
    <rect x="46" y="280" width="160" height="80" rx="14" fill="${PALE}" stroke="#cbd5e1" stroke-width="2"/>
    <text x="126" y="332" font-family="${MATH}" font-size="32" fill="${INK}" text-anchor="middle">6 ∈ A</text>
    <rect x="220" y="280" width="160" height="80" rx="14" fill="${PALE}" stroke="#cbd5e1" stroke-width="2"/>
    <text x="300" y="332" font-family="${MATH}" font-size="32" fill="${INK}" text-anchor="middle">5 ∉ A</text>
    <rect x="394" y="280" width="160" height="80" rx="14" fill="${PALE}" stroke="#cbd5e1" stroke-width="2"/>
    <text x="474" y="332" font-family="${MATH}" font-size="32" fill="${INK}" text-anchor="middle">n(A) = 4</text>
    <text x="126" y="386" font-family="${SANS}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">6 is in A</text>
    <text x="300" y="386" font-family="${SANS}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">5 is not in A</text>
    <text x="474" y="386" font-family="${SANS}" font-size="16" font-weight="bold" fill="${MUTED}" text-anchor="middle">A has 4 elements</text>
    <text x="300" y="56" font-family="${SANS}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">A set is a list of things inside { }</text>
  </svg>`,

  VENN_ANATOMY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">A</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">B</text>
    <text x="176" y="222" font-family="${SANS}" font-size="20" font-weight="bold" fill="${TEAL}" text-anchor="middle">A only</text>
    <text x="300" y="214" font-family="${SANS}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">A and B</text>
    <text x="300" y="238" font-family="${SANS}" font-size="19" font-weight="bold" fill="${KEY}" text-anchor="middle">(both)</text>
    <text x="424" y="222" font-family="${SANS}" font-size="20" font-weight="bold" fill="${VIOLET}" text-anchor="middle">B only</text>
    <text x="478" y="356" font-family="${SANS}" font-size="20" font-weight="bold" fill="${MUTED}" text-anchor="middle">neither</text>
    <text x="300" y="40" font-family="${SANS}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">The rectangle is ℰ — everything in the question</text>
  </svg>`,

  SHADE_INTERSECT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <defs><clipPath id="em06-int-a"><circle ${CA}/></clipPath></defs>
    <circle ${CB} fill="${SHADE}" clip-path="url(#em06-int-a)"/>
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">A</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">B</text>
    <text x="300" y="44" font-family="${MATH}" font-size="38" fill="${KEY}" text-anchor="middle">A ∩ B</text>
    <text x="300" y="228" font-family="${SANS}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">AND</text>
  </svg>`,

  SHADE_UNION: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <circle ${CA} fill="${SHADE}"/>
    <circle ${CB} fill="${SHADE}"/>
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">A</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">B</text>
    <text x="300" y="44" font-family="${MATH}" font-size="38" fill="${KEY}" text-anchor="middle">A ∪ B</text>
    <text x="300" y="228" font-family="${SANS}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">OR</text>
  </svg>`,

  SHADE_COMPLEMENT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <rect ${RECT} fill="${SHADE}"/>
    <circle ${CA} fill="#ffffff"/>
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">A</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">B</text>
    <text x="300" y="44" font-family="${MATH}" font-size="38" fill="${KEY}" text-anchor="middle">A′</text>
    <text x="210" y="228" font-family="${SANS}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">not this</text>
    <text x="470" y="352" font-family="${SANS}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">NOT A</text>
  </svg>`,

  NEITHER_RIGHT: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <rect ${RECT} fill="${SHADE}"/>
    <circle ${CA} fill="#ffffff"/>
    <circle ${CB} fill="#ffffff"/>
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">A</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">B</text>
    <text x="300" y="44" font-family="${MATH}" font-size="38" fill="${KEY}" text-anchor="middle">(A ∪ B)′</text>
    <text x="300" y="352" font-family="${SANS}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">neither A nor B</text>
  </svg>`,

  NEITHER_WRONG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <defs><clipPath id="em06-nw-a"><circle ${CA}/></clipPath></defs>
    <rect ${RECT} fill="${SHADE}"/>
    <circle ${CB} fill="#ffffff" clip-path="url(#em06-nw-a)"/>
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">A</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">B</text>
    <text x="300" y="44" font-family="${MATH}" font-size="38" fill="${KEY}" text-anchor="middle">A′ ∪ B′</text>
    <text x="300" y="352" font-family="${SANS}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">everything except the middle</text>
  </svg>`,

  VENN_FOOD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">P</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">B</text>
    <text x="178" y="230" font-family="${SANS}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">11</text>
    <text x="300" y="230" font-family="${SANS}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">7</text>
    <text x="422" y="230" font-family="${SANS}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">9</text>
    <text x="500" y="350" font-family="${SANS}" font-size="40" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="300" y="40" font-family="${SANS}" font-size="21" font-weight="bold" fill="${MUTED}" text-anchor="middle">P = likes phở    B = likes bánh mì</text>
  </svg>`,

  VENN_FILL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    ${outlines()}
    <text x="72" y="104" font-family="${MATH}" font-size="40" font-style="italic" fill="${INK}" text-anchor="middle">ℰ</text>
    <text x="138" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">C</text>
    <text x="462" y="118" font-family="${MATH}" font-size="36" font-style="italic" fill="${INK}" text-anchor="middle">T</text>
    <circle cx="300" cy="215" r="30" fill="${KEY}"/>
    <text x="300" y="227" font-family="${SANS}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="178" cy="215" r="30" fill="${TEAL}"/>
    <text x="178" y="227" font-family="${SANS}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <circle cx="422" cy="215" r="30" fill="${VIOLET}"/>
    <text x="422" y="227" font-family="${SANS}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <circle cx="500" cy="336" r="26" fill="${MUTED}"/>
    <text x="500" y="347" font-family="${SANS}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">4</text>
    <text x="300" y="40" font-family="${SANS}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Fill in this order: middle first</text>
  </svg>`,

  ROOTS_LINE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <line x1="50" y1="200" x2="560" y2="200" stroke="${INK}" stroke-width="3"/>
    <line x1="80" y1="186" x2="80" y2="214" stroke="${INK}" stroke-width="3"/>
    <line x1="220" y1="186" x2="220" y2="214" stroke="${INK}" stroke-width="3"/>
    <line x1="360" y1="186" x2="360" y2="214" stroke="${INK}" stroke-width="3"/>
    <line x1="500" y1="186" x2="500" y2="214" stroke="${INK}" stroke-width="3"/>
    <text x="80" y="250" font-family="${SANS}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">1</text>
    <text x="220" y="250" font-family="${SANS}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">2</text>
    <text x="360" y="250" font-family="${SANS}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">3</text>
    <text x="500" y="250" font-family="${SANS}" font-size="30" font-weight="bold" fill="${INK}" text-anchor="middle">4</text>
    <text x="80" y="160" font-family="${MATH}" font-size="26" fill="${GREEN}" text-anchor="middle">√1</text>
    <text x="220" y="160" font-family="${MATH}" font-size="26" fill="${GREEN}" text-anchor="middle">√4</text>
    <text x="360" y="160" font-family="${MATH}" font-size="26" fill="${GREEN}" text-anchor="middle">√9</text>
    <text x="500" y="160" font-family="${MATH}" font-size="26" fill="${GREEN}" text-anchor="middle">√16</text>
    <circle cx="138" cy="200" r="7" fill="${KEY}"/>
    <circle cx="182" cy="200" r="7" fill="${KEY}"/>
    <circle cx="253" cy="200" r="7" fill="${KEY}"/>
    <circle cx="425" cy="200" r="7" fill="${KEY}"/>
    <text x="138" y="126" font-family="${MATH}" font-size="24" fill="${KEY}" text-anchor="middle">√2</text>
    <text x="182" y="296" font-family="${MATH}" font-size="24" fill="${KEY}" text-anchor="middle">√3</text>
    <text x="253" y="126" font-family="${MATH}" font-size="24" fill="${KEY}" text-anchor="middle">√5</text>
    <text x="425" y="296" font-family="${MATH}" font-size="24" fill="${KEY}" text-anchor="middle">√12</text>
    <rect x="60" y="330" width="220" height="48" rx="12" fill="#f0fdf4" stroke="${GREEN}" stroke-width="2"/>
    <text x="170" y="362" font-family="${SANS}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">whole: not surds</text>
    <rect x="310" y="330" width="230" height="48" rx="12" fill="#fff7ed" stroke="${KEY}" stroke-width="2"/>
    <text x="425" y="362" font-family="${SANS}" font-size="20" font-weight="bold" fill="${KEY}" text-anchor="middle">in between: surds</text>
    <text x="300" y="50" font-family="${SANS}" font-size="22" font-weight="bold" fill="${MUTED}" text-anchor="middle">Only square numbers have whole roots</text>
  </svg>`,

  AREA_SQUARE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <rect x="70" y="80" width="240" height="240" fill="#ede9fe" stroke="${VIOLET}" stroke-width="4"/>
    <line x1="190" y1="80" x2="190" y2="320" stroke="${VIOLET}" stroke-width="3" stroke-dasharray="10 7"/>
    <line x1="70" y1="200" x2="310" y2="200" stroke="${VIOLET}" stroke-width="3" stroke-dasharray="10 7"/>
    <text x="130" y="150" font-family="${SANS}" font-size="28" font-weight="bold" fill="${VIOLET}" text-anchor="middle">3</text>
    <text x="250" y="150" font-family="${SANS}" font-size="28" font-weight="bold" fill="${VIOLET}" text-anchor="middle">3</text>
    <text x="130" y="270" font-family="${SANS}" font-size="28" font-weight="bold" fill="${VIOLET}" text-anchor="middle">3</text>
    <text x="250" y="270" font-family="${SANS}" font-size="28" font-weight="bold" fill="${VIOLET}" text-anchor="middle">3</text>
    <text x="130" y="350" font-family="${MATH}" font-size="26" fill="${INK}" text-anchor="middle">√3</text>
    <text x="250" y="350" font-family="${MATH}" font-size="26" fill="${INK}" text-anchor="middle">√3</text>
    <text x="190" y="58" font-family="${SANS}" font-size="22" font-weight="bold" fill="${INK}" text-anchor="middle">area 12</text>
    <rect x="336" y="96" width="236" height="64" rx="14" fill="${PALE}" stroke="#cbd5e1" stroke-width="2"/>
    <text x="454" y="138" font-family="${MATH}" font-size="30" fill="${INK}" text-anchor="middle">side = √12</text>
    <rect x="336" y="176" width="236" height="64" rx="14" fill="${PALE}" stroke="#cbd5e1" stroke-width="2"/>
    <text x="454" y="218" font-family="${MATH}" font-size="30" fill="${INK}" text-anchor="middle">side = √3 + √3</text>
    <rect x="336" y="256" width="236" height="64" rx="14" fill="#fff7ed" stroke="${KEY}" stroke-width="3"/>
    <text x="454" y="298" font-family="${MATH}" font-size="32" font-weight="bold" fill="${KEY}" text-anchor="middle">√12 = 2√3</text>
  </svg>`,

  SQUARE_NUMBERS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <text x="300" y="56" font-family="${SANS}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">Look for these inside the root</text>
    <rect x="40" y="90" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="100" y="140" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">4</text>
    <rect x="176" y="90" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="236" y="140" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">9</text>
    <rect x="312" y="90" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="372" y="140" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">16</text>
    <rect x="448" y="90" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="508" y="140" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">25</text>
    <rect x="40" y="186" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="100" y="236" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">36</text>
    <rect x="176" y="186" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="236" y="236" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">49</text>
    <rect x="312" y="186" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="372" y="236" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">64</text>
    <rect x="448" y="186" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="508" y="236" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">81</text>
    <rect x="108" y="282" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="168" y="332" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">100</text>
    <rect x="244" y="282" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="304" y="332" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">121</text>
    <rect x="380" y="282" width="120" height="76" rx="14" fill="#ede9fe" stroke="${VIOLET}" stroke-width="2"/>
    <text x="440" y="332" font-family="${SANS}" font-size="36" font-weight="bold" fill="${VIOLET}" text-anchor="middle">144</text>
  </svg>`,

  FULLY: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <rect x="40" y="40" width="520" height="140" rx="16" fill="#fef2f2" stroke="${RED}" stroke-width="3"/>
    <text x="300" y="104" font-family="${MATH}" font-size="44" fill="${INK}" text-anchor="middle">√72 = √4 × √18 = 2√18</text>
    <text x="300" y="152" font-family="${SANS}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">not finished: 18 = 9 × 2, and 9 is square</text>
    <rect x="40" y="220" width="520" height="140" rx="16" fill="#f0fdf4" stroke="${GREEN}" stroke-width="3"/>
    <text x="300" y="284" font-family="${MATH}" font-size="44" fill="${INK}" text-anchor="middle">√72 = √36 × √2 = 6√2</text>
    <text x="300" y="332" font-family="${SANS}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">finished: 2 has no square factor</text>
  </svg>`,

  MULTIPLY_RULE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <rect x="40" y="40" width="520" height="96" rx="16" fill="${PALE}" stroke="#cbd5e1" stroke-width="2"/>
    <text x="300" y="104" font-family="${MATH}" font-size="44" fill="${INK}" text-anchor="middle">√a × √b = √ab</text>
    <rect x="40" y="152" width="520" height="96" rx="16" fill="#ede9fe" stroke="${VIOLET}" stroke-width="3"/>
    <text x="300" y="216" font-family="${MATH}" font-size="44" fill="${VIOLET}" text-anchor="middle">√5 × √5 = 5</text>
    <rect x="40" y="264" width="520" height="96" rx="16" fill="#fff7ed" stroke="${KEY}" stroke-width="3"/>
    <text x="300" y="328" font-family="${MATH}" font-size="44" fill="${KEY}" text-anchor="middle">(3√2)² = 9 × 2 = 18</text>
  </svg>`,

  SAME_VALUE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <rect x="40" y="70" width="230" height="170" rx="16" fill="#fef2f2" stroke="${RED}" stroke-width="3"/>
    <text x="155" y="150" font-family="${MATH}" font-size="48" fill="${INK}" text-anchor="middle">1</text>
    <line x1="115" y1="168" x2="195" y2="168" stroke="${INK}" stroke-width="3"/>
    <text x="155" y="214" font-family="${MATH}" font-size="48" fill="${INK}" text-anchor="middle">√2</text>
    <text x="300" y="172" font-family="${MATH}" font-size="48" fill="${INK}" text-anchor="middle">=</text>
    <rect x="330" y="70" width="230" height="170" rx="16" fill="#f0fdf4" stroke="${GREEN}" stroke-width="3"/>
    <text x="445" y="150" font-family="${MATH}" font-size="48" fill="${INK}" text-anchor="middle">√2</text>
    <line x1="405" y1="168" x2="485" y2="168" stroke="${INK}" stroke-width="3"/>
    <text x="445" y="214" font-family="${MATH}" font-size="48" fill="${INK}" text-anchor="middle">2</text>
    <text x="155" y="276" font-family="${SANS}" font-size="20" font-weight="bold" fill="${RED}" text-anchor="middle">surd on the bottom</text>
    <text x="445" y="276" font-family="${SANS}" font-size="20" font-weight="bold" fill="${GREEN}" text-anchor="middle">rational denominator</text>
    <text x="300" y="340" font-family="${SANS}" font-size="24" font-weight="bold" fill="${MUTED}" text-anchor="middle">Both are 0.7071… — the same number</text>
  </svg>`,

  GRID_CONJUGATE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <!-- The header strip sits high: svg-audit pairs a label with the smallest
         rect whose top is within one font size of the baseline, so a lower
         baseline would be measured against a narrow column header. -->
    <rect x="40" y="6" width="520" height="40" rx="12" fill="${PALE}" stroke="#cbd5e1" stroke-width="2"/>
    <text x="300" y="36" font-family="${MATH}" font-size="34" fill="${INK}" text-anchor="middle">(6 − √5)(6 + √5)</text>
    <rect x="200" y="80" width="170" height="60" rx="10" fill="#fff7ed" stroke="${KEY}" stroke-width="2"/>
    <text x="285" y="122" font-family="${MATH}" font-size="30" fill="${KEY}" text-anchor="middle">6</text>
    <rect x="384" y="80" width="170" height="60" rx="10" fill="#fff7ed" stroke="${KEY}" stroke-width="2"/>
    <text x="469" y="122" font-family="${MATH}" font-size="30" fill="${KEY}" text-anchor="middle">+√5</text>
    <rect x="46" y="154" width="140" height="80" rx="10" fill="#fff7ed" stroke="${KEY}" stroke-width="2"/>
    <text x="116" y="204" font-family="${MATH}" font-size="30" fill="${KEY}" text-anchor="middle">6</text>
    <rect x="46" y="248" width="140" height="80" rx="10" fill="#fff7ed" stroke="${KEY}" stroke-width="2"/>
    <text x="116" y="298" font-family="${MATH}" font-size="30" fill="${KEY}" text-anchor="middle">−√5</text>
    <rect x="200" y="154" width="170" height="80" rx="10" fill="#f0fdf4" stroke="${GREEN}" stroke-width="2"/>
    <text x="285" y="206" font-family="${MATH}" font-size="34" fill="${INK}" text-anchor="middle">36</text>
    <rect x="384" y="154" width="170" height="80" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="469" y="206" font-family="${MATH}" font-size="34" fill="${MUTED}" text-anchor="middle">+6√5</text>
    <rect x="200" y="248" width="170" height="80" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <text x="285" y="300" font-family="${MATH}" font-size="34" fill="${MUTED}" text-anchor="middle">−6√5</text>
    <rect x="384" y="248" width="170" height="80" rx="10" fill="#f0fdf4" stroke="${GREEN}" stroke-width="2"/>
    <text x="469" y="300" font-family="${MATH}" font-size="34" fill="${INK}" text-anchor="middle">−5</text>
    <line x1="410" y1="210" x2="530" y2="180" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <line x1="226" y1="304" x2="346" y2="274" stroke="${RED}" stroke-width="4" stroke-linecap="round"/>
    <text x="300" y="374" font-family="${MATH}" font-size="34" font-weight="bold" fill="${GREEN}" text-anchor="middle">36 − 5 = 31</text>
  </svg>`,

  WB_TRIANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <path d="M 150 330 L 450 330 L 450 70 Z" fill="${PALE}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 420 330 L 420 300 L 450 300" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="300" y="370" font-family="${MATH}" font-size="30" fill="${INK}" text-anchor="middle">(4 − √2) cm</text>
    <text x="462" y="196" font-family="${MATH}" font-size="28" fill="${INK}" text-anchor="start">(4 + √2)</text>
    <text x="462" y="230" font-family="${MATH}" font-size="28" fill="${INK}" text-anchor="start">cm</text>
    <text x="270" y="190" font-family="${MATH}" font-size="34" font-style="italic" fill="${KEY}" text-anchor="middle">h</text>
    <text x="110" y="60" font-family="${SANS}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">Not to scale</text>
  </svg>`,

  WB_RECTANGLE: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full">
    ${plate(600, 400)}
    <rect x="70" y="100" width="350" height="190" fill="${PALE}" stroke="${INK}" stroke-width="4"/>
    <line x1="70" y1="290" x2="420" y2="100" stroke="${KEY}" stroke-width="3" stroke-dasharray="12 8"/>
    <text x="245" y="80" font-family="${MATH}" font-size="30" fill="${INK}" text-anchor="middle">(5 + √3) cm</text>
    <text x="436" y="192" font-family="${MATH}" font-size="26" fill="${INK}" text-anchor="start">(5 − √3)</text>
    <text x="436" y="224" font-family="${MATH}" font-size="26" fill="${INK}" text-anchor="start">cm</text>
    <text x="225" y="232" font-family="${SANS}" font-size="22" font-weight="bold" fill="${KEY}" text-anchor="middle">diagonal</text>
    <text x="300" y="350" font-family="${SANS}" font-size="18" font-weight="bold" fill="${MUTED}" text-anchor="middle">Not to scale</text>
  </svg>`,
};
