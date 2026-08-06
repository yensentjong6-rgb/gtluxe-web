"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteBrand(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("brands")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/brands");

  return {
    success: true,
  };
}