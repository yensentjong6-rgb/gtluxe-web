import { createClient } from "@/lib/supabase/server";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/section/Hero";
import Featured from "@/components/section/Featured";
import NewArrival from "@/components/section/NewArrival";
import WhyChoose from "@/components/section/WhyChoose";
import Testimonials from "@/components/section/Testimonials";
import InstagramGallery from "@/components/section/InstagramGallery";
import Footer from "@/components/layout/Footer";

export default async function Home() {
  const supabase = await createClient();

  const { data: featuredProducts } = await supabase
    .from("products")
    .select(`
      *,
      brands(name),
      categories(name)
    `)
    .eq("is_active", true)
    .eq("is_featured", true)
    .limit(8);

  return (
    <>
      <Navbar />
      <Hero />
      <Featured />

      <NewArrival
        products={featuredProducts ?? []}
      />

      <WhyChoose />
      <Testimonials />
      <InstagramGallery />
      <Footer />
    </>
  );
}