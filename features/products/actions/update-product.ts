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

const { data: category, error: categoryError } = await supabase
  .from("categories")
  .select("name")
  .eq("id", parsed.data.category_id)
  .single();

if (categoryError || !category) {
  return {
    success: false,
    message: "Failed to determine product collection.",
  };
}

let collectionSlug = "";

if (category.name.toLowerCase() === "accessories") {
  collectionSlug = "accessories";
} else if (parsed.data.gender === "Women") {
  collectionSlug = "women";
} else if (parsed.data.gender === "Men") {
  collectionSlug = "men";
} else {
  collectionSlug = "accessories";
}

const { data: collection, error: collectionError } = await supabase
  .from("collections")
  .select("id")
  .eq("slug", collectionSlug)
  .single();

if (collectionError || !collection) {
  return {
    success: false,
    message: "Failed to determine product collection.",
  };
}

  const slug = parsed.data.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

    console.log("Price before update:", parsed.data.price);
  const { error } = await supabase
    .from("products")
    .update({
  ...parsed.data,
  collection_id: collection.id,
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