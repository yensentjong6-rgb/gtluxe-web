import { Brand } from "./brand";
import { Category } from "./category";

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

  is_featured: boolean;
  is_new_arrival: boolean;
  is_active: boolean;

  image_url: string | null;

  created_at: string;
  updated_at: string;

  brands?: Brand | null;
categories?: Category | null;

};