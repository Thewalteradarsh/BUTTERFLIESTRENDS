"use client";

import ProductGridDesktop from "./ProductGridDesktop";
import ProductGridMobile from "./ProductGridMobile";

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <>
      <div className="block md:hidden w-full">
        <ProductGridMobile products={products} />
      </div>
      <div className="hidden md:block w-full">
        <ProductGridDesktop products={products} />
      </div>
    </>
  );
}
