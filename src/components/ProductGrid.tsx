"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-0 md:grid-cols-4 md:gap-16 lg:gap-24 md:px-0">
      {products.map(({ node }: any) => (
        <ProductCard key={node.id} node={node} />
      ))}
    </div>
  );
}
