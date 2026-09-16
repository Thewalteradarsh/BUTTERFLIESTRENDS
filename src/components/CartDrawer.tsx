"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FDFBF7] text-[#27272A] z-50 shadow-2xl border-l border-[#EAE2D6] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#EAE2D6]">
              <h2 className="text-xl font-serif text-[#631828]">Your Cart</h2>
              <button 
                onClick={onClose}
                className="text-[#27272A]/70 hover:text-[#631828] transition-colors p-2"
                aria-label="Close cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items (Mock) */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col divide-y divide-[#EAE2D6]">
                {/* Mock Item 1 */}
                <div className="py-6 flex gap-4">
                  <div className="w-20 h-24 bg-[#EAE2D6] border border-[#D5C8B8] overflow-hidden shrink-0">
                    <img src="/hero-kurti.png.png" alt="Kurti" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-serif text-[#27272A] text-lg">Maroon A-Line Kurti</h3>
                      <p className="text-xs tracking-widest text-[#27272A]/70 uppercase mt-1">Size: M</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 border border-[#EAE2D6] px-3 py-1">
                        <button className="text-[#27272A]/70 hover:text-[#631828]">-</button>
                        <span className="text-sm">1</span>
                        <button className="text-[#27272A]/70 hover:text-[#631828]">+</button>
                      </div>
                      <p className="font-serif text-[#27272A]">₹1,299</p>
                    </div>
                  </div>
                </div>

                {/* Mock Item 2 */}
                <div className="py-6 flex gap-4">
                  <div className="w-20 h-24 bg-[#EAE2D6] border border-[#D5C8B8] overflow-hidden shrink-0">
                    <img src="/hero-kurti.png.png" alt="Kurti" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-serif text-[#27272A] text-lg">Straight Cut Silk</h3>
                      <p className="text-xs tracking-widest text-[#27272A]/70 uppercase mt-1">Size: L</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 border border-[#EAE2D6] px-3 py-1">
                        <button className="text-[#27272A]/70 hover:text-[#631828]">-</button>
                        <span className="text-sm">1</span>
                        <button className="text-[#27272A]/70 hover:text-[#631828]">+</button>
                      </div>
                      <p className="font-serif text-[#27272A]">₹1,899</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#EAE2D6] bg-[#FDFBF7]">
              <div className="flex justify-between text-lg mb-6">
                <span className="text-[#27272A]/70">Subtotal</span>
                <span className="font-serif text-[#631828]">₹3,198</span>
              </div>
              <p className="text-[#27272A]/60 text-xs mb-6 tracking-wide">Shipping & taxes calculated at checkout.</p>
              <button className="w-full py-4 bg-[#631828] text-[#FDFBF7] font-medium tracking-wide hover:bg-[#4A111D] transition-colors duration-300">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
