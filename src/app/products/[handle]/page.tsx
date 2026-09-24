import { getShopifyProduct } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";
import PDPDesktop from "@/components/PDPDesktop";
import PDPMobile from "@/components/PDPMobile";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> | { handle: string } }) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    return notFound();
  }

  const product = await getShopifyProduct(handle);

  if (!product) {
    return notFound();
  }

  const price = product.priceRange?.minVariantPrice?.amount;
  // If there are multiple images, we want all of them. Otherwise fallback to the mock logic.
  const images = product.images?.edges?.length > 0 
    ? product.images.edges 
    : [{ node: { url: '/hero-kurti.png.png', altText: product.title } }];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A] relative">
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </div>

      <main className="flex-grow pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="block md:hidden w-full">
          <PDPMobile product={product} images={images} price={price} />
        </div>
        <div className="hidden md:block w-full">
          <PDPDesktop product={product} images={images} price={price} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
