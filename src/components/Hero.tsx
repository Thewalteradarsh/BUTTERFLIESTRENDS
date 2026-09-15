"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-[#FDFBF9] w-full min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left Column Content */}
        <div className="flex-1 flex flex-col items-start text-left">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-4"
          >
            FASHION FOR A BRIGHTER YOU
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 font-bold leading-tight"
          >
            Let Your Style <br className="hidden md:block"/> Take Flight
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 mb-8 font-medium"
          >
            Trendy | Elegant | Comfortable
          </motion.p>
          <motion.a 
            href="#products" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#800020] text-white font-medium text-lg rounded hover:bg-[#600018] transition-colors shadow-md hover:shadow-xl duration-300 mb-12"
          >
            Explore Collection <span className="ml-2">→</span>
          </motion.a>

          {/* Trust Items */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full border-t border-gray-200 pt-8"
          >
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-sm font-medium">Trendy Collections</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span className="text-sm font-medium">Made for Every Occasion</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column Image */}
        <div className="flex-1 relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/hero-kurti.png.png"
            alt="Butterflies Trends Kurti"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
