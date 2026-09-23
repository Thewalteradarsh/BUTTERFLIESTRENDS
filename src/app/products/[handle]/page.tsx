import { getShopifyProduct } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> | { handle: string } }) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    return notFound();
  }

  const product = await getShopifyProduct(handle);

  if (!product) {
    return notFound();
  }

  const price = product.priceRange?.minVariantPrice?.amount;
  // If there are multiple images, we want all of them. Otherwise fallback to the mock logic.
  const images = product.images?.edges?.length > 0 
    ? product.images.edges 
    : [{ node: { url: '/hero-kurti.png.png', altText: product.title } }];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#27272A] relative">
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </div>

      <main className="flex-grow pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:items-start">
          
          {/* Left: Image Gallery */}
          <div className="md:col-span-7 flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full gap-4 pb-4 md:grid md:grid-cols-2">
            {images.map((edge: any, idx: number) => (
              <div key={idx} className={`w-[85vw] md:w-full flex-shrink-0 snap-center relative aspect-[4/9] rounded-md overflow-hidden ${images.length % 2 !== 0 && idx === images.length - 1 ? 'md:col-span-2' : ''}`}>
                <Image
                  src={edge.node.url}
                  alt={edge.node.altText || product.title}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Right: Product Details */}
          <div className="md:col-span-5 sticky top-24 flex flex-col pt-4 md:pt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#27272A] mb-4 leading-tight">
              {product.title}
            </h1>
            <p className="text-2xl font-serif text-[#BA2461] mb-6">
              ₹{Number(price).toLocaleString('en-IN')}
            </p>
            
            <hr className="border-[#EAE2D6] mb-2" />

            {/* Interactive Form Component */}
            <ProductForm product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 mt-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a5d3b]">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span className="text-xs text-[#27272A]/80 font-medium">COD Available</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a5d3b]">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 12"></path>
                </svg>
                <span className="text-xs text-[#27272A]/80 font-medium">100% Pure Cotton</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a5d3b]">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                <span className="text-xs text-[#27272A]/80 font-medium">Authentic Hand Block Print</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a5d3b]">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className="text-xs text-[#27272A]/80 font-medium">Supporting Artisans</span>
              </div>
            </div>

            {/* Handcraft Disclaimer Box */}
            <div className="mt-8 p-5 bg-[#faf6f3] border border-[#e8dcd0] rounded-sm">
              <h4 className="text-lg font-serif text-[#8a5d3b] mb-3">Handcraft Disclaimer</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Please note that our products are made from cotton and are dyed using natural dyes, which may bleed during the initial few washes or rub against the skin and other light-coloured garments. Additionally, slight variations in hand block-printing and stitching may occur, which are the hallmark of authentic handmade products.
              </p>
            </div>

            {/* Description & Details moved below the form */}
            <div className="mt-10 pt-8 border-t border-[#EAE2D6]">
              <h3 className="text-sm font-sans tracking-widest uppercase text-[#27272A] mb-4">Product Details</h3>
              <div 
                className="prose prose-sm md:prose-base prose-stone text-[#27272A]/80 mb-8 max-w-none font-sans"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml || "" }}
              />
              <div className="flex flex-col gap-4 text-xs font-sans tracking-wide text-[#27272A]/70 uppercase">
                 <p className="flex items-center gap-2"><span className="text-green-600">●</span> In Stock & Ready to Ship</p>
                 <p>Free shipping on prepaid orders</p>
                 <p>7-day easy replacements</p>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
