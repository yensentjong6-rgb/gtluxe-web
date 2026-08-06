"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadProductImage(file: File) {
  const supabase = await createClient();

  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return {
    success: true,
    url: publicUrl,
  };
}