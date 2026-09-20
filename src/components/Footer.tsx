import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#BA2461] py-20 px-4 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h3 className="text-4xl font-serif mb-6 tracking-wide text-[#FDFBF7]">Butterflies Trends</h3>
        <p className="text-[#FDFBF7] mb-12 max-w-2xl text-sm md:text-base leading-relaxed font-sans tracking-wide">
          At Butterflies Trends, we bring together comfort, craftsmanship, and contemporary fashion through our collection of cotton kurtis, hand block prints, Kalamkari kurtis, Ikat kurtis, Ajrakh prints, dresses, palazzos, and ethnic wear for women. Designed for everyday elegance, our pieces celebrate timeless Indian artistry with modern styling.
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 text-[#FDFBF7] font-sans tracking-widest text-xs uppercase">
          <a href="#" className="hover:text-white transition-colors duration-300">Home</a>
          <a href="#products" className="hover:text-white transition-colors duration-300">Shop</a>
          <a href="#" className="hover:text-white transition-colors duration-300">About</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
        </div>
        <p className="text-xs text-[#FDFBF7] uppercase tracking-widest">
          © {new Date().getFullYear()} Butterflies Trends. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
