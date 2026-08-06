"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const sort = searchParams.get("sort");

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);
    params.delete("page");

    const url = params.toString();

    router.push(url ? `/shop?${url}` : "/shop");
  };

  const clearAll = () => {
    router.push("/shop");
  };

  if (!category && !brand && !sort) {
    return null;
  }

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <span className="text-sm uppercase tracking-[2px] text-gray-500">
        Filters
      </span>

      {category && (
        <button
          onClick={() => removeFilter("category")}
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
        >
          {category} ✕
        </button>
      )}

      {brand && (
        <button
          onClick={() => removeFilter("brand")}
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
        >
          {brand} ✕
        </button>
      )}

      {sort && (
        <button
          onClick={() => removeFilter("sort")}
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
        >
          {sort} ✕
        </button>
      )}

      <button
        onClick={clearAll}
        className="text-sm font-medium text-[#8B1E2D] hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}