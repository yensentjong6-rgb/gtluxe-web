import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type LatestProductsProps = {
  products: Product[];
};

export default function LatestProducts({
  products,
}: LatestProductsProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Recent Products
        </h2>

        <p className="mt-4 text-gray-500">
          No products yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        Recent Products
      </h2>

      <div className="mt-6 space-y-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}/edit`}
            className="flex items-center gap-4 rounded-lg p-2 transition hover:bg-gray-50"
          >
            <Image
              src={product.image_url || "/images/placeholder.jpg"}
              alt={product.name}
              width={56}
              height={56}
              className="rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">
                {product.name}
              </p>

              <p className="text-sm text-gray-500">
                {product.brands?.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}