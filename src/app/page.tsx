import { getShopifyProducts } from "@/lib/shopify";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Header from "@/components/Header";
import CategoryCarousel from "@/components/CategoryCarousel";
import FeatureGrid from "@/components/FeatureGrid";
import SEOContent from "@/components/SEOContent";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Leaf, Truck, RefreshCcw, Banknote, Sparkles, Paintbrush, Ruler, Diamond } from "lucide-react";

export default async function Home() {
  const products = await getShopifyProducts();

  const features = [
    { icon: <Leaf size={24} />, title: "100% Organic Cotton", subtitle: "Breathable and soft for everyday comfort." },
    { icon: <Truck size={24} />, title: "Free Delivery", subtitle: "On all prepaid orders across India." },
    { icon: <RefreshCcw size={24} />, title: "Easy Replacement", subtitle: "Hassle-free returns within 7 days." },
    { icon: <Banknote size={24} />, title: "COD Available", subtitle: "Pay at your doorstep." }
  ];

  const brandValues = [
    { icon: <Diamond size={24} />, title: "Premium Cotton Fabrics", subtitle: "Sourced for ultimate quality and feel." },
    { icon: <Paintbrush size={24} />, title: "Traditional Prints, Modern Style", subtitle: "Best of both worlds." },
    { icon: <Ruler size={24} />, title: "Variety of Sizes", subtitle: "From XS to 3XL for the perfect fit." },
    { icon: <Sparkles size={24} />, title: "Everyday Elegance", subtitle: "Effortless fashion for modern women." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A] relative">
      {/* Absolute Header Overlay */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Navbar with Cart Drawer Toggle */}
          <Header />
        </div>
      </div>

      <main className="flex-grow pt-10">
        <Hero />

        {/* Categories Section */}
        <CategoryCarousel />

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

        {/* Feature Section B (Brand Values) */}
        <FeatureGrid title="Why Women Love Butterflies Trends" items={brandValues} bgColor="bg-[#F4E8E8]" />

        {/* SEO Content Section */}
        <SEOContent />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
