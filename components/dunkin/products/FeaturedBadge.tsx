"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toggleFeatured } from "@/features/products/actions/toggle-featured";

type Props = {
  productId: string;
  featured: boolean;
};

export default function FeaturedBadge({
  productId,
  featured,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    const result = await toggleFeatured(
      productId,
      featured
    );

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={
        featured
          ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-200"
          : "rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-200"
      }
    >
      {loading
        ? "Saving..."
        : featured
        ? "Featured"
        : "Normal"}
    </button>
  );
}