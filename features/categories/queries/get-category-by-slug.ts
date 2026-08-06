import { createClient } from "@/lib/supabase/server";

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug);

  if (error) throw error;

  return data[0] ?? null;
}