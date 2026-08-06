import ShopClient from "./ShopClient";

import { getProducts } from "@/features/products/queries/get-products";
import { getCategories } from "@/features/categories/queries/get-categories";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
import { getBrands } from "@/features/brands/queries/get-brands";
import { getBrandBySlug } from "@/features/brands/queries/get-brand-by-slug";

type ShopPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    page?: string;
    sort?: string;
  }>;
};

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const category = params.category
    ? await getCategoryBySlug(params.category)
    : null;

  const brand = params.brand
  ? await getBrandBySlug(params.brand)
  : null;  

  const [result, categories, brands] = await Promise.all([
   getProducts({
  search: params.search,
  categoryId: category?.id,
  brandId: brand?.id,
  sort: params.sort,
  page,
}),
    getCategories(),
    getBrands(),
  ]);

  return (
    <ShopClient
      products={result.products}
      categories={categories}
      brands={brands}
      page={result.page}
      totalPages={result.totalPages}
      total={result.total}
    />
  );
}