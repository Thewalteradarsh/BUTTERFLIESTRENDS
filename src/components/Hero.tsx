"use client";

import { motion } from "framer-motion";
import ImageSequence from "./ImageSequence";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#FDFBF7] border-b border-[#EAE2D6]">
      {/* Scroll track with sticky canvas */}
      <div className="relative w-full z-0">
        <ImageSequence />
      </div>

      {/* Overlay Content locked to the top of the section */}
      <div className="absolute top-0 left-0 w-full h-[200vh] md:h-[300vh] pointer-events-none z-10 flex flex-col">
        {/* Sticky container keeps text in view while scrolling the canvas */}
        <div className="sticky top-0 h-screen w-full relative">
          
          {/* Mobile Gradient Overlay (Bottom 40%) */}
          <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent md:hidden z-0" />
          {/* Desktop Layout */}
          <div className="hidden md:flex h-full items-center justify-start max-w-7xl mx-auto px-8 w-full pointer-events-auto relative z-10">
            <div className="flex flex-col items-start text-left max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs text-[#27272A]/70 uppercase tracking-widest font-sans mb-6 font-semibold"
              >
                Fashion For A Brighter You
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-7xl lg:text-8xl font-serif text-[#BA2461] mb-8 leading-tight drop-shadow-sm"
              >
                Let Your Style <br /> Take Flight
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-[#27272A] mb-12 font-serif drop-shadow-sm"
              >
                Trendy • Elegant • Comfortable
              </motion.p>
              <motion.a 
                href="#products" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center justify-center px-10 py-4 bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] font-sans tracking-widest text-xs uppercase transition-colors duration-300 mb-16 shadow-lg hover:shadow-xl"
              >
                Explore Collection
              </motion.a>

              {/* Trust Items */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-row gap-8 w-full border-t border-[#BA2461]/20 pt-8"
              >
                <div className="flex items-center text-[#27272A]">
                  <span className="text-xs uppercase tracking-widest font-sans drop-shadow-sm">Trendy Collections</span>
                </div>
                <div className="flex items-center text-[#27272A]">
                  <span className="text-xs uppercase tracking-widest font-sans drop-shadow-sm">Premium Quality</span>
                </div>
                <div className="flex items-center text-[#27272A]">
                  <span className="text-xs uppercase tracking-widest font-sans drop-shadow-sm">For Every Occasion</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="block md:hidden h-[100dvh] relative pointer-events-none z-10">
            <div className="absolute bottom-10 left-4 right-4 z-10 flex flex-col items-center text-center pointer-events-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-4xl font-serif text-[#BA2461] mb-4 leading-tight drop-shadow-sm"
              >
                Let Your Style <br /> Take Flight
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-sm text-[#27272A] mb-8 font-serif drop-shadow-sm"
              >
                Trendy • Elegant • Comfortable
              </motion.p>
              <motion.a 
                href="#products" 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="inline-flex items-center justify-center w-full py-4 bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] font-sans tracking-widest text-xs uppercase transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Collection
              </motion.a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
