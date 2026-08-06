"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Brand = {
  id: string;
  name: string;
  slug: string;
};

type BrandFilterProps = {
  brands: Brand[];
};

export default function BrandFilter({
  brands,
}: BrandFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeBrand = searchParams.get("brand") ?? "all";

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug === "all") {
      params.delete("brand");
    } else {
      params.set("brand", slug);
    }

    params.delete("page");

    const url = params.toString();

    router.push(url ? `/shop?${url}` : "/shop");
  };

  return (
    <div className="mb-10">
      <p className="mb-3 text-sm font-medium uppercase tracking-[2px] text-gray-500">
        Brand
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleSelect("all")}
          className={`rounded-full px-4 py-2 transition ${
            activeBrand === "all"
              ? "bg-[#8B1E2D] text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:border-[#8B1E2D]"
          }`}
        >
          All
        </button>

        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => handleSelect(brand.slug)}
            className={`rounded-full px-4 py-2 transition ${
              activeBrand === brand.slug
                ? "bg-[#8B1E2D] text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:border-[#8B1E2D]"
            }`}
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
}