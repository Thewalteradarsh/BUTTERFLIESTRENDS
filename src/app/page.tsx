import { getShopifyProducts } from "@/lib/shopify";
import Image from "next/image";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Header from "@/components/Header";

export default async function Home() {
  const products = await getShopifyProducts();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A] relative">
      {/* Absolute Header Overlay */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Navbar with Cart Drawer Toggle */}
          <Header />
        </div>
      </div>

      <main className="flex-grow">
        <Hero />

        {/* Shop by Category */}
        <section className="py-32 px-4 md:px-8 max-w-5xl mx-auto bg-[#EAE2D6] rounded-3xl mt-12 mb-12 shadow-sm">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-24 text-[#BA2461]">Shop by Category</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 scrollbar-hide md:overflow-visible md:snap-none md:justify-center md:gap-32">
            <div className="flex flex-col items-center group cursor-pointer text-center shrink-0 snap-center">
              <div className="w-[250px] aspect-[4/5] md:w-72 md:h-96 bg-[#FDFBF7] mb-6 md:mb-8 border border-[#D5C8B8] transition-all duration-700 ease-out group-hover:border-[#BA2461] shadow-sm overflow-hidden relative">
                <Image src="/straight-cut.jpg.jpg" alt="Straight Cut Kurtis" fill className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-lg md:text-2xl font-serif text-[#27272A] group-hover:text-[#BA2461] transition-colors duration-500">Straight Cut Kurtis</h3>
            </div>
            <div className="flex flex-col items-center group cursor-pointer text-center shrink-0 snap-center">
              <div className="w-[250px] aspect-[4/5] md:w-72 md:h-96 bg-[#FDFBF7] mb-6 md:mb-8 border border-[#D5C8B8] transition-all duration-700 ease-out group-hover:border-[#BA2461] shadow-sm overflow-hidden relative">
                <Image src="/a-line.jpg.jpg" alt="A-Line Umbrella Kurtis" fill className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-lg md:text-2xl font-serif text-[#27272A] group-hover:text-[#BA2461] transition-colors duration-500">A-Line Umbrella Kurtis</h3>
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section id="products" className="py-32 px-4 md:px-8 border-t border-[#EAE2D6]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-24 text-[#BA2461]">Featured Collection</h2>
            <ProductGrid products={products} />
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-32 bg-[#F4E8E8]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-serif text-center mb-24 text-[#BA2461]">The Experience</h2>
            <div className="flex flex-col md:flex-row justify-center items-start gap-16 md:gap-32 text-center">
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 border border-[#BA2461] text-[#BA2461] rounded-full flex items-center justify-center text-xl font-serif mb-8">1</div>
                <h3 className="text-lg font-serif text-[#27272A] mb-4">Discover</h3>
                <p className="text-[#27272A]/70 text-sm leading-relaxed">Explore our curated collection of luxury ethnic wear.</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 border border-[#BA2461] text-[#BA2461] rounded-full flex items-center justify-center text-xl font-serif mb-8">2</div>
                <h3 className="text-lg font-serif text-[#27272A] mb-4">Select</h3>
                <p className="text-[#27272A]/70 text-sm leading-relaxed">Add pieces to your collection with a seamless experience.</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-12 h-12 border border-[#BA2461] text-[#BA2461] rounded-full flex items-center justify-center text-xl font-serif mb-8">3</div>
                <h3 className="text-lg font-serif text-[#27272A] mb-4">Receive</h3>
                <p className="text-[#27272A]/70 text-sm leading-relaxed">Anticipate the arrival of your premium garments.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#BA2461] py-20 px-4 text-[#FDFBF7]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h3 className="text-4xl font-serif mb-6 tracking-wide text-[#FDFBF7]">Butterflies Trends</h3>
          <p className="text-[#FDFBF7] mb-12 max-w-md text-sm leading-relaxed font-sans tracking-wide">
            Freedom & Flight. Ethnic wear that moves with you.
          </p>
          <div className="flex gap-12 mb-12 text-[#FDFBF7] font-sans tracking-widest text-xs uppercase">
            <a href="#" className="hover:text-white transition-colors duration-300">Home</a>
            <a href="#products" className="hover:text-white transition-colors duration-300">Shop</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
          <p className="text-xs text-[#FDFBF7] uppercase tracking-widest">
            © {new Date().getFullYear()} Butterflies Trends. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
