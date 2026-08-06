import { createClient } from "@/lib/supabase/server";

export async function getCategoriesCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("categories")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count ?? 0;
}