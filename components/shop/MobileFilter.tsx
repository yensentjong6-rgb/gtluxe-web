"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Brand = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
  brands: Brand[];
};

export default function MobileFilter({
  categories,
  brands,
}: Props) {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  function handleSearch() {
    
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    if (brand) {
      params.set("brand", brand);
    }

    if (sort) {
      params.set("sort", sort);
    }

    const query = params.toString();

    router.push(
      query ? `/shop?${query}` : "/shop"
    );
  }

  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold text-[#3D2C2E]">
        Filter Products
      </h2>

      {/* Category */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">
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

      {/* Brand */}

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          Brand
        </label>

        <select
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">
            All Brands
          </option>

          {brands.map((brand) => (
            <option
              key={brand.id}
              value={brand.slug}
            >
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">
          Sort
        </label>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="price-asc">
            Price: Low to High
          </option>

          <option value="price-desc">
            Price: High to Low
          </option>
        </select>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="w-full rounded-xl bg-[#8B1E2D] py-3 font-medium text-white"
      >
        Show Products
      </button>

    </div>
  );
}