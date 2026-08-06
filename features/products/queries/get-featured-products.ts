import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT } from "./select";

export async function getFeaturedProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("is_featured", true)
    .limit(8);

  if (error) throw error;

  return data;
}