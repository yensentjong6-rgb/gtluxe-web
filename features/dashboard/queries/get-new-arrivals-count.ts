import { createClient } from "@/lib/supabase/server";

export async function getNewArrivalsCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("is_active", true)
    .eq("is_featured", true);

  if (error) throw error;

  return count ?? 0;
}