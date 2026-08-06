import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT } from "@/features/products/queries/select";

export async function getLatestProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  if (error) throw error;

  return data ?? [];
}