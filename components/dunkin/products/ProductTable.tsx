import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";
import FeaturedBadge from "./FeaturedBadge";
import DuplicateProductButton from "./DuplicateProductButton";

type Product = {
  id: string;
  name: string;
  image_url: string | null;
  price: number;
  is_featured: boolean;

  brands: {
    name: string;
  } | null;

  categories: {
    name: string;
  } | null;

  collections: {
    name: string;
  } | null;
};

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm font-semibold text-gray-600">
            <th className="px-6 py-4">
              Product
            </th>

            <th className="px-6 py-4 text-right">
              Price
            </th>

            <th className="px-6 py-4">
              Status
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-16 text-center text-gray-500"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gray-100">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover transition duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-[#3D2C2E]">
                        {product.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {product.brands?.name ?? "-"}
                        {" • "}
                        {product.categories?.name ?? "-"}
                        {" • "}
                        {product.collections?.name ?? "-"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <p className="text-lg font-semibold text-[#3D2C2E]">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <FeaturedBadge
                  productId={product.id}
                  featured={product.is_featured}
                  />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dunkin/products/${product.id}/edit`}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
                    >
                      Edit
                    </Link>

                    <DuplicateProductButton
    productId={product.id}
  />

                    <DeleteProductButton
                      productId={product.id}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}