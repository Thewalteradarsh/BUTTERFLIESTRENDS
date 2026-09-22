"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  id: string;
  title: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Using local state to manage the mock cart until a global store (e.g. Zustand/Context) is implemented.
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", title: "Maroon A-Line Kurti", size: "M", price: 1299, quantity: 1, image: "/hero-kurti.png.png" },
    { id: "2", title: "Straight Cut Silk", size: "L", price: 1899, quantity: 1, image: "/hero-kurti.png.png" },
  ]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      // Remove item if quantity falls below 1
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
              <h2 className="text-xl font-serif text-[#BA2461]">Your Cart</h2>
              <button 
                onClick={onClose}
                className="text-[#27272A]/70 hover:text-[#BA2461] transition-colors p-2"
                aria-label="Close cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[#27272A]/60">
                  <p>Your cart is empty.</p>
                  <button onClick={onClose} className="px-6 py-2 border border-[#BA2461] text-[#BA2461] hover:bg-[#BA2461] hover:text-[#FDFBF7] transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-[#EAE2D6]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-6 flex gap-4">
                      <div className="w-20 h-24 bg-[#EAE2D6] border border-[#D5C8B8] overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-serif text-[#27272A] text-lg">{item.title}</h3>
                          <p className="text-xs tracking-widest text-[#27272A]/70 uppercase mt-1">Size: {item.size}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-3 border border-[#EAE2D6] px-3 py-1">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="text-[#27272A]/70 hover:text-[#BA2461] px-1"
                            >
                              -
                            </button>
                            <span className="text-sm min-w-[1rem] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-[#27272A]/70 hover:text-[#BA2461] px-1"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-serif text-[#27272A]">₹{Number(item.price).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#EAE2D6] bg-[#FDFBF7]">
              <div className="flex justify-between text-lg mb-6">
                <span className="text-[#27272A]/70">Subtotal</span>
                <span className="font-serif text-[#BA2461]">₹{Number(subtotal).toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[#27272A]/60 text-xs mb-6 tracking-wide">Shipping & taxes calculated at checkout.</p>
              <button 
                disabled={cartItems.length === 0}
                className={`w-full py-4 text-[#FDFBF7] font-medium tracking-wide transition-colors duration-300 ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#BA2461] hover:bg-[#951C4D]'}`}
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
