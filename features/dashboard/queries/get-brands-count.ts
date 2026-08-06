import { createClient } from "@/lib/supabase/server";

export async function getBrandsCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("brands")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count ?? 0;
}