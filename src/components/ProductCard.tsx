"use client";

import Image from "next/image";
import { useState } from "react";
import { createCartAndGetCheckoutUrl } from "@/lib/actions";

export default function ProductCard({ node }: { node: any }) {
  const [loading, setLoading] = useState(false);
  const price = node.priceRange?.minVariantPrice?.amount;
  const imageUrl = node.images?.edges?.[0]?.node?.url || '/hero-kurti.png.png';
  const imageAlt = node.images?.edges?.[0]?.node?.altText || node.title;
  const variantId = node.variants?.edges?.[0]?.node?.id;

  const handleAddToCart = async () => {
    if (!variantId) {
      alert("This product is currently unavailable.");
      return;
    }
    
    setLoading(true);
    try {
      const checkoutUrl = await createCartAndGetCheckoutUrl(variantId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]" title={node.title}>{node.title}</h3>
        <p className="text-[#800020] font-serif text-xl font-bold mb-6">₹{Number(price).toLocaleString('en-IN')}</p>
        
        <div className="mt-auto">
          <button 
            onClick={handleAddToCart}
            disabled={loading}
            className={`w-full py-3 bg-[#800020] text-white font-medium rounded-lg hover:bg-[#600018] transition flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
