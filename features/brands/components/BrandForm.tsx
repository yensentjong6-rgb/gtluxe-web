"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createBrand } from "../actions/create-brand";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { updateBrand } from "../actions/update-brand";
import type { Brand } from "../types/brand";

import {
  brandSchema,
  BrandFormValues,
} from "../schemas/brand.schema";

import { slugify } from "@/features/shared/utils/slugify";

type BrandFormProps = {
  initialData?: Brand;
  onSuccess?: () => void;
};

export default function BrandForm({
  initialData,
  onSuccess,
}: BrandFormProps) {

  const {
  control,
  register,
  watch,
  setValue,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<BrandFormValues>({
  resolver: zodResolver(brandSchema),
  defaultValues: {
  name: initialData?.name ?? "",
  slug: initialData?.slug ?? "",
  is_active: initialData?.is_active ?? true,
}
});

  const brandName = watch("name") || "";

  useEffect(() => {
  setValue("slug", slugify(brandName));
}, [brandName, setValue]);

  useEffect(() => {
  if (!initialData) return;

  reset({
    name: initialData.name,
    slug: initialData.slug,
    is_active: initialData.is_active,
  });
}, [initialData, reset]);

 const onSubmit = async (data: BrandFormValues) => {
  let result;

if (initialData) {
  result = await updateBrand(initialData.id, data);
} else {
  result = await createBrand(data);
}

  if (!result.success) {
    toast.error(result.message ?? "Failed to create brand");
    return;
  }

  toast.success("Brand created successfully!");

  reset();

  onSuccess?.();
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Brand Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Brand Name</Label>

        <Input
          id="name"
          placeholder="Louis Vuitton"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>

        <Input
          id="slug"
          placeholder="louis-vuitton"
          {...register("slug")}
        />

        <p className="text-sm text-muted-foreground">
          Generated automatically, but you can edit it.
        </p>

        {errors.slug && (
          <p className="text-sm text-red-500">
            {errors.slug.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between rounded-lg border p-4">
  <div>
    <Label htmlFor="is_active">Active</Label>

    <p className="text-sm text-muted-foreground">
      Show this brand on the website.
    </p>
  </div>

  <Controller
    name="is_active"
    control={control}
    render={({ field }) => (
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    )}
  />
</div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
        >
          Cancel
        </Button>

        <Button
  variant="outline"
  size="icon"
>
  <Pencil className="h-4 w-4" />
</Button>

        <Button type="submit">
          Save Brand
        </Button>
      </div>
    </form>
  );
}