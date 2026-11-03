/**
 * Name That Energy (ENERGY_SPOT, p89) — the tables. Year 7 Science 3.5 Energy.
 *
 * The book's table (page 107) is the whole engine: five stores and three
 * transfers, each with the line that tells you it is there. A thing in a
 * picture carries ONE clue; its energy, whether it is a store or a transfer,
 * and whether the store lasts are all read from the clue here, never written
 * twice. utils/energySpot.js marks with these tables; energySpotCheck.js
 * proves them. English and French only.
 *
 * 3.5's scope: this names the energy AT each place. No "from this store to
 * that one" (3.6), no wasted energy or efficiency (3.7).
 */

export const STORE_IDS = ['kinetic', 'chemical', 'thermal', 'elastic', 'gravitational'];
export const TRANSFER_IDS = ['electrical', 'sound', 'light'];
export const ENERGY_IDS = [...STORE_IDS, ...TRANSFER_IDS];

/** The eight. Thermal is on both of the book's lists: a thing's clue says which. */
export const ENERGIES = {
  kinetic: { en: 'Kinetic', fr: 'Cinétique', family: 'store', needs: 'something moving', needsFr: 'quelque chose qui bouge' },
  chemical: { en: 'Chemical', fr: 'Chimique', family: 'store', needs: 'food, a fuel or a battery', needsFr: 'de la nourriture, un combustible ou une pile' },
  thermal: { en: 'Thermal', fr: 'Thermique', family: 'both', needs: 'something hot', needsFr: 'quelque chose de chaud' },
  elastic: { en: 'Elastic potential', fr: 'Potentielle élastique', family: 'store', needs: 'something stretched or squashed', needsFr: 'quelque chose d’étiré ou d’écrasé' },
  gravitational: { en: 'Gravitational potential', fr: 'Potentielle de pesanteur', family: 'store', needs: 'something lifted up high', needsFr: 'quelque chose de soulevé en hauteur' },
  electrical: { en: 'Electrical', fr: 'Électrique', family: 'transfer', needs: 'a current in a wire', needsFr: 'un courant dans un fil' },
  sound: { en: 'Sound', fr: 'Sonore', family: 'transfer', needs: 'something vibrating', needsFr: 'quelque chose qui vibre' },
  light: { en: 'Light', fr: 'Lumineuse', family: 'transfer', needs: 'something that gives out its own light', needsFr: 'quelque chose qui produit sa propre lumière' },
};

export const FAMILIES = {
  store: { en: 'A store', fr: 'Une réserve', says: 'energy kept until it is used', saysFr: 'l’énergie gardée jusqu’à ce qu’on l’utilise' },
  transfer: { en: 'A transfer', fr: 'Un transfert', says: 'energy moving from place to place', saysFr: 'l’énergie qui passe d’un endroit à un autre' },
};
export const FAMILY_IDS = ['store', 'transfer'];

/** The book's lines, as what you see. Each clue gives one energy and one family. */
export const CLUES = {
  moving: { en: 'It is moving.', fr: 'Il est en mouvement.', energy: 'kinetic', family: 'store' },
  fuel: { en: 'It is food, a fuel or a battery.', fr: 'C’est de la nourriture, un combustible ou une pile.', energy: 'chemical', family: 'store' },
  hot: { en: 'It is hot.', fr: 'Il est chaud.', energy: 'thermal', family: 'store' },
  stretched: { en: 'It is stretched or squashed out of shape.', fr: 'Il est étiré ou écrasé.', energy: 'elastic', family: 'store' },
  high: { en: 'It is lifted up high.', fr: 'Il est soulevé en hauteur.', energy: 'gravitational', family: 'store' },
  current: { en: 'A current flows in a wire.', fr: 'Un courant passe dans un fil.', energy: 'electrical', family: 'transfer' },
  vibrating: { en: 'Something vibrates and makes a noise.', fr: 'Quelque chose vibre et fait du bruit.', energy: 'sound', family: 'transfer' },
  luminous: { en: 'It gives out its own light.', fr: 'Il produit sa propre lumière.', energy: 'light', family: 'transfer' },
  heatFlow: { en: 'Heat moves from it to colder things.', fr: 'La chaleur passe de lui vers des choses plus froides.', energy: 'thermal', family: 'transfer' },
};
export const CLUE_IDS = Object.keys(CLUES);

