"use client";

import Image from "next/image";

export default function HeroMobile() {
  return (
    <section className="relative h-[65vh] w-full overflow-hidden bg-[#f2ece4]">
      {/* Fallback Static Image for Mobile */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/hero-fabric_frames/frame_066.jpg" 
          alt="100% Cotton Kurtis" 
          fill 
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Mobile Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-0" />

      {/* Mobile Content */}
      <div className="absolute bottom-8 left-4 right-4 z-10 flex flex-col items-center text-center pointer-events-auto">
        <span className="text-[10px] text-[#27272A]/70 uppercase tracking-widest font-sans mb-3 font-semibold">
          Fashion For A Brighter You
        </span>
        <h1 className="text-3xl font-serif text-[#BA2461] mb-3 leading-tight drop-shadow-sm px-2">
          100% Cotton Kurtis & Ethnic Wear
        </h1>
        <p className="text-sm text-[#27272A] mb-5 font-serif drop-shadow-sm px-2">
          Hand Block Prints • Kalamkari • Ajrakh
        </p>
        <div className="flex flex-row justify-center gap-2 w-full px-2 max-w-sm">
          <a 
            href="#products" 
            className="flex-1 inline-flex items-center justify-center py-3 px-2 bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] font-sans tracking-widest text-xs uppercase shadow-lg text-center"
          >
            Shop New
          </a>
          <a 
            href="#categories" 
            className="flex-1 inline-flex items-center justify-center py-3 px-2 bg-transparent border border-[#BA2461] text-[#BA2461] hover:bg-[#BA2461]/5 font-sans tracking-widest text-xs uppercase shadow-sm text-center"
          >
            Explore All
          </a>
        </div>
      </div>
    </section>
  );
}
