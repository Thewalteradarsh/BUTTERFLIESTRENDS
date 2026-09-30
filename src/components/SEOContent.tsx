import Image from "next/image";

export default function SEOContent() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* Left Side: Elegant Placeholder Image */}
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative shadow-md">
             <Image 
               src="/cottonkurthi.jpg" 
               alt="Cotton Kurtis for Women" 
               fill 
               className="object-cover" 
             />
          </div>
        </div>

        {/* Right Side: SEO Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#BA2461] mb-8 leading-tight">
            Cotton Kurtis for Women Online
          </h2>
          <p className="text-base md:text-lg text-[#27272A] leading-relaxed font-sans mb-6">
            Discover premium cotton kurtis, hand block printed kurtis, Kalamkari kurtis, Ajrakh kurtis, Ikat kurtis, short kurtis, palazzos, dresses, and ethnic wear designed for comfort and style. 
          </p>
          <p className="text-base md:text-lg text-[#27272A] leading-relaxed font-sans">
            Butterflies Trends blends traditional Indian prints and silhouettes with modern designs for women who love effortless fashion.
          </p>
        </div>

      </div>
    </section>
  );
}
