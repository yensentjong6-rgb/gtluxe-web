"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/types/product-image";

type ImageUploaderProps = {
  title?: string;

  images: ProductImage[];

  onChange: React.Dispatch<
    React.SetStateAction<ProductImage[]>
  >;
};

export default function ImageUploader({
  title = "Images",
  images,
  onChange,
}: ImageUploaderProps) {
  
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-[#3D2C2E]">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Upload one or more product images.
        </p>
      </div>

      <label
        className="
          flex
          h-56
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-gray-300
          bg-gray-50
          transition
          hover:border-[#8B1E2D]
          hover:bg-[#FAF7F5]
        "
      >
        <div className="text-center">
          <p className="text-lg font-medium">
            Drag images here
          </p>

          <p className="mt-2 text-sm text-gray-500">
            or click to upload
          </p>
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
  if (!e.target.files) return;

  const formData = new FormData();

  Array.from(e.target.files).forEach((file) => {
    formData.append("images", file);
  });

  const response = await fetch("/api/upload-product-images", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    alert(result.message);
    return;
  }

  const selected = result.urls.map((url: string, index: number) => ({
    preview: url,
    url,
    isCover: index === 0,
    sortOrder: index,
  }));

  onChange(selected);
}}
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map(({ file, preview }, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <button
  type="button"
  onClick={() =>
    onChange((prev) =>
  prev.filter((_, i) => i !== index)
)
  }
  className="
    absolute
    right-2
    top-2
    z-20
    flex
    h-7
    w-7
    items-center
    justify-center
    rounded-full
    bg-white/90
    text-gray-700
    shadow
    transition
    hover:bg-red-600
    hover:text-white
  "
>
  ✕
</button>
              {index === 0 && (
                <div className="absolute left-2 top-2 z-10 rounded-full bg-[#8B1E2D] px-2 py-1 text-xs text-white">
                  Cover
                </div>
              )}

              <Image
                src={preview}
                alt={`Product ${index + 1}`}
                width={300}
                height={300}
                className="aspect-square w-full object-cover"
              />

              <div className="border-t p-2">
                <p className="truncate text-xs text-gray-500">
                  {file?.name ?? "Uploaded Image"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}