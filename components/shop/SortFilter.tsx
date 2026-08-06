"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get("sort") ?? "newest";

  const handleChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sort === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    params.delete("page");

    const url = params.toString();

    router.push(url ? `/shop?${url}` : "/shop");
  };

  return (
    <select
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#8B1E2D]"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}