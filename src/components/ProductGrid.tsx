"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24">
      {products.map(({ node }: any) => (
        <ProductCard key={node.id} node={node} />
      ))}
    </div>
  );
}
