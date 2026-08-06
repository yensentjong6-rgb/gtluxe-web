import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductGrid from "@/components/shop/ProductGrid";

import { getBrandBySlug } from "@/features/brands/queries/get-brand-by-slug";
import { getProducts } from "@/features/products/queries/get-products";

type BrandPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BrandPage({
  params,
}: BrandPageProps) {
  const { slug } = await params;

  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const { products } = await getProducts({
  brandId: brand.id,
});

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <ShopHeader
          title={brand.name}
          description={`${brand.name} Collection`}
        />

        <ProductGrid
  products={products}
/>
      </main>

      <Footer />
    </>
  );
}