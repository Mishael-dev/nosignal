"use server"

import { createClient } from "@supabase/supabase-js";

export async function addNewsletterSubscriber(
  firstName: string,
  email: string
) {
    
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_SECRET_KEY!
  );

  // 3️⃣ Insert subscriber
  const { error: itemError } = await supabase
    .from("newsletter_subscribers")
    .insert({
      first_name: firstName,
      email: email,
    })

  if (itemError) {
    throw new Error(itemError.message)
  }

  return { success: true }
}