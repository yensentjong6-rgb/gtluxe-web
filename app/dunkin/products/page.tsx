import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import ProductTable from "@/components/dunkin/products/ProductTable";
import ProductToolbar from "@/components/dunkin/products/ProductToolbar";

type Props = {
  searchParams: Promise<{
    search?: string;
    brand?: string;
    category?: string;
    collection?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: Props) {
  const {
    search,
    brand,
    category,
    collection,
  } = await searchParams;

  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(`
      *,
      brands(name),
      categories(name),
      collections(name)
    `)
    .order("created_at", {
      ascending: false,
    });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (brand) {
    query = query.eq("brand_id", brand);
  }

  if (category) {
    query = query.eq("category_id", category);
  }

  if (collection) {
    query = query.eq("collection_id", collection);
  }

  const { data: products } = await query;

  const { data: brands } = await supabase
    .from("brands")
    .select("id, name")
    .order("name");

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  const { data: collections } = await supabase
    .from("collections")
    .select("id, name")
    .order("name");

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="rounded-xl bg-[#8B1E2D] px-5 py-3 text-white"
        >
          + Add Product
        </Link>
      </div>

      <ProductToolbar
        brands={brands ?? []}
        categories={categories ?? []}
        collections={collections ?? []}
      />

      <ProductTable
        products={products ?? []}
      />
    </main>
  );
}