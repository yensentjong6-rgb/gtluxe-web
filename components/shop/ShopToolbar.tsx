import SortFilter from "./SortFilter";

type ShopToolbarProps = {
  total: number;
};

export default function ShopToolbar({
  total,
}: ShopToolbarProps) {
  return (
    <div className="hidden md:flex md:items-center md:justify-between mb-10 border-y border-gray-200 py-5">
      <p className="text-sm tracking-wide text-gray-500">
        Showing{" "}
        <span className="font-semibold text-[#3D2C2E]">
          {total}
        </span>{" "}
        Product{total !== 1 && "s"}
      </p>

      <div className="w-full md:w-64">
        <SortFilter />
      </div>
    </div>
  );
}