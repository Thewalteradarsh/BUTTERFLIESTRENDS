"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, Variants } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function HeroMobile() {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#FDFBF7]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover absolute inset-0 z-0 pointer-events-none"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 flex flex-col items-center text-center w-full max-w-sm mx-auto flex-grow justify-center px-6"
        >
          {/* Eyebrow */}
          <motion.span variants={itemVariants} className="text-[10px] text-[#27272A]/70 uppercase tracking-[0.2em] font-sans mb-3 font-bold">
            Fashion For A Brighter You
          </motion.span>
          
          {/* Title */}
          <motion.h1 variants={itemVariants} className={`${playfair.className} text-3xl font-medium leading-snug tracking-tight text-[#c2185b] mb-4 pb-1 px-2`}>
            100% Cotton Kurtis & Ethnic Wear
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-[15px] text-[#27272A]/80 mb-8 font-sans leading-relaxed px-4">
            Experience everyday elegance with our premium hand-block prints, Kalamkari, and Ajrakh collections.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-row justify-center gap-3 w-full px-2">
            <a href="#products" className="flex-1 py-3.5 bg-[#BA2461] text-white rounded-full font-sans tracking-widest text-[10px] sm:text-xs uppercase shadow-lg shadow-[#BA2461]/20 hover:scale-[1.02] active:scale-95 transition-transform font-bold">
              Shop New
            </a>
            <a href="/#products" className="flex-1 py-3.5 bg-white border border-[#EAE2D6] text-[#BA2461] rounded-full font-sans tracking-widest text-[10px] sm:text-xs uppercase shadow-sm hover:scale-[1.02] active:scale-95 transition-transform font-bold">
              Explore All
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#BA2461]/60 mb-2 font-semibold">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#BA2461]/60">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
