"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ node }: { node: any }) {
  const price = node.priceRange?.minVariantPrice?.amount || node.variants?.edges?.[0]?.node?.price?.amount || "0";
  const imageUrl = node.images?.edges?.[0]?.node?.url || '/hero-kurti.png.png';
  const imageAlt = node.images?.edges?.[0]?.node?.altText || node.title;

  return (
    <div className="flex flex-col h-full group cursor-pointer shrink-0 w-[75vw] sm:w-[45vw] md:w-full snap-start">
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
          <Link href={`/products/${node.handle}`}>
            <button 
              className="w-full py-3 bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] transition-colors duration-500 font-sans tracking-widest text-xs uppercase flex justify-center items-center shadow-lg rounded-md"
            >
              SELECT SIZE
            </button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow justify-between items-center text-center w-full px-1">
        <div className="flex flex-col items-center w-full">
          <p className="text-[10px] md:text-xs tracking-widest text-[#27272A]/70 uppercase mb-1 md:mb-2">New Arrival</p>
          <Link href={`/products/${node.handle}`} className="hover:text-[#BA2461] transition-colors w-full">
            <h3 className="text-sm line-clamp-2 min-h-[2.5rem] mt-1 mb-2 md:text-sm lg:text-lg font-serif text-[#27272A] w-full" title={node.title}>{node.title}</h3>
          </Link>
          <p className="text-[#27272A] font-serif text-sm font-semibold md:text-base md:font-normal">₹{Number(price).toLocaleString('en-IN')}</p>
        </div>
        
        {/* Mobile Add to Cart Button (Mobile Only) */}
        <Link href={`/products/${node.handle}`} className="w-full md:hidden mt-auto pt-3">
          <button 
            className="w-full py-2 bg-[#b8325a] text-white rounded-md text-xs font-semibold mt-auto hover:bg-[#951C4D] transition-colors"
          >
            SELECT SIZE
          </button>
        </Link>
      </div>
    </div>
  );
}
