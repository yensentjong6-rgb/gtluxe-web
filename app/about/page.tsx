import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

    <main className="bg-white pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Hero */}
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
            About GTLUXE
          </p>

          <h1 className="mt-5 font-serif text-5xl leading-tight text-gray-900">
            Curated Luxury
            <br />
            Since 2018
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Thoughtfully curated luxury collections for timeless style,
            premium craftsmanship, and a refined shopping experience.
          </p>
        </section>

        {/* Story */}
        <section className="mx-auto mt-28 max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-gray-900">
            Our Story
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            Since 2018, GTLUXE has been dedicated to curating luxury-inspired
            fashion with a focus on timeless design, premium craftsmanship,
            and exceptional customer service.
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every collection is carefully selected to bring elegance,
            confidence, and everyday sophistication while delivering a
            seamless shopping experience for our customers.
          </p>
        </section>

        {/* Values */}
        <section className="mt-32">
          <div className="text-center">
            <h2 className="font-serif text-3xl text-gray-900">
              Our Values
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-gray-200 p-8 text-center">
              <div className="text-4xl">✨</div>

              <h3 className="mt-5 font-semibold text-lg">
                Curated Collection
              </h3>

              <p className="mt-3 text-gray-600">
                Carefully selected timeless pieces for every occasion.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 text-center">
              <div className="text-4xl">⭐</div>

              <h3 className="mt-5 font-semibold text-lg">
                Premium Quality
              </h3>

              <p className="mt-3 text-gray-600">
                Crafted with attention to detail and refined quality.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 text-center">
              <div className="text-4xl">🚚</div>

              <h3 className="mt-5 font-semibold text-lg">
                Secure Shipping
              </h3>

              <p className="mt-3 text-gray-600">
                Reliable packaging and secure delivery for every order.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-8 text-center">
              <div className="text-4xl">💬</div>

              <h3 className="mt-5 font-semibold text-lg">
                Personal Service
              </h3>

              <p className="mt-3 text-gray-600">
                Friendly and responsive support whenever you need us.
              </p>
            </div>

          </div>
        </section>

        {/* Why GTLUXE */}
        <section className="mt-32">
          <div className="grid gap-10 text-center md:grid-cols-2 lg:grid-cols-4">

            <div>
              <div className="font-serif text-5xl text-[#8B1E2D]">
                8+
              </div>

              <p className="mt-4 text-gray-600">
                Years of Experience
              </p>
            </div>

            <div>
              <div className="font-serif text-5xl text-[#8B1E2D]">
                Premium
              </div>

              <p className="mt-4 text-gray-600">
                Craftsmanship
              </p>
            </div>

            <div>
              <div className="font-serif text-5xl text-[#8B1E2D]">
                Curated
              </div>

              <p className="mt-4 text-gray-600">
                Collection
              </p>
            </div>

            <div>
              <div className="font-serif text-5xl text-[#8B1E2D]">
                Trusted
              </div>

              <p className="mt-4 text-gray-600">
                Customer Service
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="mt-36 text-center">

          <h2 className="font-serif text-4xl text-gray-900">
            Discover Timeless Luxury
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
            Explore carefully curated collections crafted for modern elegance.
          </p>

          <Link
            href="/shop"
            className="mt-10 inline-flex rounded-full bg-[#8B1E2D] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
          >
            Explore Collection
          </Link>

        </section>

      </div>
    </main>

    <Footer />
    </>
  );
}