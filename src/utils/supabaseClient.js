import { createClient } from '@supabase/supabase-js';

// We updated the key name here to match your .env exactly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// If the keys are missing, throw a clear warning so we know!
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("🚨 Missing Supabase Environment Variables! Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);