/**
 * Named misconceptions when the energy is named: the right energy, the one
 * chosen, and (`needs`) a tag the thing must carry for the trap to fit.
 * Any other wrong energy gets `other`, which names the clue it would need.
 */
export const TRAPS = {
  highMoving: {
    right: 'gravitational', wrong: 'kinetic',
    en: 'It is not moving. Something lifted up high has a gravitational potential store, even when it is still.',
    fr: 'Il ne bouge pas. Quelque chose de soulevé en hauteur a une réserve potentielle de pesanteur, même immobile.',
  },
  movingHigh: {
    right: 'kinetic', wrong: 'gravitational',
    en: 'It is moving: that is kinetic. Gravitational potential is for things lifted up high.',
    fr: 'Il bouge : c’est cinétique. Potentielle de pesanteur, c’est pour ce qui est soulevé en hauteur.',
  },
  battery: {
    right: 'chemical', wrong: 'electrical', needs: 'battery',
    en: 'A battery stores chemical energy. Electrical is the transfer: a current in the wires.',
    fr: 'Une pile stocke de l’énergie chimique. Électrique, c’est le transfert : un courant dans les fils.',
  },
  wire: {
    right: 'electrical', wrong: 'chemical',
    en: 'The wire keeps no energy. A current in it moves energy from place to place: electrical.',
    fr: 'Le fil ne garde pas d’énergie. Un courant y transporte l’énergie d’un endroit à un autre : électrique.',
  },
  stretchMove: {
    right: 'elastic', wrong: 'kinetic',
    en: 'It is squashed or stretched out of shape: elastic potential. It does not have to move.',
    fr: 'Il est écrasé ou étiré : potentielle élastique. Il n’a pas besoin de bouger.',
  },
  vibrateMove: {
    right: 'sound', wrong: 'kinetic',
    en: 'It vibrates, but the energy that reaches your ears is sound.',
    fr: 'Il vibre, mais l’énergie qui arrive à tes oreilles, c’est le son.',
  },
  lightWarm: {
    right: 'light', wrong: 'thermal',
    en: 'It may get warm too, but the clue is the light it gives out.',
    fr: 'Il chauffe peut-être aussi, mais l’indice, c’est la lumière qu’il produit.',
  },
  hotGlow: {
    right: 'thermal', wrong: 'light',
    en: 'Hot things do not have to glow. The clue is the heat: thermal.',
    fr: 'Une chose chaude ne brille pas forcément. L’indice, c’est la chaleur : thermique.',
  },
  foodHot: {
    right: 'chemical', wrong: 'thermal',
    en: 'Food, fuel and batteries store chemical energy, hot or cold.',
    fr: 'La nourriture, les combustibles et les piles stockent de l’énergie chimique, chauds ou froids.',
  },
};
export const TRAP_IDS = Object.keys(TRAPS);

/** Store or transfer, got wrong. `{energy}` is filled in with the energy's name. */
export const FAMILY_SLIPS = {
  transferStore: {
    en: '{energy} is a transfer: it moves energy from place to place. Nothing keeps it.',
    fr: '{energy} : c’est un transfert. Il fait passer l’énergie d’un endroit à un autre. Rien ne la garde.',
  },
  storeTransfer: {
    en: '{energy} is a store: the energy is kept there until it is used.',
    fr: '{energy} : c’est une réserve. L’énergie y est gardée jusqu’à ce qu’on l’utilise.',
  },
  heatKept: {
    en: 'Here the heat is kept in something hot: a thermal store. Heat moving to colder things is the transfer.',
    fr: 'Ici, la chaleur est gardée dans quelque chose de chaud : une réserve thermique. La chaleur qui passe vers le froid, c’est le transfert.',
  },
  heatMoving: {
    en: 'Here the heat is moving from something hot to colder things: a thermal transfer.',
    fr: 'Ici, la chaleur passe de quelque chose de chaud vers des choses plus froides : un transfert thermique.',
  },
};

