"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { brandSchema } from "../schemas/brand.schema";

export async function updateBrand(
  id: string,
  data: unknown
) {
  const parsed = brandSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("brands")
    .update(parsed.data)
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