import { Product } from "@/types/product";
import RelatedProductCard from "./RelatedProductCard";

type RelatedProductsProps = {
  products: Product[];
};

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-28">
      <h2 className="mb-8 text-3xl font-serif">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.map((product) => (
          <RelatedProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}