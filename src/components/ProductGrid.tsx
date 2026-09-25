import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }) {
  if (!products?.length) return <p className="text-center py-10">No products found.</p>;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-y-12 px-4 md:px-0 w-full">
      {products.map(({ node }) => (
        <ProductCard key={node.id} node={node} />
      ))}
    </div>
  );
}
