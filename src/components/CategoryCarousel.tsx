import Image from "next/image";

const categories = [
  "Sleeveless Umbrella Kurtis",
  "Straight cut Kurtis",
  "A line Umbrella Kurtis",
  "Short/Jeans Top",
  "Gown/ Dresses",
  "Co-ord Sets",
  "Narrow Pants",
  "Skirts",
  "Accessories"
];

export default function CategoryCarousel() {
  return (
    <section id="categories" className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#EAE2D6] rounded-3xl mt-12 mb-12 shadow-sm">
      <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#BA2461]">Shop by Category</h2>
      
      {/* Mobile: Horizontal Swipeable, Desktop: Grid/Wrap */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 scrollbar-hide md:overflow-visible md:snap-none md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8 justify-center">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center group cursor-pointer text-center shrink-0 snap-center">
            <div className="w-[200px] aspect-[4/5] md:w-full bg-[#FDFBF7] mb-4 border border-[#D5C8B8] transition-all duration-700 ease-out group-hover:border-[#BA2461] shadow-sm overflow-hidden relative flex items-center justify-center">
              {/* Fallback placeholder text if image fails, and default placeholder image */}
              <div className="absolute inset-0 bg-[#FDFBF7] flex items-center justify-center p-4">
                <span className="text-[#BA2461]/30 font-serif text-2xl font-bold">{index + 1}</span>
              </div>
              {/* Uncomment and update src when images are available */}
              {/* <Image 
                src={`/category-${index + 1}.jpg`} 
                alt={category} 
                fill 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500 z-10" 
              /> */}
            </div>
            <h3 className="text-base md:text-lg font-serif text-[#27272A] group-hover:text-[#BA2461] transition-colors duration-500 max-w-[200px]">
              {category}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
