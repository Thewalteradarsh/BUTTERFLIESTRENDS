"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ node }: { node: any }) {
  if (!node) return null;

  const price = node.priceRange?.minVariantPrice?.amount || node.variants?.edges?.[0]?.node?.price?.amount || "0";
  const imageUrl = node.images?.edges?.[0]?.node?.url || '/hero-kurti.png.png';
  const imageAlt = node.images?.edges?.[0]?.node?.altText || node.title;

  return (
    <Link href={`/products/${node?.handle || ''}`} className="flex flex-col min-w-0 w-full h-full overflow-hidden group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#BA2461]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE2D6] mb-3 md:mb-6">
        <motion.div 
          className="w-full h-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt || node.title || "Butterflies Trends Product"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-center"
          />
        </motion.div>
        
        {/* Quick Add Button overlay (Desktop Only) */}
        <div className="hidden md:block absolute bottom-0 left-0 w-full p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10">
          <div className="w-full py-3 bg-[#BA2461] text-[#FDFBF7] group-hover/btn:bg-[#951C4D] transition-colors duration-500 font-sans tracking-widest text-xs uppercase flex justify-center items-center shadow-lg rounded-md hover:bg-[#951C4D]">
            SELECT SIZE
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow justify-between items-center text-center w-full px-1">
        <div className="flex flex-col items-center w-full">
          <p className="text-[10px] md:text-xs tracking-widest text-[#27272A]/70 uppercase mb-1 md:mb-2">New Arrival</p>
          <h3 className="text-sm font-medium truncate w-full block transition-colors group-hover:text-[#BA2461]">{node.title}</h3>
          <p className="text-[#27272A] font-serif text-sm font-semibold md:text-base md:font-normal mt-1">₹{Number(price).toLocaleString('en-IN')}</p>
        </div>
        
        {/* Mobile Add to Cart Button (Mobile Only) */}
        <div className="w-full md:hidden mt-auto pt-3">
          <div className="w-full bg-[#b8325a] text-white py-2 mt-3 rounded-md text-sm font-semibold text-center flex items-center justify-center active:bg-[#951C4D] transition-colors">
            SELECT SIZE
          </div>
        </div>
      </div>
    </Link>
  );
}
