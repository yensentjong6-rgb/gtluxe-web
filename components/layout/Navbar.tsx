import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-100/80 bg-white/90 backdrop-blur-md transition-all duration-300">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group">
          <div className="font-serif text-3xl tracking-[8px] text-[#8B1E2D] transition group-hover:opacity-90">
            GTLUXE
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-10 md:flex">

          <Link
            href="/"
            className="text-sm text-gray-700 transition hover:text-[#8B1E2D]"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm text-gray-700 transition hover:text-[#8B1E2D]"
          >
            Shop
          </Link>

          <Link href="/about">About</Link>

          <Link
            href="/contact"
            className="text-sm text-gray-700 transition hover:text-[#8B1E2D]"
          >
            Contact
          </Link>

        </nav>

        {/* Mobile */}

        <Link
          href="/shop"
          className="rounded-full border border-[#8B1E2D] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B1E2D] transition duration-300 hover:bg-[#8B1E2D] hover:text-white md:hidden"
        >
          Shop →
        </Link>

      </div>

    </header>
  );
}