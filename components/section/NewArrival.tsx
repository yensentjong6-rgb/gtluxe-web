import Link from "next/link";
import ProductCard from "../shop/ProductCard";
import { Product } from "@/types/product";

type NewArrivalProps = {
  products: Product[];
};

export default function NewArrival({
  products,
}: NewArrivalProps) {

  return (
    <section className="py-24 bg-[#F8F6F3]">

      <div className="mx-auto max-w-7xl px-6 md:px-8">

        <h2 className="text-4xl md:text-5xl font-serif text-center text-[#3D2C2E]">
          CURATED LUXURY
        </h2>

        <p className="mt-4 mb-10 px-4 text-center text-gray-600 md:mb-14">
          Explore Our Curated Luxury Selection
        </p>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">

        {products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}

        </div>
        <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center rounded-full border border-[#8B1E2D] px-8 py-3 text-sm font-medium tracking-wide text-[#8B1E2D] transition-all duration-300 hover:bg-[#8B1E2D] hover:text-white"
        >
          Explore All Collection
        </Link>
      </div>

      </div>

    </section>
  );
}