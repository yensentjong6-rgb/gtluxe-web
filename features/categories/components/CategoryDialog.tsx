"use client";

import CategoryForm from "./CategoryForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Category } from "../types/category";

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Category | null;
};

export default function CategoryDialog({
  open,
  onOpenChange,
  initialData,
}: CategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Add Category"}
          </DialogTitle>

          <DialogDescription>
            {initialData
              ? "Update an existing category."
              : "Create a new product category."}
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          initialData={initialData ?? undefined}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}