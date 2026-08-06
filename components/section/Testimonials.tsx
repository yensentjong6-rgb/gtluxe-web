export default function Testimonials() {
    const reviews = [
  {
    name: "Jessica",
    review: "Amazing quality and excellent service. Highly recommended.",
  },
  {
    name: "Michelle",
    review: "Packaging was beautiful and the product arrived in perfect condition.",
  },
  {
    name: "Cindy",
    review: "I've been shopping with GTLUXE for years. Always satisfied.",
  },
];
  return (
    <section className="py-24 bg-[#faf8f5]">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-serif text-center text-black">
          What Our Clients Say
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Trusted by luxury lovers across Indonesia.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-16">

  {reviews.map((item) => (

    <div
      key={item.name}
      className="bg-white rounded-2xl shadow-sm border p-7"
    >

      <div className="text-[#8B1E2D] text-2x1 mb-4">
        ★★★★★
      </div>

      <p className="text-gray-600 leading-6">
        "{item.review}"
      </p>

      <h3 className="mt-8 font-serif text-xl text-[#222]">
        {item.name}
      </h3>

    </div>

  ))}

</div>

      </div>

    </section>
  );
}