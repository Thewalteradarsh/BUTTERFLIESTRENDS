"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenCart = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.checkoutUrl) {
        setCheckoutUrl(customEvent.detail.checkoutUrl);
      }
      setIsCartOpen(true);
    };
    window.addEventListener("open-cart", handleOpenCart);
    return () => window.removeEventListener("open-cart", handleOpenCart);
  }, []);

  return (
    <>
      <div className={`fixed top-0 w-full z-[60] bg-[#BA2461] text-[#FDFBF7] text-[10px] sm:text-xs font-sans tracking-widest text-center py-2.5 px-2 transition-transform duration-300 ${isScrolled ? "-translate-y-full" : "translate-y-0"}`}>
        Free Delivery on Prepaid Orders | COD Available | Easy Exchange | Pan-India Shipping
      </div>
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
            <Link href="/" className="hover:text-[#BA2461] transition-colors duration-300">Home</Link>
            <Link href="/#products" className="hover:text-[#BA2461] transition-colors duration-300">Collections</Link>
            <Link href="/about" className="hover:text-[#BA2461] transition-colors duration-300">About</Link>
            <Link href="/contact" className="hover:text-[#BA2461] transition-colors duration-300">Contact</Link>
          </nav>
          <div className="flex items-center gap-6">
            <a 
              href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/account/login`}
              className="text-[#27272A] hover:text-[#BA2461] transition-colors duration-300"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
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

          {/* Account & Cart Icons (Right) */}
          <div className="flex items-center gap-4 justify-self-end">
            <a 
              href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/account/login`}
              className="text-[#27272A] hover:text-[#BA2461] transition-colors duration-300"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
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
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[45] bg-[#FDFBF7] pt-32 px-6 flex flex-col gap-6 text-[#27272A] font-sans text-xl uppercase tracking-widest border-t border-neutral-200 overflow-y-auto">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#BA2461] transition-colors">Home</Link>
            <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#BA2461] transition-colors">Collections</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#BA2461] transition-colors">About</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#BA2461] transition-colors">Contact</Link>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} checkoutUrl={checkoutUrl} />
    </>
  );
}
