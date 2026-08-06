import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT } from "./select";

export async function getRelatedProducts(
  categoryId: string,
  currentId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("category_id", categoryId)
    .neq("id", currentId)
    .eq("is_active", true)
    .limit(4);

  if (error) throw error;

  return data;
}