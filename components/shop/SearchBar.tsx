"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("search") ?? ""
  );

  // Mencegah router.replace() berjalan saat pertama kali halaman dibuka
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      // Saat search berubah, kembali ke halaman pertama
      params.delete("page");

      const url = params.toString();

      router.replace(
        url ? `/shop?${url}` : "/shop",
        { scroll: false }
      );
    }, 400);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="mb-10">
      <input
        type="text"
        placeholder="Search by brand or product..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-full border border-gray-300 px-6 py-4 text-sm outline-none transition focus:border-[#8B1E2D]"
      />
    </div>
  );
}