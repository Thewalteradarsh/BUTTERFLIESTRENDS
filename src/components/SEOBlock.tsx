import React from "react";
import Image from "next/image";

export default function SEOBlock() {
  return (
    <section className="py-24 px-4 bg-[#FDFBF7] border-t border-[#EAE2D6]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 relative h-64 md:h-[500px] rounded-2xl overflow-hidden bg-gray-200">
           {/* Image placeholder */}
           <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-sans text-sm">
             [Image Placeholder]
           </div>
        </div>
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#BA2461]">Cotton Kurtis for Women Online</h2>
          <div className="space-y-4 font-sans text-[#27272A] leading-relaxed text-sm md:text-base">
            <p>
              Discover premium cotton kurtis, hand block printed kurtis, Kalamkari kurtis, Ajrakh kurtis, Ikat kurtis, short kurtis, palazzos, dresses, and ethnic wear designed for comfort and style.
            </p>
            <p>
              Butterflies Trends blends traditional Indian prints and silhouettes with modern designs for women who love effortless fashion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
