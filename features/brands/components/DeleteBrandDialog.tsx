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
import { deleteBrand } from "../actions/delete-brand";
import { toast } from "sonner";

import type { Brand } from "../types/brand";

type DeleteBrandDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand?: Brand | null;
};

export default function DeleteBrandDialog({
  open,
  onOpenChange,
  brand,
}: DeleteBrandDialogProps) {

    const handleDelete = async () => {
  if (!brand) return;

  const result = await deleteBrand(brand.id);

  if (!result.success) {
    toast.error(result.message ?? "Failed to delete brand");
    return;
  }

  toast.success("Brand deleted successfully");

  onOpenChange(false);
};

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Brand
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this brand?
            This action cannot be undone.
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