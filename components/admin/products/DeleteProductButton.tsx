"use client";

import { useState } from "react";

import { deleteProduct } from "@/features/products/actions/delete-product";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  productId: string;
};

export default function DeleteProductButton({
  productId,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const result = await deleteProduct(productId);

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Product deleted successfully.");

    location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700">
  Delete
</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Product
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this product?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}