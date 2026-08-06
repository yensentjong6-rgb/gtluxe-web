import { createClient } from "@/lib/supabase/server";

export async function getBrandBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Brand Error:", error);
    throw error;
  }

  return data;
}