"use client";

import { motion } from "framer-motion";

export default function HeroMobile() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#FDFBF7] flex flex-col pt-24 pb-16 px-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col items-center text-center w-full max-w-sm mx-auto z-10 flex-grow justify-center"
      >
        {/* Image */}
        <motion.div variants={itemVariants} className="w-full relative aspect-[4/5] mb-8 rounded-2xl overflow-hidden shadow-2xl">
           <img src="/hero-fabric_frames/frame_066.jpg" alt="Hero Collection" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </motion.div>

        {/* Eyebrow */}
        <motion.span variants={itemVariants} className="text-[10px] text-[#27272A]/70 uppercase tracking-[0.2em] font-sans mb-3 font-bold">
          Fashion For A Brighter You
        </motion.span>
        
        {/* Title */}
        <motion.h1 variants={itemVariants} className="text-4xl font-serif font-bold mb-4 leading-[1.15] bg-gradient-to-r from-[#BA2461] to-[#951C4D] bg-clip-text text-transparent pb-1 px-2">
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
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
    </section>
  );
}
