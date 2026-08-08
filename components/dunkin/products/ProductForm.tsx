"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { Switch } from "@/components/ui/switch";
import { createProduct } from "@/features/products/actions/create-product";
import type { ProductImage } from "@/types/product-image";
import { updateProduct } from "@/features/products/actions/update-product";

type Brand = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type Collection = {
  id: string;
  name: string;
};

type ProductFormProps = {
  brands: Brand[];
  categories: Category[];
  collections: Collection[];

  product?: {
    id: string;
    name: string;
    description: string | null;
    seo_title: string | null;
seo_description: string | null;
    price: number;
    brand_id: string;
    category_id: string;
    collection_id: string | null;
    is_featured: boolean;
    product_images: {
      id: string;
      image_url: string;
      sort_order: number;
    }[];
  };
};

export default function ProductForm({
  brands,
  categories,
  collections,
  product,
}: ProductFormProps) {

const [collectionId, setCollectionId] = useState(
  product?.collection_id ?? ""
);

const [images, setImages] = useState<ProductImage[]>(
  product?.product_images?.map((image, index) => ({
    id: image.id,

    preview: image.image_url,

    url: image.image_url,

    isCover: index === 0,

    sortOrder: image.sort_order,
  })) ?? []
);

const [name, setName] = useState(
  product?.name ?? ""
);

const [price, setPrice] = useState(
  product?.price?.toString() ?? ""
);

const [description, setDescription] = useState(
  product?.description ?? ""
);

const [brandId, setBrandId] = useState(
  product?.brand_id ?? ""
);

const [categoryId, setCategoryId] = useState(
  product?.category_id ?? ""
);

const [featured, setFeatured] = useState(
  product?.is_featured ?? false
);

const [loading, setLoading] = useState(false);

const [seoTitle, setSeoTitle] = useState(
  product?.seo_title ?? ""
);

const slugPreview = name
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "-");

const [seoDescription, setSeoDescription] = useState(
  product?.seo_description ?? ""
);

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  try {
    const payload = {
  data: {
    brand_id: brandId,
    category_id: categoryId,
    collection_id: collectionId,

    name,

    description: description || null,

    price: Number(price),

    seo_title: seoTitle || null,

    seo_description: seoDescription || null,

    is_featured: featured,

    is_active: true,
  },

  images: images
    .map((image) => image.url)
    .filter((url): url is string => url !== undefined),
};

let result;

if (product) {
  result = await updateProduct({
    id: product.id,
    ...payload,
  });
} else {
  result = await createProduct(payload);
}

console.log("Create Product Result:", result);

if (!result.success) {
  alert(result.message ?? JSON.stringify(result.errors));
  return;
}

alert(
  product
    ? "Product updated successfully!"
    : "Product created successfully!"
);

if (!product) {
  setName("");
  setPrice("");
  setDescription("");
  setBrandId("");
  setCategoryId("");
  setCollectionId("");
  setFeatured(false);
  setImages([]);
}


    console.log(result);

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!product) {
    setSeoTitle(
      name
        ? `${name} | GTLUXE`
        : ""
    );
  }
}, [name, product]);

useEffect(() => {
  if (!product) {
    setSeoDescription(description);
  }
}, [description, product]);

return (
    <form
  onSubmit={handleSubmit}
  className="space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
>
     
       <ImageUploader
  images={images}
  onChange={setImages}
/>

      {/* Product Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Product Name
        </label>

        <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Louis Vuitton Speedy 25"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
/>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

  {/* Price */}
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Price
    </label>

    <input
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  placeholder="3500000"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
/>
  </div>

  {/* Brand */}
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Brand
    </label>

    <select
  value={brandId}
  onChange={(e) => setBrandId(e.target.value)}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
>
  <option value="">
    Select Brand
  </option>

  {brands.map((brand) => (
    <option
      key={brand.id}
      value={brand.id}
    >
      {brand.name}
    </option>
  ))}
</select>
  </div>

</div>
<div className="grid grid-cols-1 gap-6 md:grid-cols-2">

  {/* Category */}
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      Category
    </label>

    <select
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
>
  <option value="">
    Select Category
  </option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>
  ))}
</select>
  </div>

  <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Collection
  </label>

  <select
    value={collectionId}
    onChange={(e) => setCollectionId(e.target.value)}
    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
  >
    <option value="">
      Select Collection
    </option>

    {collections.map((collection) => (
      <option
        key={collection.id}
        value={collection.id}
      >
        {collection.name}
      </option>
    ))}
  </select>
</div>

  {/* Featured */}
  <div>

    <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Featured Product
  </label>

  <div className="flex items-center gap-3">
    <Switch
      checked={featured}
      onCheckedChange={setFeatured}
    />

    <span className="text-sm text-gray-500">
      {featured ? "Featured" : "Not Featured"}
    </span>
  </div>
</div>
  </div>

</div>


      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
  rows={6}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Product description..."
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
/>
      </div>

      <div className="rounded-2xl border border-gray-200 p-6 space-y-6">
  <h2 className="text-lg font-semibold text-[#3D2C2E]">
    SEO
  </h2>

  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      SEO Title
    </label>

    <input
      type="text"
      value={seoTitle}
      onChange={(e) => setSeoTitle(e.target.value)}
      placeholder="Louis Vuitton Speedy 25 | GTLUXE"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      SEO Description
    </label>

    <textarea
      rows={4}
      value={seoDescription}
      onChange={(e) => setSeoDescription(e.target.value)}
      placeholder="Discover the Louis Vuitton Speedy 25 from GTLUXE..."
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8B1E2D]"
    />
  </div>
  <div className="rounded-xl border bg-white p-5">

  <p className="text-[22px] leading-7 text-[#1a0dab]">
    {seoTitle || `${name} | GTLUXE`}
  </p>

  <p className="mt-1 text-sm text-[#006621]">
    https://gtluxe.com/shop/{slugPreview}
  </p>

  <p className="mt-2 text-sm text-gray-600">
    {seoDescription ||
      description ||
      "No description yet."}
  </p>

</div>
</div>

      <button
  type="submit"
  disabled={loading}
  className="rounded-xl bg-[#8B1E2D] px-8 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
>
  {loading
  ? "Saving..."
  : product
  ? "Save Changes"
  : "Save Product"}
</button>

    </form>
  );
}