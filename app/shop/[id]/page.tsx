import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductInfo from "@/components/product/ProductInfo";
import ProductGallery from "@/components/product/ProductGallery";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getProductImages } from "@/features/products/queries/get-product-images";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      brands(name),
      categories(name)
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error || !product) {
    notFound();
  }
  const productImages = await getProductImages(product.id);
  const { data: relatedProducts } = await supabase
  .from("products")
  .select(`
    *,
    brands(name),
    categories(name)
  `)
  .eq("category_id", product.category_id)
  .neq("id", product.id)
  .eq("is_active", true)
  .limit(4);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          <ProductGallery
  images={
    productImages.length > 0
      ? productImages.map((image) => image.image_url)
      : product.image_url
        ? [product.image_url]
        : []
  }
  name={product.name}
/>

          <div className="lg:pt-16">
            <ProductInfo product={product} />
          </div>

        </div>

        <RelatedProducts
  products={relatedProducts ?? []}
/>
      </main>

      <Footer />
    </>
  );
}