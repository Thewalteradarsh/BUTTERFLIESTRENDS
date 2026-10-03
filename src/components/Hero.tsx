"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Preload images
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  useEffect(() => {
    const totalFrames = 144;
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;
    
    for (let i = 1; i <= 144; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/hero-fabric_frames/ezgif-frame-${paddedIndex}.jpg`;
      const index = i - 1;
      img.onload = () => {
        loadedImages[index] = img;
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages([...loadedImages]);
        }
      };
    }
  }, []);

  // Scroll physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 0.9], [1, 144]);

  // Render loop
  useMotionValueEvent(frameIndex, "change", (latestFrame) => {
    const frameNumber = Math.round(latestFrame);
    if (images[frameNumber]) {
       const canvas = canvasRef.current;
       const ctx = canvas?.getContext("2d");
       if (ctx && canvas) {
          // Ensure canvas dimensions match the window to prevent stretching
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(images[frameNumber], 0, 0, canvas.width, canvas.height);
       }
    }
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#FDFBF7]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover absolute inset-0 z-0"
        />
        
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 flex items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start text-left max-w-2xl"
          >
            <motion.span variants={itemVariants} className="text-[10px] md:text-xs text-[#27272A]/70 uppercase tracking-[0.2em] font-sans mb-4 md:mb-6 font-bold">
              FASHION FOR A BRIGHTER YOU
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-4 md:mb-6 leading-[1.1] text-[#BA2461] pb-1 md:pb-2">
              100% Cotton Kurtis & Ethnic Wear for Everyday Comfort
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-[15px] md:text-lg lg:text-xl text-[#27272A]/80 mb-8 md:mb-10 font-sans leading-relaxed max-w-xl">
              Hand Block Prints • Kalamkari • Ajrakh • Straight Cut Kurtis • Palazzos
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-row flex-wrap gap-4 mb-16">
              <a href="#products" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#BA2461] text-white font-sans tracking-widest text-xs uppercase font-bold shadow-lg shadow-[#BA2461]/20 hover:scale-105 active:scale-95 transition-transform duration-300">
                SHOP NEW ARRIVALS
              </a>
              <a href="/#products" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-[#BA2461] text-[#BA2461] font-sans tracking-widest text-xs uppercase font-bold hover:scale-105 active:scale-95 transition-transform shadow-sm duration-300">
                EXPLORE COLLECTIONS
              </a>
            </motion.div>

            {/* Footer row */}
            <motion.div variants={itemVariants} className="flex flex-row gap-8 w-full border-t border-[#EAE2D6] pt-8">
              <div className="flex items-center text-[#27272A]/70">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold">TRENDY COLLECTIONS</span>
              </div>
              <div className="flex items-center text-[#27272A]/70">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold">PREMIUM QUALITY</span>
              </div>
              <div className="flex items-center text-[#27272A]/70">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold">FOR EVERY OCCASION</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
