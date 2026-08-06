import type { Brand } from "@/features/brands/types/brand";

type BrandTableProps = {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
};
export default function BrandTable({
  brands,
  onEdit,
  onDelete,
}: BrandTableProps){
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-neutral-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Brand
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-3 text-right text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {brands.map((brand) => (
            <tr
              key={brand.id}
              className="border-b last:border-0"
            >
              <td className="px-6 py-4">
                {brand.name}
              </td>

              <td className="px-6 py-4">
                {brand.is_active ? "Active" : "Inactive"}
              </td>

              <div className="flex justify-end gap-2">
  <button
    onClick={() => onEdit(brand)}
    className="text-blue-600 hover:underline"
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(brand)}
    className="text-red-600 hover:underline"
  >
    Delete
  </button>
</div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}