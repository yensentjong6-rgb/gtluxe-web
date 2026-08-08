import ProductForm from "@/components/dunkin/products/ProductForm";
import { getBrands } from "@/features/brands/queries/get-brands";
import { getCategories } from "@/features/categories/queries/get-categories";
import { getCollections } from "@/features/collections/queries/get-collections";

export default async function NewProductPage() {
  const [brands, categories, collections] = await Promise.all([
  getBrands(),
  getCategories(),
  getCollections(),
]);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Add Product
      </h1>

      <ProductForm
  brands={brands}
  categories={categories}
  collections={collections}
/>
    </main>
  );
}