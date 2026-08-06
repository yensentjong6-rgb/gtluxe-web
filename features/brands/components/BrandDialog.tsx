"use client";
import BrandForm from "./BrandForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Brand } from "../types/brand";

type BrandDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Brand | null;
};

export default function BrandDialog({
  open,
  onOpenChange,
  initialData,
}: BrandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Brand</DialogTitle>

          <DialogDescription>
            Create a new luxury brand.
          </DialogDescription>
        </DialogHeader>

        <BrandForm
  initialData={initialData ?? undefined}
  onSuccess={() => onOpenChange(false)}
/>
      </DialogContent>
    </Dialog>
  );
}