"use client";

import Image from "next/image";

const reviews = [
  "/images/reviews/review1.jpg",
  "/images/reviews/review2.jpg",
  "/images/reviews/review3.jpg",
  "/images/reviews/review7.jpg",
  "/images/reviews/review8.jpg",
  "/images/reviews/review9.jpg",
];

export default function Testimonials() {
  return (
    <section className="bg-[#faf8f6] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[4px] text-[#8B1E2D]">
            Customer Reviews
          </p>

          <h2 className="mt-3 font-serif text-4xl text-[#222]">
            Trusted by Hundreds of Happy Customers
          </h2>

          <p className="mt-4 text-gray-500">
            Real Reviews from WhatsApp, Shopee & Tokopedia
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Image
                src={review}
                alt={`Review ${index + 1}`}
                width={600}
                height={1200}
                className="w-full"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}