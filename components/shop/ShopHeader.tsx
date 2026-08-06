type ShopHeaderProps = {
  title?: string;
  description?: string;
};

export default function ShopHeader({
  title = "SHOP",
  description = "Explore Our Curated Luxury Selection",
}: ShopHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <h1 className="font-serif text-4xl text-[#3D2C2E]">
        {title}
      </h1>

      <p className="mt-4 text-gray-600">
        {description}
      </p>
    </div>
  );
}