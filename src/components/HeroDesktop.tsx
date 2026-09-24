"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroDesktop() {
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
    <section ref={containerRef} className="relative h-[300vh] bg-[#f2ece4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Scroll-Driven Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
        
        {/* Overlay Content locked to the section */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex flex-col">
          <div className="flex h-full items-center justify-start max-w-7xl mx-auto px-8 w-full pointer-events-auto relative z-10">
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
        </div>
      </div>
    </section>
  );
}
