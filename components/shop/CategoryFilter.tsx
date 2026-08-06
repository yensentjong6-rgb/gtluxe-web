"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type CategoryFilterProps = {
  categories: Category[];
};

export default function CategoryFilter({
  categories,
}: CategoryFilterProps) {

  const router = useRouter();
const searchParams = useSearchParams();
const activeCategory = searchParams.get("category") ?? "all";

const handleChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  handleSelect(e.target.value);
};

const handleSelect = (slug: string) => {
  console.log("CLICK:", slug);

  const params = new URLSearchParams(searchParams.toString());

  if (slug === "all") {
    params.delete("category");
  } else {
    params.set("category", slug);
  }

  params.delete("page");

  console.log("URL:", `/shop?${params.toString()}`);

  router.push(`/shop?${params.toString()}`);
};
  
  return (
  <div className="mb-10">

    <p className="mb-3 text-sm font-medium uppercase tracking-[2px] text-gray-500">
      Category
    </p>

    {/* Mobile */}
    <div className="block md:hidden">
      <select
  value={activeCategory}
  onChange={(e) => {
    alert(e.target.value);
    handleChange(e);
  }}
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
>
        <option value="all">
          All Categories
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.slug}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>

    {/* Desktop */}
    <div className="hidden flex-wrap gap-3 md:flex">

      <button
        type="button"
        onClick={() => handleSelect("all")}
        className={`rounded-full px-4 py-2 transition ${
          activeCategory === "all"
            ? "bg-[#8B1E2D] text-white"
            : "border border-gray-300 bg-white text-gray-700 hover:border-[#8B1E2D]"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          type="button"
          key={category.id}
          onClick={() => handleSelect(category.slug)}
          className={`rounded-full px-4 py-2 transition ${
            activeCategory === category.slug
              ? "bg-[#8B1E2D] text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:border-[#8B1E2D]"
          }`}
        >
          {category.name}
        </button>
      ))}

    </div>

  </div>
);
}