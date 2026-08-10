import { z } from "zod";

export const productSchema = z.object({
  brand_id: z.string().uuid("Please select a brand"),

  category_id: z.string().uuid("Please select a category"),

  gender: z.enum(["Women", "Men"], {
    message: "Please select a gender",
  }),
  
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),

  description: z.string().nullable(),

  price: z.coerce
    .number()
    .min(0, "Price must be greater than or equal to 0"),

  is_featured: z.boolean(),

  is_active: z.boolean(),

  seo_title: z.string().nullable(),

  seo_description: z.string().nullable(),
});

export type ProductFormValues = z.infer<typeof productSchema>;