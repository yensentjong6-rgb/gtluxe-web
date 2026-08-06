"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductGrid from "@/components/shop/ProductGrid";
import SearchBar from "@/components/shop/SearchBar";
import CategoryFilter from "@/components/shop/CategoryFilter";
import { Product } from "@/types/product";
import BrandFilter from "@/components/shop/BrandFilter";
import SortFilter from "@/components/shop/SortFilter";
import Pagination from "@/components/shared/Pagination";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ActiveFilters from "@/components/shop/ActiveFilters";
import MobileFilter from "@/components/shop/MobileFilter";

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

type ShopClientProps = {
  products: Product[];
  categories: Category[];
  brands: Brand[];

  page: number;
  totalPages: number;
  total: number;
};

export default function ShopClient({
  products,
  categories,
  brands,
  page,
  totalPages,
  total,
}: ShopClientProps) {

console.log("ShopClient rendered");

const [filterOpen, setFilterOpen] = useState(false);
const [mobileCategory, setMobileCategory] = useState("");
const [mobileBrand, setMobileBrand] =
  useState("");
const [mobileSort, setMobileSort] =
  useState("");  

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <ShopHeader />

        {/* Mobile */}

<div className="mb-8 block md:hidden">

  <SearchBar />

  <button
  type="button"
  onClick={() => setFilterOpen(true)}
  className="mt-4 flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white py-3 font-medium text-[#3D2C2E] shadow-sm"
>
  Filter
</button>

{filterOpen && (
  <div
    className="fixed inset-0 z-50 bg-black/40"
    onClick={() => setFilterOpen(false)}
  >
    <div
  onClick={(e) => e.stopPropagation()}
  className="absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl bg-white"
>
  <div className="overflow-y-auto px-6 pt-6 pb-32">

      {/* Handle */}
      <div className="mx-auto mb-6 h-1.5 w-14 rounded-full bg-gray-300" />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#3D2C2E]">
          Filter Products
        </h2>

        <button
          onClick={() => setFilterOpen(false)}
          className="text-2xl text-gray-500"
        >
          ×
        </button>
      </div>

      <div className="space-y-5">

  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Category
    </label>

    <select
      value={mobileCategory}
      onChange={(e) =>
        setMobileCategory(e.target.value)
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

  <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Brand
  </label>

  <select
    value={mobileBrand}
    onChange={(e) =>
      setMobileBrand(e.target.value)
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

<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Sort
  </label>

  <select
    value={mobileSort}
    onChange={(e) =>
      setMobileSort(e.target.value)
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
</div>
<div className="absolute bottom-0 left-0 right-0 border-t bg-white p-5">
  <div className="flex gap-3">

    <button
      type="button"
      onClick={() => {
        setMobileCategory("");
        setMobileBrand("");
        setMobileSort("");
      }}
      className="flex-1 rounded-xl border border-gray-300 py-3"
    >
      Reset
    </button>

    <button
      type="button"
      className="flex-1 rounded-xl bg-[#8B1E2D] py-3 font-medium text-white"
    >
      Show Products
    </button>

  </div>
</div>
</div>
    </div>
  </div>
)}

</div>

{/* Desktop */}

<div className="hidden md:block">

  <SearchBar />

  <CategoryFilter
    categories={categories}
  />

  <BrandFilter
    brands={brands}
  />

  <ActiveFilters />

</div>

<ShopToolbar
  total={total}
/>

<ProductGrid
  products={products}
/>

<Pagination
  page={page}
  totalPages={totalPages}
/>
      </main>

      <Footer />
    </>
  );
}