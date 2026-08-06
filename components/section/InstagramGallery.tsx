export default function InstagramGallery() {
    const photos = [
  "/images/instagram/instagram1.jpg",
  "/images/instagram/instagram2.jpg",
  "/images/instagram/instagram3.jpg",
  "/images/instagram/instagram4.jpg",
  "/images/instagram/instagram5.jpg",
  "/images/instagram/instagram6.jpg",
];
  return (
    <section className="py-20 pb-12 bg-[#faf8f5]">

      <div className="mx-auto max-w-7xl px-6 md:px-8">

        <h2 className="text-5xl font-serif text-center text-[#222]">
          Follow @gtluxury.jkt2
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-14">
          Discover our latest collections and daily updates on Instagram.
        </p>
        
<div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
  {photos.map((photo, index) => (
    <div
      key={index}
      className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
    >
      <img
        src={photo}
        alt={`Instagram ${index + 1}`}
        className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-110"
      />
    </div>
  ))}
</div>

<div className="text-center mt-12">
  <a
    href="https://instagram.com/gtluxury.jkt2"
    target="_blank"
    className="inline-block rounded-full bg-[#8B1E2D] px-10 py-4 text-white transition hover:bg-[#6f1724] md:px-24"
  >
    View More on Instagram
  </a>
</div>

      </div>

    </section>
  );
}