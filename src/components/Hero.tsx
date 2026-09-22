"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    for (let i = 1; i <= 66; i++) {
      const img = new Image();
      img.src = `/hero-fabric_frames/frame_${String(i).padStart(3, '0')}.jpg`;
      imagesRef.current.push(img);
    }

    imagesRef.current[0].onload = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        ctx.drawImage(imagesRef.current[0], 0, 0, 1920, 1080);
      }
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(65, Math.floor(latest * 66));
    const ctx = canvasRef.current?.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (ctx && img && img.complete) {
      ctx.drawImage(img, 0, 0, 1920, 1080);
    }
  });
  return (
    <section className="relative w-full h-[100dvh] md:h-screen bg-[#f2ece4] border-b border-[#EAE2D6] overflow-hidden">
      {/* Scroll-Driven Canvas Background */}
      <canvas 
        ref={canvasRef} 
        width={1920} 
        height={1080} 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" 
      />

      {/* Overlay Content locked to the section */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex flex-col">
        
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
              className="text-5xl lg:text-7xl font-serif text-[#BA2461] mb-6 leading-tight drop-shadow-sm max-w-3xl"
            >
              100% Cotton Kurtis & Ethnic Wear for Everyday Comfort
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-[#27272A] mb-10 font-serif drop-shadow-sm"
            >
              Hand Block Prints • Kalamkari • Ajrakh • Straight Cut Kurtis • Palazzos
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-row flex-wrap gap-4 mb-16"
            >
              <a 
                href="#products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] font-sans tracking-widest text-xs uppercase transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Shop New Arrivals
              </a>
              <a 
                href="#categories" 
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#BA2461] text-[#BA2461] hover:bg-[#BA2461]/5 font-sans tracking-widest text-xs uppercase transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                Explore Collections
              </a>
            </motion.div>

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
        <div className="block md:hidden h-full relative pointer-events-none z-10">
          <div className="absolute bottom-10 left-4 right-4 z-10 flex flex-col items-center text-center pointer-events-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-3xl font-serif text-[#BA2461] mb-4 leading-tight drop-shadow-sm px-2"
            >
              100% Cotton Kurtis & Ethnic Wear for Everyday Comfort
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-sm text-[#27272A] mb-6 font-serif drop-shadow-sm px-4"
            >
              Hand Block Prints • Kalamkari • Ajrakh • Straight Cut Kurtis • Palazzos
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-row justify-center gap-2 w-full px-2"
            >
              <a 
                href="#products" 
                className="flex-1 inline-flex items-center justify-center py-3 px-2 bg-[#BA2461] text-[#FDFBF7] hover:bg-[#951C4D] font-sans tracking-widest text-[10px] sm:text-xs uppercase transition-colors duration-300 shadow-lg text-center"
              >
                Shop New
              </a>
              <a 
                href="#categories" 
                className="flex-1 inline-flex items-center justify-center py-3 px-2 bg-transparent border border-[#BA2461] text-[#BA2461] hover:bg-[#BA2461]/5 font-sans tracking-widest text-[10px] sm:text-xs uppercase transition-colors duration-300 shadow-sm text-center"
              >
                Explore All
              </a>
            </motion.div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
