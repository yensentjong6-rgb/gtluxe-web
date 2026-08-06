import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[80vh] md:h-screen">

      <Image
        src="/images/hero/hero-bottega.jpg"
        alt="Hero"
        fill
        priority
        className="object-cover pointer-event-none"
      />

      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1 className="text-5xl md:text-7xl font-serif tracking-[8px] md:tracking-[12px] text-white">
          GTLUXE
        </h1>
      </div>

    </section>
  );
}