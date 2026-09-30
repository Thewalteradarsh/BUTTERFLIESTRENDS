"use client";

import React from "react";

export default function ProductAccordions({ product }: { product: any }) {
  const accordions = [
    {
      title: "Handcraft Disclaimer",
      content: "Please note that our products are made from cotton and are dyed using natural dyes, which may bleed during the initial few washes or rub against the skin and other light-coloured garments. Additionally, slight variations in hand block-printing and stitching may occur, which are the hallmark of authentic handmade products."
    },
    {
      title: "Product Details",
      isHtml: true,
      content: product.descriptionHtml || "<p>No description available.</p>"
    },
    {
      title: "Return and Exchange",
      content: "We offer a 7-day easy replacement policy for all our products. If you are not satisfied with your purchase, you can return it within 7 days of delivery. The product must be unused, unwashed, and in its original condition with all tags attached."
    },
    {
      title: "Care Details",
      content: "Hand wash separately in cold water using mild detergent. Do not soak. Dry in shade. Warm iron on reverse. Natural dyes may bleed slightly during the first few washes, which is normal for handcrafted textiles."
    }
  ];

  return (
    <div className="flex flex-col w-full mt-8 border-t border-[#EAE2D6]">
      {accordions.map((acc, idx) => (
        <details key={idx} className="group border-b border-[#EAE2D6] py-4">
          <summary className="flex justify-between items-center font-sans uppercase tracking-widest text-xs md:text-sm text-[#27272A] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            {acc.title}
            <span className="transition duration-300 group-open:-rotate-180">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="mt-4 text-xs md:text-sm text-[#27272A]/80 leading-relaxed font-sans">
            {acc.isHtml ? (
              <div 
                className="prose prose-sm prose-stone text-[#27272A]/80 max-w-none font-sans"
                dangerouslySetInnerHTML={{ __html: acc.content }}
              />
            ) : (
              <p>{acc.content}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
