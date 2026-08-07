import { notFound } from "next/navigation";

import ProductForm from "@/components/admin/products/ProductForm";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  // Product
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images(*)
    `)
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Brands
  const { data: brands } = await supabase
    .from("brands")
    .select("*")
    .order("name");

  // Categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  // Collections
  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .order("name");

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Product
      </h1>

      <ProductForm
        product={product}
        brands={brands ?? []}
        categories={categories ?? []}
        collections={collections ?? []}
      />
    </main>
  );
}