"use client";

import ProductCard from "./ProductCard";

export default function ProductGridMobile({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 w-full">
      {products.map(({ node }: any) => (
        <ProductCard key={node.id} node={node} />
      ))}
    </div>
  );
}
