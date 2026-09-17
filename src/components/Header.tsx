"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 flex items-center ${isScrolled ? "top-0 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-neutral-200 py-4" : "top-10 bg-transparent py-4"}`}>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center px-8 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center">
            <Image 
              src="/Logo butterflies trends.png" 
              alt="Butterflies Trends Logo" 
              width={160} 
              height={50} 
              className="object-contain object-left h-12 w-auto" 
              priority
            />
          </Link>
          <nav className="flex gap-12 text-[#27272A] font-sans tracking-widest text-xs uppercase">
            <a href="#" className="hover:text-[#BA2461] transition-colors duration-300">Home</a>
            <a href="#products" className="hover:text-[#BA2461] transition-colors duration-300">Collections</a>
            <a href="#" className="hover:text-[#BA2461] transition-colors duration-300">About</a>
            <a href="#" className="hover:text-[#BA2461] transition-colors duration-300">Contact</a>
          </nav>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-[#27272A] hover:text-[#BA2461] transition-colors duration-300"
            aria-label="Open cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="grid md:hidden grid-cols-3 items-center px-4 w-full">
          {/* Hamburger Menu (Left) */}
          <button 
            className="text-[#27272A] hover:text-[#BA2461] transition-colors justify-self-start"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo (Center) */}
          <div className="justify-self-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/Logo butterflies trends.png" 
                alt="Butterflies Trends Logo" 
                width={160} 
                height={50} 
                className="object-contain h-10 w-auto" 
                priority
              />
            </Link>
          </div>

          {/* Cart Icon (Right) */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-[#27272A] hover:text-[#BA2461] transition-colors duration-300 justify-self-end"
            aria-label="Open cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
