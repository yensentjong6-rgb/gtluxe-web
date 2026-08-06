import { Product } from "@/types/product";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`}>

    <div className="group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2">

      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group-hover:shadow-xl">
        
        {product.is_featured && (
         <div className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8B1E2D] shadow-md">
           Best Seller
         </div>
        )}

        <Image
  src={product.image_url || "/images/placeholder.jpg"}
  alt={product.name}
  width={600}
  height={800}
  className="h-auto w-full aspect-[3/4] object-cover transition duration-500 group-hover:scale-105"
/>

      </div>

      <p className="mt-5 text-sm uppercase tracking-[0.2em] text-gray-400">
        {product.brands?.name}
      </p>

      <h3 className="mt-2 line-clamp-2 font-serif text-lg text-[#222] md:text-xl">
        {product.name}
      </h3>

      <p className="mt-2 text-base font-semibold text-[#8B1E2D] md:text-lg">
        {formatPrice(product.price)}
      </p>

    </div>
    </Link>
  );
}