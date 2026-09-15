import { getShopifyProducts } from "@/lib/shopify";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getShopifyProducts();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Marquee Announcement Bar */}
      <div className="bg-[#800020] text-white text-sm py-2 overflow-hidden flex whitespace-nowrap justify-center">
        <span className="inline-block px-4">
          🦋 Let Your Style Take Flight 🦋 Unfold Your True Colors 🦋 Ethnic Wear That Moves With You 🦋
        </span>
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-serif font-bold text-gray-900">Butterflies Trends</div>
        <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-[#800020] transition">Home</a>
          <a href="#products" className="hover:text-[#800020] transition">Collections</a>
          <a href="#" className="hover:text-[#800020] transition">About</a>
          <a href="#" className="hover:text-[#800020] transition">Contact</a>
        </nav>
        <div className="text-gray-900 cursor-pointer hover:text-[#800020] transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />

        {/* Shop by Category */}
        <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-gray-900">Shop by Category</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-20">
            <div className="flex flex-col items-center group cursor-pointer text-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-100 mb-6 shadow-md hover:shadow-lg transition"></div>
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 group-hover:text-[#800020] transition">Straight Cut Kurtis</h3>
            </div>
            <div className="flex flex-col items-center group cursor-pointer text-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-100 mb-6 shadow-md hover:shadow-lg transition"></div>
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 group-hover:text-[#800020] transition">A-Line Umbrella Kurtis</h3>
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section id="products" className="py-20 px-4 md:px-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-gray-900">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(({ node }: any) => (
                <ProductCard key={node.id} node={node} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-16 text-gray-900">Shop Online Easily</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 text-center">
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 bg-[#800020] text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6">1</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Browse</h3>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 bg-[#800020] text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6">2</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Add to Cart</h3>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 bg-[#800020] text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6">3</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Receive Confirmation</h3>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#800020] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h3 className="text-3xl font-serif mb-4">Butterflies Trends</h3>
          <p className="text-gray-200 mb-8 max-w-sm">Freedom & Flight. Ethnic wear that moves with you.</p>
          <div className="flex gap-6 mb-8">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#products" className="hover:text-gray-300">Shop</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} Butterflies Trends. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
