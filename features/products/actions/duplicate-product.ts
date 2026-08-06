"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function duplicateProduct(id: string) {
  const supabase = await createClient();

  // Ambil product
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return {
      success: false,
      message: error?.message ?? "Product not found.",
    };
  }

  // Ambil gallery
  const { data: images } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", id)
    .order("sort_order");

  const newName = `${product.name} (Copy)`;

const baseSlug = newName
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-");

const newSlug = `${baseSlug}-${Date.now()}`;

  // Buat product baru
  const { data: newProduct, error: createError } = await supabase
    .from("products")
    .insert({
      brand_id: product.brand_id,
      category_id: product.category_id,
      collection_id: product.collection_id,

      name: newName,
      slug: newSlug,

      description: product.description,

      price: product.price,

      image_url: product.image_url,

      is_featured: product.is_featured,

      is_active: product.is_active,
    })
    .select()
    .single();

  if (createError || !newProduct) {
  return {
    success: false,
    message: createError?.message ?? "Failed to duplicate product.",
  };
}

  // Copy gallery
  if (images && images.length > 0) {
    await supabase.from("product_images").insert(
      images.map((image) => ({
        product_id: newProduct.id,
        image_url: image.image_url,
        sort_order: image.sort_order,
      }))
    );
  }

  revalidatePath("/admin/products");

  return {
  success: true,
  productId: newProduct.id,
};
}