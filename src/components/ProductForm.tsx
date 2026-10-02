"use client";

import { useState } from "react";
import { createCart, addToCart } from "@/lib/shopify";

export default function ProductForm({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

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

  const processCartAction = async () => {
    if (!selectedVariant) return null;
    let cartId = localStorage.getItem("shopify_cart_id");
    let checkoutUrl = "";

    // For mock variants, just return home
    if (selectedVariant.id.startsWith("mock-")) {
      return "/";
    }

    if (cartId) {
      try {
        const cart = await addToCart(cartId, [{ merchandiseId: selectedVariant.id, quantity }]);
        if (cart) {
          checkoutUrl = cart.checkoutUrl;
        } else {
          // Fallback if cart doesn't exist or expired
          const newCart = await createCart(selectedVariant.id, quantity);
          if (newCart) {
            localStorage.setItem("shopify_cart_id", newCart.id);
            checkoutUrl = newCart.checkoutUrl;
          }
        }
      } catch (err) {
        const newCart = await createCart(selectedVariant.id, quantity);
        if (newCart) {
          localStorage.setItem("shopify_cart_id", newCart.id);
          checkoutUrl = newCart.checkoutUrl;
        }
      }
    } else {
      const newCart = await createCart(selectedVariant.id, quantity);
      if (newCart) {
        localStorage.setItem("shopify_cart_id", newCart.id);
        checkoutUrl = newCart.checkoutUrl;
      }
    }
    return checkoutUrl;
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setLoading(true);
    try {
      const checkoutUrl = await processCartAction();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Shopify API rejection:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyItNow = async () => {
    if (!selectedVariant) return;
    setIsBuyingNow(true);
    try {
      const checkoutUrl = await processCartAction();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert("Failed to generate checkout link.");
      }
    } catch (error) {
      console.error("Shopify API rejection:", error);
      alert("Failed to initiate checkout. Please try again.");
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="flex flex-col mt-6">
      {sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-sm font-sans tracking-widest uppercase text-[#27272A]">Select Size</h3>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
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
                  className={`min-w-[3rem] h-10 px-4 flex items-center justify-center border rounded-md text-sm font-medium transition-colors ${
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
          <div className="mt-3">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-xs font-semibold tracking-wider text-[#27272A] underline hover:text-[#BA2461] transition-colors uppercase"
            >
              VIEW SIZE GUIDE
            </button>
          </div>
        </div>
      )}

      {/* Stock Indicator */}
      {selectedVariant && (
        <div className="mb-4">
          {(!selectedVariant.availableForSale || selectedVariant.quantityAvailable === 0) ? (
            <p className="text-sm font-medium text-red-600">Out of Stock</p>
          ) : (selectedVariant.quantityAvailable > 0 && selectedVariant.quantityAvailable <= 5) ? (
            <p className="text-sm font-medium text-orange-600">🔥 Hurry, only {selectedVariant.quantityAvailable} left in stock!</p>
          ) : (
            <p className="text-sm font-medium text-green-600">In Stock</p>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center border border-[#EAE2D6] rounded-md bg-white h-12 sm:w-32 shrink-0 overflow-hidden">
          <button onClick={decrement} className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 text-xl font-light">-</button>
          <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
          <button onClick={increment} className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 text-xl font-light">+</button>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant || loading || isBuyingNow}
          className={`flex-1 py-3 bg-white border border-[#b8325a] text-[#b8325a] rounded-md font-bold text-center tracking-widest text-xs sm:text-sm uppercase transition-colors ${
            !selectedVariant || loading || isBuyingNow ? 'opacity-70 cursor-not-allowed border-gray-400 text-gray-400' : 'hover:bg-[#faf6f3]'
          }`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      <button
        onClick={handleBuyItNow}
        disabled={!selectedVariant || loading || isBuyingNow}
        className={`w-full py-4 bg-[#b8325a] text-white rounded-md font-bold text-center tracking-widest text-xs sm:text-sm uppercase transition-colors ${
          !selectedVariant || loading || isBuyingNow ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#951C4D]'
        }`}
      >
        {!selectedVariant ? "Select a Size" : isBuyingNow ? "Processing..." : "Buy It Now"}
      </button>

      {/* Size Guide Drawer Overlay */}
      {isSizeGuideOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 transition-opacity"
          onClick={() => setIsSizeGuideOpen(false)}
        />
      )}

      {/* Size Guide Drawer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FDFBF7] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSizeGuideOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#BA2461] px-6 py-4 flex items-center justify-between shadow-sm z-10">
          <h2 className="text-xl font-serif text-[#FDFBF7] tracking-wider uppercase">Size Guide</h2>
          <button 
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-[#FDFBF7] hover:bg-black/20 transition-colors"
            aria-label="Close Size Guide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-[#27272A] font-sans">
          
          {/* Labels */}
          <div className="flex flex-col items-start gap-2 mb-8">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-[#BA2461] border border-[#BA2461] rounded-full uppercase">
              Women's Collection
            </span>
            <span className="text-xs text-[#27272A]/60 tracking-widest uppercase font-semibold">
              Measurements in Inches
            </span>
          </div>

          {/* Size Table */}
          <div className="overflow-hidden border border-[#EAE2D6] rounded-md mb-8 bg-white">
            <table className="w-full border-collapse text-xs text-center">
              <thead>
                <tr className="bg-[#BA2461] text-[#FDFBF7] tracking-wider">
                  <th className="py-3 px-2 font-semibold border-r border-[#BA2461]/20 last:border-0">SIZE</th>
                  <th className="py-3 px-2 font-semibold border-r border-[#BA2461]/20 last:border-0">SHOULDER</th>
                  <th className="py-3 px-2 font-semibold border-r border-[#BA2461]/20 last:border-0">CHEST</th>
                  <th className="py-3 px-2 font-semibold border-r border-[#BA2461]/20 last:border-0">WAIST</th>
                  <th className="py-3 px-2 font-semibold">HIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE2D6]">
                {[
                  { s: 'S', sh: '14', c: '36', w: '34', h: '39' },
                  { s: 'M', sh: '14.5', c: '38', w: '36', h: '41' },
                  { s: 'L', sh: '15', c: '40', w: '38', h: '43' },
                  { s: 'XL', sh: '15.5', c: '42', w: '40', h: '45' },
                  { s: '2XL', sh: '16', c: '44', w: '42', h: '47' },
                  { s: '3XL', sh: '17', c: '46', w: '44', h: '50' }
                ].map((row) => (
                  <tr key={row.s} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-3 px-2 font-bold border-r border-[#EAE2D6]">{row.s}</td>
                    <td className="py-3 px-2 border-r border-[#EAE2D6]">{row.sh}</td>
                    <td className="py-3 px-2 border-r border-[#EAE2D6]">{row.c}</td>
                    <td className="py-3 px-2 border-r border-[#EAE2D6]">{row.w}</td>
                    <td className="py-3 px-2">{row.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure */}
          <div className="mb-8">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-[#BA2461]">How to Measure</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#EAE2D6] p-3 rounded-md bg-white shadow-sm">
                <span className="font-bold text-[10px] tracking-widest uppercase block text-[#BA2461] mb-1">Shoulder</span>
                <span className="text-xs text-[#27272A]/80 leading-relaxed">Across back from point to point.</span>
              </div>
              <div className="border border-[#EAE2D6] p-3 rounded-md bg-white shadow-sm">
                <span className="font-bold text-[10px] tracking-widest uppercase block text-[#BA2461] mb-1">Chest</span>
                <span className="text-xs text-[#27272A]/80 leading-relaxed">Fullest part of your chest.</span>
              </div>
              <div className="border border-[#EAE2D6] p-3 rounded-md bg-white shadow-sm">
                <span className="font-bold text-[10px] tracking-widest uppercase block text-[#BA2461] mb-1">Waist</span>
                <span className="text-xs text-[#27272A]/80 leading-relaxed">Around your natural waistline.</span>
              </div>
              <div className="border border-[#EAE2D6] p-3 rounded-md bg-white shadow-sm">
                <span className="font-bold text-[10px] tracking-widest uppercase block text-[#BA2461] mb-1">Hip</span>
                <span className="text-xs text-[#27272A]/80 leading-relaxed">Fullest part of your hips.</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="border-l-4 border-[#BA2461] bg-[#BA2461]/5 p-4 rounded-r-md text-xs leading-relaxed font-medium text-[#27272A]">
            💡 Between two sizes? We recommend choosing the next size.
          </div>
          
        </div>
      </div>
    </div>
  );
}
