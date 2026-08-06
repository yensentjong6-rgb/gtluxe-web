import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductGrid from "@/components/shop/ProductGrid";
import { getProducts } from "@/features/products/queries/get-products";
import { getCategoryBySlug } from "@/features/categories/queries/get-category-by-slug";
type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const { products } = await getProducts({
  categoryId: category.id,
});
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <ShopHeader
          title={category.name}
          description={`${category.name} Collection`}
        />

        <ProductGrid products={products} />
      </main>

      <Footer />
    </>
  );
}