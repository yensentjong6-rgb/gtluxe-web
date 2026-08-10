"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "../schemas/product.schema";

type UpdateProductInput = {
  id: string;
  data: unknown;
  images: string[];
};

export async function updateProduct({
  id,
  data,
  images,
}: UpdateProductInput) {
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

    console.log("Price before update:", parsed.data.price);
  const { error } = await supabase
    .from("products")
    .update({
      ...parsed.data,
      slug,
      image_url: images[0] ?? null,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  // Hapus semua gallery lama
  await supabase
    .from("product_images")
    .delete()
    .eq("product_id", id);

  // Simpan gallery baru
  if (images.length > 0) {
    const { error: imageError } = await supabase
      .from("product_images")
      .insert(
        images.map((url, index) => ({
          product_id: id,
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

  revalidatePath("/dunkin/products");
  revalidatePath(`/dunkin/products/${id}/edit`);
  revalidatePath("/shop");

  return {
    success: true,
  };
}