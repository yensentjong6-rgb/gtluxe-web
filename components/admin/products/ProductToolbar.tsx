import ProductSearch from "./ProductSearch";

type Props = {
  brands: {
    id: string;
    name: string;
  }[];

  categories: {
    id: string;
    name: string;
  }[];

  collections: {
    id: string;
    name: string;
  }[];
};

export default function ProductToolbar({
  brands,
  categories,
  collections,
}: Props) {
  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

        <ProductSearch />

        <select className="rounded-xl border border-gray-300 px-4 py-2">
          <option>All Brands</option>

          {brands.map((brand) => (
            <option
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))}
        </select>

        <select className="rounded-xl border border-gray-300 px-4 py-2">
          <option>All Categories</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <select className="rounded-xl border border-gray-300 px-4 py-2">
          <option>All Collections</option>

          {collections.map((collection) => (
            <option
              key={collection.id}
              value={collection.id}
            >
              {collection.name}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}