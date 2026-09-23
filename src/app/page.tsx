import SEOBlock from "@/components/SEOBlock";
import BrandStory from "@/components/BrandStory";
import { getShopifyProducts, getCollectionProducts } from "@/lib/shopify";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import FeatureGrid from "@/components/FeatureGrid";
import SEOContent from "@/components/SEOContent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import InstagramReels from "@/components/InstagramReels";
import WhyWeLove from "@/components/WhyWeLove";
import Testimonials from "@/components/Testimonials";
import { Leaf, Truck, RefreshCcw, Banknote } from "lucide-react";

export default async function Home() {
  const products = await getShopifyProducts();
  const bestSellers = await getCollectionProducts('best-sellers');

  const features = [
    { icon: <Leaf size={24} />, title: "100% Organic Cotton", subtitle: "Breathable & skin-friendly fabrics made for all-day wear." },
    { icon: <Truck size={24} />, title: "Free Delivery", subtitle: "Free shipping on all prepaid orders." },
    { icon: <RefreshCcw size={24} />, title: "Easy Replacement", subtitle: "Simple and hassle-free replacement process." },
    { icon: <Banknote size={24} />, title: "COD Available", subtitle: "Shop confidently with Cash on Delivery." }
  ];



  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A] relative overflow-x-hidden w-full">
      {/* Absolute Header Overlay */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Navbar with Cart Drawer Toggle */}
          <Header />
        </div>
      </div>

      <main className="flex-grow pt-10">
        <Hero />

        {/* Best Selling Products Section */}
        <section id="best-selling" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">Best Selling Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product: any, index: number) => {
              // Ensure we pass exactly the node that ProductCard expects
              const node = product.node || product;
              return <ProductCard key={index} node={node} />;
            })}
          </div>
        </section>

        {/* Feature Section A */}
        <FeatureGrid title="Our Promise" items={features} bgColor="bg-[#FDFBF7]" />

        {/* Featured Products Grid */}
        <section id="products" className="py-24 px-4 md:px-8 border-t border-[#EAE2D6] bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-6 text-[#BA2461]">Most Loved Cotton Kurtis</h2>
            <p className="text-center text-[#27272A]/80 mb-16 text-lg font-serif max-w-2xl mx-auto">
              Customer favourites crafted for comfort, style, and everyday elegance.
            </p>
            <ProductGrid products={products} />
          </div>
        </section>

        {/* New Appended Sections */}
        <InstagramReels />
        <WhyWeLove />
        <Testimonials />

        {/* SEO Content Section */}
        <SEOContent />

        {/* FAQ Section */}
        <FAQ />
        <BrandStory />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
