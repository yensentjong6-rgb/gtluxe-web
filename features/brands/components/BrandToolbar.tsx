"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onAdd: () => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function BrandToolbar({
  onAdd,
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          All Brands
        </h2>

        <p className="text-sm text-muted-foreground">
          Create and manage your luxury brands.
        </p>
      </div>

      <div className="flex items-center gap-3">
  <Input
    placeholder="Search brand..."
    value={search}
    onChange={(e) => onSearchChange(e.target.value)}
    className="w-64"
  />

  <Button onClick={onAdd}>
    <Plus className="mr-2 h-4 w-4" />
    Add Brand
  </Button>
</div>
    </div>
  );
}