"use client";

import ProductCard from "./ProductCard";

export default function ProductGridDesktop({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map(({ node }: any) => (
        <ProductCard key={node.id} node={node} />
      ))}
    </div>
  );
}
