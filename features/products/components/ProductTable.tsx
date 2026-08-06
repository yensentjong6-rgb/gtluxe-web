import type { Product } from "../types/product";
import Image from "next/image";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-neutral-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Product
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Brand
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Category
            </th>

            <th className="px-6 py-3 text-right text-sm font-semibold">
              Price
            </th>

            <th className="px-6 py-3 text-center text-sm font-semibold">
              Stock
            </th>

            <th className="px-6 py-3 text-center text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-3 text-right text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b last:border-0"
            >
              <td className="px-6 py-4">
  <div className="flex items-center gap-4">
    <div className="relative h-14 w-14 overflow-hidden rounded-lg border bg-neutral-100">
      {product.image_url ? (
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
          sizes="56px"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-neutral-400">
          No Image
        </div>
      )}
    </div>

    <div>
      <p className="font-medium">{product.name}</p>
      <p className="text-sm text-neutral-500">
        ID: {product.id.slice(0, 8)}
      </p>
    </div>
  </div>
</td>

              <td className="px-6 py-4">
                {product.brands?.name ?? "-"}
              </td>

              <td className="px-6 py-4">
                {product.categories?.name ?? "-"}
              </td>

              <td className="px-6 py-4 text-right">
                Rp {product.price.toLocaleString("id-ID")}
              </td>

              <td className="px-6 py-4 text-center">
                {product.stock}
              </td>

              <td className="px-6 py-4 text-center">
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
      product.is_active
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {product.is_active ? "Active" : "Inactive"}
  </span>
</td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
  <button
    onClick={() => onEdit(product)}
    className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50"
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(product)}
    className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
  >
    Delete
  </button>
</div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="py-8 text-center text-muted-foreground"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}