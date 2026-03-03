import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!;

if (!supabaseUrl || !supabaseSecretKey) {
  console.warn('Supabase credentials are missing. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey);
