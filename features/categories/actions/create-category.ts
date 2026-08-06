"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { categorySchema } from "../schemas/category.schema";

export async function createCategory(data: unknown) {
  console.log("Incoming:", data);

  const parsed = categorySchema.safeParse(data);

  console.log("Parsed:", parsed);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const supabase = await createClient();

  const result = await supabase
    .from("categories")
    .insert(parsed.data)
    .select();

  console.log("Supabase Result:", result);

  if (result.error) {
    return {
      success: false,
      message: result.error.message,
    };
  }

  revalidatePath("/admin/categories");

  return {
    success: true,
  };
}