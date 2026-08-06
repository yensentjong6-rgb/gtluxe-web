"use client";

import { useState } from "react";
import type { Category } from "../types/category";
import CategoryToolbar from "./CategoryToolbar";
import CategoryTable from "./CategoryTable";
import CategoryDialog from "./CategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";


type CategoryPageProps = {
  categories: Category[];
};

export default function CategoryPage(
 {
  categories,
}: CategoryPageProps) {
const [search, setSearch] = useState("");  
const [open, setOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
const [deleteOpen, setDeleteOpen] = useState(false);
const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
const filteredCategories = categories.filter((category) =>
  category.name.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="space-y-6">
      <CategoryToolbar
  search={search}
  onSearchChange={setSearch}
  onAdd={() => {
    setSelectedCategory(null);
    setOpen(true);
  }}
/>

<CategoryTable
  categories={filteredCategories}
  onEdit={(category) => {
    setSelectedCategory(category);
    setOpen(true);
  }}
  onDelete={(category) => {
    setCategoryToDelete(category);
    setDeleteOpen(true);
  }}
/>

<CategoryDialog
  open={open}
  onOpenChange={setOpen}
  initialData={selectedCategory}
/>

<DeleteCategoryDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  category={categoryToDelete}
/>
    </div>
  );
}