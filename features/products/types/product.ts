export type Product = {
  id: string;

  brand_id: string;
  category_id: string;

  name: string;
  slug: string;
  description: string | null;

  price: number;
  sale_price: number | null;

  sku: string | null;
  stock: number;

  image_url: string | null;

  is_featured: boolean;
  is_new_arrival: boolean;
  is_active: boolean;

  created_at: string;
  updated_at: string;

  brands?: {
    name: string;
  } | null;

  categories?: {
    name: string;
  } | null;
};