"use client";

import { useState } from "react";
import { createCartAndGetCheckoutUrl } from "@/lib/actions";

export default function ProductForm({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Extract Size option
  const sizeOption = product.options?.find((opt: any) => opt.name.toLowerCase() === "size");
  const rawSizes = sizeOption ? sizeOption.values : [];
  
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'];
  const sizes = rawSizes.sort((a: string, b: string) => {
    const idxA = sizeOrder.indexOf(a.toUpperCase());
    const idxB = sizeOrder.indexOf(b.toUpperCase());
    return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
  });

  const variants = product.variants?.edges?.map((e: any) => e.node) || [];

  const handleSizeClick = (size: string) => {
    const variant = variants.find((v: any) => 
      v.selectedOptions.some((opt: any) => opt.name.toLowerCase() === "size" && opt.value === size)
    );
    if (variant && variant.availableForSale) {
      setSelectedVariant(variant);
    }
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setLoading(true);
    try {
      const checkoutUrl = await createCartAndGetCheckoutUrl(selectedVariant.id, quantity);
      if (checkoutUrl) {
        window.dispatchEvent(new CustomEvent("open-cart", { detail: { checkoutUrl } }));
      }
    } catch (error) {
      console.error("Shopify API rejection:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-6">
      {sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-sm font-sans tracking-widest uppercase text-[#27272A]">Select Size</h3>
            <span className="text-xs text-[#27272A]/70 underline cursor-pointer hover:text-[#BA2461]">Size Guide</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size: string) => {
              const variant = variants.find((v: any) => 
                v.selectedOptions.some((opt: any) => opt.name.toLowerCase() === "size" && opt.value === size)
              );
              const isAvailable = variant?.availableForSale;
              const isSelected = selectedVariant?.id === variant?.id;

              return (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  disabled={!isAvailable}
                  className={`min-w-[3rem] h-12 px-4 flex items-center justify-center border text-sm font-medium transition-colors ${
                    !isAvailable 
                      ? 'border-[#EAE2D6] text-gray-300 cursor-not-allowed line-through' 
                      : isSelected 
                        ? 'border-[#BA2461] bg-[#BA2461] text-[#FDFBF7]' 
                        : 'border-[#27272A] text-[#27272A] hover:border-[#BA2461] hover:text-[#BA2461]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center border border-[#EAE2D6] bg-white h-12 sm:w-32 shrink-0">
          <button onClick={decrement} className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 text-xl font-light">-</button>
          <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
          <button onClick={increment} className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 text-xl font-light">+</button>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant || loading}
          className={`flex-1 h-12 bg-[#6B4E3D] text-[#FDFBF7] font-sans tracking-widest text-xs sm:text-sm uppercase shadow-sm transition-colors ${
            !selectedVariant || loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#533b2e]'
          }`}
        >
          {!selectedVariant ? "Select a Size" : loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
