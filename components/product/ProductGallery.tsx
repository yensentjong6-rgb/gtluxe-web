"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  function nextImage() {
  setCurrentIndex((prev) =>
    prev === images.length - 1 ? 0 : prev + 1
  );
}

function previousImage() {
  setCurrentIndex((prev) =>
    prev === 0 ? images.length - 1 : prev - 1
  );
}
  const sliderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSelectedImage(images[0] ?? "");
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        {/* Main Image */}
        <div className="overflow-hidden rounded-2xl bg-[#F8F6F3]">
          <Image
            src={selectedImage}
            onClick={() => setFullscreen(true)}
            alt={name}
            width={800}
            height={1000}
            className="w-full cursor-zoom-in rounded-2xl object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="mt-5 flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                selectedImage === image
                  ? "border-[#8B1E2D]"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={image}
                alt={`${name} ${index + 1}`}
                width={80}
                height={80}
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile */}
<div className="lg:hidden">

  <div
  ref={sliderRef}
  onScroll={(e) => {
    const width = e.currentTarget.clientWidth;

    const index = Math.round(
      e.currentTarget.scrollLeft / width
    );

    setCurrentIndex(index);
  }}
  className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
>
  <div className="mt-5 flex justify-center gap-2">
  {images.map((_, index) => (
    <div
      key={index}
      className={`h-2 rounded-full transition-all ${
        currentIndex === index
          ? "w-6 bg-[#8B1E2D]"
          : "w-2 bg-gray-300"
      }`}
    />
  ))}
</div>

    {images.map((image, index) => (
      <div
        key={index}
        className="w-full flex-shrink-0 snap-center"
      >
        <div className="overflow-hidden rounded-2xl bg-[#F8F6F3]">
          <Image
            src={image}
            onClick={() => {
  setCurrentIndex(index);
  setFullscreen(true);
}}
            alt={`${name} ${index + 1}`}
            width={800}
            height={800}
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>
    ))}
  </div>

</div>
{fullscreen && (
  <div
    className="fixed inset-0 z-[999] bg-black"
    onClick={() => setFullscreen(false)}
  >
    <button
      className="absolute right-5 top-5 z-10 text-4xl text-white"
    >
      ×
    </button>

    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
  {images.map((_, index) => (
    <div
      key={index}
      className={`h-2 rounded-full transition-all ${
        currentIndex === index
          ? "w-6 bg-white"
          : "w-2 bg-white/40"
      }`}
    />
  ))}
</div>

    <div
  className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
  style={{
    WebkitOverflowScrolling: "touch",
  }}
  onScroll={(e) => {
    const width = e.currentTarget.clientWidth;

    const index = Math.round(
      e.currentTarget.scrollLeft / width
    );

    setCurrentIndex(index);
  }}
>
  {images.map((image, index) => (
    <div
      key={index}
      className="flex w-full flex-shrink-0 snap-center items-center justify-center"
    >
      <Image
        src={image}
        alt={`${name} ${index + 1}`}
        width={1200}
        height={1200}
        className="max-h-screen w-full object-contain"
      />
    </div>
  ))}
</div>
  </div>
)}
    </>
  );
}