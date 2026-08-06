import { Product } from "@/types/product";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const message = `Hi GTLUXE 👋

I'm interested in this product: ${product.name}.

Could you please let me know the latest availability?

Thank you.`;

  const whatsappUrl = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  }?text=${encodeURIComponent(message)}`;

  return (
    <div>
      <p className="uppercase tracking-[0.2em] text-gray-400">
        {product.brands?.name}
      </p>

      <h1 className="mt-3 font-serif text-5xl">
        {product.name}
      </h1>

      <div className="mt-6">
        {product.sale_price ? (
          <div className="flex items-center gap-4">
            <p className="text-3xl font-semibold text-[#8B1E2D]">
              Rp {product.sale_price.toLocaleString("id-ID")}
            </p>

            <p className="text-xl text-gray-400 line-through">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
        ) : (
          <p className="text-3xl font-semibold text-[#8B1E2D]">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        )}
      </div>

      <div className="mt-8 space-y-4 text-gray-600">
        <div className="flex justify-between border-b pb-3">
          <span>Condition</span>
          <span>Premium Quality</span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span>Category</span>
          <span>{product.categories?.name}</span>
        </div>
        
      </div>

      <p className="mt-8 leading-8 text-gray-600">
        {product.description}
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-block rounded-full bg-[#8B1E2D] px-10 py-4 text-white transition duration-300 hover:bg-[#6f1724]"
      >
        Inquire via WhatsApp →
      </a>
    </div>
  );
}