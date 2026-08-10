"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleFeatured(
  id: string,
  featured: boolean
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({
      is_featured: !featured,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/dunkin/products");

  return {
    success: true,
  };
}