"use client";

import Image from "next/image";
import { useState } from "react";
import { heicTo } from "heic-to";
import type { ProductImage } from "@/types/product-image";

type ImageUploaderProps = {
  title?: string;
  images: ProductImage[];
  onChange: React.Dispatch<React.SetStateAction<ProductImage[]>>;
};

export default function ImageUploader({
  title = "Images",
  images,
  onChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const convertIfNeeded = async (file: File): Promise<File> => {
    const isHEIC =
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif") ||
      file.type === "image/heic" ||
      file.type === "image/heif";

    if (!isHEIC) {
      return file;
    }

    const jpegBlob = await heicTo({
      blob: file,
      type: "image/jpeg",
      quality: 0.92,
    });

    const imageUrl = URL.createObjectURL(jpegBlob);

    try {
      const image = new window.Image();

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = reject;
        image.src = imageUrl;
      });

      const canvas = document.createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas tidak tersedia.");
      }

      context.drawImage(image, 0, 0);

      const webpBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/webp", 0.92);
      });

      if (!webpBlob) {
        throw new Error("Gagal mengubah HEIC menjadi WebP.");
      }

      const newName = file.name
        .replace(/\.(heic|heif)$/i, "")
        .replace(/\s+/g, "-");

      return new File([webpBlob], `${newName}.webp`, {
        type: "image/webp",
      });
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length === 0) return;

    setUploading(true);

    try {
      const convertedFiles: File[] = [];

      for (const file of selectedFiles) {
        const converted = await convertIfNeeded(file);
        convertedFiles.push(converted);
      }

      const formData = new FormData();

      convertedFiles.forEach((file) => {
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

      const selected = result.urls.map(
        (url: string, index: number) => ({
          preview: url,
          url,
          isCover: images.length === 0 && index === 0,
          sortOrder: images.length + index,
        })
      );

      onChange((prev) => [...prev, ...selected]);
    } catch (error) {
      console.error("Image upload error:", error);

      alert(
        "Gagal memproses gambar. Silakan coba lagi."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    onChange((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((image, newIndex) => ({
          ...image,
          isCover: newIndex === 0,
          sortOrder: newIndex,
        }))
    );
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload one or more product images.
        </p>
      </div>

      {/* Upload */}
      <label
        className={`
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
          ${uploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <div className="text-center">

          {uploading ? (
            <>
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#8B1E2D]" />

              <p className="text-lg font-medium">
                Processing images...
              </p>

              <p className="mt-2 text-sm text-gray-500">
                HEIC akan dikonversi otomatis
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium">
                Drag images here
              </p>

              <p className="mt-2 text-sm text-gray-500">
                or click to upload
              </p>

              <p className="mt-2 text-xs text-gray-400">
                JPG, PNG, WEBP, HEIC
              </p>
            </>
          )}

        </div>

        <input
          type="file"
          multiple
          accept="
            image/jpeg,
            image/png,
            image/webp,
            image/heic,
            image/heif,
            .jpg,
            .jpeg,
            .png,
            .webp,
            .heic,
            .heif
          "
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {/* Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {images.map(({ file, preview }, index) => (
            <div
              key={`${preview}-${index}`}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeImage(index)}
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

              {/* Cover */}
              {index === 0 && (
                <div className="absolute left-2 top-2 z-10 rounded-full bg-[#8B1E2D] px-3 py-1 text-xs font-medium text-white">
                  Cover
                </div>
              )}

              {/* Image */}
              <Image
                src={preview}
                alt={`Product ${index + 1}`}
                width={300}
                height={300}
                className="aspect-square w-full object-cover"
              />

              {/* Filename */}
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