// src/data/index.js

export const Y8_META = []; export const Y8_DATA = {};
export const Y9_META = []; export const Y9_DATA = {};
export const ESL_META = []; export const ESL_DATA = {};
export const GED_MATH_META = []; export const GED_MATH_DATA = {};
export const GED_ENG_META = []; export const GED_ENG_DATA = {};
export const ADD_MATH_META = []; export const ADD_MATH_DATA = {};

// Automatically pulls all .js files in these folders
const modules = import.meta.glob('./**/*.js', { eager: true });

for (const path in modules) {
  if (path.includes('index.js')) continue;

  const module = modules[path];
  
  let data = null;
  for (const key in module) {
    const exp = module[key];
    if (exp && typeof exp === 'object' && exp.meta && exp.meta.id) {
      data = exp;
      break;
    }
  }
  
  if (!data) continue;

  const id = data.meta.id;
  const track = data.meta.track?.toUpperCase() || 'Y8';

  // Strict deduplication: Only push if the ID isn't already registered
  if (track === 'Y8' && !Y8_DATA[id]) { Y8_DATA[id] = data; Y8_META.push(data.meta); }
  else if (track === 'Y9' && !Y9_DATA[id]) { Y9_DATA[id] = data; Y9_META.push(data.meta); }
  else if (track === 'ESL' && !ESL_DATA[id]) { ESL_DATA[id] = data; ESL_META.push(data.meta); }
  else if (track === 'GED_MATH' && !GED_MATH_DATA[id]) { GED_MATH_DATA[id] = data; GED_MATH_META.push(data.meta); }
  else if (track === 'GED_ENG' && !GED_ENG_DATA[id]) { GED_ENG_DATA[id] = data; GED_ENG_META.push(data.meta); }
  else if (track === 'ADD_MATH' && !ADD_MATH_DATA[id]) { ADD_MATH_DATA[id] = data; ADD_MATH_META.push(data.meta); }
}

const sortById = (a, b) => a.id.localeCompare(b.id);
Y8_META.sort(sortById);
Y9_META.sort(sortById);
ESL_META.sort(sortById);
GED_MATH_META.sort(sortById);
GED_ENG_META.sort(sortById);
ADD_MATH_META.sort(sortById);