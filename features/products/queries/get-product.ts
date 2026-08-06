import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT } from "./select";

export async function getProduct(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}