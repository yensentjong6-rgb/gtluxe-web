export default function FilterSidebar() {
  return (
    <aside className="space-y-10">

      <div>
        <h3 className="mb-4 text-xl font-serif">
          Search
        </h3>

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#8B1E2D]"
        />
      </div>

      <div>
        <h3 className="mb-4 text-xl font-serif">
          Brand
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Hermès
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Chanel
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Dior
          </label>

          <label className="flex items-center gap-2">
            Louis Vuitton
          </label>

        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-serif">
          Category
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Bag
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Shoes
          </label>

          <label className="flex items-center gap-2">
            Wallet
          </label>

          <label className="flex items-center gap-2">
            Accessories
          </label>

        </div>

      </div>

    </aside>
  );
}