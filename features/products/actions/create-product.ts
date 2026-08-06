"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "../schemas/product.schema";

type CreateProductInput = {
  data: unknown;
  images: string[];
};

export async function createProduct({
  data,
  images,
}: CreateProductInput) {
  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const supabase = await createClient();

  const slug = parsed.data.name
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-");

  // Simpan product
  const { data: product, error } = await supabase
    .from("products")
    .insert({
  ...parsed.data,
  slug,
  image_url: images[0] ?? null,
})
    .select()
    .single();

  if (error || !product) {
    return {
      success: false,
      message: error?.message ?? "Failed to create product.",
    };
  }

  // Simpan semua gambar
  if (images.length > 0) {
  const { error: imageError } = await supabase
    .from("product_images")
    .insert(
      images.map((url, index) => ({
        product_id: product.id,
        image_url: url,
        sort_order: index + 1,
      }))
    );

  if (imageError) {
    return {
      success: false,
      message: imageError.message,
    };
  }
}

  revalidatePath("/admin/products");
  revalidatePath("/shop");

  return {
    success: true,
    product,
  };
}