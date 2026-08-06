import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="text-center">

          <h2 className="text-4xl font-serif text-[#222]">
            GTLUXE
          </h2>

          <p className="text-gray-500 mt-4">
            Curated Luxury Fashion Since 2018
          </p>

        </div>

        <div className="mt-12 flex justify-center gap-12 text-[#222]">

  <Link
    href="/shop"
    className="transition hover:text-[#8B1E2D]"
  >
    Shop
  </Link>

  <Link
    href="/about"
    className="transition hover:text-[#8B1E2D]"
  >
    About
  </Link>

  <Link
    href="/contact"
    className="transition hover:text-[#8B1E2D]"
  >
    Contact
  </Link>

</div>

        <div className="flex justify-center gap-10 mt-10 text-[#8B1E2D]">

          <a href="https://wa.me/628111877090">
            WhatsApp
          </a>

          <a
            href="https://instagram.com/gtluxury.jkt2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

        </div>

        <div className="text-center mt-14 text-sm text-gray-400">

          © 2026 GTLUXE. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}