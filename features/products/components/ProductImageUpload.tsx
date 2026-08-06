"use client";

import { UploadCloud } from "lucide-react";

type ProductImageUploadProps = {
    image: File | null;
    imageUrl?: string | null;
    onChange: (file: File | null) => void;
};

export default function ProductImageUpload({
  image,
  onChange,
}: ProductImageUploadProps) {

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

if (!file) return;

onChange(file);
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Images
      </h2>

      <label
        className="
          flex
          h-52
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-lg
          border-2
          border-dashed
          hover:bg-muted/30
        "
      >
        <UploadCloud className="mb-3 h-10 w-10 text-muted-foreground" />

        <p className="font-medium">
          Click to upload
        </p>

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </label>

      {image && (
  <img
    src={URL.createObjectURL(image)}
    alt=""
    className="mt-4 rounded-lg border"
  />
)}
    </div>
  );
}