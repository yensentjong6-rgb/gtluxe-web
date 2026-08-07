import PageHeader from "@/components/admin/PageHeader";
import BrandPage from "@/features/brands/components/BrandPage";
import { createClient } from "@/lib/supabase/server";

export default async function BrandsPage() {
  const supabase = await createClient();

  const { data: brands, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Brands"
        description="Manage all luxury brands."
      />

      <BrandPage brands={brands ?? []} />
    </div>
  );
}