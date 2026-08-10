import { createClient } from "@/lib/supabase/server";
import { PRODUCT_SELECT } from "./select";

type GetProductsParams = {
  search?: string;
  brandId?: string;
  categoryId?: string;
  gender?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export async function getProducts({
  search,
  brandId,
  categoryId,
  gender,
  sort,
  page = 1,
  limit = 12,
}: GetProductsParams = {}) {
  const supabase = await createClient();

  let query = supabase
  .from("products")
  .select(PRODUCT_SELECT, {
    count: "exact",
  })
  .eq("is_active", true);

if (search) {
  query = query.ilike("name", `%${search}%`);
}

if (brandId) {
  query = query.eq("brand_id", brandId);
}

if (categoryId) {
  query = query.eq("category_id", categoryId);
}

if (gender) {
  if (gender === "Women" || gender === "Men") {
    query = query.in("gender", [gender, "Unisex"]);
  } else {
    query = query.eq("gender", gender);
  }
}

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  switch (sort) {
  case "oldest":
    query = query.order("created_at", {
      ascending: true,
    });
    break;

  case "price-asc":
    query = query.order("price", {
      ascending: true,
    });
    break;

  case "price-desc":
    query = query.order("price", {
      ascending: false,
    });
    break;

  default:
    query = query.order("created_at", {
      ascending: false,
    });
}

const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  const total = count ?? 0;

  return {
    products: data ?? [],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}