/** Which stores does it have? A transfer chosen, or a store left out. */
export const STORE_SLIPS = {
  soundStore: {
    en: 'Sound is a transfer, not a store: a noise carries energy away, and nothing keeps it.',
    fr: 'Le son est un transfert, pas une réserve : un bruit emporte l’énergie, et rien ne la garde.',
  },
  missed: {
    en: 'One store is missing. Look again: {clue}',
    fr: 'Il manque une réserve. Regarde encore : {clue}',
  },
};

/** How long a store lasts (page 108). Elastic potential is not asked: the book does not say. */
export const LASTS = { chemical: true, gravitational: true, thermal: false, kinetic: false };
export const LASTING_STORES = Object.keys(LASTS);
export const VERDICTS = {
  lasts: { en: 'Still there in a year', fr: 'Encore là dans un an' },
  gone: { en: 'Gone long before a year', fr: 'Partie bien avant un an' },
};
export const VERDICT_IDS = ['lasts', 'gone'];
export const YEAR_SLIPS = {
  thermal: { code: 'heatLasts', en: 'A hot thing always cools down: its heat goes into the colder room around it, in hours.', fr: 'Une chose chaude refroidit toujours : sa chaleur part dans la pièce plus froide autour, en quelques heures.' },
  kinetic: { code: 'moveLasts', en: 'A moving thing slows down and stops, in seconds or minutes.', fr: 'Une chose qui bouge ralentit et s’arrête, en quelques secondes ou minutes.' },
  chemical: { code: 'chemGoes', en: 'Food, fuel and batteries keep their chemical energy for years, until they are used.', fr: 'La nourriture, les combustibles et les piles gardent leur énergie chimique des années, jusqu’à ce qu’on les utilise.' },
  gravitational: { code: 'highGoes', en: 'Something held up high keeps its energy for as long as it stays up.', fr: 'Quelque chose tenu en hauteur garde son énergie tant qu’il reste en haut.' },
};

/** Why? The right reason for each lasting store, and the traps. */
export const REASONS = {
  chemKeeps: { store: 'chemical', en: 'Its energy is in a chemical store, which keeps until it is used.', fr: 'Son énergie est dans une réserve chimique, qui se garde jusqu’à ce qu’on l’utilise.' },
  highKeeps: { store: 'gravitational', en: 'It stays up high, so it keeps its gravitational potential energy.', fr: 'Il reste en hauteur, donc il garde son énergie potentielle de pesanteur.' },
  heatGoes: { store: 'thermal', en: 'It cools down: its heat goes into the colder room around it.', fr: 'Il refroidit : sa chaleur part dans la pièce plus froide autour.' },
  stops: { store: 'kinetic', en: 'It slows down and stops.', fr: 'Il ralentit et s’arrête.' },
  hotMore: {
    trap: true, en: 'It is hot, so it has a lot of energy and keeps it.', fr: 'Il est chaud, donc il a beaucoup d’énergie et la garde.',
    why: 'Hot does not mean a lot of energy, and heat never stays: a hot thing always cools down.',
    whyFr: 'Chaud ne veut pas dire beaucoup d’énergie, et la chaleur ne reste jamais : une chose chaude refroidit toujours.',
  },
  stillGone: {
    trap: true, en: 'It is not moving, so it has no energy left.', fr: 'Il ne bouge pas, donc il n’a plus d’énergie.',
    why: 'Not moving does not mean no energy: a still thing can store a lot.',
    whyFr: 'Ne pas bouger ne veut pas dire ne pas avoir d’énergie : une chose immobile peut en stocker beaucoup.',
  },
  bigLasts: {
    trap: true, en: 'It is big, so its energy lasts.', fr: 'Il est grand, donc son énergie dure.',
    why: 'Size does not decide it: the kind of store does.',
    whyFr: 'Ce n’est pas la taille qui compte : c’est le type de réserve.',
  },
};
/** For each lasting store: its right reason, two traps, and another store's reason. */
export const REASON_SETS = {
  chemical: ['chemKeeps', 'stillGone', 'bigLasts', 'heatGoes'],
  gravitational: ['highKeeps', 'stillGone', 'bigLasts', 'stops'],
  thermal: ['heatGoes', 'hotMore', 'bigLasts', 'chemKeeps'],
  kinetic: ['stops', 'hotMore', 'bigLasts', 'highKeeps'],
};
