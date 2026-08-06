import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

type RelatedProductCardProps = {
  product: Product;
};

export default function RelatedProductCard({
  product,
}: RelatedProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group">
        <div className="overflow-hidden rounded-xl">
          <Image
            src={product.image_url || "/images/placeholder.jpg"}
            alt={product.name}
            width={600}
            height={800}
            className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gray-400">
          {product.brands?.name}
        </p>

        <h3 className="mt-2 font-serif text-lg">
          {product.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#8B1E2D]">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}