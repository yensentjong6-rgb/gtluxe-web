"use client";

import { useState } from "react";
import type { Brand } from "../types/brand";
import BrandToolbar from "./BrandToolbar";
import BrandTable from "./BrandTable";
import BrandDialog from "./BrandDialog";
import DeleteBrandDialog from "./DeleteBrandDialog";

type BrandPageProps = {
  brands: Brand[];
};

export default function BrandPage({
  brands,
}: BrandPageProps) {
const [search, setSearch] = useState("");  
const [open, setOpen] = useState(false);
const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
const [deleteOpen, setDeleteOpen] = useState(false);
const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
const filteredBrands = brands.filter((brand) =>
  brand.name.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="space-y-6">
      <BrandToolbar
  search={search}
  onSearchChange={setSearch}
  onAdd={() => {
    setSelectedBrand(null);
    setOpen(true);
  }}
/>

<BrandTable
  brands={filteredBrands}
  onEdit={(brand) => {
    setSelectedBrand(brand);
    setOpen(true);
  }}
  onDelete={(brand) => {
    setBrandToDelete(brand);
    setDeleteOpen(true);
  }}
/>

<BrandDialog
  open={open}
  onOpenChange={setOpen}
  initialData={selectedBrand}
/>

<DeleteBrandDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  brand={brandToDelete}
/>
    </div>
  );
}