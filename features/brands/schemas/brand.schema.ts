import { z } from "zod";

export const brandSchema = z.object({
  name: z
    .string()
    .min(2, "Brand name must be at least 2 characters"),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters"),

  is_active: z.boolean(),
});

export type BrandFormValues = z.infer<typeof brandSchema>;