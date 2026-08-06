"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  // Ambil semua gambar product
  const { data: images } = await supabase
    .from("product_images")
    .select("image_url")
    .eq("product_id", id);

  // Hapus gallery
  await supabase
    .from("product_images")
    .delete()
    .eq("product_id", id);

  // Hapus product
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/admin/products");

  return {
    success: true,
    images,
  };
}