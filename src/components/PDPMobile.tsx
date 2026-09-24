"use client";

import Image from "next/image";
import ProductForm from "@/components/ProductForm";

export default function PDPMobile({ product, images, price }: { product: any, images: any[], price: any }) {
  return (
    <div className="flex flex-col w-full">
      {/* Mobile Image Carousel */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-6 w-full pl-4">
        {images.map((edge: any, idx: number) => (
          <div key={idx} className="w-[85vw] flex-shrink-0 snap-center relative aspect-[4/9] rounded-md overflow-hidden">
            <Image
              src={edge.node.url}
              alt={edge.node.altText || product.title}
              fill
              className="object-cover object-center"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Product Details (Full Width for Thumb Reach) */}
      <div className="px-4 py-6 flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-serif text-[#27272A] mb-3 leading-tight w-full">
          {product.title}
        </h1>
        <p className="text-2xl font-serif text-[#BA2461] mb-6 w-full">
          ₹{Number(price).toLocaleString('en-IN')}
        </p>
        
        <hr className="border-[#EAE2D6] w-full mb-4" />

        {/* Interactive Form Component (Should be styled to span full width inside its component) */}
        <div className="w-full pb-4">
          <ProductForm product={product} />
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center w-full">
          <div className="flex flex-col items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a5d3b]">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span className="text-[10px] text-[#27272A]/80 font-medium">COD Available</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a5d3b]">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 12"></path>
            </svg>
            <span className="text-[10px] text-[#27272A]/80 font-medium">100% Pure Cotton</span>
          </div>
        </div>

        {/* Handcraft Disclaimer Box */}
        <div className="mt-8 p-4 bg-[#faf6f3] border border-[#e8dcd0] rounded-sm w-full">
          <h4 className="text-base font-serif text-[#8a5d3b] mb-2">Handcraft Disclaimer</h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            Please note that our products are made from cotton and are dyed using natural dyes, which may bleed during the initial few washes. Slight variations in hand block-printing and stitching may occur.
          </p>
        </div>

        {/* Description & Details */}
        <div className="mt-8 pt-6 border-t border-[#EAE2D6] w-full">
          <h3 className="text-xs font-sans tracking-widest uppercase text-[#27272A] mb-3">Product Details</h3>
          <div 
            className="prose prose-sm prose-stone text-[#27272A]/80 mb-6 max-w-none font-sans"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml || "" }}
          />
          <div className="flex flex-col gap-3 text-[10px] font-sans tracking-wide text-[#27272A]/70 uppercase">
             <p className="flex items-center gap-2"><span className="text-green-600">●</span> In Stock & Ready to Ship</p>
             <p>Free shipping on prepaid orders</p>
             <p>7-day easy replacements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
