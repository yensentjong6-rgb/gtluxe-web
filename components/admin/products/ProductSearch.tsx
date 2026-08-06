"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(
    searchParams.get("search") ?? ""
  );

  function handleSearch(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (keyword) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }

    router.push(`/admin/products?${params.toString()}`);
  }

  return (
    <form
  onSubmit={handleSearch}
  className="w-full"
>
  <input
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    placeholder="🔍 Search product..."
    className="w-full rounded-xl border border-gray-300 px-4 py-2"
  />
</form>
  );
}