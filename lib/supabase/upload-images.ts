import { createClient } from "@/lib/supabase/client";

export async function uploadImages(files: File[]) {
  const supabase = createClient();

  const uploaded: string[] = [];

  for (const file of files) {
    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    uploaded.push(publicUrl);
  }

  return uploaded;
}