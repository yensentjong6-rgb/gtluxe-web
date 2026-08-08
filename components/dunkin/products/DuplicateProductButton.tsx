"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { duplicateProduct } from "@/features/products/actions/duplicate-product";

type Props = {
  productId: string;
};

export default function DuplicateProductButton({
  productId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDuplicate() {
    setLoading(true);

    const result = await duplicateProduct(productId);

console.log("Duplicate Result:", result);

if (!result.success) {
  alert(result.message);
  return;
}

router.push(`/admin/products/${result.productId}/edit`);
  }

  return (
    <button
      onClick={handleDuplicate}
      disabled={loading}
      className="rounded-lg border border-blue-300 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-50"
    >
      {loading ? "Duplicating..." : "Duplicate"}
    </button>
  );
}