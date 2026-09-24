"use client";

import ProductCard from "./ProductCard";

export default function ProductGridMobile({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4 w-full [&>div]:w-full [&>div]:snap-align-none [&_.aspect-\[4\/5\]]:!aspect-[4/9]">
      {products.map(({ node }: any) => (
        <ProductCard key={node.id} node={node} />
      ))}
    </div>
  );
}
