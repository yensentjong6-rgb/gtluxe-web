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

  // Simpan product
  const { data: product, error } = await supabase
    .from("products")
    .insert({
  ...parsed.data,
  collection_id: collection.id,
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

  revalidatePath("/dunkin/products");
  revalidatePath("/shop");

  return {
    success: true,
    product,
  };
}