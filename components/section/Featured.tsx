import Link from "next/link";
export default function Featured() {
  const collections = [
  {
    title: "All Collection",
    image: "/images/featured/all.jpg",
    link: "/shop",
  },
  {
    title: "Women's Collection",
    image: "/images/featured/women.jpg",
    link: "/shop?gender=Women",
  },
  {
    title: "Men's Collection",
    image: "/images/featured/men.jpg",
    link: "/shop?gender=Men",
  },
  {
    title: "Accessories",
    image: "/images/featured/accessories.jpg",
    link: "/shop?category=Accessories",
  },
];
  return (
    <section className="bg-white py-20 md:py-32">

      <div className="mx-auto max-w-7xl px-6 md:px-8">

  <h2 className="text-center font-serif text-3xl md:text-4xl tracking-[3px] md:tracking-[6px] text-gray-800">
    FEATURED COLLECTION
  </h2>

  <p className="mx-auto mt-4 mb-10 max-w-xl text-center text-sm md:text-base text-gray-500">
    Curated Luxury
    Timeless Pieces selected for Every Occasion
  </p>

  <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
  {collections.map((item) => (
    <Link
      key={item.title}
      href={item.link}
      className="group block overflow-hidden"
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-[260px] w-full rounded-xl object-cover transition duration-500 group-hover:scale-105 md:h-[420px]"
      />

      <h3 className="mt-4 text-center font-serif text-lg md:mt-6 md:text-2xl text-gray-900">
        {item.title}
      </h3>
    </Link>
  ))}
</div>

</div>

    </section>
  );
}