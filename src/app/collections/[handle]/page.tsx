import { getShopifyCollection } from "@/lib/shopify";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";

export default async function CollectionPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const collection = await getShopifyCollection(params.handle);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen py-32 px-4 md:px-8 max-w-7xl mx-auto bg-[#FDFBF7]">
      <h1 className="text-4xl md:text-5xl font-serif text-center mb-12 text-[#BA2461]">
        {collection.title}
      </h1>
      
      {collection.products?.edges?.length > 0 ? (
        <ProductGrid products={collection.products.edges} />
      ) : (
        <p className="text-center text-[#27272A]/70">No products found in this collection.</p>
      )}
    </main>
  );
}
