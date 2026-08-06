import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <section className="w-full">

      {products.length === 0 ? (
        <div className="py-24 text-center">
          <h3 className="text-2xl font-serif">
            No products found
          </h3>

          <p className="mt-3 text-gray-500">
            Try another keyword or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}