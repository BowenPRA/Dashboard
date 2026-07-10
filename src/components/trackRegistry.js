import { Atom, Leaf, Languages, GraduationCap, Calculator, BookOpen } from 'lucide-react';

export const TRACK_REGISTRY = [
  { 
    id: 'GED_MATH', 
    title: 'GED Mathematics', 
    desc: 'Quantitative & Algebraic', 
    icon: Calculator, 
    theme: { 
      bg: 'bg-blue-500', 
      border: 'border-blue-700', 
      hover: 'hover:bg-blue-400',
      text: 'text-blue-600 dark:text-blue-400', 
      ambient1: 'bg-blue-400', 
      ambient2: 'bg-cyan-500', 
      glow: 'hover:border-blue-400 dark:hover:border-blue-600' 
    }
  },
  { 
    id: 'GED_ENG', 
    title: 'GED English', 
    desc: 'Language Arts & Reading', 
    icon: BookOpen, 
    theme: { 
      bg: 'bg-emerald-500', 
      border: 'border-emerald-700', 
      hover: 'hover:bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400', 
      ambient1: 'bg-emerald-400', 
      ambient2: 'bg-teal-500', 
      glow: 'hover:border-emerald-400 dark:hover:border-emerald-600' 
    }
  },
  { 
    id: 'Y8', 
    title: 'Year 8 Science', 
    desc: 'Biology & Chemistry', 
    icon: Atom, 
    theme: { 
      bg: 'bg-indigo-500', 
      border: 'border-indigo-700', 
      hover: 'hover:bg-indigo-400',
      text: 'text-indigo-600 dark:text-indigo-400', 
      ambient1: 'bg-indigo-400', 
      ambient2: 'bg-purple-500', 
      glow: 'hover:border-indigo-400 dark:hover:border-indigo-600' 
    }
  },
  { 
    id: 'Y9', 
    title: 'Year 9 Science', 
    desc: 'Ecology & Physics', 
    icon: Leaf, 
    theme: { 
      bg: 'bg-emerald-500', 
      border: 'border-emerald-700', 
      hover: 'hover:bg-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400', 
      ambient1: 'bg-emerald-400', 
      ambient2: 'bg-teal-500', 
      glow: 'hover:border-emerald-400 dark:hover:border-emerald-600' 
    }
  },
  { 
    id: 'ESL', 
    title: 'ESL Foundation', 
    desc: 'Core Vocab & Phonics', 
    icon: Languages, 
    theme: { 
      bg: 'bg-amber-400', 
      border: 'border-amber-600', 
      hover: 'hover:bg-amber-300',
      text: 'text-amber-600 dark:text-amber-400', 
      ambient1: 'bg-amber-400', 
      ambient2: 'bg-orange-500', 
      glow: 'hover:border-amber-400 dark:hover:border-amber-600' 
    }
  },
  { 
    id: 'ADD_MATH', 
    title: 'Additional Math', 
    desc: 'Cambridge IGCSE Math', 
    icon: Calculator, 
    theme: { 
      bg: 'bg-cyan-500', 
      border: 'border-cyan-700', 
      hover: 'hover:bg-cyan-400',
      text: 'text-cyan-600 dark:text-cyan-400', 
      ambient1: 'bg-cyan-400', 
      ambient2: 'bg-blue-500', 
      glow: 'hover:border-cyan-400 dark:hover:border-cyan-600' 
    }
  }
];