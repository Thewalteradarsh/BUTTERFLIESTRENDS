"use client";

import { useRef, useEffect } from 'react';
import { motion } from "framer-motion";

export default function HeroMobile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const totalFrames = 66;

  useEffect(() => {
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image();
      img.src = `/hero-fabric_frames/frame_${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          drawFrame(1);
        }
      };
      imagesRef.current[i] = img;
    }

    const setCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    setCanvasSize();
    drawFrame(1);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          
          const rect = containerRef.current.getBoundingClientRect();
          const scrollTop = -rect.top;
          const maxScroll = rect.height - window.innerHeight;
          let scrollFraction = scrollTop / maxScroll;
          scrollFraction = Math.max(0, Math.min(1, scrollFraction));
          
          const frameIndex = Math.min(
            totalFrames,
            Math.max(1, Math.floor(scrollFraction * totalFrames) + 1)
          );
          
          drawFrame(frameIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      setCanvasSize();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-[#f2ece4]">
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center">
        {/* Scroll-Driven Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />

        {/* Mobile Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-0 pointer-events-none" />

        {/* Mobile Content */}
        <div className="absolute bottom-8 left-4 right-4 z-10 flex flex-col items-center text-center pointer-events-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[10px] text-[#27272A]/70 uppercase tracking-widest font-sans mb-3 font-semibold"
          >
            Fashion For A Brighter You
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-3xl font-serif text-[#BA2461] mb-3 leading-tight drop-shadow-sm px-2"
          >
            100% Cotton Kurtis & Ethnic Wear
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm text-[#27272A] mb-5 font-serif drop-shadow-sm px-2"
          >
            Hand Block Prints • Kalamkari • Ajrakh
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-row justify-center gap-2 w-full px-2 max-w-sm"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
