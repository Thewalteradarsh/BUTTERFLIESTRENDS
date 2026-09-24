"use client";

import ProductCard from "./ProductCard";

export default function ProductGridMobile({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 [&>div]:w-full [&>div]:snap-align-none [&_.aspect-\[4\/5\]]:!aspect-[4/9] [&_h3]:!truncate [&_h3]:!w-full [&_h3]:!block">
      {products.map(({ node }: any) => (
        <ProductCard key={node.id} node={node} />
      ))}
    </div>
  );
}
