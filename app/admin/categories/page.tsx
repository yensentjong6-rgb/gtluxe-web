import PageHeader from "@/components/admin/PageHeader";
import CategoryPage from "@/features/categories/components/CategoryPage";
import { createClient } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Categories"
        description="Manage all product categories."
      />

      <CategoryPage
        categories={categories ?? []}
      />
    </div>
  );
}