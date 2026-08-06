import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white pt-28 pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          {/* Hero */}
          <section className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
              Contact
            </p>

            <h1 className="mt-5 font-serif text-5xl leading-tight text-gray-900">
              We're Here to Help
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
              Have a question about our collections or need assistance with your
              order?
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-gray-600">
              We're always here to assist you with product inquiries,
              recommendations, and orders.
            </p>
          </section>

          {/* Contact Cards */}
          <section className="mx-auto mt-24 grid max-w-3xl gap-8 md:grid-cols-2">

            {/* WhatsApp */}
            <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-4xl">💬</div>

              <h2 className="mt-5 font-serif text-2xl text-gray-900">
                WhatsApp
              </h2>

              <p className="mt-4 text-gray-600">
                Chat with us for product inquiries, recommendations, and order
                assistance.
              </p>

              <a
                href="https://wa.me/628111877090"
                target="_blank"
                className="mt-8 inline-flex rounded-full bg-[#8B1E2D] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Instagram */}
            <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-4xl">📷</div>

              <h2 className="mt-5 font-serif text-2xl text-gray-900">
                Instagram
              </h2>

              <p className="mt-4 text-gray-600">
                Follow us for new arrivals, styling inspiration, and exclusive
                updates.
              </p>

              <a
                href="https://instagram.com/gtluxury.jkt2"
                target="_blank"
                className="mt-8 inline-flex w-full justify-center rounded-full border border-[#8B1E2D] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#8B1E2D] transition hover:bg-[#8B1E2D] hover:text-white"
              >
                Follow Instagram
              </a>
            </div>

          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}