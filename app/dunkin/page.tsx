import DashboardCard from "@/components/dunkin/DashboardCard";
import PageHeader from "@/components/dunkin/PageHeader";
import {
  Package,
  Tags,
  Folder,
  Star,
  Sparkles,
} from "lucide-react";
import { getProductsCount } from "@/features/dashboard/queries/get-products-count";
import { getBrandsCount } from "@/features/dashboard/queries/get-brands-count";
import { getCategoriesCount } from "@/features/dashboard/queries/get-categories-count";
import { getFeaturedCount } from "@/features/dashboard/queries/get-featured-count";
import { getNewArrivalsCount } from "@/features/dashboard/queries/get-new-arrivals-count";
import { getLatestProducts } from "@/features/dashboard/queries/get-latest-products";
import LatestProducts from "@/components/dunkin/LatestProducts";

export default async function DashboardPage() {

const [
  products,
  brands,
  categories,
  featured,
  newArrivals,
  latestProducts,
] = await Promise.all([
  getProductsCount(),
  getBrandsCount(),
  getCategoriesCount(),
  getFeaturedCount(),
  getNewArrivalsCount(),
  getLatestProducts(),
]);   
  
  return (
    <div className="space-y-8">
      
  <PageHeader
    title="Dashboard"
    description="Welcome back to GTLUXE CMS."
  />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <DashboardCard
  title="Products"
  value={products}
  icon={Package}
/>

<DashboardCard
  title="Brands"
  value={brands}
  icon={Tags}
/>

<DashboardCard
  title="Categories"
  value={categories}
  icon={Folder}
/>

<DashboardCard
  title="Featured"
  value={featured}
  icon={Star}
/>

<DashboardCard
  title="New Arrivals"
  value={newArrivals}
  icon={Sparkles}
/>
      </div>

        <LatestProducts
  products={latestProducts} />

  
      </div>

  );
}