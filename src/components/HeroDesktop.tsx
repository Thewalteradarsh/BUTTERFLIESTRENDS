"use client";

import { motion } from 'framer-motion';

export default function HeroDesktop() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-[90vh] bg-[#FDFBF7] flex items-center overflow-hidden pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8 w-full relative z-10 flex flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start text-left max-w-2xl flex-1"
        >
          <motion.span variants={itemVariants} className="text-xs text-[#27272A]/70 uppercase tracking-[0.2em] font-sans mb-6 font-bold">
            Fashion For A Brighter You
          </motion.span>
          
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-serif font-bold mb-6 leading-[1.1] bg-gradient-to-r from-[#BA2461] to-[#951C4D] bg-clip-text text-transparent pb-2">
            100% Cotton Kurtis & Ethnic Wear for Everyday Comfort
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg lg:text-xl text-[#27272A]/80 mb-10 font-sans leading-relaxed max-w-xl">
            Experience everyday elegance with our premium hand-block prints, Kalamkari, Ajrakh, straight-cut kurtis, and palazzos.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-row flex-wrap gap-4 mb-16">
            <a href="#products" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#BA2461] text-white font-sans tracking-widest text-xs uppercase font-bold shadow-lg shadow-[#BA2461]/20 hover:scale-105 active:scale-95 transition-transform duration-300">
              Shop New Arrivals
            </a>
            <a href="#categories" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border border-[#EAE2D6] text-[#BA2461] font-sans tracking-widest text-xs uppercase font-bold hover:scale-105 active:scale-95 transition-transform duration-300 shadow-sm">
              Explore Collections
            </a>
          </motion.div>

          {/* Trust Items */}
          <motion.div variants={itemVariants} className="flex flex-row gap-8 w-full border-t border-[#EAE2D6] pt-8">
            <div className="flex items-center text-[#BA2461]">
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Trendy Collections</span>
            </div>
            <div className="flex items-center text-[#BA2461]">
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Premium Quality</span>
            </div>
            <div className="flex items-center text-[#BA2461]">
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold">For Every Occasion</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image Container */}
        <motion.div 
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 hidden lg:flex justify-end relative"
        >
          <div className="relative w-full max-w-[500px] xl:max-w-[550px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
             <img src="/hero-fabric_frames/frame_066.jpg" alt="Hero Collection" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
