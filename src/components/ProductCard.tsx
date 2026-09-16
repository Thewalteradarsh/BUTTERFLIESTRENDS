"use client";

import Image from "next/image";
import { useState } from "react";
import { createCartAndGetCheckoutUrl } from "@/lib/actions";
import { motion } from "framer-motion";

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
    <div className="flex flex-col group cursor-pointer w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE2D6] mb-6">
        <motion.div 
          className="w-full h-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover object-center"
          />
        </motion.div>
        
        {/* Quick Add Button overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={loading}
            className={`w-full py-3 bg-[#631828] text-[#FDFBF7] hover:bg-[#4A111D] transition-colors duration-500 font-sans tracking-widest text-xs uppercase flex justify-center items-center shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Adding..." : "Quick Add"}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <p className="text-xs tracking-widest text-[#27272A]/70 uppercase mb-2">New Arrival</p>
        <h3 className="text-lg font-serif text-[#27272A] mb-2 line-clamp-1" title={node.title}>{node.title}</h3>
        <p className="text-[#27272A] font-serif text-md">₹{Number(price).toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}
