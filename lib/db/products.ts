"use server"

import { createClient } from '@supabase/supabase-js';

export async function getProductById(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getProducts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function getHighlightedProducts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_highlighted', true)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

