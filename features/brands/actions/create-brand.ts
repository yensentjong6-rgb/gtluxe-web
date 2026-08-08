"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { brandSchema } from "../schemas/brand.schema";

export async function createBrand(data: unknown) {
  console.log("Incoming:", data);

  const parsed = brandSchema.safeParse(data);

  console.log("Parsed:", parsed);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const supabase = await createClient();

  const result = await supabase
    .from("brands")
    .insert(parsed.data)
    .select();

  console.log("Supabase Result:", result);

  if (result.error) {
    return {
      success: false,
      message: result.error.message,
    };
  }

  revalidatePath("/dunkin/brands");

  return {
    success: true,
  };
}