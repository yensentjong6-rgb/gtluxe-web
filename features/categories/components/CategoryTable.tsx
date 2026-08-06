import type { Category } from "../types/category";

type CategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};
export default function CategoryTable(
  {
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps){
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-neutral-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Category
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
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b last:border-0"
            >
              <td className="px-6 py-4">
                {category.name}
              </td>

              <td className="px-6 py-4">
                {category.is_active ? "Active" : "Inactive"}
              </td>

              <div className="flex justify-end gap-2">
  <button
    onClick={() => onEdit(category)}
    className="text-blue-600 hover:underline"
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(category)}
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