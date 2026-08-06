"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "../actions/delete-product";
import { toast } from "sonner";

import type { Product } from "../types/product";

type DeleteProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
};

export default function DeleteProductDialog({
  open,
  onOpenChange,
  product,
}: DeleteProductDialogProps) {

    const handleDelete = async () => {
  if (!product) return;

  const result = await deleteProduct(product.id);

  if (!result.success) {
    toast.error(result.message ?? "Failed to delete product");
    return;
  }

  toast.success("Product deleted successfully");

  onOpenChange(false);
};

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Product
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium">
              {product?.name}
            </span>
           ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
  onClick={handleDelete}
>
  Delete
</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}