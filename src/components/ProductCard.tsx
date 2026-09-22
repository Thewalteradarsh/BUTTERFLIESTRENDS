"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createCartAndGetCheckoutUrl } from "@/lib/actions";
import { motion } from "framer-motion";

export default function ProductCard({ node }: { node: any }) {
  const [loading, setLoading] = useState(false);
  const price = node.priceRange?.minVariantPrice?.amount || node.variants?.edges?.[0]?.node?.price?.amount || "0";
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
      console.error("Shopify API rejection:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col group cursor-pointer shrink-0 w-[75vw] sm:w-[45vw] md:w-full snap-start">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE2D6] mb-3 md:mb-6">
        <Link href={`/products/${node.handle}`} className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt || node.title || "Butterflies Trends Product"}
            fill
            className="object-cover object-center"
          />
        </motion.div>
        
        </Link>
        {/* Quick Add Button overlay (Desktop Only) */}
        <div className="hidden md:block absolute bottom-0 left-0 w-full p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={loading}
            className={`w-full py-3 bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] transition-colors duration-500 font-sans tracking-widest text-xs uppercase flex justify-center items-center shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Adding..." : "Quick Add"}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <p className="text-[10px] md:text-xs tracking-widest text-[#27272A]/70 uppercase mb-1 md:mb-2">New Arrival</p>
        <Link href={`/products/${node.handle}`} className="hover:text-[#BA2461] transition-colors"><h3 className="text-xs md:text-sm lg:text-lg font-serif text-[#27272A] mb-1 md:mb-2 line-clamp-1" title={node.title}>{node.title}</h3></Link>
        <p className="text-[#27272A] font-serif text-sm font-semibold md:text-base md:font-normal">₹{Number(price).toLocaleString('en-IN')}</p>
        
        {/* Mobile Add to Cart Button (Mobile Only) */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={loading}
          className={`md:hidden w-full py-2 mt-2 text-[10px] sm:text-xs font-medium tracking-wide uppercase bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
